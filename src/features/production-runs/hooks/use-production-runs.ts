import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productionRunService } from "../services/production-run-service";
import type { LogProductionRunInput } from "../types";

export const PRODUCTION_RUN_KEYS = {
  summary: (saleOrderId: number) => ["production-summary", saleOrderId] as const,
};

export function useProductionSummary(saleOrderId?: number) {
  return useQuery({
    queryKey: PRODUCTION_RUN_KEYS.summary(saleOrderId ?? 0),
    queryFn: () => productionRunService.getSummary(saleOrderId as number),
    select: (res) => res.data,
    enabled: !!saleOrderId,
  });
}

export function useLogProductionRun(saleOrderId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: LogProductionRunInput) => productionRunService.log(saleOrderId, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCTION_RUN_KEYS.summary(saleOrderId) });
      toast.success("Production run logged");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
