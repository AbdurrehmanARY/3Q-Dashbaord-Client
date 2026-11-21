import { api } from "@/lib/api";
import type { ProductionOrder, ProductionOrderLine } from "../../types";

/**
 * Woven production-order API service.
 * Points at the workflow-scoped `/api/production/woven/orders` read endpoints.
 * Delete delegates to the original `/production-orders/:id` endpoint which
 * handles cleanup (releasing reserved material stock) for both workflows.
 */
export const wovenProductionOrderService = {
  list: (query?: Record<string, unknown>) =>
    api.get<{ data: ProductionOrder[] }>("/production/woven/orders", query),

  get: (id: string) =>
    api.get<{ data: ProductionOrder; lines: ProductionOrderLine[] }>(
      `/production/woven/orders/${id}`
    ),

  remove: (id: string) => api.delete(`/production-orders/${id}`),
};
