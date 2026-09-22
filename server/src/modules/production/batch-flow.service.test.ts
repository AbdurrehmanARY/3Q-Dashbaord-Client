import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotFoundError } from "@shared/errors/ApiError";
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
  },
  wovenProductionRepository: {
    findLineById: vi.fn(),
    findOrderContext: vi.fn(),
  },
  productionOrderRepository: {
    findLineById: vi.fn(),
    findById: vi.fn(),
  },
  machineRepository: { findAll: vi.fn() },
  operatorRepository: { findAll: vi.fn() },
  userService: { assertActor: vi.fn() },
}));

vi.mock("./batch-flow.repository", () => ({
  __esModule: true,
  batchFlowRepository: mocks.batchFlowRepository,
  // Re-exported so the type-only import still resolves for any caller; the throwing
  // variant is preserved to assert the regression — the service must NOT call it anymore.
  lineRefOfBatch: (b: { productionOrderLineId: number | null; wovenProductionLineId: number | null }) => {
    if (b.wovenProductionLineId != null) return { kind: "woven", id: b.wovenProductionLineId };
    if (b.productionOrderLineId != null) return { kind: "printed", id: b.productionOrderLineId };
    const err = new NotFoundError("Batch is not attached to a production line");
    throw err;
  },
  lineRefOfBatchOrNull: (b: { productionOrderLineId: number | null; wovenProductionLineId: number | null }) =>
    b.wovenProductionLineId != null
      ? { kind: "woven", id: b.wovenProductionLineId }
      : b.productionOrderLineId != null
        ? { kind: "printed", id: b.productionOrderLineId }
        : null,
}));
vi.mock("./woven-production.repository", () => ({
  __esModule: true,
  wovenProductionRepository: mocks.wovenProductionRepository,
}));
vi.mock("./production-order.repository", () => ({
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
