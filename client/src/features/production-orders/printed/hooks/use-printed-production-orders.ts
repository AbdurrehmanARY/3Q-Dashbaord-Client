import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { printedProductionOrderService } from "../services/printed-production-order-service";
import { productionOrderService } from "../../services/production-order-service";

export const PRINTED_PRODUCTION_ORDER_KEYS = {
  all: ["production-orders", "printed"] as const,
  list: (q: Record<string, unknown>) => ["production-orders", "printed", "list", q] as const,
  detail: (id: string) => ["production-orders", "printed", "detail", id] as const,
};

export function usePrintedProductionOrders() {
  return useQuery({
    queryKey: PRINTED_PRODUCTION_ORDER_KEYS.list({}),
    queryFn: () => printedProductionOrderService.list(),
    select: (res) => res.data,
  });
}

export function usePrintedProductionOrderDetail(id: string) {
  return useQuery({
    queryKey: PRINTED_PRODUCTION_ORDER_KEYS.detail(id),
    queryFn: () => printedProductionOrderService.get(id),
    enabled: !!id,
    select: (res) => ({ data: res.data, lines: res.lines }),
  });
}

/**
 * Delete delegates to the original `/production-orders/:id` endpoint which handles
 * cleanup (releasing reserved material stock). Invalidates both the printed cache
 * and the combined production-orders cache so dashboards stay consistent.
 */
export function useDeletePrintedProductionOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => productionOrderService.remove(String(id)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRINTED_PRODUCTION_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: ["production-orders"] });
      qc.invalidateQueries({ queryKey: ["work-orders"] });
      toast.success("Printed production order deleted — materials released");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
