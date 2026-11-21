import { PrintedProductionOrderListPage } from "@/features/production-orders/printed/pages/PrintedProductionOrderListPage";

/**
 * Read-only dashboard view of printed production orders.
 * Reuses the operational `PrintedProductionOrderListPage` with `readOnly` to hide
 * create/edit/delete actions and surface only the View action.
 */
export function DashboardProductionOrdersPrintedPage() {
  return <PrintedProductionOrderListPage readOnly />;
}
