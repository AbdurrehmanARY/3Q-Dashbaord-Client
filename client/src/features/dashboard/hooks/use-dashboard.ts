import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard-service";

export const DASHBOARD_KEYS = {
  kpis: ["dashboard", "kpis"] as const,
};

export function useDashboardKpis() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.kpis,
    queryFn: () => dashboardService.kpis(),
    select: (res) => res.data,
  });
}
