import { api } from "@/lib/api";
import type { WorkOrder, WorkOrderDetail, WorkOrderInput, DispatchInput } from "@/features/work-orders/types";

/**
 * Printed work-order API service.
 * Points at the workflow-scored `/work-orders/printed` endpoints.
 * Dispatch uses the main `/work-orders/:id/dispatch` route — shared across workflows.
 */
export const printedWorkOrderService = {
  list: (query?: Record<string, unknown>) =>
    api.get<{ data: WorkOrder[] }>("/work-orders/printed", query),
  get: (id: string) => api.get<{ data: WorkOrderDetail }>("/work-orders/printed/" + id),
  create: (body: Omit<WorkOrderInput, "wovenDetail">) =>
    api.post<{ data: WorkOrder }>("/work-orders/printed", body),
  update: (id: string, body: Partial<Omit<WorkOrderInput, "wovenDetail">>) =>
    api.put<{ data: WorkOrder }>("/work-orders/printed/" + id, body),
  remove: (id: string) => api.delete("/work-orders/printed/" + id),
  dispatch: (id: string, body: DispatchInput) =>
    api.post<{ data: WorkOrderDetail }>(`/work-orders/${id}/dispatch`, body),
};