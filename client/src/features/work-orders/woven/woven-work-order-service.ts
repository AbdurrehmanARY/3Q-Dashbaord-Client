import { api } from "@/lib/api";
import type { WorkOrder, WorkOrderDetail, WorkOrderInput, DispatchInput } from "@/features/work-orders/types";

/**
 * Woven work-order API service.
 * Points at the workflow-scored `/work-orders/woven` endpoints.
 * Dispatch uses the main `/work-orders/:id/dispatch` route — shared across workflows.
 */
export const wovenWorkOrderService = {
  list: (query?: Record<string, unknown>) =>
    api.get<{ data: WorkOrder[] }>("/work-orders/woven", query),
  get: (id: string) => api.get<{ data: WorkOrderDetail }>("/work-orders/woven/" + id),
  create: (body: WorkOrderInput) =>
    api.post<{ data: WorkOrder }>("/work-orders/woven", body),
  update: (id: string, body: Partial<WorkOrderInput>) =>
    api.put<{ data: WorkOrder }>("/work-orders/woven/" + id, body),
  remove: (id: string) => api.delete("/work-orders/woven/" + id),
  dispatch: (id: string, body: DispatchInput) =>
    api.post<{ data: WorkOrderDetail }>(`/work-orders/${id}/dispatch`, body),
};