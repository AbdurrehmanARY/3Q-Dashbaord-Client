import { api } from "@/lib/api";
import type { StockLevel, PurchaseRecord, PurchaseInput } from "../types";

/** Thin endpoint wrapper for the inventory feature. Business logic lives in the hooks. */
export const inventoryService = {
  listStock: (query?: Record<string, unknown>) =>
    api.get<{ data: StockLevel[] }>("/inventory/rolls", query),
  listPurchases: (query?: Record<string, unknown>) =>
    api.get<{ data: PurchaseRecord[] }>("/inventory/purchases", query),
  createPurchase: (body: PurchaseInput) =>
    api.post<{ data: PurchaseRecord }>("/inventory/purchases", body),
  updateRoll: (materialCode: string, body: { rollPerKg?: number }) =>
    api.put<{ data: StockLevel }>(`/inventory/rolls/${materialCode}`, body),
};
