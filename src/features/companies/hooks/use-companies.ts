import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { companyService } from "../services/company-service";

export const COMPANY_KEYS = {
  all: ["companies"] as const,
  brands: (companyId: string) => ["companies", companyId, "brands"] as const,
};

export function useCompanies() {
  return useQuery({
    queryKey: COMPANY_KEYS.all,
    queryFn: () => companyService.list(),
    select: (res) => res.data,
  });
}

export function useCompanyBrands(companyId: string | null) {
  return useQuery({
    queryKey: COMPANY_KEYS.brands(companyId ?? ""),
    queryFn: () => companyService.listBrands(companyId!),
    enabled: !!companyId,
    select: (res) => res.data,
  });
}

export function useCreateCompany() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => companyService.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: COMPANY_KEYS.all });
      toast.success("Company created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateCompany() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: unknown }) =>
      companyService.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: COMPANY_KEYS.all });
      toast.success("Company updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteCompany() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => companyService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: COMPANY_KEYS.all });
      toast.success("Company deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useCreateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => companyService.createBrand(body),
    onSuccess: (_data, vars: any) => {
      qc.invalidateQueries({ queryKey: COMPANY_KEYS.brands(vars.companyId) });
      toast.success("Brand created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: unknown }) =>
      companyService.updateBrand(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Brand updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => companyService.removeBrand(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Brand deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
