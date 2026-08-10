import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productionOrderService } from "../services/production-order-service";
import { patchOverviewLine } from "../utils/line-draft";
import type {
  AssignResourcesInput,
  CreateProductionOrderInput,
  IssueRollsInput,
  PlanLineInput,
  ProductionOrderOverview,
  ProductionStage,
  StageProgressInput,
  TransferRollsInput,
  UpdateLineFullInput,
  ReconcileInput,
} from "../types";

export const PRODUCTION_ORDER_KEYS = {
  all: ["production-orders"] as const,
  list: (q: Record<string, unknown>) => ["production-orders", "list", q] as const,
  detail: (id: string) => ["production-orders", "detail", id] as const,
  overview: (id: string) => ["production-orders", "overview", id] as const,
  events: (id: string) => ["production-orders", "events", id] as const,
  lineEvents: (lineId: string) => ["production-orders", "line-events", lineId] as const,
  lineIssuances: (lineId: string) => ["production-orders", "line-issuances", lineId] as const,
  eligible: ["production-orders", "eligible-sales-orders"] as const,
  availableResources: (scope: Record<string, unknown>) =>
    ["production-orders", "available-resources", scope] as const,
};

/**
 * Machines and operators free to be assigned. Scoped to the caller's own line or order so
 * whatever it already holds stays selectable rather than vanishing from its own dropdown.
 */
export function useAvailableResources(scope?: {
  lineId?: number;
  orderId?: number;
  /** Narrows operators to those trained for this line (the type itself plus `both`). */
  productType?: "printed" | "woven";
}) {
  return useQuery({
    queryKey: PRODUCTION_ORDER_KEYS.availableResources(scope ?? {}),
    queryFn: () => productionOrderService.getAvailableResources(scope),
    select: (res) => res.data,
  });
}

export function useProductionOrders(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: PRODUCTION_ORDER_KEYS.list(query ?? {}),
    queryFn: () => productionOrderService.list(query),
    select: (res) => res.data,
  });
}

export function useProductionOrderDetail(id: string) {
  return useQuery({
    queryKey: PRODUCTION_ORDER_KEYS.detail(id),
    queryFn: () => productionOrderService.get(id),
    enabled: !!id,
    select: (res) => res.data,
  });
}

export function useProductionOrderOverview(id: string) {
  return useQuery({
    queryKey: PRODUCTION_ORDER_KEYS.overview(id),
    queryFn: () => productionOrderService.getOverview(id),
    enabled: !!id,
    select: (res) => res.data,
  });
}

export function useEligibleSalesOrders(enabled = true) {
  return useQuery({
    queryKey: PRODUCTION_ORDER_KEYS.eligible,
    queryFn: () => productionOrderService.listEligibleSalesOrders(),
    enabled,
    select: (res) => res.data,
  });
}

export function useProductionOrderEvents(id: string) {
  return useQuery({
    queryKey: PRODUCTION_ORDER_KEYS.events(id),
    queryFn: () => productionOrderService.listOrderEvents(id),
    enabled: !!id,
    select: (res) => res.data,
  });
}

export function useCreateProductionOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateProductionOrderInput) => productionOrderService.create(body),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.all });
      toast.success(`Production order ${res.data.productionNumber} created`);
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateProductionOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: { notes?: string; status?: "planned" | "production" | "complete" } }) =>
      productionOrderService.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: ["work-orders"] });
      toast.success("Production order updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/** Deleting an order releases its rolls back to stock and reopens the sales order. */
export function useDeleteProductionOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productionOrderService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: ["inventory"] });
      qc.invalidateQueries({ queryKey: ["work-orders"] });
      toast.success("Production order deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/**
 * Planning a label type draws its assigned rolls from inventory and reserves its
 * printing machine and operator, so inventory, resource availability and the work order
 * status all go stale with it.
 */
function invalidatePlanning(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.all });
  qc.invalidateQueries({ queryKey: ["inventory"] });
  qc.invalidateQueries({ queryKey: ["work-orders"] });
  qc.invalidateQueries({ queryKey: ["machines"] });
  qc.invalidateQueries({ queryKey: ["operators"] });
}

/** Plans ONE label type and reserves its material, printing machine and operator. */
export function usePlanLine(orderId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: PlanLineInput) => productionOrderService.planLine(orderId, body),
    onSuccess: (res) => {
      invalidatePlanning(qc);
      toast.success(`${res.data.labelType} planned — resources reserved`);
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/** Re-plans ONE label type, settling its inventory draw and reservation. */
export function useUpdateLinePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lineId, body }: { lineId: string; body: PlanLineInput }) =>
      productionOrderService.updateLinePlan(lineId, body),
    onSuccess: (res) => {
      invalidatePlanning(qc);
      toast.success(`${res.data.labelType} updated`);
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/** Cancels ONE label type, releasing its rolls and freeing its machine and operator. */
export function useDeleteLine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lineId: string) => productionOrderService.deleteLine(lineId),
    onSuccess: () => {
      invalidatePlanning(qc);
      toast.success("Label type cancelled — resources released");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/**
 * All line mutations invalidate the whole production-orders tree: a single line change
 * moves the order rollups and can flip the order status, so partial invalidation would
 * leave the dashboard showing stale totals.
 */
function useLineMutation<TVars>(
  orderId: string,
  mutationFn: (vars: TVars) => Promise<unknown>,
  successMessage: string
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.overview(orderId) });
      toast.success(successMessage);
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useAssignLineResources(orderId: string) {
  return useLineMutation<{ lineId: string; body: AssignResourcesInput }>(
    orderId,
    ({ lineId, body }) => productionOrderService.assignResources(lineId, body),
    "Assignment saved"
  );
}

export function useUpdateStageProgress(orderId: string) {
  return useLineMutation<{ lineId: string; stage: ProductionStage; body: StageProgressInput }>(
    orderId,
    ({ lineId, stage, body }) => productionOrderService.updateStageProgress(lineId, stage, body),
    "Progress updated"
  );
}

/**
 * Inline row edit for the Production Progress table. Optimistically patches the cached
 * overview the instant Save is clicked, rolls back on error, and always refetches on
 * settle so machine/operator names (resolved server-side) catch up within one round trip.
 */
export function useUpdateLineFull(orderId: string) {
  const qc = useQueryClient();
  const queryKey = PRODUCTION_ORDER_KEYS.overview(orderId);

  return useMutation({
    mutationFn: ({ lineId, body }: { lineId: string; body: UpdateLineFullInput }) =>
      productionOrderService.updateLineFull(lineId, body),
    onMutate: async ({ lineId, body }) => {
      await qc.cancelQueries({ queryKey });
      const previous = qc.getQueryData<{ data: ProductionOrderOverview }>(queryKey);
      if (previous) {
        qc.setQueryData(queryKey, {
          ...previous,
          data: patchOverviewLine(previous.data, Number(lineId), body),
        });
      }
      return { previous };
    },
    onError: (err: any, _vars, context) => {
      if (context?.previous) qc.setQueryData(queryKey, context.previous);
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Row saved");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey });
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.all });
      // Progress can complete the order, which completes the sales order too.
      qc.invalidateQueries({ queryKey: ["work-orders"] });
    },
  });
}

export function useTransferRolls(orderId: string) {
  return useLineMutation<{ lineId: string; body: TransferRollsInput }>(
    orderId,
    ({ lineId, body }) => productionOrderService.transferRolls(lineId, body),
    "Rolls transferred"
  );
}

export function useLineIssuances(lineId: string) {
  return useQuery({
    queryKey: PRODUCTION_ORDER_KEYS.lineIssuances(lineId),
    queryFn: () => productionOrderService.listLineIssuances(lineId),
    enabled: !!lineId,
    select: (res) => res.data,
  });
}

/** Issuing material debits inventory, so the inventory cache is invalidated too. */
export function useIssueRolls(orderId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lineId, body }: { lineId: string; body: IssueRollsInput }) =>
      productionOrderService.issueRolls(lineId, body),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.overview(orderId) });
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.lineIssuances(vars.lineId) });
      qc.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Rolls issued from inventory");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useReconcileLine(orderId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lineId, body }: { lineId: string; body: ReconcileInput }) =>
      productionOrderService.reconcileLine(lineId, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: PRODUCTION_ORDER_KEYS.overview(orderId) });
      qc.invalidateQueries({ queryKey: ["inventory"] });
      qc.invalidateQueries({ queryKey: ["inventory-rolls"] });
      toast.success("Stock reconciled — extra rolls & weight returned to main inventory");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
