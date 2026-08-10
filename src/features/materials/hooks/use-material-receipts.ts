import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { materialReceiptService } from "../services/material-receipts-service";
import type { ReceiptKind } from "../receipts-types";

export const RECEIPT_KEYS = {
  list: (kind: ReceiptKind) => ["material-receipts", kind] as const,
};

export function useReceipts(kind: ReceiptKind) {
  return useQuery({
    queryKey: RECEIPT_KEYS.list(kind),
    queryFn: () => materialReceiptService.list(kind),
    select: (res) => res.data,
  });
}

export function useCreateReceipt(kind: ReceiptKind) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Record<string, unknown>) => materialReceiptService.create(kind, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: RECEIPT_KEYS.list(kind) });
      toast.success("Record created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateReceipt(kind: ReceiptKind) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Record<string, unknown> }) =>
      materialReceiptService.update(kind, id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: RECEIPT_KEYS.list(kind) });
      toast.success("Record updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteReceipt(kind: ReceiptKind) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => materialReceiptService.remove(kind, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: RECEIPT_KEYS.list(kind) });
      toast.success("Record deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
