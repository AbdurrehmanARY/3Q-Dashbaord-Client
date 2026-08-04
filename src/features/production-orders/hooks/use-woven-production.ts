import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wovenProductionService } from "../services/woven-production-service";
import type {
  PlanWovenInput,
  WeavingInput,
  WovenCuttingInput,
  WovenPackagingInput,
} from "../woven-types";

export const WOVEN_KEYS = {
  all: ["woven-production"] as const,
  overview: (id: string) => ["woven-production", "overview", id] as const,
};

export function useWovenOverview(orderId: string, enabled = true) {
  return useQuery({
    queryKey: WOVEN_KEYS.overview(orderId),
    queryFn: () => wovenProductionService.getOverview(orderId),
    enabled: enabled && !!orderId,
    select: (res) => res.data,
  });
}

/**
 * Planning draws thread from stock, so the thread caches go stale with it. The work-order
 * caches too — raising production moves the sales order into `production`.
 */
function invalidateWoven(qc: ReturnType<typeof useQueryClient>, orderId: string) {
  qc.invalidateQueries({ queryKey: WOVEN_KEYS.overview(orderId) });
  qc.invalidateQueries({ queryKey: ["production-orders"] });
  qc.invalidateQueries({ queryKey: ["thread"] });
  qc.invalidateQueries({ queryKey: ["work-orders"] });
}

export function usePlanWovenLine(orderId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lineId, body }: { lineId: number | null; body: PlanWovenInput }) =>
      lineId
        ? wovenProductionService.updateLinePlan(orderId, lineId, body)
        : wovenProductionService.planLine(orderId, body),
    onSuccess: (_res, vars) => {
      invalidateWoven(qc, orderId);
      toast.success(vars.lineId ? "Plan updated — thread re-reserved" : "Planned — thread reserved");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteWovenLine(orderId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lineId: number) => wovenProductionService.deleteLine(lineId),
    onSuccess: () => {
      invalidateWoven(qc, orderId);
      toast.success("Line cancelled — thread returned to stock");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateWeaving(orderId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lineId, body }: { lineId: number; body: WeavingInput }) =>
      wovenProductionService.updateWeaving(lineId, body),
    onSuccess: () => {
      invalidateWoven(qc, orderId);
      toast.success("Weaving updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateWovenCutting(orderId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lineId, body }: { lineId: number; body: WovenCuttingInput }) =>
      wovenProductionService.updateCutting(lineId, body),
    onSuccess: () => {
      invalidateWoven(qc, orderId);
      toast.success("Cutting updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateWovenPackaging(orderId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lineId, body }: { lineId: number; body: WovenPackagingInput }) =>
      wovenProductionService.updatePackaging(lineId, body),
    onSuccess: () => {
      invalidateWoven(qc, orderId);
      toast.success("Packaging updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useReconcileWovenThreadStock(orderId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lineId, threads }: { lineId: number; threads: { id: number; remainingWeightKg: number }[] }) =>
      wovenProductionService.reconcileRemainingThreads(lineId, threads),
    onSuccess: () => {
      invalidateWoven(qc, orderId);
      toast.success("Remaining thread weight returned to inventory");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
