import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { inventoryService, type RollStockInput } from "../services/inventory-service";
import type { StockLevel } from "../types";

export const INVENTORY_KEYS = {
  stock: (query?: Record<string, unknown>) => ["inventory", "stock", query ?? {}] as const,
  purchases: (query?: Record<string, unknown>) => ["inventory", "purchases", query ?? {}] as const,
};

export function useInventoryStock(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: INVENTORY_KEYS.stock(query),
    queryFn: () => inventoryService.listStock(query),
    select: (res) => res.data,
  });
}

/**
 * Optimistically edits Roll Per KG. The commit is serialized by React Query (so two quick
 * edits can't clobber each other on rollback the way a hand-rolled `setQueryData` in the
 * component could), while still updating the cell instantly for shop-floor connections.
 * Patches every cached stock list regardless of its active filter, and rolls them all back
 * together on failure.
 */
/** Append-only movement history for a material (or the whole ledger). */
export function useRollMovements(materialCode?: string) {
  return useQuery({
    queryKey: ["inventory", "movements", materialCode ?? "all"],
    queryFn: () => inventoryService.listMovements(materialCode ? { materialCode } : undefined),
    select: (res) => res.data,
  });
}

export function useCreateRollStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: RollStockInput) => inventoryService.createStock(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Stock ledger created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateRollStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ materialCode, body }: { materialCode: string; body: RollStockInput }) =>
      inventoryService.updateStock(materialCode, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Stock updated — adjustment recorded in history");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteRollStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (materialCode: string) => inventoryService.removeStock(materialCode),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Stock ledger deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateInventoryRoll() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ materialCode, rollPerKg }: { materialCode: string; rollPerKg: number }) =>
      inventoryService.updateRoll(materialCode, { rollPerKg }),
    onMutate: async ({ materialCode, rollPerKg }) => {
      await qc.cancelQueries({ queryKey: ["inventory", "stock"] });
      const snapshots = qc.getQueriesData<{ data: StockLevel[] }>({ queryKey: ["inventory", "stock"] });
      for (const [key, prev] of snapshots) {
        if (!prev) continue;
        qc.setQueryData(key, {
          ...prev,
          data: prev.data.map((r) =>
            r.materialCode === materialCode
              ? {
                  ...r,
                  rollPerKg: String(rollPerKg),
                  perSkuBalance: String(Number(r.balanceRolls) * rollPerKg),
                }
              : r
          ),
        });
      }
      return { snapshots };
    },
    onError: (err: any, _vars, ctx) => {
      ctx?.snapshots?.forEach(([key, prev]) => qc.setQueryData(key, prev));
      toast.error(err?.message ?? "Could not update Roll Per KG");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
}
