import { describe, it, expect } from "vitest";
import {
  batchScopeOf,
  isOrderScopedStage,
  isLineScopedStage,
  isOrderScopedOnEveryWorkflow,
  batchCreateTarget,
} from "./batch-scope";
import { STAGES_OF, type BatchStage, type LineKind } from "../batch-types";

/**
 * Regression (reported from the floor): the cutting and packaging panels stayed empty while the
 * floor showed cutting batches, because every panel asked the line endpoint for its stage.
 *
 * Cutting and packaging batches carry NO line — the database check
 * `production_batches_first_stage_one_line` requires both line columns to be NULL for those two
 * stages — so a line-filtered read cannot see them. This matrix IS the reported regression:
 * cutting and packaging must be read order-wide, on BOTH workflows.
 */
const EXPECTED: Record<LineKind, Array<[BatchStage, "line" | "order"]>> = {
  printed: [
    ["printing", "line"],
    ["cutting", "order"],
    ["packaging", "order"],
  ],
  woven: [
    ["weaving", "line"],
    ["cutting", "order"],
    ["packaging", "order"],
  ],
};

describe("batchScopeOf", () => {
  for (const kind of ["printed", "woven"] as LineKind[]) {
    describe(`${kind} workflow`, () => {
      for (const [stage, scope] of EXPECTED[kind]) {
        it(`${stage} batches are ${scope}-scoped`, () => {
          expect(batchScopeOf(kind, stage)).toBe(scope);
        });
      }
    });
  }

  it("covers exactly the stages each workflow runs", () => {
    for (const kind of ["printed", "woven"] as LineKind[]) {
      expect(EXPECTED[kind].map(([stage]) => stage)).toEqual(STAGES_OF[kind]);
    }
  });

  it("marks exactly the first stage line-scoped and every later stage order-scoped", () => {
    for (const kind of ["printed", "woven"] as LineKind[]) {
      const scopes = STAGES_OF[kind].map((stage) => batchScopeOf(kind, stage));
      expect(scopes).toEqual(["line", "order", "order"]);
      expect(STAGES_OF[kind].filter((stage) => isOrderScopedStage(kind, stage))).toEqual([
        "cutting",
        "packaging",
      ]);
      expect(STAGES_OF[kind].filter((stage) => isLineScopedStage(kind, stage))).toEqual([
        STAGES_OF[kind][0],
      ]);
    }
  });

  it("keeps cutting and packaging order-scoped even when the other workflow owns the stage", () => {
    // Neither workflow's stage list contains the other's first stage: weaving/printing are
    // refused upstream by `kindOwnsStage`, so whatever this returns is never reached on screen.
    expect(batchScopeOf("printed", "weaving")).toBe("order");
    expect(batchScopeOf("woven", "printing")).toBe("order");
  });
});

/**
 * The create endpoint is chosen from the STAGE alone — the create mutation never learns the order's
 * workflow — so these cases pin down the two shapes that must never be confused: a stage shared by
 * both workflows (cutting, packaging) and the first stage of one (printing, weaving).
 */
describe("isOrderScopedOnEveryWorkflow", () => {
  it("is true only for cutting and packaging", () => {
    expect(isOrderScopedOnEveryWorkflow("cutting")).toBe(true);
    expect(isOrderScopedOnEveryWorkflow("packaging")).toBe(true);
    expect(isOrderScopedOnEveryWorkflow("printing")).toBe(false);
    expect(isOrderScopedOnEveryWorkflow("weaving")).toBe(false);
  });

  it("does not confuse 'order-scoped on one workflow' with 'order-scoped on every workflow'", () => {
    // Weaving is absent from the printed workflow, so `batchScopeOf("printed", "weaving")` is
    // "order" — yet weaving batches are line-scoped wherever they exist and must be created
    // against a line. Answering "order" here would POST a weaving batch with no line at all.
    expect(isOrderScopedStage("printed", "weaving")).toBe(true);
    expect(isOrderScopedOnEveryWorkflow("weaving")).toBe(false);
  });

  it("agrees with batchScopeOf for every stage each workflow runs", () => {
    for (const kind of ["printed", "woven"] as LineKind[]) {
      for (const stage of STAGES_OF[kind]) {
        const sharedByEveryWorkflow = STAGES_OF.printed.includes(stage) && STAGES_OF.woven.includes(stage);
        expect(isOrderScopedOnEveryWorkflow(stage)).toBe(
          sharedByEveryWorkflow && batchScopeOf(kind, stage) === "order"
        );
      }
    }
  });
});

/**
 * Regression (reported from the floor): creating a cutting batch from a label type's board POSTed to
 * `/cutting-batches/lines/:lineId` — a URL that claims a line the batch is forbidden to have. Every
 * board renders the order's cutting and packaging batches, so every board must post them to the
 * ORDER, whatever line id it happens to be holding.
 */
describe("batchCreateTarget", () => {
  it("sends cutting and packaging to the order even when a line id is also known", () => {
    expect(batchCreateTarget("cutting", { lineId: 7, orderId: "42" })).toEqual({
      scope: "order",
      orderId: "42",
    });
    expect(batchCreateTarget("packaging", { lineId: 7, orderId: "42" })).toEqual({
      scope: "order",
      orderId: "42",
    });
  });

  it("sends the first stages to their line, even though they belong to an order too", () => {
    // Printing and weaving draw from the PLAN of one label type, which only the line endpoint
    // resolves; the order is not a substitute while a line is known.
    expect(batchCreateTarget("printing", { lineId: 7, orderId: "42" })).toEqual({
      scope: "line",
      lineId: 7,
    });
    expect(batchCreateTarget("weaving", { lineId: 7, orderId: "42" })).toEqual({
      scope: "line",
      lineId: 7,
    });
  });

  it("uses the order when that is the only id known", () => {
    expect(batchCreateTarget("cutting", { orderId: "42" })).toEqual({ scope: "order", orderId: "42" });
    expect(batchCreateTarget("packaging", { orderId: "42" })).toEqual({ scope: "order", orderId: "42" });
    // A first-stage batch with no line resolves through its order as well.
    expect(batchCreateTarget("printing", { orderId: "42" })).toEqual({ scope: "order", orderId: "42" });
  });

  it("keeps a line-only caller working for the shared stages", () => {
    // The line route for cutting/packaging still exists: the server derives the order from the
    // line and writes `line: null`. Existing callers must not start throwing.
    expect(batchCreateTarget("cutting", { lineId: 7 })).toEqual({ scope: "line", lineId: 7 });
    expect(batchCreateTarget("packaging", { lineId: 7 })).toEqual({ scope: "line", lineId: 7 });
  });

  it("reports that no endpoint can express the batch when neither id is known", () => {
    for (const stage of ["weaving", "printing", "cutting", "packaging"] as BatchStage[]) {
      expect(batchCreateTarget(stage, {})).toBeNull();
    }
  });
});
