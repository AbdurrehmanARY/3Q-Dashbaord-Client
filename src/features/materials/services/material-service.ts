import { api } from "@/lib/api";
import type { Material, MaterialInput } from "../types";

export const materialService = {
  list: (type?: string) =>
    api.get<{ data: Material[] }>("/materials", type ? { type } : undefined),
  create: (body: MaterialInput) =>
    api.post<{ data: Material }>("/materials", body),
  update: (id: string, body: Partial<MaterialInput>) =>
    api.put<{ data: Material }>(`/materials/${id}`, body),
  remove: (id: string) => api.delete(`/materials/${id}`),
};
