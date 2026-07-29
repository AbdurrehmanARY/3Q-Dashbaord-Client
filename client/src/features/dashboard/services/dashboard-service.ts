import { api } from "@/lib/api";
import type { KpiResponse } from "../types";

/** Dashboard analytics endpoint. `GET /api/analytics/kpis` is the only analytics route left. */
export const dashboardService = {
  kpis: () => api.get<KpiResponse>("/analytics/kpis"),
};
