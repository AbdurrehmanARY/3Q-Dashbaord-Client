import { lazy, type ComponentType } from "react";

/**
 * The route table as data. Keeping it declarative means adding a page is one entry here
 * rather than another nested `<Route>` block, and the lazy imports stay in one list.
 */
export interface AppRoute {
  path: string;
  component: ComponentType;
  roles?: string[];
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
  { path: "/", component: page(() => import("@/features/dashboard/pages/DashboardPage"), "DashboardPage"), roles: ["production_manager", "office_staff"] },

  { path: "/dashboard/work-orders/printed", component: page(() => import("@/features/dashboard/pages/DashboardWorkOrdersPrintedPage"), "DashboardWorkOrdersPrintedPage"), roles: ["ceo"] },
  { path: "/dashboard/work-orders/woven", component: page(() => import("@/features/dashboard/pages/DashboardWorkOrdersWovenPage"), "DashboardWorkOrdersWovenPage"), roles: ["ceo"] },

  { path: "/dashboard/production-orders/printed", component: page(() => import("@/features/dashboard/pages/DashboardProductionOrdersPrintedPage"), "DashboardProductionOrdersPrintedPage"), roles: ["ceo"] },
  { path: "/dashboard/production-orders/woven", component: page(() => import("@/features/dashboard/pages/DashboardProductionOrdersWovenPage"), "DashboardProductionOrdersWovenPage"), roles: ["ceo"] },

  { path: "/dashboard/ceo/work-orders/printed", component: page(() => import("@/features/dashboard/pages/CeoWorkOrdersDashboardPage"), "CeoWorkOrdersDashboardPage"), roles: ["ceo"] },
  { path: "/dashboard/ceo/work-orders/woven", component: page(() => import("@/features/dashboard/pages/CeoWorkOrdersDashboardPage"), "CeoWorkOrdersDashboardPage"), roles: ["ceo"] },
  { path: "/dashboard/ceo/production/printed", component: page(() => import("@/features/dashboard/pages/CeoProductionDashboardPage"), "CeoProductionDashboardPage"), roles: ["ceo"] },
  { path: "/dashboard/ceo/production/woven", component: page(() => import("@/features/dashboard/pages/CeoProductionDashboardPage"), "CeoProductionDashboardPage"), roles: ["ceo"] },
  { path: "/dashboard/production-orders/printed/:id", component: page(() => import("@/features/production-orders/printed/pages/PrintedProductionOrderDashboardPage"), "PrintedProductionOrderDashboardPage") },
  { path: "/dashboard/production-orders/woven/:id", component: page(() => import("@/features/production-orders/woven/pages/WovenProductionOrderDashboardPage"), "WovenProductionOrderDashboardPage") },
  { path: "/dashboard/production-orders/printed/:id/plan", component: page(() => import("@/features/production-orders/pages/ProductionOrderPlanningPage"), "ProductionOrderPlanningPage") },
  { path: "/dashboard/production-orders/woven/:id/plan", component: page(() => import("@/features/production-orders/pages/ProductionOrderPlanningPage"), "ProductionOrderPlanningPage") },

  { path: "/dashboard/machines", component: page(() => import("@/features/dashboard/pages/DashboardMachinesPage"), "DashboardMachinesPage"), roles: ["ceo"] },
  { path: "/dashboard/operators", component: page(() => import("@/features/dashboard/pages/DashboardOperatorsPage"), "DashboardOperatorsPage"), roles: ["ceo"] },
  { path: "/dashboard/roll-stock", component: page(() => import("@/features/dashboard/pages/DashboardRollStockPage"), "DashboardRollStockPage"), roles: ["ceo"] },
  { path: "/dashboard/thread-stock", component: page(() => import("@/features/dashboard/pages/DashboardThreadStockPage"), "DashboardThreadStockPage"), roles: ["ceo"] },

  { path: "/work-orders", component: page(() => import("@/features/work-orders/pages/WorkOrderListPage"), "WorkOrderListPage"), roles: ["office_staff"] },
  { path: "/work-orders/printed", component: page(() => import("@/features/work-orders/printed/pages/PrintedWorkOrderListPage"), "PrintedWorkOrderListPage"), roles: ["office_staff"] },
  { path: "/work-orders/woven", component: page(() => import("@/features/work-orders/woven/pages/WovenWorkOrderListPage"), "WovenWorkOrderListPage"), roles: ["office_staff"] },
  { path: "/work-orders/:id", component: page(() => import("@/features/work-orders/pages/WorkOrderDetailPage"), "WorkOrderDetailPage"), roles: ["office_staff"] },

  { path: "/production-orders", component: page(() => import("@/features/production-orders/pages/ProductionOrderListPage"), "ProductionOrderListPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/printed", component: page(() => import("@/features/production-orders/printed/pages/PrintedProductionOrderListPage"), "PrintedProductionOrderListPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/woven", component: page(() => import("@/features/production-orders/woven/pages/WovenProductionOrderListPage"), "WovenProductionOrderListPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/printed/:id", component: page(() => import("@/features/production-orders/printed/pages/PrintedProductionOrderDashboardPage"), "PrintedProductionOrderDashboardPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/printed/:id/plan", component: page(() => import("@/features/production-orders/pages/ProductionOrderPlanningPage"), "ProductionOrderPlanningPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/woven/:id", component: page(() => import("@/features/production-orders/woven/pages/WovenProductionOrderDashboardPage"), "WovenProductionOrderDashboardPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-order/printed/:id", component: page(() => import("@/features/production-orders/printed/pages/PrintedProductionOrderDashboardPage"), "PrintedProductionOrderDashboardPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-order/woven/:id", component: page(() => import("@/features/production-orders/woven/pages/WovenProductionOrderDashboardPage"), "WovenProductionOrderDashboardPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/woven/:id/plan", component: page(() => import("@/features/production-orders/pages/ProductionOrderPlanningPage"), "ProductionOrderPlanningPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/:id", component: page(() => import("@/features/production-orders/pages/ProductionOrderDashboardPage"), "ProductionOrderDashboardPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/:id/plan", component: page(() => import("@/features/production-orders/pages/ProductionOrderPlanningPage"), "ProductionOrderPlanningPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/printed/:id/batches", component: page(() => import("@/features/production-orders/printed/pages/PrintedProductionBatchesPage"), "PrintedProductionBatchesPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/production-orders/woven/:id/batches", component: page(() => import("@/features/production-orders/woven/pages/WovenProductionBatchesPage"), "WovenProductionBatchesPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },

  { path: "/companies", component: page(() => import("@/features/companies/pages/CompanyBrandPage"), "CompanyBrandPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/materials", component: page(() => import("@/features/materials/pages/MaterialMasterPage"), "MaterialMasterPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/materials/stickers", component: page(() => import("@/features/materials/pages/StickerMaterialsPage"), "StickerMaterialsPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/materials/local-sheets", component: page(() => import("@/features/materials/pages/LocalSheetsPage"), "LocalSheetsPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/materials/label-sheets", component: page(() => import("@/features/materials/pages/LabelSheetsPage"), "LabelSheetsPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/label-types", component: page(() => import("@/features/label-types/pages/LabelTypeMasterPage"), "LabelTypeMasterPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },

  { path: "/purchases/rolls", component: page(() => import("@/features/purchases/pages/RollPurchasesPage"), "RollPurchasesPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/purchases/threads", component: page(() => import("@/features/purchases/pages/ThreadPurchasesPage"), "ThreadPurchasesPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/purchases/ink", component: page(() => import("@/features/ink/pages/InkPurchasesPage"), "InkPurchasesPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/purchases", component: page(() => import("@/features/purchases/pages/PurchaseRecordPage"), "PurchaseRecordPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },

  { path: "/thread-dyeing", component: page(() => import("@/features/thread-dyeing/pages/ThreadDyeingPage"), "ThreadDyeingPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },

  { path: "/inventory/rolls", component: page(() => import("@/features/inventory/pages/RollStockPage"), "RollStockPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/inventory/threads/undyed", component: page(() => import("@/features/inventory/pages/UndyedThreadStockPage"), "UndyedThreadStockPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/inventory/threads/dyed", component: page(() => import("@/features/inventory/pages/DyedThreadStockPage"), "DyedThreadStockPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/inventory/ink-consumption", component: page(() => import("@/features/ink/pages/InkConsumptionPage"), "InkConsumptionPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/inventory", component: page(() => import("@/features/inventory/pages/InventoryStockPage"), "InventoryStockPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },

  { path: "/machines", component: page(() => import("@/features/machines-operators/pages/MachinesPage"), "MachinesPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/operators", component: page(() => import("@/features/machines-operators/pages/OperatorsPage"), "OperatorsPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
  { path: "/machines-operators", component: page(() => import("@/features/machines-operators/pages/MachinesOperatorsPage"), "MachinesOperatorsPage"), roles: ["production_manager", "production_operator", "accountant", "ceo"] },
];

/** Legacy paths kept alive so old links and bookmarks still resolve. */
export const redirects: RedirectRoute[] = [
  { path: "/ceo-dashboard", to: "/" },
  { path: "/ceo-dashboard/roll-stock", to: "/dashboard/roll-stock" },
  { path: "/ceo-dashboard/thread-stock", to: "/dashboard/thread-stock" },
  { path: "/ceo-dashboard/work-orders", to: "/dashboard/ceo/work-orders/printed" },
  { path: "/ceo-dashboard/production", to: "/dashboard/ceo/production/printed" },
  { path: "/ceo-dashboard/operators", to: "/dashboard/operators" },
  { path: "/ceo-dashboard/machines", to: "/dashboard/machines" },
  { path: "/dashboard/work-orders", to: "/dashboard/work-orders/printed" },
  { path: "/dashboard/production-orders", to: "/dashboard/production-orders/printed" },
  { path: "/production", to: "/production-orders" },
  { path: "/production/:id", to: "/production-orders" },
  { path: "/machines-operators", to: "/machines" },
  { path: "/purchases", to: "/purchases/rolls" },
  { path: "/inventory", to: "/inventory/rolls" },
  { path: "/inventory/threads", to: "/inventory/threads/undyed" },
  // Auth redirect - login page moved to /auth/login
  { path: "/login", to: "/auth/login" },
];
