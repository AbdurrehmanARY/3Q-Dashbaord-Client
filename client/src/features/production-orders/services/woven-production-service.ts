import { api } from "@/lib/api";
import type {
  WovenOverview,
  WovenLineOverview,
  PlanWovenInput,
  WeavingInput,
  WovenCuttingInput,
  WovenPackagingInput,
} from "../woven-types";

/** Thin endpoint wrapper for the woven workflow. Business logic lives in the hooks. */
export const wovenProductionService = {
  getOverview: (orderId: string) =>
    api.get<{ data: WovenOverview }>(`/woven-production/${orderId}/overview`),

  planLine: (orderId: string, body: PlanWovenInput) =>
    api.post<{ data: WovenLineOverview }>(`/woven-production/${orderId}/lines`, body),
  updateLinePlan: (orderId: string, lineId: number, body: PlanWovenInput) =>
    api.put<{ data: WovenLineOverview }>(`/woven-production/${orderId}/lines/${lineId}`, body),
  deleteLine: (lineId: number) => api.delete(`/woven-production/lines/${lineId}`),

  updateWeaving: (lineId: number, body: WeavingInput) =>
    api.patch<{ data: WovenLineOverview }>(`/woven-production/lines/${lineId}/weaving`, body),
  updateCutting: (lineId: number, body: WovenCuttingInput) =>
    api.patch<{ data: WovenLineOverview }>(`/woven-production/lines/${lineId}/cutting`, body),
  updatePackaging: (lineId: number, body: WovenPackagingInput) =>
    api.patch<{ data: WovenLineOverview }>(`/woven-production/lines/${lineId}/packaging`, body),
  reconcileRemainingThreads: (lineId: number, threads: { id: number; remainingWeightKg: number }[]) =>
    api.patch<{ data: any }>(`/woven-production/lines/${lineId}/reconcile-remaining`, { threads }),
};
