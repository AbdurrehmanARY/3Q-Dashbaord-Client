import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FactoryIcon, RefreshCwIcon, FilterXIcon } from "lucide-react";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { AppButton } from "@/components/forms/AppButton";
import { formatDate } from "@/lib/format";
import { useProductionOrders, useDeleteProductionOrder } from "../hooks/use-production-orders";
import { productionOrderColumns } from "./production-order-columns";
import type { ProductionOrder } from "../types";

const exportColumns: DataTableExportColumn<ProductionOrder>[] = [
  { header: "Production No.", columnId: "productionNumber", value: (po) => po.productionNumber },
  { header: "Priority", columnId: "priority", value: (po) => po.priority ?? "normal" },
  { header: "Status", columnId: "status", value: (po) => po.status },
  { header: "Production Type", columnId: "productType", value: (po) => (po.productType === "woven" ? "Woven Labels" : "Printed Labels") },
  { header: "SO Number", columnId: "soNumber", value: (po) => po.soNumber },
  { header: "PO Number", columnId: "poNumber", value: (po) => po.poNumber ?? "" },
  { header: "Company", columnId: "companyName", value: (po) => po.companyName ?? "" },
  { header: "Brand", columnId: "brandName", value: (po) => po.brandName ?? "" },
  { header: "Total Qty", columnId: "totalQty", value: (po) => po.totalQty },
  { header: "Unplanned Qty", columnId: "unplannedQty", value: (po) => po.unplannedQty ?? Math.max(0, po.totalQty - (po.plannedQty ?? 0)) },
  { header: "Machine", columnId: "machineName", value: (po) => po.machineName ?? "Unassigned" },
  { header: "Created Date", columnId: "createdAt", value: (po) => formatDate(po.createdAt ?? po.orderDate) },
];

/**
 * Advanced Production Order Table with column-header enum filtering (Production Type, Status, Priority),
 * global search, column visibility toggle, Excel export, print, bulk actions, and sticky headers.
 */
export function ProductionOrderTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isRefetching } = useProductionOrders();
  const deleteOrder = useDeleteProductionOrder();

  const handleDeleteSelected = async (selected: ProductionOrder[]) => {
    await Promise.allSettled(selected.map((po) => deleteOrder.mutateAsync(String(po.id))));
  };

  return (
    <div className="space-y-4">
      {isError && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {(error as Error).message}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <DataTable
          columns={productionOrderColumns}
          data={data ?? []}
          loading={isLoading}
          getRowId={(row) => String(row.id)}
          enableRowSelection
          showColumnToggle
          stickyHeader
          maxBodyHeight="calc(100vh - 280px)"
          exportColumns={exportColumns}
          exportFilename="production-orders"
          enablePrint
          onDeleteSelected={handleDeleteSelected}
          deleteSelectedLabel="production order"
          empty={
            <DataTableEmpty
              icon={<FactoryIcon />}
              title="No production orders"
              description="Nothing matches the current filters or search criteria."
            />
          }
          toolbar={(table) => {
            const hasColumnFilters = table.getState().columnFilters.length > 0;
            const hasGlobalFilter = !!table.getState().globalFilter;
            const isFiltered = hasColumnFilters || hasGlobalFilter;

            const statusValue = (table.getColumn("status")?.getFilterValue() as string) ?? "";
            const priorityValue = (table.getColumn("priority")?.getFilterValue() as string) ?? "";
            const productTypeValue = (table.getColumn("productType")?.getFilterValue() as string) ?? "";

            return (
              <DataTableToolbar
                table={table}
                searchPlaceholder="Search SO #, PO #…"
              >
                <select
                  value={statusValue}
                  onChange={(e) => table.getColumn("status")?.setFilterValue(e.target.value || undefined)}
                  className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  aria-label="Filter by Status"
                >
                  <option value="">All Statuses</option>
                  <option value="planned">Planned</option>
                  <option value="production">In Production</option>
                  <option value="complete">Complete</option>
                </select>

                <select
                  value={priorityValue}
                  onChange={(e) => table.getColumn("priority")?.setFilterValue(e.target.value || undefined)}
                  className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  aria-label="Filter by Priority"
                >
                  <option value="">All Priorities</option>
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Emergency</option>
                </select>

                <select
                  value={productTypeValue}
                  onChange={(e) => table.getColumn("productType")?.setFilterValue(e.target.value || undefined)}
                  className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  aria-label="Filter by Production Type"
                >
                  <option value="">All Production Types</option>
                  <option value="printed">Printed Labels</option>
                  <option value="woven">Woven Labels</option>
                </select>

                {isFiltered && (
                  <AppButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      table.resetColumnFilters();
                      table.setGlobalFilter("");
                    }}
                    className="h-8 text-xs"
                  >
                    <FilterXIcon className="mr-1.5 size-3.5" />
                    Reset Filters
                  </AppButton>
                )}
                <AppButton
                  variant="ghost"
                  size="icon"
                  title="Refresh data"
                  onClick={() => refetch()}
                  disabled={isRefetching || isLoading}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <RefreshCwIcon className={`size-4 ${isRefetching ? "animate-spin" : ""}`} />
                </AppButton>
              </DataTableToolbar>
            );
          }}
        />
      </div>
    </div>
  );
}
