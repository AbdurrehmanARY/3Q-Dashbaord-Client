import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { workOrderService } from "../services/work-order-service";
import type { WorkOrderInput, DispatchInput } from "../types";

export const WORK_ORDER_KEYS = {
  all: ["work-orders"] as const,
  detail: (id: string) => ["work-orders", "detail", id] as const,
  filtered: (q: Record<string, unknown>) => ["work-orders", q] as const,
};

export function useWorkOrders(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: WORK_ORDER_KEYS.filtered(query ?? {}),
    queryFn: () => workOrderService.list(query),
    select: (res) => res.data,
  });
}

export function useWorkOrderDetail(id: string) {
  return useQuery({
    queryKey: WORK_ORDER_KEYS.detail(id),
    queryFn: () => workOrderService.get(id),
    enabled: !!id,
    select: (res) => res.data,
  });
}

export function useCreateWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: WorkOrderInput) => workOrderService.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: WORK_ORDER_KEYS.all });
      toast.success("Work order created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<WorkOrderInput> }) =>
      workOrderService.update(id, body),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: WORK_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: WORK_ORDER_KEYS.detail(variables.id) });
      toast.success("Work order updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/**
 * Completes dispatch. Also invalidates production orders — dispatching is the final step of
 * an order's life, and the dashboards surface it.
 */
export function useDispatchWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: DispatchInput }) =>
      workOrderService.dispatch(id, body),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: WORK_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: WORK_ORDER_KEYS.detail(variables.id) });
      qc.invalidateQueries({ queryKey: ["production-orders"] });
      toast.success("Order dispatched");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workOrderService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: WORK_ORDER_KEYS.all });
      toast.success("Work order deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
