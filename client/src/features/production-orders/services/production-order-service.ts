import { api } from "@/lib/api";
import type {
  AssignResourcesInput,
  AvailableResources,
  CreateProductionOrderInput,
  EligibleSalesOrder,
  PlanLineInput,
  ProductionOrder,
  ProductionOrderDetail,
  ProductionOrderLine,
  ProductionOrderOverview,
  ProductionStage,
  ProductionStageEvent,
  ProductionRollIssuance,
  IssueRollsInput,
  StageProgressInput,
  TransferRollsInput,
  UpdateLineFullInput,
} from "../types";

export const productionOrderService = {
  list: (query?: Record<string, unknown>) =>
    api.get<{ data: ProductionOrder[] }>("/production-orders", query),

  get: (id: string) => api.get<{ data: ProductionOrderDetail }>(`/production-orders/${id}`),

  getOverview: (id: string) =>
    api.get<{ data: ProductionOrderOverview }>(`/production-orders/${id}/overview`),

  listEligibleSalesOrders: () =>
    api.get<{ data: EligibleSalesOrder[] }>("/production-orders/eligible-sales-orders"),

  /** Free machines/operators. Pass the caller's own line/order so its current picks stay listed. */
  getAvailableResources: (scope?: { lineId?: number; orderId?: number; productType?: "printed" | "woven" }) =>
    api.get<{ data: AvailableResources }>("/production-orders/available-resources", scope as any),

  create: (body: CreateProductionOrderInput) =>
    api.post<{ data: ProductionOrder }>("/production-orders", body),

  update: (id: string, body: { notes?: string }) =>
    api.patch<{ data: ProductionOrder }>(`/production-orders/${id}`, body),

  remove: (id: string) => api.delete(`/production-orders/${id}`),

  /* Planning is per label type: each call plans one and reserves its resources. */
  planLine: (id: string, body: PlanLineInput) =>
    api.post<{ data: ProductionOrderLine }>(`/production-orders/${id}/lines`, body),

  updateLinePlan: (lineId: string, body: PlanLineInput) =>
    api.put<{ data: ProductionOrderLine }>(`/production-orders/lines/${lineId}/plan`, body),

  deleteLine: (lineId: string) => api.delete(`/production-orders/lines/${lineId}`),

  assignResources: (lineId: string, body: AssignResourcesInput) =>
    api.patch<{ data: ProductionOrderLine }>(`/production-orders/lines/${lineId}/assign`, body),

  /** Inline row edit — updates any subset of counters/assignments in one atomic save. */
  updateLineFull: (lineId: string, body: UpdateLineFullInput) =>
    api.patch<{ data: ProductionOrderLine }>(`/production-orders/lines/${lineId}`, body),

  updateStageProgress: (lineId: string, stage: ProductionStage, body: StageProgressInput) =>
    api.patch<{ data: ProductionOrderLine }>(`/production-orders/lines/${lineId}/${stage}`, body),

  transferRolls: (lineId: string, body: TransferRollsInput) =>
    api.post<{ data: ProductionOrderLine }>(`/production-orders/lines/${lineId}/transfers`, body),

  issueRolls: (lineId: string, body: IssueRollsInput) =>
    api.post<{ data: ProductionOrderLine }>(`/production-orders/lines/${lineId}/issuances`, body),

  listLineIssuances: (lineId: string) =>
    api.get<{ data: ProductionRollIssuance[] }>(`/production-orders/lines/${lineId}/issuances`),

  listOrderEvents: (id: string) =>
    api.get<{ data: ProductionStageEvent[] }>(`/production-orders/${id}/events`),

  listLineEvents: (lineId: string) =>
    api.get<{ data: ProductionStageEvent[] }>(`/production-orders/lines/${lineId}/events`),
};
