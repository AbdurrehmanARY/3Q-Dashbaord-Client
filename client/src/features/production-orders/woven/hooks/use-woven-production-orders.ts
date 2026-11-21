import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wovenProductionOrderService } from "../services/woven-production-order-service";
import { productionOrderService } from "../../services/production-order-service";

export const WOVEN_PRODUCTION_ORDER_KEYS = {
  all: ["production-orders", "woven"] as const,
  list: (q: Record<string, unknown>) => ["production-orders", "woven", "list", q] as const,
  detail: (id: string) => ["production-orders", "woven", "detail", id] as const,
};

export function useWovenProductionOrders() {
  return useQuery({
    queryKey: WOVEN_PRODUCTION_ORDER_KEYS.list({}),
    queryFn: () => wovenProductionOrderService.list(),
    select: (res) => res.data,
  });
}

export function useWovenProductionOrderDetail(id: string) {
  return useQuery({
    queryKey: WOVEN_PRODUCTION_ORDER_KEYS.detail(id),
    queryFn: () => wovenProductionOrderService.get(id),
    enabled: !!id,
    select: (res) => ({ data: res.data, lines: res.lines }),
  });
}

/**
 * Delete delegates to the original `/production-orders/:id` endpoint which handles
 * cleanup (releasing reserved material stock). Invalidates both the woven cache
 * and the combined production-orders cache so dashboards stay consistent.
 */
export function useDeleteWovenProductionOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => productionOrderService.remove(String(id)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: WOVEN_PRODUCTION_ORDER_KEYS.all });
      qc.invalidateQueries({ queryKey: ["production-orders"] });
      qc.invalidateQueries({ queryKey: ["work-orders"] });
      toast.success("Woven production order deleted — materials released");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
