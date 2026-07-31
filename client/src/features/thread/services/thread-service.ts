import { api } from "@/lib/api";
import type {
  ThreadStock,
  ThreadStockSummary,
  ThreadMovement,
  ThreadPurchase,
  ThreadPurchaseInput,
  DyeBatch,
  DyeBatchInput,
} from "../types";

/** Thin endpoint wrapper for the thread feature. Business logic lives in the hooks. */
export const threadService = {
  listStocks: (query?: Record<string, unknown>) =>
    api.get<{ data: ThreadStock[] }>("/thread/stocks", query),
  stockSummary: () => api.get<{ data: ThreadStockSummary }>("/thread/stocks/summary"),
  listMovements: (query?: Record<string, unknown>) =>
    api.get<{ data: ThreadMovement[] }>("/thread/movements", query),

  listPurchases: (query?: Record<string, unknown>) =>
    api.get<{ data: ThreadPurchase[] }>("/thread/purchases", query),
  createPurchase: (body: ThreadPurchaseInput) =>
    api.post<{ data: ThreadPurchase }>("/thread/purchases", body),
  removePurchase: (id: number) => api.delete(`/thread/purchases/${id}`),

  listDyeBatches: () => api.get<{ data: DyeBatch[] }>("/thread/dye-batches"),
  createDyeBatch: (body: DyeBatchInput) => api.post<{ data: DyeBatch }>("/thread/dye-batches", body),
};
