import { describe, it, expect } from "vitest";
import {
  toNumber,
  totalPlannedQuantity,
  duplicateRowIndexes,
  labelTypeTaken,
  cumulativeStockIssues,
  sizePlanTotal,
  allocateSharedThreads,
} from "./planning-rows";
import type { ThreadPlanInput } from "../woven-types";

const thread = (weightKg: number, colorName = "Red"): ThreadPlanInput => ({
  colorName,
  denier: "75",
  colorCode: `${colorName}-01`,
  weightKg,
  threadStockId: 1,
});

const sum = (ns: number[]) => Math.round(ns.reduce((a, b) => a + b, 0) * 1000) / 1000;

describe("toNumber", () => {
  it("normalises empty inputs, numeric strings and NaN to numbers", () => {
    expect(toNumber("")).toBe(0);
    expect(toNumber("12.5")).toBe(12.5);
    expect(toNumber(undefined)).toBe(0);
    expect(toNumber(Number.NaN)).toBe(0);
  });
});

describe("totalPlannedQuantity", () => {
  it("sums every row, including string quantities", () => {
    expect(totalPlannedQuantity([{ quantity: 20000 }, { quantity: "10000" }, { quantity: "" }])).toBe(30000);
  });
});

describe("duplicateRowIndexes", () => {
  it("flags rows whose label type repeats an earlier row, ignoring case and padding", () => {
    const rows = [
      { labelType: "Main Label" },
      { labelType: "Care Label" },
      { labelType: "  main label " },
      { labelType: "" },
      { labelType: "CARE LABEL" },
    ];
    expect(duplicateRowIndexes(rows)).toEqual([2, 4]);
  });
});

describe("labelTypeTaken", () => {
  it("detects an already-claimed label type so the select can hide it", () => {
    expect(labelTypeTaken("Care Label", [{ labelType: "care label" }])).toBe(true);
    expect(labelTypeTaken("Care Label", [{ labelType: "Main Label" }])).toBe(false);
    expect(labelTypeTaken("", [{ labelType: "" }])).toBe(false);
  });
});

describe("sizePlanTotal", () => {
  it("sums planned sizes and tolerates an absent plan", () => {
    expect(sizePlanTotal([{ size: "XL", quantity: 200 }, { size: "L", quantity: "50" }])).toBe(250);
    expect(sizePlanTotal(undefined)).toBe(0);
  });
});

describe("cumulativeStockIssues", () => {
  it("checks each material against the CUMULATIVE draw of every row using it", () => {
    const rows = [
      { labelType: "A", materialCode: "M1", totalRolls: 6 },
      { labelType: "B", materialCode: "M2", totalRolls: 1 },
      { labelType: "C", materialCode: "M1", totalRolls: 5 },
    ];
    const available = new Map([
      ["M1", 10],
      ["M2", 3],
    ]);
    const issues = cumulativeStockIssues(rows, available);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatchObject({ index: 2, materialCode: "M1", required: 11, available: 10 });
  });

  it("ignores rows without a material and materials with no balance row", () => {
    expect(cumulativeStockIssues([{ labelType: "A", materialCode: "", totalRolls: 99 }], new Map())).toEqual([]);
    expect(cumulativeStockIssues([{ labelType: "A", materialCode: "M9", totalRolls: 99 }], new Map())).toEqual([]);
  });
});

describe("allocateSharedThreads", () => {
  it("splits one shared allocation proportionally, summing to the exact allocated weight", () => {
    const split = allocateSharedThreads([thread(1.001)], [
      { quantity: 20000 },
      { quantity: 10000 },
      { quantity: 5000 },
    ]);
    expect(split).not.toBeNull();
    expect(split!.map((r) => r[0].weightKg)).toEqual([0.572, 0.286, 0.143]);
    expect(sum(split!.map((r) => r[0].weightKg))).toBe(1.001);
  });

  it("preserves every other colour field on each share", () => {
    const split = allocateSharedThreads([thread(2, "Blue")], [{ quantity: 1 }, { quantity: 3 }]);
    expect(split![1][0]).toMatchObject({ colorName: "Blue", denier: "75", colorCode: "Blue-01", threadStockId: 1 });
  });

  it("gives a single label type the whole allocation, unchanged", () => {
    const split = allocateSharedThreads([thread(2.5)], [{ quantity: 1234 }]);
    expect(split).toHaveLength(1);
    expect(split![0][0].weightKg).toBe(2.5);
  });

  it("returns null when a share would round to zero, when inputs are empty, or weights are invalid", () => {
    expect(allocateSharedThreads([thread(0.001)], [{ quantity: 1 }, { quantity: 1 }, { quantity: 1 }])).toBeNull();
    expect(allocateSharedThreads([], [{ quantity: 1 }])).toBeNull();
    expect(allocateSharedThreads([thread(1)], [])).toBeNull();
    expect(allocateSharedThreads([thread(1)], [{ quantity: 0 }])).toBeNull();
    expect(allocateSharedThreads([thread(0)], [{ quantity: 1 }])).toBeNull();
  });
});
