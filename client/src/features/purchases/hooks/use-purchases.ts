import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { purchaseService } from "../services/purchase-service";
import type { PurchaseInput } from "../types";

export const PURCHASE_KEYS = {
  all: ["purchases"] as const,
  filtered: (f: Record<string, unknown>) => ["purchases", f] as const,
};

export function usePurchases(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: PURCHASE_KEYS.filtered(filters ?? {}),
    queryFn: () => purchaseService.list(filters),
    select: (res) => res.data,
  });
}

export function useCreatePurchase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: PurchaseInput) => purchaseService.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PURCHASE_KEYS.all });
      // Purchases credit/debit inventory directly, so stock is now stale.
      qc.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Purchase record created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdatePurchase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<PurchaseInput> }) =>
      purchaseService.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PURCHASE_KEYS.all });
      // Purchases credit/debit inventory directly, so stock is now stale.
      qc.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Purchase record updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeletePurchase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => purchaseService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PURCHASE_KEYS.all });
      // Purchases credit/debit inventory directly, so stock is now stale.
      qc.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Purchase record deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
