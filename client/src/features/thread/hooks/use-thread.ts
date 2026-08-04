import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { threadService } from "../services/thread-service";
import type { ThreadPurchaseInput, DyeBatchInput, ThreadStockInput } from "../types";

export const THREAD_KEYS = {
  all: ["thread"] as const,
  stocks: (q?: Record<string, unknown>) => ["thread", "stocks", q ?? {}] as const,
  summary: ["thread", "stocks", "summary"] as const,
  movements: (q?: Record<string, unknown>) => ["thread", "movements", q ?? {}] as const,
  purchases: (q?: Record<string, unknown>) => ["thread", "purchases", q ?? {}] as const,
  dyeBatches: ["thread", "dye-batches"] as const,
};

export function useThreadStocks(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: THREAD_KEYS.stocks(query),
    queryFn: () => threadService.listStocks(query),
    select: (res) => res.data,
  });
}

export function useThreadStockSummary() {
  return useQuery({
    queryKey: THREAD_KEYS.summary,
    queryFn: () => threadService.stockSummary(),
    select: (res) => res.data,
  });
}

export function useThreadMovements(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: THREAD_KEYS.movements(query),
    queryFn: () => threadService.listMovements(query),
    select: (res) => res.data,
  });
}

export function useThreadPurchases(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: THREAD_KEYS.purchases(query),
    queryFn: () => threadService.listPurchases(query),
    select: (res) => res.data,
  });
}

/** Receiving credits primary stock, so every thread cache goes stale together. */
export function useCreateThreadPurchase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: ThreadPurchaseInput) => threadService.createPurchase(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: THREAD_KEYS.all });
      toast.success("Thread receipt recorded — stock updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteThreadPurchase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => threadService.removePurchase(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: THREAD_KEYS.all });
      toast.success("Thread receipt deleted — stock reversed");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useCreateThreadStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: ThreadStockInput) => threadService.createStock(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: THREAD_KEYS.all });
      toast.success("Thread ledger created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateThreadStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: ThreadStockInput }) =>
      threadService.updateStock(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: THREAD_KEYS.all });
      toast.success("Thread stock updated — adjustment recorded");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteThreadStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => threadService.removeStock(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: THREAD_KEYS.all });
      toast.success("Thread ledger deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDyeBatches() {
  return useQuery({
    queryKey: THREAD_KEYS.dyeBatches,
    queryFn: () => threadService.listDyeBatches(),
    select: (res) => res.data,
  });
}

/** Dyeing moves weight from primary to secondary, so both pools go stale. */
export function useCreateDyeBatch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: DyeBatchInput) => threadService.createDyeBatch(body),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: THREAD_KEYS.all });
      toast.success(`Dye batch ${res.data.batchNumber} recorded`);
    },
    onError: (err: any) => toast.error(err.message),
  });
}
