import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { labelTypeService } from "../services/label-type-service";
import type { LabelType, CreateLabelTypeInput, UpdateLabelTypeInput } from "../types";

export const LABEL_TYPE_KEYS = {
  all: ["label-types"] as const,
  lists: () => [...LABEL_TYPE_KEYS.all, "list"] as const,
  list: (filters: { category?: "woven" | "printed"; activeOnly?: boolean }) =>
    [...LABEL_TYPE_KEYS.lists(), filters] as const,
  details: () => [...LABEL_TYPE_KEYS.all, "detail"] as const,
  detail: (id: number) => [...LABEL_TYPE_KEYS.details(), id] as const,
};

export function useLabelTypes(category?: "woven" | "printed", activeOnly = true) {
  return useQuery({
    queryKey: LABEL_TYPE_KEYS.list({ category, activeOnly }),
    queryFn: () => labelTypeService.getAll(category, activeOnly),
    select: (res) => res.data,
  });
}

export function useLabelType(id: number) {
  return useQuery({
    queryKey: LABEL_TYPE_KEYS.detail(id),
    queryFn: () => labelTypeService.getById(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}

export function useCreateLabelType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLabelTypeInput) => labelTypeService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: LABEL_TYPE_KEYS.lists() });
      toast.success("Label type created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateLabelType() {
  const qc = useQueryClient();
    return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateLabelTypeInput }) =>
      labelTypeService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: LABEL_TYPE_KEYS.lists() });
      toast.success("Label type updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteLabelType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => labelTypeService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: LABEL_TYPE_KEYS.lists() });
      toast.success("Label type deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}