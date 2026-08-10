import * as React from "react";
import { FileTextIcon, FilterXIcon, Plus } from "lucide-react";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { EmptyContent } from "@/components/ui/empty";
import { AppButton } from "@/components/forms/AppButton";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { formatDate } from "@/lib/format";
import { useWorkOrders, useDeleteWorkOrder } from "../hooks/use-work-orders";
import { workOrderColumns } from "./work-order-columns";
import {
  WORK_ORDER_STATUS_META,
  WORK_ORDER_PRIORITY_META,
  WORK_ORDER_TYPE_META,
  PRODUCT_TYPE_META,
  type WorkOrder,
  type WorkOrderStatus,
  type ProductType,
} from "../types";

const STATUS_OPTIONS: ComboboxOption<WorkOrderStatus>[] = (
  Object.keys(WORK_ORDER_STATUS_META) as WorkOrderStatus[]
).map((status) => ({ value: status, label: WORK_ORDER_STATUS_META[status].label }));

/** Both workflows share this list; this narrows it to one of them. */
const PRODUCT_TYPE_OPTIONS: ComboboxOption<ProductType>[] = (
  Object.keys(PRODUCT_TYPE_META) as ProductType[]
).map((type) => ({
  value: type,
  label: PRODUCT_TYPE_META[type].label,
  hint: PRODUCT_TYPE_META[type].description,
}));

/**
 * Composes the generic DataTable with the work-order column definitions. This is the
 * only place the two meet — the table knows nothing about work orders, and the columns
 * know nothing about fetching.
 */
interface WorkOrderTableProps {
  /** Opens the create dialog — surfaced here too since the empty state needs its own button. */
  onCreateNew: () => void;
}

// `columnId` links each export column to its table column so a hidden column also drops
// from the export. DC/LC both map to the single "dispatch" column.
const exportColumns: DataTableExportColumn<WorkOrder>[] = [
  { header: "SO Number", columnId: "soNumber", value: (wo) => wo.soNumber },
  { header: "PO Number", columnId: "poNumber", value: (wo) => wo.poNumber ?? "" },
  { header: "Type", columnId: "productType", value: (wo) => ((wo.productType ?? "printed") === "woven" ? "Woven" : "Printed") },
  { header: "Design Code", columnId: "designCode", value: (wo) => wo.designCode ?? "" },
  { header: "Company", columnId: "companyName", value: (wo) => wo.companyName ?? "" },
  { header: "Brand", columnId: "brandName", value: (wo) => wo.brandName ?? "" },
  { header: "Priority", columnId: "priority", value: (wo) => WORK_ORDER_PRIORITY_META[wo.priority]?.label ?? wo.priority },
  { header: "Order Type", columnId: "orderType", value: (wo) => WORK_ORDER_TYPE_META[wo.orderType]?.label ?? wo.orderType },
  { header: "Order Date", columnId: "orderDate", value: (wo) => formatDate(wo.orderDate) },
  { header: "Due Date", columnId: "dueDate", value: (wo) => formatDate(wo.dueDate) },
  { header: "Total Qty", columnId: "totalQty", value: (wo) => Number(wo.totalQty) },
  { header: "Status", columnId: "status", value: (wo) => WORK_ORDER_STATUS_META[wo.status].label },
  { header: "DC Number", columnId: "dispatch", value: (wo) => wo.dcNumber ?? "" },
  { header: "LC Number", columnId: "dispatch", value: (wo) => wo.lcNumber ?? "" },
  { header: "FBR Invoice #", columnId: "fbrInvoiceNumber", value: (wo) => wo.fbrInvoiceNumber ?? "" },
];

export function WorkOrderTable({ onCreateNew }: WorkOrderTableProps) {
  const { data, isLoading } = useWorkOrders();
  const deleteWorkOrder = useDeleteWorkOrder();

  // Bulk delete: the API rejects any that production already owns; allSettled lets the
  // deletable ones through and surfaces the rest via the hook's per-error toast.
  const handleDeleteSelected = async (selected: WorkOrder[]) => {
    await Promise.allSettled(selected.map((wo) => deleteWorkOrder.mutateAsync(wo.id)));
  };

  const [status, setStatus] = React.useState<WorkOrderStatus | null>(null);
  const [productType, setProductType] = React.useState<ProductType | null>(null);

  const hasExternalFilters = status !== null || productType !== null;
  const clearExternalFilters = () => {
    setStatus(null);
    setProductType(null);
  };

  const rows = React.useMemo<WorkOrder[]>(() => {
    let result = data ?? [];
    if (status) result = result.filter((wo) => wo.status === status);
    // Rows created before the woven workflow have no productType — treat them as printed.
    if (productType) result = result.filter((wo) => (wo.productType ?? "printed") === productType);
    return result;
  }, [data, status, productType]);

  // Two distinct empty states: no work orders exist at all (offer to create the first
  // one), versus some exist but the current filters/search hide all of them.
  const hasAnyWorkOrders = (data ?? []).length > 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={workOrderColumns}
        data={rows}
        loading={isLoading}
        getRowId={(row) => String(row.id)}
        enableRowSelection
        enableColumnPinning
        enableRowPinning
        showColumnToggle
        stickyHeader
        maxBodyHeight="calc(100vh - 280px)"
        exportColumns={exportColumns}
        exportFilename="work-orders"
        enablePrint
        onDeleteSelected={handleDeleteSelected}
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
          ) : (
            <DataTableEmpty
              icon={<FileTextIcon />}
              title="No work orders yet"
              description="Get started by creating your first sales order."
            >
              <EmptyContent>
                <AppButton size="sm" onClick={onCreateNew}>
                  <Plus className="h-4 w-4" />
                  New Work Order
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          )
        }
        toolbar={(table) => (
          <DataTableToolbar table={table} searchPlaceholder="Search SO, PO, design, DC/LC…">
            <div className="sm:w-44">
              <Combobox
                options={PRODUCT_TYPE_OPTIONS}
                value={productType}
                onChange={setProductType}
                placeholder="All types"
                emptyText="No types."
                aria-label="Filter by product type"
              />
            </div>
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
