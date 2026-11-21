import { ceoDashboardRepository } from "./ceo-dashboard.repository";

/**
 * CEO dashboard service — aggregates repository results into the shapes
 * the six dashboard endpoints return. Read-only: no mutation methods.
 */
export class CeoDashboardService {
  /* --- 1. Roll stock --- */

  async getRollStock() {
    const [items, summary] = await Promise.all([
      ceoDashboardRepository.getRollStock(),
      ceoDashboardRepository.getRollStockSummary(),
    ]);
    return { items, summary };
  }

  /* --- 2. Thread stock --- */

  async getThreadStock() {
    const [items, summary] = await Promise.all([
      ceoDashboardRepository.getThreadStock(),
      ceoDashboardRepository.getThreadStockSummary(),
    ]);
    return { items, summary };
  }

  /* --- 3. Work orders --- */

  async getWorkOrders() {
    const [items, summary] = await Promise.all([
      ceoDashboardRepository.getWorkOrders(),
      ceoDashboardRepository.getWorkOrdersSummary(),
    ]);
    return { items, summary };
  }

  /* --- 4. Production --- */

  async getProductionOrders() {
    const [items, summary] = await Promise.all([
      ceoDashboardRepository.getProductionOrders(),
      ceoDashboardRepository.getProductionSummary(),
    ]);
    return { items, summary };
  }

  /* --- 5. Operators --- */

  async getOperators() {
    const [items, utilization] = await Promise.all([
      ceoDashboardRepository.getOperators(),
      ceoDashboardRepository.getOperatorUtilization(),
    ]);
    return { items, utilization };
  }

  /* --- 6. Machines --- */

  async getMachines() {
    const [items, utilization] = await Promise.all([
      ceoDashboardRepository.getMachines(),
      ceoDashboardRepository.getMachineUtilization(),
    ]);
    return { items, utilization };
  }
}

export const ceoDashboardService = new CeoDashboardService();