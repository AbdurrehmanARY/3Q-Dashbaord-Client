import { api } from "@/lib/api";
import type { ProductionOrder, ProductionOrderLine } from "../../types";

/** 
 * Printed production-order API service.
 * Points at the workflow-scoped `/api/production/printed` read endpoints.
 * Delete delegates to the original `/production-orders/:id` endpoint which
 * handles cleanup (releasing reserved material stock) for both workflows.
 */
export const printedProductionOrderService = {
  list: (query?: Record<string, unknown>) =>
    api.get<{ data: ProductionOrder[] }>("/production/printed", query),

  get: (id: string) =>
    api.get<{ data: ProductionOrder; lines: ProductionOrderLine[] }>(
      `/production/printed/${id}`
    ),

  overview: (id: string) =>
    api.get<{ data: ProductionOrder; lines: ProductionOrderLine[] }>(
      `/production/printed/${id}/overview`
    ),

  remove: (id: string) => api.delete(`/production-orders/${id}`),
};
