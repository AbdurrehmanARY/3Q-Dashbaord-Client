import { PageHeader } from "@/components/layout/PageHeader";
import { InventoryStockTable } from "../components/inventory-stock-table";

export function InventoryStockPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory Stock Levels"
        description="Monitor real-time bulk roll stocks. Per SKU Balance is calculated automatically as Remaining Rolls × Roll Per KG."
      />
      <InventoryStockTable />
    </div>
  );
}
