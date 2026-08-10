import * as React from "react";
import { ShoppingCartIcon, PlusIcon, XIcon } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { EmptyContent } from "@/components/ui/empty";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { DatePicker } from "@/shared/components/date-picker";
import { formatDate } from "@/lib/format";
import { usePurchases } from "../hooks/use-purchases";
import { purchaseColumns } from "./purchase-columns";
import type { PurchaseRecord } from "../types";

// columnId links each export column to its table column so hiding a column drops it from export.
const exportColumns: DataTableExportColumn<PurchaseRecord>[] = [
  { header: "Date", columnId: "reportDate", value: (p) => formatDate(p.reportDate) },
  { header: "Material Code", columnId: "materialCode", value: (p) => p.materialCode },
  { header: "Material", columnId: "material", value: (p) => p.itemName ?? p.materialType ?? "" },
  { header: "Vendor", columnId: "vendor", value: (p) => p.vendor },
  { header: "Cartons", columnId: "cartonQty", value: (p) => Number(p.cartonQty) },
  { header: "Rolls/Ctn", columnId: "rollsPerCarton", value: (p) => Number(p.rollsPerCarton) },
  { header: "Total Rolls", columnId: "totalRolls", value: (p) => p.cartonQty * p.rollsPerCarton },
  { header: "Roll Length", columnId: "rollLength", value: (p) => Number(p.rollLength) },
  { header: "Net Weight", columnId: "netWeight", value: (p) => Number(p.netWeight) },
  { header: "Weight/Roll", columnId: "localWeight", value: (p) => Number(p.localWeight ?? 0) },
  { header: "Total Weight", columnId: "totalWeight", value: (p) => Number((p.cartonQty * p.rollsPerCarton * Number(p.localWeight ?? 0)).toFixed(2)) },
  { header: "GD #", columnId: "gdNumber", value: (p) => p.gdNumber ?? "" },
];

interface PurchaseTableProps {
  /** The create dialog is opened from two places (page header + empty state). */
  onCreateNew: () => void;
}

/**
 * Composes the generic DataTable with the purchase column definitions.
 *
 * Vendor / material code / date-range filters hit the server (`usePurchases(filters)`)
 * rather than the table's own client-side global search — purchase history can be large,
 * and this mirrors the filtering the API already supports (ILIKE on vendor/materialCode).
 */
export function PurchaseTable({ onCreateNew }: PurchaseTableProps) {
  const [vendor, setVendor] = React.useState("");
  const [materialCode, setMaterialCode] = React.useState("");
  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);

  const filters = React.useMemo(
    () => ({
      vendor: vendor || undefined,
      materialCode: materialCode || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    }),
    [vendor, materialCode, startDate, endDate]
  );
  const hasFilters = Boolean(vendor || materialCode || startDate || endDate);
  const clearFilters = () => {
    setVendor("");
    setMaterialCode("");
    setStartDate(null);
    setEndDate(null);
  };

  const { data, isLoading } = usePurchases(filters);

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={purchaseColumns}
        data={data ?? []}
        loading={isLoading}
        getRowId={(row) => row.id}
        // Column pinning replaces the old fixed first/last freeze; users pin as needed.
        enableColumnPinning
        enableRowSelection
        showColumnToggle
        exportColumns={exportColumns}
        exportFilename="roll-purchases"
        empty={
          (data ?? []).length === 0 && !hasFilters ? (
            <DataTableEmpty icon={<ShoppingCartIcon />} title="No purchase records yet" description="Record the first incoming material purchase.">
              <EmptyContent>
                <AppButton size="sm" onClick={onCreateNew}>
                  <PlusIcon className="h-4 w-4" />
                  New Purchase
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          ) : (
            <DataTableEmpty icon={<ShoppingCartIcon />} title="No matching purchase records" description="Nothing matches the current filters.">
              {hasFilters && (
                <EmptyContent>
                  <AppButton variant="outline" size="sm" onClick={clearFilters}>
                    <XIcon className="h-4 w-4" />
                    Clear Filters
                  </AppButton>
                </EmptyContent>
              )}
            </DataTableEmpty>
          )
        }
        toolbar={(table) => (
          <DataTableToolbar table={table} searchable={false}>
            <div className="w-40">
              <AppInput
                placeholder="Search vendor…"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="w-36">
              <AppInput
                placeholder="Material code…"
                value={materialCode}
                onChange={(e) => setMaterialCode(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="w-36">
              <DatePicker value={startDate} onChange={setStartDate} placeholder="From" aria-label="Filter from date" />
            </div>
            <div className="w-36">
              <DatePicker value={endDate} onChange={setEndDate} placeholder="To" aria-label="Filter to date" />
            </div>
            {hasFilters && (
              <AppButton variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs gap-1">
                <XIcon className="h-3 w-3" /> Clear
              </AppButton>
            )}
          </DataTableToolbar>
        )}
      />
    </div>
  );
}
