import { beforeEach, describe, expect, it, vi } from "vitest";
import { batchService } from "./batch-service";
import type { BatchStage } from "../batch-types";

/**
 * Every request the batch service makes, in order. Prefixed `mock` so the `vi.mock` factory
 * below may close over it — the factory is hoisted above these declarations.
 */
const mockCalls: { method: string; path: string; body?: unknown; query?: unknown }[] = [];

vi.mock("@/lib/api", () => {
  const record = (method: string) => (path: string, body?: unknown, query?: unknown) => {
    mockCalls.push({ method, path, body, query });
    return Promise.resolve({ data: {} });
  };
  return {
    api: {
      get: (path: string, query?: unknown) => record("GET")(path, undefined, query),
      post: record("POST"),
      put: record("PUT"),
      patch: record("PATCH"),
      delete: record("DELETE"),
    },
  };
});

const STAGES: BatchStage[] = ["printing", "weaving", "cutting", "packaging"];
const pathOf = (i: number) => mockCalls[i].path;

beforeEach(() => {
  mockCalls.length = 0;
});

/**
 * Since migration `0025_line_scoped_cutting_packaging` every stage belongs to one production
 * line, so cutting and packaging read and write through the same `.../lines/:lineId` routes the
 * first stages always used. These tests pin the URLs: the order-scoped routes they replaced
 * (`/production/orders/:stage-batches/...`) no longer exist on the server, so a regression here
 * is a 404 on the floor.
 */
describe("batchService (line-scoped)", () => {
  it.each(STAGES)("asks for %s sources from the line, not the order", async (stage) => {
    await batchService.getSources(stage, 42);
    expect(pathOf(0)).toBe(`/production/${stage}-batches/lines/42/sources`);
  });

  it.each(["cutting", "packaging"] as const)(
    "keeps %s machine and operator lookups on the line",
    async (stage) => {
      await batchService.getResources(stage, 7, 11);
      expect(pathOf(0)).toBe(`/production/${stage}-batches/lines/7/resources`);
      expect(mockCalls[0].query).toEqual({ batchId: 11 });
    }
  );

  it.each(["cutting", "packaging"] as const)("reads %s batches from the line", async (stage) => {
    await batchService.listByLine(stage, 7);
    expect(pathOf(0)).toBe(`/production/${stage}-batches/lines/7`);
  });

  it.each(STAGES)("POSTs a %s batch against its line", async (stage) => {
    const body = stage === "printing" || stage === "weaving"
      ? { assignedRolls: 100 }
      : { sources: [] };
    await batchService.create(stage, 7, body);
    expect(pathOf(0)).toBe(`/production/${stage}-batches/lines/7`);
    expect(mockCalls[0].body).toEqual(body);
  });

  it("never targets a retired order-scoped batch route", async () => {
    await batchService.getSources("cutting", 7);
    await batchService.getResources("packaging", 9);
    await batchService.listByLine("cutting", 7);
    await batchService.create("packaging", 9, { sources: [] });
    await batchService.get("cutting", 3);
    await batchService.update("packaging", 3, { notes: "x" });
    await batchService.start("cutting", 3);
    await batchService.recordOutput("cutting", 3, { producedRolls: 1 });
    await batchService.complete("cutting", 3);
    await batchService.cancel("packaging", 3);
    await batchService.remove("cutting", 3);

    // `/production/orders/:id/flow` is still an order route — and legitimately so: it sums the
    // lines' own figures. What must never come back is `/production/orders/:id/:stage-batches`.
    expect(mockCalls.filter((c) => /orders\/.*-batches/.test(c.path))).toEqual([]);
  });
});
