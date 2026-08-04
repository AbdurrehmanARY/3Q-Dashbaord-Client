import { api } from "@/lib/api";
import type { StockLevel, PurchaseRecord, PurchaseInput } from "../types";

/** Thin endpoint wrapper for the inventory feature. Business logic lives in the hooks. */
/** One movement in the roll ledger's append-only history. */
export interface RollMovement {
  id: number;
  materialCode: string;
  movementType: string;
  /** Signed: positive credits, negative debits. */
  rolls: number;
  balanceAfter: number;
  note: string | null;
  createdAt: string;
}

export interface RollStockInput {
  materialCode?: string;
  openingStock?: number;
  receivedRolls?: number;
  issuedRolls?: number;
  rollPerKg?: number;
  note?: string;
}

export const inventoryService = {
  listStock: (query?: Record<string, unknown>) =>
    api.get<{ data: StockLevel[]; meta?: { total: number } }>("/inventory/rolls", query),
  createStock: (body: RollStockInput) => api.post<{ data: StockLevel }>("/inventory/rolls", body),
  updateStock: (materialCode: string, body: RollStockInput) =>
    api.put<{ data: StockLevel }>(`/inventory/rolls/${encodeURIComponent(materialCode)}`, body),
  removeStock: (materialCode: string) =>
    api.delete(`/inventory/rolls/${encodeURIComponent(materialCode)}`),
  listMovements: (query?: Record<string, unknown>) =>
    api.get<{ data: RollMovement[] }>("/inventory/rolls/movements", query),
  listPurchases: (query?: Record<string, unknown>) =>
    api.get<{ data: PurchaseRecord[] }>("/inventory/purchases", query),
  createPurchase: (body: PurchaseInput) =>
    api.post<{ data: PurchaseRecord }>("/inventory/purchases", body),
  updateRoll: (materialCode: string, body: { rollPerKg?: number }) =>
    api.put<{ data: StockLevel }>(`/inventory/rolls/${materialCode}`, body),
};
