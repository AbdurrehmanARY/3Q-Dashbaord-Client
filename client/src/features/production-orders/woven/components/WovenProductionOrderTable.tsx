import * as React from "react";
import { FactoryIcon, FileTextIcon, FilterXIcon } from "lucide-react";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { EmptyContent } from "@/components/ui/empty";
import { AppButton } from "@/components/forms/AppButton";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { useWovenProductionOrders, useDeleteWovenProductionOrder } from "../hooks/use-woven-production-orders";
import { wovenProductionOrderColumns } from "./WovenProductionOrderColumns";
import type { ProductionOrder, ProductionOrderStatus } from "@/features/production-orders/types";

const STATUS_OPTIONS: ComboboxOption<ProductionOrderStatus>[] = [
  { value: "planned", label: "Planned" },
  { value: "production", label: "In Production" },
  { value: "complete", label: "Complete" },
];

const PRIORITY_OPTIONS: ComboboxOption<string>[] = [
  { value: "normal", label: "Normal" },
  { value: "urgent", label: "Urgent" },
  { value: "emergency", label: "Emergency" },
];

/** Export columns for the woven workflow — omits "Production Type", includes "Est. Weaving Time". */
const exportColumns: DataTableExportColumn<ProductionOrder>[] = [
  { header: "Production No.", columnId: "productionNumber", value: (po) => po.productionNumber },
  { header: "Priority", columnId: "priority", value: (po) => po.priority ?? "normal" },
  { header: "Status", columnId: "status", value: (po) => po.status },
  { header: "SO Number", columnId: "soNumber", value: (po) => po.soNumber },
  { header: "PO Number", columnId: "poNumber", value: (po) => po.poNumber ?? "" },
  { header: "Company", columnId: "companyBrand", value: (po) => po.companyName ?? "" },
  { header: "Brand", columnId: "companyBrand", value: (po) => po.brandName ?? "" },
  { header: "Total Qty", columnId: "totalQty", value: (po) => po.totalQty },
  { header: "Unplanned Qty", columnId: "unplannedQty", value: (po) => po.unplannedQty ?? Math.max(0, po.totalQty - (po.plannedQty ?? 0)) },
  { header: "Est. Weaving Time", columnId: "estimatedWeavingTime", value: (po) => po.estimatedWeavingHours ?? "" },
  { header: "Machine", columnId: "machineName", value: (po) => po.machineName ?? "Unassigned" },
  { header: "Created Date", columnId: "createdAt", value: (po) => po.createdAt ?? po.orderDate },
];

interface WovenProductionOrderTableProps {
  /** Opens the create dialog — surfaced on the empty state too. */
  onCreateNew?: () => void;
  /** When true, disables mutations and shows only View actions — used by read-only dashboard pages. */
  readOnly?: boolean;
}

export function WovenProductionOrderTable({ onCreateNew, readOnly = false }: WovenProductionOrderTableProps) {
  const { data, isPending, isError } = useWovenProductionOrders();
  const deleteOrder = useDeleteWovenProductionOrder();

  const handleDeleteSelected = async (rows: ProductionOrder[]) => {
    if (rows.length === 0) return;
    const confirmed = window.confirm(
      `Delete ${rows.length} woven production order(s)? This cannot be undone.`
    );
    if (!confirmed) return;
    await Promise.allSettled(rows.map((row) => deleteOrder.mutateAsync(String(row.id))));
  };

  const [status, setStatus] = React.useState<ProductionOrderStatus | null>(null);
  const [priority, setPriority] = React.useState<string | null>(null);

  const hasExternalFilters = !!status || !!priority;
  const clearExternalFilters = () => {
    setStatus(null);
    setPriority(null);
  };

  const rows = React.useMemo<ProductionOrder[]>(() => {
    let result = data ?? [];
    if (status) result = result.filter((po) => po.status === status);
    if (priority) result = result.filter((po) => (po.priority ?? "normal") === priority);
    return result;
  }, [data, status, priority]);

  const hasAnyOrders = (data ?? []).length > 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        tableId="woven-production-orders"
        columns={wovenProductionOrderColumns(readOnly)}
        data={rows}
        loading={isPending}
        getRowId={(row) => String(row.id)}
        enableRowSelection={!readOnly}
        enableColumnPinning
        showColumnToggle
        stickyHeader
        maxBodyHeight="calc(100vh - 280px)"
        exportColumns={exportColumns}
        exportFilename="woven-production-orders"
        enablePrint
        onDeleteSelected={readOnly ? undefined : handleDeleteSelected}
        deleteSelectedLabel="production order"
        empty={
          hasAnyOrders ? (
            <DataTableEmpty
              icon={<FileTextIcon />}
              title="No matching production orders"
              description="Nothing matches the current filters or search."
            >
              {hasExternalFilters && (
                <EmptyContent>
                  <AppButton variant="outline" size="sm" onClick={clearExternalFilters}>
                    <FilterXIcon className="h-4 w-4" />
                    Clear Filters
                  </AppButton>
                </EmptyContent>
              )}
            </DataTableEmpty>
          ) : readOnly ? (
            <DataTableEmpty
              icon={<FileTextIcon />}
              title="No woven production orders"
              description="No data to display."
            />
          ) : (
            <DataTableEmpty
              icon={<FactoryIcon />}
              title="No woven production orders yet"
              description="Raise production orders from eligible woven work orders to begin."
            >
              <EmptyContent>
                <AppButton size="sm" onClick={onCreateNew}>
                  New Production Order
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          )
        }
        toolbar={(table) => (
          <DataTableToolbar table={table} searchPlaceholder="Search SO, PO…">
            <div className="sm:w-44">
              <Combobox
                options={STATUS_OPTIONS}
                value={status}
                onChange={setStatus}
                placeholder="All statuses"
                emptyText="No statuses."
                aria-label="Filter by status"
              />
            </div>
            <div className="sm:w-44">
              <Combobox
                options={PRIORITY_OPTIONS}
                value={priority}
                onChange={setPriority}
                placeholder="All priorities"
                emptyText="No priorities."
                aria-label="Filter by priority"
              />
            </div>
          </DataTableToolbar>
        )}
      />
      {isError && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Failed to load production orders.
        </div>
      )}
    </div>
  );
}
