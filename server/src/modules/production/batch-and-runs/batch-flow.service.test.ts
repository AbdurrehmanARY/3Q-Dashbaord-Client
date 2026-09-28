import { describe, it, expect, vi, beforeEach } from "vitest";
import { BatchFlowService } from "./batch-flow.service";

/**
 * The repository/service layer is mocked so the service can be exercised as a pure unit
 * without a database. The two bugs reported were both in the service layer's assumptions
 * about the order-scoped stages (cutting/packaging), which carry no line — exactly the
 * boundary this mock set exercises.
 */
const mocks = vi.hoisted(() => ({
  batchFlowRepository: {
    findById: vi.fn(),
    findByOrder: vi.fn(),
    findByLine: vi.fn(),
    labelMixForOrder: vi.fn(),
  },
  wovenProductionRepository: {
    findLineById: vi.fn(),
    findOrderContext: vi.fn(),
    findLines: vi.fn(),
  },
  productionOrderRepository: {
    findLineById: vi.fn(),
    findById: vi.fn(),
    findLines: vi.fn(),
  },
  machineRepository: { findAll: vi.fn() },
  operatorRepository: { findAll: vi.fn() },
  userService: { assertActor: vi.fn() },
}));

/**
 * The repository layer is mocked so the service can be exercised as a pure unit without a
 * database. Nothing re-exports `lineRefOfBatch` any more: a batch's line is optional by design
 * (cutting and packaging have none), so a helper that threw for them would BE the bug.
 */
vi.mock("./batch-flow.repository", () => ({
  __esModule: true,
  batchFlowRepository: mocks.batchFlowRepository,
}));
vi.mock("../woven-production/woven-production.repository", () => ({
  __esModule: true,
  wovenProductionRepository: mocks.wovenProductionRepository,
}));
vi.mock("../production-orders/production-order.repository", () => ({
  __esModule: true,
  productionOrderRepository: mocks.productionOrderRepository,
}));
vi.mock("@modules/machines/machine.repository", () => ({
  __esModule: true,
  machineRepository: mocks.machineRepository,
}));
vi.mock("@modules/operators/operator.repository", () => ({
  __esModule: true,
  operatorRepository: mocks.operatorRepository,
}));
vi.mock("@modules/users/user.service", () => ({ __esModule: true, userService: mocks.userService }));

const service = () => new BatchFlowService();

/** A cutting batch as stored after 0023: order-scoped, both line columns NULL. */
const cuttingBatch = {
  id: 41,
  productionOrderId: 11,
  productionOrderLineId: null,
  wovenProductionLineId: null,
  stage: "cutting",
  batchNumber: 1,
  batchCode: "C-001",
  machineId: null,
  machineName: null,
  operatorId: null,
  operatorName: null,
  labelSize: null,
  assignedRolls: "5000.00",
  producedRolls: "0.00",
  wastedRolls: "0.00",
  consumedRolls: "0.00",
  availableRolls: "0.00",
  packagedQty: "0.00",
  status: "ASSIGNED",
  notes: null,
  startedAt: null,
  completedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as const;

describe("BatchFlowService.getBatch", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns a cutting batch instead of throwing 'not attached to a production line'", async () => {
    mocks.batchFlowRepository.findById.mockResolvedValue(cuttingBatch);

    // The regression: this used to call lineRefOfBatch(cutting) -> NotFoundError,
    // so the create/update/start/output/complete/cancel routes all answered 404 even
    // though the DB write had committed.
    const result = await service().getBatch(41);

    expect(result).toMatchObject({ id: 41, stage: "cutting", productionOrderId: 11 });
    // withEstimates only feches woven-time context for weaving batches; cutting needs none.
    expect(mocks.wovenProductionRepository.findOrderContext).not.toHaveBeenCalled();
  });
});

describe("BatchFlowService.getAvailableSources (order-scoped)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lists cutting sources order-wide, not down a single line", async () => {
    // resolveLine(id=10, kind=undefined) -> finds a woven line of order 11.
    mocks.wovenProductionRepository.findLineById.mockResolvedValue({
      id: 10,
      productionOrderId: 11,
      labelType: "XL Label",
    });
    mocks.productionOrderRepository.findLineById.mockResolvedValue(undefined);
    // The cutting picker must query the whole order, so two size-label weaving batches
    // (one exhausted, one with output) both surface — the exhausted one is filtered out.
    mocks.batchFlowRepository.findByOrder.mockResolvedValue([
      {
        id: 37,
        batchCode: "W-001",
        producedRolls: "3000.00",
        consumedRolls: "3000.00",
        availableRolls: "0.00",
        status: "COMPLETED",
        machineName: null,
        operatorName: null,
        stage: "weaving",
      },
      {
        id: 39,
        batchCode: "W-002",
        producedRolls: "4000.00",
        consumedRolls: "0.00",
        availableRolls: "4000.00",
        status: "COMPLETED",
        machineName: null,
        operatorName: null,
        stage: "weaving",
      },
    ]);

    const result = await service().getAvailableSources(10, "cutting");

    // The order-scoped query, not a line-scoped one.
    expect(mocks.batchFlowRepository.findByOrder).toHaveBeenCalledWith(11, "woven", "weaving");
    expect(mocks.batchFlowRepository.findByLine).not.toHaveBeenCalled();
    // Only the batch with available output is exposed; the exhausted one is dropped.
    expect(result.sources.map((s: { batchCode: string }) => s.batchCode)).toEqual(["W-002"]);
    expect(result.totalAvailable).toBe(4000);
  });
});

/* --------------------------------------------- order flow (order-scoped attribution) */

/** A batch row as the order-wide read returns it: decimals as strings, sources/mix attached. */
const batchRow = (over: Record<string, unknown>) => ({
  id: 1,
  productionOrderId: 22,
  productionOrderLineId: null as number | null,
  wovenProductionLineId: null as number | null,
  stage: "cutting",
  batchNumber: 1,
  batchCode: "C-001",
  machineId: null,
  machineName: null,
  operatorId: null,
  operatorName: null,
  labelSize: null,
  assignedRolls: "0.00",
  producedRolls: "0.00",
  wastedRolls: "0.00",
  consumedRolls: "0.00",
  availableRolls: "0.00",
  packagedQty: "0.00",
  status: "COMPLETED",
  notes: null,
  startedAt: null,
  completedAt: null,
  createdAt: new Date("2026-09-01T00:00:00Z"),
  updatedAt: new Date("2026-09-01T00:00:00Z"),
  labelType: null,
  sources: [],
  labelMix: [],
  ...over,
});

/** Order 22 on the floor: one woven label type, cutting batches fed entirely by it. */
function mockOrder22(batches: unknown[], mix: Array<[number, unknown[]]>) {
  mocks.productionOrderRepository.findById.mockResolvedValue({ id: 22, productType: "woven" });
  mocks.wovenProductionRepository.findLines.mockResolvedValue([
    { id: 15, labelType: "Size Label", quantity: 40000, sizes: [] },
  ]);
  mocks.batchFlowRepository.findByOrder.mockResolvedValue(batches);
  mocks.batchFlowRepository.labelMixForOrder.mockResolvedValue(new Map(mix));
}

/**
 * Regression (reported from the floor): the stage progress bars showed cutting at 0 while two
 * cutting batches sat on the floor, and the order could never reach "ready to complete".
 *
 * Cause: `getOrderFlow` summed cutting and packaging from the batches that carry the LINE's id.
 * Those stages are order-scoped — both line columns are NULL — so the sums were structurally 0,
 * and with them `packagedProduced` (which gates `readyForCompletion`).
 */
describe("BatchFlowService.getOrderFlow (order-scoped attribution)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("credits the cutting batches to the label type that fed them", async () => {
    mockOrder22(
      [
        batchRow({
          id: 30,
          stage: "weaving",
          batchCode: "W-001",
          wovenProductionLineId: 15,
          labelType: "Size Label",
          assignedRolls: "40000.00",
          producedRolls: "22000.00",
          availableRolls: "22000.00",
        }),
        batchRow({
          id: 41,
          batchCode: "C-001",
          assignedRolls: "12000.00",
          producedRolls: "12000.00",
          availableRolls: "12000.00",
        }),
        batchRow({
          id: 42,
          batchCode: "C-002",
          assignedRolls: "10000.00",
          producedRolls: "10000.00",
          availableRolls: "10000.00",
        }),
      ],
      [
        [41, [{ lineId: 15, labelType: "Size Label", rolls: 12000, share: 1 }]],
        [42, [{ lineId: 15, labelType: "Size Label", rolls: 10000, share: 1 }]],
      ]
    );

    const flow = await service().getOrderFlow(22);

    expect(flow.lines[0].cutProduced).toBe(22000);
    expect(flow.lines[0].cutAvailable).toBe(22000);
    expect(flow.lines[0].batchCounts.cutting).toBe(2);
    expect(flow.totals.cutProduced).toBe(22000);
    // 40 000 planned, nothing packaged yet — the banner stays off.
    expect(flow.readyForCompletion).toBe(false);
  });


  it("makes the ready-for-completion banner reachable once packaging covers the plan", async () => {
    mockOrder22(
      [
        batchRow({
          id: 30,
          stage: "weaving",
          batchCode: "W-001",
          wovenProductionLineId: 15,
          assignedRolls: "40000.00",
          producedRolls: "40000.00",
          availableRolls: "0.00",
        }),
        batchRow({
          id: 41,
          batchCode: "C-001",
          assignedRolls: "40000.00",
          producedRolls: "40000.00",
          availableRolls: "0.00",
        }),
        batchRow({
          id: 43,
          stage: "packaging",
          batchCode: "PK-001",
          assignedRolls: "40000.00",
          producedRolls: "40000.00",
          packagedQty: "40000.00",
        }),
      ],
      [
        [41, [{ lineId: 15, labelType: "Size Label", rolls: 40000, share: 1 }]],
        [43, [{ lineId: 15, labelType: "Size Label", rolls: 40000, share: 1 }]],
      ]
    );

    const flow = await service().getOrderFlow(22);

    expect(flow.lines[0].packagedProduced).toBe(40000);
    expect(flow.lines[0].packagedLabels).toBe(40000);
    expect(flow.lines[0].batchCounts.packaging).toBe(1);
    expect(flow.lines[0].cutProduced).toBe(40000);
    // Nothing else in the system can currently produce this trueness.
    expect(flow.readyForCompletion).toBe(true);
  });

  it("counts one cutting batch once across two label types", async () => {
    mocks.productionOrderRepository.findById.mockResolvedValue({ id: 22, productType: "woven" });
    mocks.wovenProductionRepository.findLines.mockResolvedValue([
      { id: 15, labelType: "Size Label", quantity: 40000, sizes: [] },
      { id: 16, labelType: "Care Label", quantity: 20000, sizes: [] },
    ]);
    mocks.batchFlowRepository.findByOrder.mockResolvedValue([
      batchRow({
        id: 41,
        batchCode: "C-001",
        assignedRolls: "10000.00",
        producedRolls: "22000.00",
        availableRolls: "22000.00",
      }),
    ]);
    // One batch drew 6000 from Size Label and 4000 from Care Label.
    mocks.batchFlowRepository.labelMixForOrder.mockResolvedValue(
      new Map([
        [
          41,
          [
            { lineId: 15, labelType: "Size Label", rolls: 6000, share: 0.6 },
            { lineId: 16, labelType: "Care Label", rolls: 4000, share: 0.4 },
          ],
        ],
      ])
    );

    const flow = await service().getOrderFlow(22);

    expect(flow.lines.map((l) => l.cutProduced)).toEqual([13200, 8800]);
    // Summed, the batch's output appears exactly once — never twice.
    expect(flow.totals.cutProduced).toBe(22000);
  });

  it("lists running order-scoped batches on the label types they feed", async () => {
    mockOrder22(
      [batchRow({ id: 41, batchCode: "C-001", status: "IN_PROGRESS", assignedRolls: "5000.00" })],
      [[41, [{ lineId: 15, labelType: "Size Label", rolls: 5000, share: 1 }]]]
    );

    const flow = await service().getOrderFlow(22);

    expect(flow.lines[0].running).toEqual(["C-001"]);
  });

  it("moves nothing when the attributed batch is cancelled", async () => {
    mockOrder22(
      [
        batchRow({
          id: 41,
          batchCode: "C-001",
          status: "CANCELLED",
          assignedRolls: "5000.00",
          producedRolls: "5000.00",
        }),
      ],
      [[41, [{ lineId: 15, labelType: "Size Label", rolls: 5000, share: 1 }]]]
    );

    const flow = await service().getOrderFlow(22);

    expect(flow.lines[0].cutProduced).toBe(0);
    expect(flow.lines[0].batchCounts.cutting).toBe(0);
    expect(flow.totals.cutProduced).toBe(0);
  });
});

