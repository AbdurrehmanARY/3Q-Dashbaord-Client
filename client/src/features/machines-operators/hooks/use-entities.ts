import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { machineService, operatorService } from "../services/entity-service";

export const MACHINE_KEYS = {
  all: ["machines"] as const,
  filtered: (q: Record<string, unknown>) => ["machines", q] as const,
};
export const OPERATOR_KEYS = {
  all: ["operators"] as const,
  filtered: (q: Record<string, unknown>) => ["operators", q] as const,
};

export function useMachines(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: query ? MACHINE_KEYS.filtered(query) : MACHINE_KEYS.all,
    queryFn: () => machineService.list(query),
    select: (res) => res.data,
  });
}

export function useOperators(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: query ? OPERATOR_KEYS.filtered(query) : OPERATOR_KEYS.all,
    queryFn: () => operatorService.list(query),
    select: (res) => res.data,
  });
}

export function useCreateMachine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => machineService.create(body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: MACHINE_KEYS.all }); toast.success("Machine added"); },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateMachine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: unknown }) => machineService.update(id, body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: MACHINE_KEYS.all }); toast.success("Machine updated"); },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteMachine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => machineService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: MACHINE_KEYS.all }); toast.success("Machine deleted"); },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useCreateOperator() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => operatorService.create(body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: OPERATOR_KEYS.all }); toast.success("Operator added"); },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateOperator() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: unknown }) => operatorService.update(id, body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: OPERATOR_KEYS.all }); toast.success("Operator updated"); },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteOperator() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => operatorService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: OPERATOR_KEYS.all }); toast.success("Operator deleted"); },
    onError: (err: any) => toast.error(err.message),
  });
}
