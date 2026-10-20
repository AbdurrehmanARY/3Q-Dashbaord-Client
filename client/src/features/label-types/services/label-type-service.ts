import { api } from "@/lib/api";
import type { LabelType, CreateLabelTypeInput, UpdateLabelTypeInput } from "../types";

export const labelTypeService = {
  getAll: (category?: "woven" | "printed", activeOnly?: boolean) => {
    const params: Record<string, unknown> = {};
    if (category) params.category = category;
    if (activeOnly !== undefined) params.activeOnly = activeOnly;
    return api.get<{ data: LabelType[] }>("/label-types", params);
  },
  getById: (id: number) => api.get<{ data: LabelType }>(`/label-types/${id}`),
  create: (data: CreateLabelTypeInput) => api.post<{ data: LabelType }>("/label-types", data),
  update: (id: number, data: UpdateLabelTypeInput) =>
    api.put<{ data: LabelType }>(`/label-types/${id}`, data),
  remove: (id: number) => api.delete<void>(`/label-types/${id}`),
};