import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard-service";
import { ceoDashboardService } from "../services/ceo-dashboard-service";

/**
 * Dashboard query-key factory.
 *
 * Combines KPIs (analytics endpoint) with the CEO dashboard read-only endpoints.
 * All hooks here are read-only — there are no `useMigration` hooks in this module.
 */
export const DASHBOARD_KEYS = {
  all: ["dashboard"] as const,
  kpis: () => [...DASHBOARD_KEYS.all, "kpis"] as const,
  rollStock: () => [...DASHBOARD_KEYS.all, "roll-stock"] as const,
  threadStock: () => [...DASHBOARD_KEYS.all, "thread-stock"] as const,
  workOrders: () => [...DASHBOARD_KEYS.all, "work-orders"] as const,
  production: () => [...DASHBOARD_KEYS.all, "production"] as const,
  operators: () => [...DASHBOARD_KEYS.all, "operators"] as const,
  machines: () => [...DASHBOARD_KEYS.all, "machines"] as const,
};

export function useDashboardKpis() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.kpis(),
    queryFn: () => dashboardService.kpis(),
    select: (res) => res.data,
  });
}

export function useRollStock() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.rollStock(),
    queryFn: () => ceoDashboardService.getRollStock(),
    select: (res) => res.data,
    staleTime: 60_000,
  });
}

export function useThreadStock() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.threadStock(),
    queryFn: () => ceoDashboardService.getThreadStock(),
    select: (res) => res.data,
    staleTime: 60_000,
  });
}

export function useCeoWorkOrders() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.workOrders(),
    queryFn: () => ceoDashboardService.getWorkOrders(),
    select: (res) => res.data,
    staleTime: 60_000,
  });
}

export function useCeoProduction() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.production(),
    queryFn: () => ceoDashboardService.getProduction(),
    select: (res) => res.data,
    staleTime: 60_000,
  });
}

export function useCeoOperators() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.operators(),
    queryFn: () => ceoDashboardService.getOperators(),
    select: (res) => res.data,
    staleTime: 60_000,
  });
}

export function useCeoMachines() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.machines(),
    queryFn: () => ceoDashboardService.getMachines(),
    select: (res) => res.data,
    staleTime: 60_000,
  });
}
