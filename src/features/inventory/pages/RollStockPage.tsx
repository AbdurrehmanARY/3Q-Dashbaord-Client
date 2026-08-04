import { PageHeader } from "@/components/layout/PageHeader";
import { InventoryStockTable } from "../components/inventory-stock-table";

/**
 * Dedicated inventory page for Roll Stock (printed label material rolls).
 */
export function RollStockPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Roll Stock Inventory"
        description="Roll stock inventory ledgers feeding the printed label manufacturing pipeline."
      />

      <InventoryStockTable />
    </div>
  );
}
