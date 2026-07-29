import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { materialService } from "../services/material-service";
import type { MaterialInput } from "../types";

export const MATERIAL_KEYS = {
  all: ["materials"] as const,
  filtered: (type?: string) => ["materials", { type }] as const,
};

export function useMaterials(type?: string) {
  return useQuery({
    queryKey: MATERIAL_KEYS.filtered(type),
    queryFn: () => materialService.list(type),
    select: (res) => res.data,
  });
}

export function useCreateMaterial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: MaterialInput) => materialService.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MATERIAL_KEYS.all });
      toast.success("Material created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateMaterial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<MaterialInput> }) =>
      materialService.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MATERIAL_KEYS.all });
      toast.success("Material updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteMaterial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => materialService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MATERIAL_KEYS.all });
      toast.success("Material deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
