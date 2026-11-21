import { WovenProductionOrderListPage } from "@/features/production-orders/woven/pages/WovenProductionOrderListPage";

/**
 * Read-only dashboard view of woven production orders.
 * Reuses the operational `WovenProductionOrderListPage` with `readOnly` to hide
 * create/edit/delete actions and surface only the View action.
 */
export function DashboardProductionOrdersWovenPage() {
  return <WovenProductionOrderListPage readOnly />;
}
