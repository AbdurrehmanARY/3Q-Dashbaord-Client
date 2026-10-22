import { describe, expect, it } from "vitest";
import type { BatchSourceOption, ProductionBatch, UpdateBatchInput } from "../batch-types";
import {
  buildBatchUpdateBody,
  editFloor,
  editSourceCap,
  firstStageCap,
  mergeEditSources,
  ownEdgesOf,
  type BatchEditValues,
  validateBatchEdit,
} from "./batch-edit";

/** A fully-populated batch; the production bits are what the edit rules read. */
function makeBatch(over: Partial<ProductionBatch> = {}): ProductionBatch {
  return {
    id: 1,
    productionOrderLineId: 10,
    wovenProductionLineId: null,
    stage: "printing",
    batchNumber: 1,
    batchCode: "P-001",
    machineId: 5,
    machineName: "Press 5",
    operatorId: 9,
    operatorName: "Ana",
    labelSize: null,
    assignedRolls: "50",
    producedRolls: "10",
    wastedRolls: "2",
    wasteReason: null,
    consumedRolls: "0",
    availableRolls: "40",
    packagedQty: "0",
    status: "PLANNED",
    notes: "orig notes",
    startedAt: null,
    completedAt: null,
    createdAt: "2026-09-01T00:00:00Z",
    updatedAt: "2026-09-01T00:00:00Z",
    sources: [
      { sourceBatchId: 2, sourceBatchCode: "PLAN", sourceRolls: 50, rolls: 50 },
    ],
    estimatedMinutes: 0,
    ...over,
  } as ProductionBatch;
}

function src(id: number, opts: Partial<BatchSourceOption> = {}): BatchSourceOption {
  return {
    sourceBatchId: id,
    batchCode: `P-${id}`,
    producedRolls: 100,
    availableRolls: 0,
    machineName: null,
    operatorName: null,
    status: "COMPLETED",
    ...opts,
  };
}

function baseValues(over: Partial<BatchEditValues> = {}): BatchEditValues {
  return {
    batch: makeBatch(),
    kind: "printed",
    fromPlan: true,
    assignedRolls: "50",
    allocations: {},
    machineId: "5",
    operatorId: "9",
    labelSize: "",
    notes: "orig notes",
    requiresMachine: true,
    sizeTracking: [],
    remainingPlanned: 30,
    sources: [],
    ...over,
  };
}

describe("editFloor", () => {
  it("adds produced and wasted", () => {
    const b = makeBatch({ producedRolls: "10", wastedRolls: "2" });
    expect(editFloor(b)).toBe(12);
  });
});

describe("ownEdgesOf", () => {
  it("maps source ids to whole rolls", () => {
    const b = makeBatch({ sources: [src(2), src(3)] as any });
    // reuse the edge type via the batch.sources
    b.sources = [
      { sourceBatchId: 2, sourceBatchCode: "P-002", rolls: "30", producedRolls: 0 as never, availableRolls: 0, machineName: null },
      { sourceBatchId: 3, sourceBatchCode: "P-003", rolls: "20", producedRolls: 0 as never, availableRolls: 0, machineName: null },
    ] as any;
    expect(ownEdgesOf(b)).toEqual({ 2: 30, 3: 20 });
  });
});

describe("editSourceCap", () => {
  it("adds the batch's own hold back onto live availability", () => {
    const own = { 1: 30 };
    expect(editSourceCap(src(1, { availableRolls: 10 }), own)).toBe(40);
    // a source the batch does not hold is capped at live availability alone
    expect(editSourceCap(src(7, { availableRolls: 5 }), own)).toBe(5);
  });
});

describe("firstStageCap", () => {
  it("is the plan left plus the batch's own assignment", () => {
    const b = makeBatch({ assignedRolls: "50" });
    expect(firstStageCap(30, b)).toBe(80);
    // reported remainingPlanned that already counts this batch must not double-add
    expect(firstStageCap(0, b)).toBe(50);
  });
});

describe("mergeEditSources", () => {
  it("re-adds held sources the query hid, and never duplicates", () => {
    const b = makeBatch();
    b.sources = [
      { sourceBatchId: 2, sourceBatchCode: "P-002", rolls: "30" },
      { sourceBatchId: 5, sourceBatchCode: "P-005", rolls: "20" },
    ] as any;
    // query returns only id 5 (id 2 was hidden — zero availability)
    const options = [src(5, { availableRolls: 40 })];
    const merged = mergeEditSources(options, b);
    expect(merged.map((m) => m.sourceBatchId)).toEqual([2, 5]);
    expect(merged.find((m) => m.sourceBatchId === 2)?.batchCode).toBe("P-002");
    expect(merged.find((m) => m.sourceBatchId === 5)?.availableRolls).toBe(40);
  });
});

describe("validateBatchEdit (first stage)", () => {
  it("accepts an assignment within floor and cap", () => {
    const v = baseValues({ assignedRolls: "40", remainingPlanned: 30 });
    // floor 12, cap 80
    expect(validateBatchEdit(v)).toBeNull();
  });

  it("rejects an empty assignment", () => {
    const v = baseValues({ assignedRolls: "" });
    expect(validateBatchEdit(v)).toBe("Enter how many rolls to assign");
  });

  it("rejects a non-integer assignment", () => {
    const v = baseValues({ assignedRolls: "3.5" });
    expect(validateBatchEdit(v)).toMatch(/whole units/);
  });

  it("rejects reducing below what was already produced or wasted", () => {
    const b = makeBatch({ producedRolls: "10", wastedRolls: "2" });
    const v = baseValues({ batch: b, assignedRolls: "11", remainingPlanned: 0 });
    // floor = 12
    expect(validateBatchEdit(v)).toMatch(/Cannot go below 12/);
  });

  it("rejects assigning beyond the plan ceiling", () => {
    const v = baseValues({ assignedRolls: "81", remainingPlanned: 30 });
    // cap = 30 + 50 = 80
    expect(validateBatchEdit(v)).toMatch(/Only 80 unassigned/);
  });

  it("rejects leaving the size blank on a size label", () => {
    const v = baseValues({ labelSize: "", sizeTracking: [{ size: "XL", remaining: 50, planned: 50 } as any] });
    expect(validateBatchEdit(v)).toBe("Select which planned size this batch weaves");
  });

  it("accepts the size when chosen", () => {
    const v = baseValues({ labelSize: "XL", sizeTracking: [{ size: "XL", remaining: 50, planned: 50 } as any] });
    expect(validateBatchEdit(v)).toBeNull();
  });
});

describe("validateBatchEdit (consuming stage)", () => {
  const consumingValues = (over: Partial<BatchEditValues>) => {
    const b = makeBatch({
      stage: "cutting",
      batchCode: "C-001",
      producedRolls: "25",
      wastedRolls: "0",
      sources: [
        { sourceBatchId: 2, sourceBatchCode: "P-002", rolls: "30" },
        { sourceBatchId: 3, sourceBatchCode: "P-003", rolls: "20" },
      ],
    } as any);
    return baseValues({
      batch: b,
      fromPlan: false,
      kind: "printed",
      requiresMachine: true,
      machineId: "7",
      operatorId: "9",
      allocations: { 2: "30", 3: "20" },
      sources: [
        src(2, { availableRolls: 10 }), // cap = 10 + 30 = 40
        src(3, { availableRolls: 40 }), // cap = 40 + 20 = 60
      ],
      ...over,
    });
  };

  it("accepts the current allocations (total 50 >= floor 25)", () => {
    expect(validateBatchEdit(consumingValues({}))).toBeNull();
  });

  it("rejects taking more than a source's cap", () => {
    const v = consumingValues({ allocations: { 2: "41", 3: "" } });
    expect(validateBatchEdit(v)).toMatch(/P-2 has only 40/);
  });

  it("rejects dropping every source", () => {
    const v = consumingValues({ allocations: { 2: "", 3: "" } });
    expect(validateBatchEdit(v)).toBe("Keep at least one source batch");
  });

  it("rejects reducing input below the floor", () => {
    const v = consumingValues({ allocations: { 2: "5", 3: "" } });
    // total 5 < floor 25
    expect(validateBatchEdit(v)).toMatch(/Cannot reduce the input below 25/);
  });
});

describe("validateBatchEdit (resources)", () => {
  it("rejects a missing machine when one is required", () => {
    expect(validateBatchEdit(baseValues({ machineId: "" }))).toBe("Select a machine");
  });
  it("rejects a missing operator always", () => {
    expect(validateBatchEdit(baseValues({ operatorId: "" }))).toBe("Select an operator");
  });
  it("does not require a machine for packaging", () => {
    const b = makeBatch({ stage: "packaging", machineId: null, operatorId: 9 });
    expect(
      validateBatchEdit(
        baseValues({
          batch: b,
          fromPlan: false,
          requiresMachine: false,
          machineId: "",
          allocations: { 2: "15" },
        sources: [src(2, { availableRolls: 0 })],
        })
      )
    ).toBeNull();
  });
});

describe("buildBatchUpdateBody", () => {
  it("builds a first-stage body", () => {
    const body = buildBatchUpdateBody(baseValues({ assignedRolls: "40", labelSize: "", notes: " hi " })) as UpdateBatchInput;
    expect(body).toEqual({
      assignedRolls: 40,
      machineId: 5,
      operatorId: 9,
      notes: "hi",
      labelSize: null,
    });
  });

  it("builds a consuming body, dropping zeroed sources", () => {
    const b = makeBatch({
      stage: "cutting",
      sources: [
        { sourceBatchId: 2, sourceBatchCode: "P-002", rolls: "30" },
        { sourceBatchId: 3, sourceBatchCode: "P-003", rolls: "20" },
      ],
    } as any);
    const body = buildBatchUpdateBody(
      baseValues({
        batch: b,
        fromPlan: false,
        requiresMachine: true,
        machineId: "7",
        operatorId: "9",
        notes: "",
        allocations: { 2: "30", 3: "0" },
        sources: [
          src(2, { availableRolls: 10 }),
          src(3, { availableRolls: 40 }),
        ],
      })
    ) as UpdateBatchInput;
    expect(body.sources).toEqual([{ sourceBatchId: 2, rolls: 30 }]);
    expect(body).toEqual({
      sources: [{ sourceBatchId: 2, rolls: 30 }],
      machineId: 7,
      operatorId: 9,
      notes: null,
    });
  });
});
