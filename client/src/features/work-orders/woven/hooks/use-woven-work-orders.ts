import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wovenWorkOrderService } from "@/features/work-orders/woven/woven-work-order-service";
import type { WorkOrderInput, DispatchInput } from "@/features/work-orders/types";

export const WOVEN_WORK_ORDER_KEYS = {
  all: ["work-orders", "woven"] as const,
  detail: (id: string) => ["work-orders", "woven", "detail", id] as const,
  list: (q: Record<string, unknown>) => ["work-orders", "woven", "list", q] as const,
};

export function useWovenWorkOrders(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: WOVEN_WORK_ORDER_KEYS.list(query ?? {}),
    queryFn: () => wovenWorkOrderService.list(query),
    select: (res) => res.data,
  });
}

export function useWovenWorkOrderDetail(id: string) {
  return useQuery({
    queryKey: WOVEN_WORK_ORDER_KEYS.detail(id),
    queryFn: () => wovenWorkOrderService.get(id),
    enabled: !!id,
    select: (res) => res.data,
  });
}

export function useCreateWovenWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: WorkOrderInput) => wovenWorkOrderService.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: WOVEN_WORK_ORDER_KEYS.all });
      toast.success("Woven work order created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateWovenWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<WorkOrderInput> }) =>
      wovenWorkOrderService.update(id, body),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: WOVEN_WORK_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: WOVEN_WORK_ORDER_KEYS.detail(variables.id) });
      toast.success("Work order updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteWovenWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => wovenWorkOrderService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: WOVEN_WORK_ORDER_KEYS.all });
      toast.success("Work order deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/**
 * Completes dispatch. Also invalidates production orders — dispatching is the final step of
 * an order's life, and the dashboards surface it.
 */
export function useDispatchWovenWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: DispatchInput }) =>
      wovenWorkOrderService.dispatch(id, body),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: WOVEN_WORK_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: WOVEN_WORK_ORDER_KEYS.detail(variables.id) });
      qc.invalidateQueries({ queryKey: ["production-orders"] });
      toast.success("Order dispatched");
    },
    onError: (err: any) => toast.error(err.message),
  });
}