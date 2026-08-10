import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { inkService } from "../services/ink-service";
import type { InkPurchaseInput, InkConsumptionInput } from "../types";

export const INK_KEYS = {
  purchases: ["ink", "purchases"] as const,
  stock: ["ink", "stock"] as const,
  consumptions: ["ink", "consumptions"] as const,
  byOperator: ["ink", "consumptions", "by-operator"] as const,
};

/* ---------------- Purchases ---------------- */
export function useInkPurchases() {
  return useQuery({ queryKey: INK_KEYS.purchases, queryFn: inkService.listPurchases, select: (r) => r.data });
}

export function useInkStock() {
  return useQuery({ queryKey: INK_KEYS.stock, queryFn: inkService.stock, select: (r) => r.data });
}

/** Purchases change the derived stock, so both queries are invalidated on every write. */
function invalidatePurchaseSide(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: INK_KEYS.purchases });
  qc.invalidateQueries({ queryKey: INK_KEYS.stock });
}

export function useCreateInkPurchase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: InkPurchaseInput) => inkService.createPurchase(body),
    onSuccess: () => {
      invalidatePurchaseSide(qc);
      toast.success("Ink purchase recorded");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateInkPurchase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<InkPurchaseInput> }) =>
      inkService.updatePurchase(id, body),
    onSuccess: () => {
      invalidatePurchaseSide(qc);
      toast.success("Ink purchase updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteInkPurchase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => inkService.removePurchase(id),
    onSuccess: () => {
      invalidatePurchaseSide(qc);
      toast.success("Ink purchase deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/* ---------------- Consumptions ---------------- */
export function useInkConsumptions() {
  return useQuery({
    queryKey: INK_KEYS.consumptions,
    queryFn: inkService.listConsumptions,
    select: (r) => r.data,
  });
}

export function useInkConsumptionByOperator() {
  return useQuery({
    queryKey: INK_KEYS.byOperator,
    queryFn: inkService.byOperator,
    select: (r) => r.data,
  });
}

/** Consumption debits stock, so the stock, history and per-operator views all go stale. */
function invalidateConsumptionSide(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: INK_KEYS.consumptions });
  qc.invalidateQueries({ queryKey: INK_KEYS.byOperator });
  qc.invalidateQueries({ queryKey: INK_KEYS.stock });
}

export function useCreateInkConsumption() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: InkConsumptionInput) => inkService.createConsumption(body),
    onSuccess: () => {
      invalidateConsumptionSide(qc);
      toast.success("Ink consumption recorded");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteInkConsumption() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => inkService.removeConsumption(id),
    onSuccess: () => {
      invalidateConsumptionSide(qc);
      toast.success("Ink consumption deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
