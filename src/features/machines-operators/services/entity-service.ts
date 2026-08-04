import { api } from "@/lib/api";
import type { Machine, Operator } from "../types";

export const machineService = {
  list: (query?: Record<string, unknown>) => api.get<{ data: Machine[] }>("/machines", query),
  create: (body: unknown) => api.post<{ data: Machine }>("/machines", body),
  update: (id: string, body: unknown) =>
    api.put<{ data: Machine }>(`/machines/${id}`, body),
  remove: (id: string) => api.delete(`/machines/${id}`),
};

export const operatorService = {
  list: (query?: Record<string, unknown>) => api.get<{ data: Operator[] }>("/operators", query),
  create: (body: unknown) => api.post<{ data: Operator }>("/operators", body),
  update: (id: string, body: unknown) =>
    api.put<{ data: Operator }>(`/operators/${id}`, body),
  remove: (id: string) => api.delete(`/operators/${id}`),
};
