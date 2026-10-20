import { describe, it, expect } from "vitest";
import { cascadeDraft, validateLineDraft, diffLineDraft, patchOverviewLine, type LineDraft } from "./line-draft";
import type { LinePlanning, ProductionOrderOverview } from "../types";

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
  rollLength: 200,
  requiredRolls: 2,
  extraRolls: 0,
  totalRolls: 10,
  totalWeight: 0,
  printingMachineId: null,
  printingOperatorId: null,
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
      makeDraft({
        printedRolls: 8,
        sentToCuttingRolls: 6,
        cutRolls: 4,
        sentToPackagingRolls: 2,
        packagedRolls: 1,
        // Rolls cannot reach cutting without the pair that runs it — see the guard below.
        cuttingMachineId: 2,
        cuttingOperatorId: 2,
      }),
      planning
    );
    expect(errors).toEqual({});
  });

  it("requires a cutting machine and operator once rolls are sent to cutting", () => {
    const errors = validateLineDraft(makeDraft({ printedRolls: 5, sentToCuttingRolls: 5 }), planning);
    expect(errors.cuttingMachineId).toBeTruthy();
    expect(errors.cuttingOperatorId).toBeTruthy();
    expect(errors.sentToCuttingRolls).toBeTruthy();
  });

  it("does not demand cutting resources while nothing is sent to cutting", () => {
    const errors = validateLineDraft(makeDraft({ printedRolls: 5 }), planning);
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

/* A minimal overview line is enough to exercise the optimistic progress math; the
 * server is the source of the names/avatars, so the patch only touches counters. */
function makeOverview(planning: LinePlanning, rolls: { printed?: number; packaged?: number } = {}): ProductionOrderOverview {
  return {
    lines: [
      {
        id: 1,
        labelType: "Care Label",
        status: "pending" as never,
        notes: null,
        readiness: { canStart: true, missing: [] },
        planning,
        material: {
          materialCode: "MAT-1",
          description: null,
          materialType: null,
          weightPerRoll: null,
          assignedRolls: 0,
          issuedRolls: 0,
          pendingIssue: 0,
          assignedWeight: null,
        },
        printing: { machineId: 1, machineName: null, operatorId: 1, operatorName: null, operatorAvatarUrl: null, printedRolls: 0, progressPct: 0, completedAt: null },
        cutting: { machineId: null, machineName: null, operatorId: null, operatorName: null, operatorAvatarUrl: null, sentToCuttingRolls: 0, cutRolls: 0, progressPct: 0, completedAt: null },
        packaging: { operatorId: null, operatorName: null, operatorAvatarUrl: null, sentToPackagingRolls: 0, packagedRolls: 0, packagedQty: 0, progressPct: 0, completedAt: null },
        liveProgress: { totalRolls: planning.totalRolls, printedRolls: 0, waitingForCutting: 0, sentToCuttingRolls: 0, cutRolls: 0, waitingForPackaging: 0, sentToPackagingRolls: 0, packagedRolls: 0, completionPct: 0 },
      } as never,
    ],
  } as unknown as ProductionOrderOverview;
}

describe("patchOverviewLine", () => {
  it("measures progress against required rolls, not total", () => {
    const overview = makeOverview(planning); // requiredRolls 2, totalRolls 10
    const patched = patchOverviewLine(overview, 1, { printedRolls: 1 });
    // 1 of 2 required → 50%
    expect(patched.lines[0].printing.progressPct).toBe(50);
  });

  it("caps progress at 100% when producing past required", () => {
    const overview = makeOverview(planning);
    const patched = patchOverviewLine(overview, 1, { printedRolls: 5 }); // 5 of 2 required → capped
    expect(patched.lines[0].printing.progressPct).toBe(100);
  });

  it("marks live completion at 100% once packaged meets required", () => {
    const overview = makeOverview(planning); // requiredRolls 2
    const patched = patchOverviewLine(overview, 1, { packagedRolls: 2 });
    expect(patched.lines[0].liveProgress.completionPct).toBe(100);
  });

  it("falls back to totalRolls when requiredRolls is 0", () => {
    const overview = makeOverview({ ...planning, requiredRolls: 0 }); // target = totalRolls 10
    const patched = patchOverviewLine(overview, 1, { printedRolls: 5 });
    expect(patched.lines[0].printing.progressPct).toBe(50);
  });
});
