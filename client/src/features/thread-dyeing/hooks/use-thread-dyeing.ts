import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { threadDyeingService } from "../services/thread-dyeing-service";
import type { ServiceProviderInput, SendDyeingInput, ReceiveDyeingInput } from "../types";

export const DYEING_KEYS = {
  providers: ["thread-service-providers"] as const,
  sends: ["thread-dyeing-sends"] as const,
};

/* -------- Service providers -------- */
export function useProviders() {
  return useQuery({
    queryKey: DYEING_KEYS.providers,
    queryFn: () => threadDyeingService.listProviders(),
    select: (res) => res.data,
  });
}

export function useCreateProvider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: ServiceProviderInput) => threadDyeingService.createProvider(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DYEING_KEYS.providers });
      toast.success("Service provider created");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateProvider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<ServiceProviderInput> }) =>
      threadDyeingService.updateProvider(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DYEING_KEYS.providers });
      toast.success("Service provider updated");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteProvider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => threadDyeingService.removeProvider(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DYEING_KEYS.providers });
      toast.success("Service provider deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

/* -------- Dyeing send / receive -------- */
export function useSends() {
  return useQuery({
    queryKey: DYEING_KEYS.sends,
    queryFn: () => threadDyeingService.listSends(),
    select: (res) => res.data,
  });
}

export function useSendDyeing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: SendDyeingInput) => threadDyeingService.send(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DYEING_KEYS.sends });
      qc.invalidateQueries({ queryKey: ["thread"] }); // undyed stock changed
      toast.success("Thread sent for dyeing");
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useReceiveDyeing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ sendId, body }: { sendId: number; body: ReceiveDyeingInput }) =>
      threadDyeingService.receive(sendId, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DYEING_KEYS.sends });
      qc.invalidateQueries({ queryKey: ["thread"] }); // dyed stock created
      toast.success("Dyed thread received into stock");
    },
    onError: (err: any) => toast.error(err.message),
  });
}
