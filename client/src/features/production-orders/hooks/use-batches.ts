import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { batchService } from "../services/batch-service";
import { batchCreateTarget, batchScopeOf } from "../utils/batch-scope";
import type {
  BatchStage,
  CreateConsumingBatchInput,
  CreatePrintingBatchInput,
  LineKind,
  RecordOutputInput,
  UpdateBatchInput,
} from "../batch-types";

export const BATCH_KEYS = {
  all: ["batches"] as const,
  line: (stage: BatchStage, lineId: number) => ["batches", stage, "line", lineId] as const,
  sources: (stage: BatchStage, lineId: number) => ["batches", stage, "sources", lineId] as const,
  orderSources: (stage: BatchStage, orderId: string) => ["batches", stage, "order-sources", orderId] as const,
  resources: (stage: BatchStage, lineId: number) => ["batches", stage, "resources", lineId] as const,
  orderResources: (stage: BatchStage, orderId: string) => ["batches", stage, "order-resources", orderId] as const,
  detail: (stage: BatchStage, batchId: number) => ["batches", stage, "detail", batchId] as const,
  trace: (stage: BatchStage, batchId: number) => ["batches", stage, "trace", batchId] as const,
  orderFlow: (orderId: string) => ["batches", "order-flow", orderId] as const,
  orderBatches: (orderId: string) => ["batches", "order", orderId] as const,
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

/** The upstream batches a new batch could consume, with what each has left. */
export function useBatchSources(stage: BatchStage, lineId: number | undefined, enabled = true) {
  return useQuery({
    queryKey: BATCH_KEYS.sources(stage, lineId ?? 0),
    queryFn: () => batchService.getSources(stage, lineId!),
    select: (res) => res.data,
    enabled: !!lineId && enabled,
  });
}

/** The upstream batches an order-scoped batch (cutting/packaging) could consume. */
export function useOrderBatchSources(stage: BatchStage, orderId: string | undefined, enabled = true) {
  return useQuery({
    queryKey: BATCH_KEYS.orderSources(stage, orderId ?? ""),
    queryFn: () => batchService.getSourcesFromOrder(stage, orderId!),
    select: (res) => res.data,
    enabled: !!orderId && enabled,
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

/** Stage-appropriate machines and operators for order-scoped stages (cutting/packaging). */
export function useOrderStageResources(stage: BatchStage, orderId: string | undefined, batchId?: number) {
  return useQuery({
    queryKey: [...BATCH_KEYS.orderResources(stage, orderId ?? ""), batchId ?? null],
    queryFn: () => batchService.getResourcesFromOrder(stage, orderId!, batchId),
    select: (res) => res.data,
    enabled: !!orderId,
  });
}

/**
 * Resolves available sources for either a line-scoped first stage (Printing/Weaving)
 * or an order-scoped subsequent stage (Cutting/Packaging).
 */
export function useStageSources(
  orderId: string | undefined,
  stage: BatchStage,
  lineId: number | undefined,
  kind: LineKind,
  enabled = true
) {
  const lineScoped = batchScopeOf(kind, stage) === "line";
  const byLine = useBatchSources(stage, lineScoped ? lineId : undefined, lineScoped && enabled);
  const byOrder = useOrderBatchSources(stage, !lineScoped ? orderId : undefined, !lineScoped && enabled);
  return lineScoped ? byLine : byOrder;
}

/**
 * Resolves machines and operators for either a line-scoped first stage
 * or an order-scoped subsequent stage.
 */
export function useStageScopedResources(
  orderId: string | undefined,
  stage: BatchStage,
  lineId: number | undefined,
  kind: LineKind,
  batchId?: number
) {
  const lineScoped = batchScopeOf(kind, stage) === "line";
  const byLine = useStageResources(stage, lineScoped ? lineId : undefined, batchId);
  const byOrder = useOrderStageResources(stage, !lineScoped ? orderId : undefined, batchId);
  return lineScoped ? byLine : byOrder;
}

export function useOrderFlow(orderId: string | undefined) {
  return useQuery({
    queryKey: BATCH_KEYS.orderFlow(orderId ?? ""),
    queryFn: () => batchService.getOrderFlow(orderId!),
    select: (res) => res.data,
    enabled: !!orderId,
  });
}

/**
 * Every batch on an order — cutting and packaging included, since those stages belong to the
 * order rather than to a label type. Pass a `stage` to narrow it to one stage of the order.
 */
export function useOrderBatches(orderId: string | undefined, stage?: BatchStage, enabled = true) {
  return useQuery({
    queryKey: [...BATCH_KEYS.orderBatches(orderId ?? ""), stage ?? "all"],
    queryFn: () => batchService.listByOrder(orderId!, stage),
    select: (res) => res.data,
    enabled: !!orderId && enabled,
  });
}

/**
 * Batches of one stage, asked of the scope that owns it.
 *
 * The first stage of a workflow is per label type, so it is read from the line endpoint; cutting
 * and packaging belong to the ORDER — their batches carry no line at all — so they are read from
 * the order endpoint. Asking the line endpoint for an order-scoped stage can only ever answer
 * `[]`, which is what left those panels empty while the floor showed batches.
 *
 * Both hooks are always called (hook order stays stable); exactly one is enabled. Both resolve to
 * `ProductionBatch[]`, so callers do not care which answered.
 */
export function useStageBatches(
  orderId: string,
  stage: BatchStage,
  lineId: number,
  kind: LineKind
) {
  const lineScoped = batchScopeOf(kind, stage) === "line";
  const byLine = useLineBatches(stage, lineScoped ? lineId : undefined);
  const byOrder = useOrderBatches(orderId, lineScoped ? undefined : stage, !lineScoped);
  return lineScoped ? byLine : byOrder;
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
 * The stage decides the endpoint, and {@link batchCreateTarget} makes that call: printing and
 * weaving are created against their production line, while cutting and packaging are created
 * against the ORDER (`/production/orders/:stage-batches/:orderId`), because their batches carry no
 * line at all. Callers therefore hand over the ids they have (`lineId` from the board they render,
 * `orderId` from the page) rather than the URL — passing a line id for a cutting batch is a mistake
 * this function absorbs, not one it forwards into a request that would be refused.
 */
export function useCreateBatch(orderId?: string) {
  return useBatchMutation(
    (args: {
      stage: BatchStage;
      lineId?: number;
      orderId?: string;
      body: CreatePrintingBatchInput | CreateConsumingBatchInput;
    }) => {
      const target = batchCreateTarget(args.stage, { lineId: args.lineId, orderId: args.orderId ?? orderId });
      if (!target) {
        throw new Error("Cannot create a batch: a production line or an order is required");
      }
      if (target.scope === "order") {
        return batchService
          .createFromOrder(args.stage, target.orderId, args.body as CreateConsumingBatchInput)
          .then((r) => r.data);
      }
      return batchService.create(args.stage, target.lineId, args.body).then((r) => r.data);
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
