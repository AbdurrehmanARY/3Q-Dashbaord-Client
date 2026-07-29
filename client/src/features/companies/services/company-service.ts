import { api } from "@/lib/api";
import type { Company, Brand } from "../types";

export const companyService = {
  list: (query?: Record<string, unknown>) =>
    api.get<{ data: Company[] }>("/companies", query),
  get: (id: string) => api.get<{ data: Company }>(`/companies/${id}`),
  create: (body: unknown) =>
    api.post<{ data: Company }>("/companies", body),
  update: (id: string, body: unknown) =>
    api.put<{ data: Company }>(`/companies/${id}`, body),
  remove: (id: string) => api.delete(`/companies/${id}`),
  listBrands: (companyId: string) =>
    api.get<{ data: Brand[] }>(`/brands/company/${companyId}`),
  createBrand: (body: unknown) =>
    api.post<{ data: Brand }>("/brands", body),
  updateBrand: (id: string, body: unknown) =>
    api.put<{ data: Brand }>(`/brands/${id}`, body),
  removeBrand: (id: string) => api.delete(`/brands/${id}`),
};
