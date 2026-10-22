import { describe, it, expect } from "vitest";
import {
  resolvePlanningSubmitTarget,
  resolvePlanningDefaultQuantity,
} from "./planning-dialog";
import type { PlanLineInput, ProductionLineOverview } from "../types";
import type { PlanWovenInput, WovenLineOverview } from "../woven-types";

/* ------------------------------------------------------------------ helpers */

/** Minimal printed line — only the fields the helpers touch are populated. */
function makePrintedEditing(overrides: Partial<ProductionLineOverview> = {}): ProductionLineOverview {
  return {
    id: 7,
    labelType: "Care Label",
    status: "pending",
    planning: {
      quantity: 1200,
      labelSize: 50,
      rollLength: 200,
      requiredRolls: 2,
      extraRolls: 0,
      totalRolls: 10,
      totalWeight: 0,
      printingMachineId: null,
      printingOperatorId: null,
    },
    ...overrides,
  } as unknown as ProductionLineOverview;
}

/** Minimal woven line — only the fields the helpers touch are populated. */
function makeWovenEditing(overrides: Partial<WovenLineOverview> = {}): WovenLineOverview {
  return {
    id: 9,
    labelType: "Size Label",
    quantity: 800,
    sizes: [],
    status: "pending",
    planning: {
      totalThreadWeightKg: 0,
      completedAt: null,
      threadCount: 0,
      dyedThreadUsedKg: 0,
      beamThreadKg: 0,
      threads: [],
    },
    ...overrides,
  } as unknown as WovenLineOverview;
}

const printedBody: PlanLineInput = {
  labelType: "Care Label",
  quantity: 500,
  labelSize: 50,
  materialCode: "MAT-1",
};

const wovenBody: PlanWovenInput = {
  labelType: "Size Label",
  quantity: 300,
  threads: [],
};

/* ------------------------------------------------------------------- tests */

describe("resolvePlanningSubmitTarget", () => {
  it("plans a new printed line when there is no editing line", () => {
    const t = resolvePlanningSubmitTarget("printed", null, printedBody);
    expect(t).toEqual({ kind: "create-printed", body: printedBody });
  });

  it("updates a printed line by its string id when editing", () => {
    const t = resolvePlanningSubmitTarget("printed", makePrintedEditing(), printedBody);
    expect(t).toEqual({ kind: "update-printed", lineId: "7", body: printedBody });
  });

  it("plans a new woven line when there is no editing line", () => {
    const t = resolvePlanningSubmitTarget("woven", null, wovenBody);
    expect(t).toEqual({ kind: "create-woven", body: wovenBody });
  });

  it("updates a woven line by its numeric id when editing", () => {
    const t = resolvePlanningSubmitTarget("woven", makeWovenEditing(), wovenBody);
    expect(t).toEqual({ kind: "update-woven", lineId: 9, body: wovenBody });
  });

  it("lets the product type win over the editing line's shape", () => {
    // A woven line addressed with productType "printed" is keyed by string id.
    const t = resolvePlanningSubmitTarget("printed", makeWovenEditing(), printedBody);
    expect(t).toEqual({ kind: "update-printed", lineId: "9", body: printedBody });
  });

  it("treats undefined editing exactly like null", () => {
    const t = resolvePlanningSubmitTarget("woven", undefined, wovenBody);
    expect(t).toEqual({ kind: "create-woven", body: wovenBody });
  });
});

describe("resolvePlanningDefaultQuantity", () => {
  it("returns remainingQty when nothing is being edited", () => {
    expect(resolvePlanningDefaultQuantity(null, 450)).toBe(450);
    expect(resolvePlanningDefaultQuantity(undefined, 450)).toBe(450);
  });

  it("reads the top-level quantity for woven lines", () => {
    expect(resolvePlanningDefaultQuantity(makeWovenEditing(), 450)).toBe(800);
  });

  it("reads planning.quantity for printed lines", () => {
    expect(resolvePlanningDefaultQuantity(makePrintedEditing(), 450)).toBe(1200);
  });

  it("coerces string quantities from the API to numbers", () => {
    const editing = makeWovenEditing();
    (editing as unknown as { quantity: unknown }).quantity = "950";
    expect(resolvePlanningDefaultQuantity(editing, 450)).toBe(950);
  });
});

