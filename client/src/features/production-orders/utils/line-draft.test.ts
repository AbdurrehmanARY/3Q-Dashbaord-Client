import { describe, it, expect } from "vitest";
import { cascadeDraft, validateLineDraft, diffLineDraft, type LineDraft } from "./line-draft";
import type { LinePlanning } from "../types";

function makeDraft(overrides: Partial<LineDraft> = {}): LineDraft {
  return {
    printedRolls: 0,
    sentToCuttingRolls: 0,
    cutRolls: 0,
    sentToPackagingRolls: 0,
    packagedRolls: 0,
    packagedQty: 0,
    printingMachineId: 1,
    printingOperatorId: 1,
    cuttingMachineId: null,
    cuttingOperatorId: null,
    packagingOperatorId: null,
    ...overrides,
  };
}

const planning: LinePlanning = {
  quantity: 1000,
  labelSize: 50,
  requiredRolls: 2,
  extraRolls: 0,
  totalRolls: 10,
  totalWeight: null,
};

describe("cascadeDraft", () => {
  it("pulls downstream counters down when an upstream one is lowered", () => {
    const draft = makeDraft({ printedRolls: 8, sentToCuttingRolls: 10, cutRolls: 10 });
    const out = cascadeDraft(draft, "printedRolls");
    expect(out.sentToCuttingRolls).toBe(8);
    expect(out.cutRolls).toBe(8);
  });

  it("does not raise downstream counters", () => {
    const draft = makeDraft({ printedRolls: 10, sentToCuttingRolls: 4, cutRolls: 4 });
    const out = cascadeDraft(draft, "printedRolls");
    expect(out.sentToCuttingRolls).toBe(4);
    expect(out.cutRolls).toBe(4);
  });
});

describe("validateLineDraft", () => {
  it("passes a consistent chain", () => {
    const errors = validateLineDraft(
      makeDraft({ printedRolls: 8, sentToCuttingRolls: 6, cutRolls: 4, sentToPackagingRolls: 2, packagedRolls: 1 }),
      planning
    );
    expect(errors).toEqual({});
  });

  it("flags printed exceeding total rolls", () => {
    const errors = validateLineDraft(makeDraft({ printedRolls: 11 }), planning);
    expect(errors.printedRolls).toBeTruthy();
  });

  it("flags a stage exceeding its upstream", () => {
    const errors = validateLineDraft(makeDraft({ printedRolls: 5, sentToCuttingRolls: 6 }), planning);
    expect(errors.sentToCuttingRolls).toBeTruthy();
  });

  it("flags packagedQty exceeding the planned quantity", () => {
    const errors = validateLineDraft(makeDraft({ packagedQty: 1001 }), planning);
    expect(errors.packagedQty).toBeTruthy();
  });

  it("flags negative values", () => {
    const errors = validateLineDraft(makeDraft({ printedRolls: -1 }), planning);
    expect(errors.printedRolls).toBeTruthy();
  });
});

describe("diffLineDraft", () => {
  it("returns only the fields that changed", () => {
    const original = makeDraft();
    const next = makeDraft({ printedRolls: 5, cuttingMachineId: 3 });
    expect(diffLineDraft(original, next)).toEqual({ printedRolls: 5, cuttingMachineId: 3 });
  });

  it("returns an empty object when nothing changed", () => {
    const original = makeDraft();
    expect(diffLineDraft(original, makeDraft())).toEqual({});
  });
});
