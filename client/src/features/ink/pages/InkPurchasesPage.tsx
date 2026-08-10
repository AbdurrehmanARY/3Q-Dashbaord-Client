import { useMemo, useState } from "react";
import { Plus, ShoppingCartIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppButton } from "@/components/forms/AppButton";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { formatDate } from "@/lib/format";
import { InkStockPanel } from "../components/InkStockPanel";
import { InkPurchaseDialog } from "../components/InkPurchaseDialog";
import { inkPurchaseColumns } from "../components/ink-purchase-columns";
import { useInkPurchases, useDeleteInkPurchase } from "../hooks/use-ink";
import type { InkPurchase } from "../types";

const exportColumns: DataTableExportColumn<InkPurchase>[] = [
  { header: "Date", columnId: "reportDate", value: (p) => formatDate(p.reportDate) },
  { header: "Material Code", columnId: "materialCode", value: (p) => p.materialCode },
  { header: "Vendor", columnId: "vendor", value: (p) => p.vendor },
  { header: "Invoice #", columnId: "invoiceNumber", value: (p) => p.invoiceNumber ?? "" },
  { header: "Qty", columnId: "quantity", value: (p) => Number(p.quantity) },
  { header: "Weight/Qty", columnId: "weightPerQty", value: (p) => Number(p.weightPerQty) },
  { header: "Total Weight", columnId: "totalWeight", value: (p) => Number(p.totalWeight) },
];

/** Ink purchasing + live stock. Purchases credit the derived ink stock immediately. */
export function InkPurchasesPage() {
  const { data, isLoading } = useInkPurchases();
  const del = useDeleteInkPurchase();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<InkPurchase | null>(null);

  const openNew = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (p: InkPurchase) => { setEditing(p); setDialogOpen(true); };

  const columns = useMemo(
    () => inkPurchaseColumns({ onEdit: openEdit, onDelete: (id) => del.mutate(id) }),
    [del]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ink Purchases"
        description="Record incoming ink and track live ink stock. Total weight is derived from quantity × weight per quantity."
        actions={
          <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={openNew}>
            New Ink Purchase
          </AppButton>
        }
      />

      <InkStockPanel />

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <DataTable
          columns={columns}
          data={data ?? []}
          loading={isLoading}
          getRowId={(row) => String(row.id)}
          enableColumnPinning
          showColumnToggle
          exportColumns={exportColumns}
          exportFilename="ink-purchases"
          empty={
            <DataTableEmpty
              icon={<ShoppingCartIcon />}
              title="No ink purchases yet"
              description="Record the first ink purchase to start tracking stock."
            />
          }
          toolbar={(table) => <DataTableToolbar table={table} searchPlaceholder="Search code or vendor…" />}
        />
      </div>

      {dialogOpen && (
        <InkPurchaseDialog open purchase={editing} onClose={() => setDialogOpen(false)} />
      )}
    </div>
  );
}
