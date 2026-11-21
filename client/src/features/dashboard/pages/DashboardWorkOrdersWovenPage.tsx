import { WovenWorkOrderListPage } from "@/features/work-orders/woven/pages/WovenWorkOrderListPage";

/**
 * Read-only dashboard view of woven work orders.
 * Reuses the operational `WovenWorkOrderListPage` with `readOnly` to hide
 * create/edit/delete actions and surface only the View action.
 */
export function DashboardWorkOrdersWovenPage() {
  return <WovenWorkOrderListPage readOnly />;
}
