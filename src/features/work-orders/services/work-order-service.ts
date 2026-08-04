import { api } from "@/lib/api";
import type { WorkOrder, WorkOrderDetail, WorkOrderInput, DispatchInput } from "../types";

export const workOrderService = {
  /** Completes dispatch. The server requires both DC and LC numbers. */
  dispatch: (id: string, body: DispatchInput) =>
    api.post<{ data: WorkOrderDetail }>(`/work-orders/${id}/dispatch`, body),
  list: (query?: Record<string, unknown>) =>
    api.get<{ data: WorkOrder[] }>("/work-orders", query),
  get: (id: string) => api.get<{ data: WorkOrderDetail }>(`/work-orders/${id}`),
  create: (body: WorkOrderInput) =>
    api.post<{ data: WorkOrderDetail }>("/work-orders", body),
  update: (id: string, body: Partial<WorkOrderInput>) =>
    api.put<{ data: WorkOrderDetail }>(`/work-orders/${id}`, body),
  remove: (id: string) => api.delete(`/work-orders/${id}`),
};
