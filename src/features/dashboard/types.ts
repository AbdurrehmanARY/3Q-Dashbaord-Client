/* ============================================================
   Dashboard Feature — Type Definitions
   ============================================================ */

export interface DashboardKpis {
  totalWorkOrders: number;
  submittedWorkOrders: number;
  totalProductionOrders: number;
  activeProductionOrders: number;
  completedProductionOrders: number;
  totalMaterials: number;
  lowStockCount: number;
  totalBalanceRolls: number;
  totalIssuedRolls: number;
}

export interface KpiResponse {
  data: DashboardKpis;
}
