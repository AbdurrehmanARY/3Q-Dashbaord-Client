import { api } from "@/lib/api";
import type { MaterialReceipt, ReceiptKind } from "../receipts-types";

const base = (kind: ReceiptKind) => `/materials/${kind}`;

export const materialReceiptService = {
  list: (kind: ReceiptKind) => api.get<{ data: MaterialReceipt[] }>(base(kind)),
  create: (kind: ReceiptKind, body: Record<string, unknown>) =>
    api.post<{ data: MaterialReceipt }>(base(kind), body),
  update: (kind: ReceiptKind, id: number, body: Record<string, unknown>) =>
    api.put<{ data: MaterialReceipt }>(`${base(kind)}/${id}`, body),
  remove: (kind: ReceiptKind, id: number) => api.delete(`${base(kind)}/${id}`),
};
