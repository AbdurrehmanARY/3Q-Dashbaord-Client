import { api } from "@/lib/api";
import type { PurchaseRecord, PurchaseInput } from "../types";

/** Thin endpoint wrapper for purchase records. Business logic lives in the hooks. */
export const purchaseService = {
  list: (filters?: Record<string, unknown>) =>
    api.get<{ data: PurchaseRecord[] }>("/inventory/purchases", filters),
  create: (body: PurchaseInput) =>
    api.post<{ data: PurchaseRecord }>("/inventory/purchases", body),
  update: (id: string, body: Partial<PurchaseInput>) =>
    api.put<{ data: PurchaseRecord }>(`/inventory/purchases/${id}`, body),
  remove: (id: string) => api.delete(`/inventory/purchases/${id}`),
};
