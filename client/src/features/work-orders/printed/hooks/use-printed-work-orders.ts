import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { printedWorkOrderService } from "@/features/work-orders/printed/printed-work-order-service";
import type { WorkOrderInput, DispatchInput } from "@/features/work-orders/types";

export const PRINTED_WORK_ORDER_KEYS = {
  all: ["work-orders", "printed"] as const,
  detail: (id: string) => ["work-orders", "printed", "detail", id] as const,
  list: (q: Record<string, unknown>) => ["work-orders", "printed", "list", q] as const,
};

export function usePrintedWorkOrders(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: PRINTED_WORK_ORDER_KEYS.list(query ?? {}),
    queryFn: () => printedWorkOrderService.list(query),
    select: (res) => res.data,
  });
}

export function usePrintedWorkOrderDetail(id: string) {
  return useQuery({
    queryKey: PRINTED_WORK_ORDER_KEYS.detail(id),
    queryFn: () => printedWorkOrderService.get(id),
    enabled: !!id,
    select: (res) => res.data,
  });
}

export function useCreatePrintedWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<WorkOrderInput, "wovenDetail">) => printedWorkOrderService.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRINTED_WORK_ORDER_KEYS.all });
      toast.success("Printed work order created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdatePrintedWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<Omit<WorkOrderInput, "wovenDetail">> }) =>
      printedWorkOrderService.update(id, body),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: PRINTED_WORK_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: PRINTED_WORK_ORDER_KEYS.detail(variables.id) });
      toast.success("Work order updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeletePrintedWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => printedWorkOrderService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRINTED_WORK_ORDER_KEYS.all });
      toast.success("Work order deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/**
 * Completes dispatch. Also invalidates production orders — dispatching is the final step of
 * an order's life, and the dashboards surface it.
 */
export function useDispatchPrintedWorkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: DispatchInput }) =>
      printedWorkOrderService.dispatch(id, body),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: PRINTED_WORK_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: PRINTED_WORK_ORDER_KEYS.detail(variables.id) });
      qc.invalidateQueries({ queryKey: ["production-orders"] });
      toast.success("Order dispatched");
    },
    onError: (err: any) => toast.error(err.message),
  });
}