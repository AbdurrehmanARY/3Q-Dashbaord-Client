import { PrintedWorkOrderListPage } from "@/features/work-orders/printed/pages/PrintedWorkOrderListPage";

/**
 * Read-only dashboard view of printed work orders.
 * Reuses the operational `PrintedWorkOrderListPage` with `readOnly` to hide
 * create/edit/delete actions and surface only the View action.
 */
export function DashboardWorkOrdersPrintedPage() {
  return <PrintedWorkOrderListPage readOnly />;
}
