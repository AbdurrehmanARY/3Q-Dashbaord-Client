import * as React from "react";
import { FileTextIcon, FilterXIcon } from "lucide-react";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { EmptyContent } from "@/components/ui/empty";
import { AppButton } from "@/components/forms/AppButton";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { formatNumber } from "@/lib/format";
import {
  WORK_ORDER_STATUS_META,
  type WorkOrder,
  type WorkOrderStatus,
} from "@/features/work-orders/types";
import { usePrintedWorkOrders, useDeletePrintedWorkOrder } from "../hooks/use-printed-work-orders";
import { printedWorkOrderColumns } from "./PrintedWorkOrderColumns";

const STATUS_OPTIONS: ComboboxOption<WorkOrderStatus>[] = (
  Object.keys(WORK_ORDER_STATUS_META) as WorkOrderStatus[]
).map((status) => ({ value: status, label: WORK_ORDER_STATUS_META[status].label }));

/** Export columns for the printed workflow — omits the "Type" column (always printed). */
const exportColumns: DataTableExportColumn<WorkOrder>[] = [
  { header: "SO Number", columnId: "soNumber", value: (wo) => wo.soNumber },
  { header: "PO Number", columnId: "poNumber", value: (wo) => wo.poNumber ?? "" },
  { header: "Company", columnId: "companyBrand", value: (wo) => wo.companyName ?? "" },
  { header: "Brand", columnId: "companyBrand", value: (wo) => wo.brandName ?? "" },
  { header: "Priority", columnId: "priority", value: (wo) => (wo.priority ? wo.priority : "—") },
  { header: "Order Type", columnId: "orderType", value: (wo) => wo.orderType },
  { header: "Order Date", columnId: "orderDate", value: (wo) => wo.orderDate },
  { header: "Due Date", columnId: "dueDate", value: (wo) => wo.dueDate ?? "" },
  { header: "Total Qty", columnId: "totalQty", value: (wo) => Number(wo.totalQty) },
  { header: "Status", columnId: "status", value: (wo) => WORK_ORDER_STATUS_META[wo.status].label },
  { header: "DC Number", columnId: "dispatch", value: (wo) => wo.dcNumber ?? "" },
  { header: "LC Number", columnId: "dispatch", value: (wo) => wo.lcNumber ?? "" },
  { header: "FBR Invoice #", columnId: "fbrInvoiceNumber", value: (wo) => wo.fbrInvoiceNumber ?? "" },
];

/**
 * Composes the generic DataTable with the printed-work-order column definitions.
 */
interface PrintedWorkOrderTableProps {
  /** Opens the create dialog — surfaced on the empty state too. */
  onCreateNew?: () => void;
  /** When true, disables mutations and shows only View actions — used by read-only dashboard pages. */
  readOnly?: boolean;
}

export function PrintedWorkOrderTable({ onCreateNew, readOnly = false }: PrintedWorkOrderTableProps) {
  const query = {};
  const { data, isPending, isError } = usePrintedWorkOrders(query);
  const deleteWorkOrder = useDeletePrintedWorkOrder();

  const handleDeleteSelected = async (rows: WorkOrder[]) => {
    if (rows.length === 0) return;
    const confirmed = window.confirm(
      `Delete ${rows.length} printed order(s)? This cannot be undone.`
    );
    if (!confirmed) return;
    for (const row of rows) {
      await deleteWorkOrder.mutateAsync(row.id);
    }
  };

  const [status, setStatus] = React.useState<WorkOrderStatus | null>(null);

  const hasExternalFilters = status !== null;
  const clearExternalFilters = () => setStatus(null);

  const rows = React.useMemo<WorkOrder[]>(() => {
    let result = data ?? [];
    if (status) result = result.filter((wo) => wo.status === status);
    return result;
  }, [data, status]);

  const hasAnyWorkOrders = (data ?? []).length > 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        tableId="printed-work-orders"
        columns={printedWorkOrderColumns(readOnly)}
        data={rows}
        loading={isPending}
        getRowId={(row) => String(row.id)}
        enableRowSelection={!readOnly}
        enableColumnPinning
        enableRowPinning={!readOnly}
        showColumnToggle
        stickyHeader
        maxBodyHeight="calc(100vh - 280px)"
        exportColumns={exportColumns}
        exportFilename="printed-work-orders"
        enablePrint
        onDeleteSelected={readOnly ? undefined : handleDeleteSelected}
        deleteSelectedLabel="work order"
        empty={
          hasAnyWorkOrders ? (
            <DataTableEmpty
              icon={<FileTextIcon />}
              title="No matching work orders"
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
              title="No printed work orders"
              description="No data to display."
            />
          ) : (
            <DataTableEmpty
              icon={<FileTextIcon />}
              title="No printed work orders yet"
              description="Get started by creating your first printed sales order."
            >
              <EmptyContent>
                <AppButton size="sm" onClick={onCreateNew}>
                  New Printed Order
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          )
        }
        toolbar={(table) => (
          <DataTableToolbar table={table} searchPlaceholder="Search SO, PO, DC/LC…">
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
          </DataTableToolbar>
        )}
      />
    </div>
  );
}
