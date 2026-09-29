import { api } from "@/lib/api";
import type {
  AvailableSources,
  BatchStage,
  BatchTrace,
  CreateConsumingBatchInput,
  CreatePrintingBatchInput,
  OrderFlow,
  ProductionBatch,
  RecordOutputInput,
  StageResources,
  UpdateBatchInput,
} from "../batch-types";

/**
 * Three separate resources — `/printing-batches`, `/cutting-batches`,
 * `/packaging-batches` — over one stage-parameterised backend. The stage in the path is
 * what stops a cutting endpoint from acting on a printing batch.
 */
const base = (stage: BatchStage) => `/production/${stage}-batches`;

export const batchService = {
  /* ---- reads ---- */
  listByLine: (stage: BatchStage, lineId: number) =>
    api.get<{ data: ProductionBatch[] }>(`${base(stage)}/lines/${lineId}`),

  /** What a new batch of this stage could draw its input from. */
  getSources: (stage: BatchStage, lineId: number) =>
    api.get<{ data: AvailableSources }>(`${base(stage)}/lines/${lineId}/sources`),

  /** Stage-appropriate machines and operators, with holds already applied. */
  getResources: (stage: BatchStage, lineId: number, batchId?: number) =>
    api.get<{ data: StageResources }>(
      `${base(stage)}/lines/${lineId}/resources`,
      batchId ? { batchId } : undefined
    ),

  get: (stage: BatchStage, batchId: number) =>
    api.get<{ data: ProductionBatch }>(`${base(stage)}/${batchId}`),

  getTrace: (stage: BatchStage, batchId: number) =>
    api.get<{ data: BatchTrace }>(`${base(stage)}/${batchId}/trace`),

  /** Every label type's position at every stage, for one order. */
  getOrderFlow: (orderId: string) =>
    api.get<{ data: OrderFlow }>(`/production/orders/${orderId}/flow`),

  /* ---- writes ---- */
  /**
   * Create a batch of ANY stage against its production line. Since migration 0025 every stage —
   * printing, weaving, cutting and packaging — belongs to exactly one line, so there is a single
   * create endpoint shape; the order-scoped routes the cutting/packaging dialogs used to POST to
   * are gone from the server.
   */
  create: (stage: BatchStage, lineId: number, body: CreatePrintingBatchInput | CreateConsumingBatchInput) =>
    api.post<{ data: ProductionBatch }>(`${base(stage)}/lines/${lineId}`, body),

  update: (stage: BatchStage, batchId: number, body: UpdateBatchInput) =>
    api.patch<{ data: ProductionBatch }>(`${base(stage)}/${batchId}`, body),

  start: (stage: BatchStage, batchId: number) =>
    api.post<{ data: ProductionBatch }>(`${base(stage)}/${batchId}/start`, {}),

  recordOutput: (stage: BatchStage, batchId: number, body: RecordOutputInput) =>
    api.post<{ data: ProductionBatch }>(`${base(stage)}/${batchId}/output`, body),

  complete: (stage: BatchStage, batchId: number) =>
    api.post<{ data: ProductionBatch }>(`${base(stage)}/${batchId}/complete`, {}),

  cancel: (stage: BatchStage, batchId: number) =>
    api.post<{ data: ProductionBatch }>(`${base(stage)}/${batchId}/cancel`, {}),

  remove: (stage: BatchStage, batchId: number) => api.delete(`${base(stage)}/${batchId}`),
};
