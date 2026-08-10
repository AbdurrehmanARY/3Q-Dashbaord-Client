import { api } from "@/lib/api";
import type { ProductionSummary, ProductionRun, LogProductionRunInput } from "../types";

export const productionRunService = {
  getSummary: (saleOrderId: number) =>
    api.get<{ data: ProductionSummary }>(`/work-orders/${saleOrderId}/production-summary`),
  log: (saleOrderId: number, body: LogProductionRunInput) =>
    api.post<{ data: ProductionRun }>(`/work-orders/${saleOrderId}/production-runs`, body),
};
