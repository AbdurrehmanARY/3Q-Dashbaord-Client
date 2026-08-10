import { api } from "@/lib/api";
import type {
  InkPurchase,
  InkPurchaseInput,
  InkStockRow,
  InkConsumption,
  InkConsumptionInput,
  InkOperatorSummary,
} from "../types";

/** Thin endpoint wrapper for the ink module. Business logic lives in the hooks/server. */
export const inkService = {
  listPurchases: () => api.get<{ data: InkPurchase[] }>("/ink/purchases"),
  createPurchase: (body: InkPurchaseInput) => api.post<{ data: InkPurchase }>("/ink/purchases", body),
  updatePurchase: (id: number, body: Partial<InkPurchaseInput>) =>
    api.put<{ data: InkPurchase }>(`/ink/purchases/${id}`, body),
  removePurchase: (id: number) => api.delete(`/ink/purchases/${id}`),

  stock: () => api.get<{ data: InkStockRow[] }>("/ink/stock"),

  listConsumptions: () => api.get<{ data: InkConsumption[] }>("/ink/consumptions"),
  byOperator: () => api.get<{ data: InkOperatorSummary[] }>("/ink/consumptions/by-operator"),
  createConsumption: (body: InkConsumptionInput) =>
    api.post<{ data: InkConsumption }>("/ink/consumptions", body),
  removeConsumption: (id: number) => api.delete(`/ink/consumptions/${id}`),
};
