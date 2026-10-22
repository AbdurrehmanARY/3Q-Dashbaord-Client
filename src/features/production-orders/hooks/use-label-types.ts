import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { LabelType } from "@/features/label-types/types";

export const productionOrderLabelTypeKeys = {
  all: ["production-order-label-types"] as const,
  list: (type: "woven" | "printed") => [...productionOrderLabelTypeKeys.all, type] as const,
};

export function useLabelTypesForPlanning(type: "woven" | "printed") {
  return useQuery({
    queryKey: productionOrderLabelTypeKeys.list(type),
    queryFn: () => api.get<{ data: LabelType[] }>("/label-types", { category: type, activeOnly: true }),
    select: (res) => res.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!type,
  });
}