import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FactoryIcon } from "lucide-react";
import { DataTable, DataTableEmpty, DataTableToolbar } from "@/shared/components/data-table";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { AppInput } from "@/components/forms/AppInput";
import { useProductionOrders } from "../hooks/use-production-orders";
import { productionOrderColumns } from "./production-order-columns";
import type { ProductionOrderStatus } from "../types";

const STATUS_OPTIONS: ComboboxOption<ProductionOrderStatus>[] = [
  { value: "planned", label: "Planned" },
  { value: "production", label: "Production" },
  { value: "complete", label: "Complete" },
];

/**
 * Composes the generic DataTable with the production-order column definitions. SO/PO
 * search hits the server (matching the ILIKE search the API already does); status is a
 * client-side filter over the fetched page.
 */
export function ProductionOrderTable() {
  const navigate = useNavigate();
  const [soNumber, setSoNumber] = React.useState("");
  const [poNumber, setPoNumber] = React.useState("");
  const [status, setStatus] = React.useState<ProductionOrderStatus | null>(null);

  const { data, isLoading, isError, error } = useProductionOrders({
    soNumber: soNumber || undefined,
    poNumber: poNumber || undefined,
    status: status || undefined,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 sm:max-w-xs">
          <AppInput
            label="SO Number"
            placeholder="Search sales order…"
            value={soNumber}
            onChange={(e) => setSoNumber(e.target.value)}
          />
        </div>
        <div className="flex-1 sm:max-w-xs">
          <AppInput
            label="PO Number"
            placeholder="Search PO number…"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
          />
        </div>
      </div>

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
          onRowClick={(row) => navigate(`/production-orders/${row.id}`)}
          empty={
            <DataTableEmpty
              icon={<FactoryIcon />}
              title="No production orders"
              description="Nothing matches the current filters, or none have been raised yet."
            />
          }
          toolbar={(table) => (
            <DataTableToolbar table={table} searchable={false}>
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
    </div>
  );
}
