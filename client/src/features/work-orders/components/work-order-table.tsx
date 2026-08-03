import * as React from "react";
import { FileTextIcon, FilterXIcon, Plus } from "lucide-react";
import { DataTable, DataTableEmpty, DataTableToolbar } from "@/shared/components/data-table";
import { EmptyContent } from "@/components/ui/empty";
import { AppButton } from "@/components/forms/AppButton";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { DatePicker } from "@/shared/components/date-picker";
import { useCompanies } from "@/features/companies";
import { useWorkOrders } from "../hooks/use-work-orders";
import { workOrderColumns } from "./work-order-columns";
import {
  WORK_ORDER_STATUS_META,
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
 *
 * The two filters demonstrate the shared Combobox at both ends of its generic signature:
 * a string-union value (status) and a numeric entity id (company).
 */
interface WorkOrderTableProps {
  /** Opens the create dialog — surfaced here too since the empty state needs its own button. */
  onCreateNew: () => void;
}

export function WorkOrderTable({ onCreateNew }: WorkOrderTableProps) {
  const { data, isLoading } = useWorkOrders();
  const { data: companies } = useCompanies();

  const [status, setStatus] = React.useState<WorkOrderStatus | null>(null);
  const [productType, setProductType] = React.useState<ProductType | null>(null);
  const [companyId, setCompanyId] = React.useState<number | null>(null);
  const [dueBefore, setDueBefore] = React.useState<string | null>(null);

  // `Company.id` arrives as a string while `WorkOrder.companyId` is numeric — normalise
  // once here rather than coercing at every comparison.
  const companyOptions = React.useMemo<ComboboxOption<number>[]>(
    () =>
      (companies ?? []).map((c) => ({
        value: Number(c.id),
        label: c.name,
        hint: c.location ?? undefined,
      })),
    [companies]
  );

  const hasExternalFilters =
    status !== null || productType !== null || companyId !== null || dueBefore !== null;
  const clearExternalFilters = () => {
    setStatus(null);
    setProductType(null);
    setCompanyId(null);
    setDueBefore(null);
  };

  const rows = React.useMemo<WorkOrder[]>(() => {
    let result = data ?? [];
    if (status) result = result.filter((wo) => wo.status === status);
    // Rows created before the woven workflow have no productType — treat them as printed.
    if (productType) result = result.filter((wo) => (wo.productType ?? "printed") === productType);
    if (companyId != null) result = result.filter((wo) => wo.companyId === companyId);
    if (dueBefore) result = result.filter((wo) => !!wo.dueDate && wo.dueDate <= dueBefore);
    return result;
  }, [data, status, productType, companyId, dueBefore]);

  // Two distinct empty states: no work orders exist at all (offer to create the first
  // one), versus some exist but the current filters/search hide all of them (offer to
  // clear filters). Showing the same "create one" text with no button in both cases —
  // which is what this replaced — left the genuinely-empty case with no way to act on it.
  const hasAnyWorkOrders = (data ?? []).length > 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={workOrderColumns}
        data={rows}
        loading={isLoading}
        getRowId={(row) => String(row.id)}
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
            <div className="sm:w-52">
              <Combobox
                options={companyOptions}
                value={companyId}
                onChange={setCompanyId}
                placeholder="All companies"
                emptyText="No companies."
                aria-label="Filter by company"
              />
            </div>
            <div className="sm:w-48">
              <DatePicker
                value={dueBefore}
                onChange={setDueBefore}
                placeholder="Due on or before"
                aria-label="Filter by due date"
              />
            </div>
          </DataTableToolbar>
        )}
      />
    </div>
  );
}
