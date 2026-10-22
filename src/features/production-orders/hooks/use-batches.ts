import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { batchService } from "../services/batch-service";
import type {
  BatchStage,
  CreateConsumingBatchInput,
  CreatePrintingBatchInput,
  RecordOutputInput,
  UpdateBatchInput,
} from "../batch-types";

export const BATCH_KEYS = {
  all: ["batches"] as const,
  line: (stage: BatchStage, lineId: number) => ["batches", stage, "line", lineId] as const,
  sources: (stage: BatchStage, lineId: number) => ["batches", stage, "sources", lineId] as const,
  resources: (stage: BatchStage, lineId: number) => ["batches", stage, "resources", lineId] as const,
  detail: (stage: BatchStage, batchId: number) => ["batches", stage, "detail", batchId] as const,
  trace: (stage: BatchStage, batchId: number) => ["batches", stage, "trace", batchId] as const,
  orderFlow: (orderId: string) => ["batches", "order-flow", orderId] as const,
};

/**
 * Every batch write moves figures at more than one stage — producing a roll changes what
 * the next stage can take, and completing a batch can hand rolls back to the previous one.
 * So mutations invalidate the whole batch tree plus the production-order overview, rather
 * than trying to patch individual caches.
 */
function useBatchMutation<TArgs, TResult>(
  fn: (args: TArgs) => Promise<TResult>,
  successMessage: (args: TArgs, result: TResult) => string,
  orderId?: string
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: (result, args) => {
      qc.invalidateQueries({ queryKey: BATCH_KEYS.all });
      qc.invalidateQueries({ queryKey: ["production-orders"] });
      const targetOrderId = (args as { orderId?: string })?.orderId ?? orderId;
      if (targetOrderId) qc.invalidateQueries({ queryKey: BATCH_KEYS.orderFlow(targetOrderId) });
      toast.success(successMessage(args, result));
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

/* ------------------------------------------------------------------ reads */

export function useLineBatches(stage: BatchStage, lineId: number | undefined) {
  return useQuery({
    queryKey: BATCH_KEYS.line(stage, lineId ?? 0),
    queryFn: () => batchService.listByLine(stage, lineId!),
    select: (res) => res.data,
    enabled: !!lineId,
  });
}

/**
 * The upstream batches a new batch could consume, with what each has left — from this LINE.
 *
 * Every stage is line-scoped since migration 0025, so cutting asks for its own line's printed
 * output and packaging for its own line's cut output; there is no order-wide variant to fall
 * back to. For a first stage the same endpoint answers `fromPlan: true` instead of sources.
 */
export function useBatchSources(stage: BatchStage, lineId: number | undefined, enabled = true) {
  return useQuery({
    queryKey: BATCH_KEYS.sources(stage, lineId ?? 0),
    queryFn: () => batchService.getSources(stage, lineId!),
    select: (res) => res.data,
    enabled: !!lineId && enabled,
  });
}

/**
 * The machines and operators this stage may use. Filtered on the server by stage AND by
 * live holds, so the dropdown can never offer a press another batch is running.
 */
export function useStageResources(stage: BatchStage, lineId: number | undefined, batchId?: number) {
  return useQuery({
    queryKey: [...BATCH_KEYS.resources(stage, lineId ?? 0), batchId ?? null],
    queryFn: () => batchService.getResources(stage, lineId!, batchId),
    select: (res) => res.data,
    enabled: !!lineId,
  });
}

export function useOrderFlow(orderId: string | undefined) {
  return useQuery({
    queryKey: BATCH_KEYS.orderFlow(orderId ?? ""),
    queryFn: () => batchService.getOrderFlow(orderId!),
    select: (res) => res.data,
    enabled: !!orderId,
  });
}

export function useBatchTrace(stage: BatchStage, batchId: number | undefined) {
  return useQuery({
    queryKey: BATCH_KEYS.trace(stage, batchId ?? 0),
    queryFn: () => batchService.getTrace(stage, batchId!),
    select: (res) => res.data,
    enabled: !!batchId,
  });
}

/* ----------------------------------------------------------------- writes */

/**
 * Create a batch — of ANY stage.
 *
 * Since migration 0025 every stage belongs to exactly one production line, so every batch is
 * POSTed against that line (`/production/:stage-batches/lines/:lineId`) — cutting and packaging
 * included. An order id is still accepted: callers hold one and the mutation needs it to know
 * which order's flow to invalidate. It can never stand in for the line, though — without a line
 * id this refuses to fire rather than posting to an order-scoped route the server no longer has.
 */
export function useCreateBatch(orderId?: string) {
  return useBatchMutation(
    (args: {
      stage: BatchStage;
      lineId?: number;
      orderId?: string;
      body: CreatePrintingBatchInput | CreateConsumingBatchInput;
    }) => {
      if (args.lineId === undefined) {
        throw new Error("Cannot create a batch: a production line is required");
      }
      return batchService.create(args.stage, args.lineId, args.body).then((r) => r.data);
    },
    (_args, batch) => `${batch.batchCode} created`,
    orderId
  );
}

export function useUpdateBatch(orderId?: string) {
  return useBatchMutation(
    ({ stage, batchId, body }: { stage: BatchStage; batchId: number; body: UpdateBatchInput }) =>
      batchService.update(stage, batchId, body).then((r) => r.data),
    (_args, batch) => `${batch.batchCode} updated`,
    orderId
  );
}

export function useStartBatch(orderId?: string) {
  return useBatchMutation(
    ({ stage, batchId }: { stage: BatchStage; batchId: number }) =>
      batchService.start(stage, batchId).then((r) => r.data),
    (_args, batch) => `${batch.batchCode} started`,
    orderId
  );
}

export function useRecordOutput(orderId?: string) {
  return useBatchMutation(
    ({ stage, batchId, body }: { stage: BatchStage; batchId: number; body: RecordOutputInput }) =>
      batchService.recordOutput(stage, batchId, body).then((r) => r.data),
    (_args, batch) => `${batch.batchCode}: ${Number(batch.producedRolls)} rolls produced`,
    orderId
  );
}

export function useCompleteBatch(orderId?: string) {
  return useBatchMutation(
    ({ stage, batchId }: { stage: BatchStage; batchId: number }) =>
      batchService.complete(stage, batchId).then((r) => r.data),
    (_args, batch) => `${batch.batchCode} completed`,
    orderId
  );
}

export function useCancelBatch(orderId?: string) {
  return useBatchMutation(
    ({ stage, batchId }: { stage: BatchStage; batchId: number }) =>
      batchService.cancel(stage, batchId).then((r) => r.data),
    (_args, batch) => `${batch.batchCode} cancelled`,
    orderId
  );
}

export function useDeleteBatch(orderId?: string) {
  return useBatchMutation(
    ({ stage, batchId }: { stage: BatchStage; batchId: number }) =>
      batchService.remove(stage, batchId),
    () => "Batch deleted",
    orderId
  );
}
