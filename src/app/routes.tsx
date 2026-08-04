import { lazy, type ComponentType } from "react";

/**
 * The route table as data. Keeping it declarative means adding a page is one entry here
 * rather than another nested `<Route>` block, and the lazy imports stay in one list.
 */
export interface AppRoute {
  path: string;
  component: ComponentType;
}

/** Legacy paths kept alive so old links and bookmarks still resolve. */
export interface RedirectRoute {
  path: string;
  to: string;
}

const page = <T extends Record<string, ComponentType>>(
  loader: () => Promise<T>,
  name: keyof T
) => lazy(() => loader().then((m) => ({ default: m[name] })));

export const routes: AppRoute[] = [
  { path: "/", component: page(() => import("@/features/dashboard/pages/DashboardPage"), "DashboardPage") },

  { path: "/work-orders", component: page(() => import("@/features/work-orders/pages/WorkOrderListPage"), "WorkOrderListPage") },
  { path: "/work-orders/:id", component: page(() => import("@/features/work-orders/pages/WorkOrderDetailPage"), "WorkOrderDetailPage") },

  { path: "/production-orders", component: page(() => import("@/features/production-orders/pages/ProductionOrderListPage"), "ProductionOrderListPage") },
  { path: "/production-orders/:id", component: page(() => import("@/features/production-orders/pages/ProductionOrderDashboardPage"), "ProductionOrderDashboardPage") },
  { path: "/production-orders/:id/plan", component: page(() => import("@/features/production-orders/pages/ProductionOrderPlanningPage"), "ProductionOrderPlanningPage") },

  { path: "/companies", component: page(() => import("@/features/companies/pages/CompanyBrandPage"), "CompanyBrandPage") },
  { path: "/materials", component: page(() => import("@/features/materials/pages/MaterialMasterPage"), "MaterialMasterPage") },

  { path: "/purchases/rolls", component: page(() => import("@/features/purchases/pages/RollPurchasesPage"), "RollPurchasesPage") },
  { path: "/purchases/threads", component: page(() => import("@/features/purchases/pages/ThreadPurchasesPage"), "ThreadPurchasesPage") },
  { path: "/purchases", component: page(() => import("@/features/purchases/pages/PurchaseRecordPage"), "PurchaseRecordPage") },

  { path: "/inventory/rolls", component: page(() => import("@/features/inventory/pages/RollStockPage"), "RollStockPage") },
  { path: "/inventory/threads/undyed", component: page(() => import("@/features/inventory/pages/UndyedThreadStockPage"), "UndyedThreadStockPage") },
  { path: "/inventory/threads/dyed", component: page(() => import("@/features/inventory/pages/DyedThreadStockPage"), "DyedThreadStockPage") },
  { path: "/inventory", component: page(() => import("@/features/inventory/pages/InventoryStockPage"), "InventoryStockPage") },

  { path: "/machines", component: page(() => import("@/features/machines-operators/pages/MachinesPage"), "MachinesPage") },
  { path: "/operators", component: page(() => import("@/features/machines-operators/pages/OperatorsPage"), "OperatorsPage") },
  { path: "/machines-operators", component: page(() => import("@/features/machines-operators/pages/MachinesOperatorsPage"), "MachinesOperatorsPage") },
];

/** Legacy paths kept alive so old links and bookmarks still resolve. */
export const redirects: RedirectRoute[] = [
  { path: "/production", to: "/production-orders" },
  { path: "/production/:id", to: "/production-orders" },
  { path: "/machines-operators", to: "/machines" },
  { path: "/purchases", to: "/purchases/rolls" },
  { path: "/inventory", to: "/inventory/rolls" },
  { path: "/inventory/threads", to: "/inventory/threads/undyed" },
];

