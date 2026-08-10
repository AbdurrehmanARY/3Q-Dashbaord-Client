import { api } from "@/lib/api";
import type {
  ServiceProvider,
  ServiceProviderInput,
  DyeingSend,
  SendDyeingInput,
  ReceiveDyeingInput,
} from "../types";

export const threadDyeingService = {
  /* Service providers */
  listProviders: () => api.get<{ data: ServiceProvider[] }>("/thread-service-providers"),
  createProvider: (body: ServiceProviderInput) =>
    api.post<{ data: ServiceProvider }>("/thread-service-providers", body),
  updateProvider: (id: number, body: Partial<ServiceProviderInput>) =>
    api.put<{ data: ServiceProvider }>(`/thread-service-providers/${id}`, body),
  removeProvider: (id: number) => api.delete(`/thread-service-providers/${id}`),

  /* Dyeing send / receive */
  listSends: () => api.get<{ data: DyeingSend[] }>("/thread-dyeing/sends"),
  send: (body: SendDyeingInput) => api.post<{ data: DyeingSend }>("/thread-dyeing/sends", body),
  receive: (sendId: number, body: ReceiveDyeingInput) =>
    api.post(`/thread-dyeing/sends/${sendId}/receive`, body),
};
