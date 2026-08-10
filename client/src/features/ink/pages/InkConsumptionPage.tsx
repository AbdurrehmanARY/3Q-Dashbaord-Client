import { useMemo, useState } from "react";
import { Plus, DropletIcon, Search, X, FilterXIcon, Calendar, ScaleIcon, LayersIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppButton } from "@/components/forms/AppButton";
import { Input } from "@/components/ui/input";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { formatDateTime, formatNumber } from "@/lib/format";
import { useOperators } from "@/features/machines-operators";
import { InkConsumptionDialog } from "../components/InkConsumptionDialog";
import { InkOperatorBreakdown } from "../components/InkOperatorBreakdown";
import { inkConsumptionColumns } from "../components/ink-consumption-columns";
import { useInkConsumptions, useDeleteInkConsumption } from "../hooks/use-ink";
import type { InkConsumption } from "../types";

const exportColumns: DataTableExportColumn<InkConsumption>[] = [
  { header: "When", columnId: "consumedAt", value: (c) => formatDateTime(c.consumedAt) },
  { header: "Material Code", columnId: "materialCode", value: (c) => c.materialCode },
  { header: "Operator", columnId: "operatorName", value: (c) => c.operatorName ?? "" },
  { header: "Qty", columnId: "qtyAssigned", value: (c) => Number(c.qtyAssigned) },
  { header: "Weight", columnId: "weight", value: (c) => Number(c.weight) },
  { header: "Note", columnId: "note", value: (c) => c.note ?? "" },
];

/** Ink consumption: log usage (deducts from stock), full history, and per-operator totals. */
export function InkConsumptionPage() {
  const { data, isLoading } = useInkConsumptions();
  const { data: operatorsData } = useOperators({ productType: "printed" });
  const del = useDeleteInkConsumption();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [materialCodeSearch, setMaterialCodeSearch] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const columns = useMemo(() => inkConsumptionColumns((id) => del.mutate(id)), [del]);

  const operatorOptions = useMemo<ComboboxOption<string>[]>(() => {
    const set = new Set<string>();
    (operatorsData ?? []).forEach((op) => {
      if (op.name) set.add(op.name);
    });
    (data ?? []).forEach((c) => {
      if (c.operatorName) set.add(c.operatorName);
    });
    return Array.from(set).map((name) => ({ value: name, label: name }));
  }, [operatorsData, data]);

  const filteredData = useMemo(() => {
    let result = data ?? [];
    if (selectedOperator) {
      result = result.filter(
        (c) => (c.operatorName ?? "").toLowerCase() === selectedOperator.toLowerCase()
      );
    }
    if (materialCodeSearch.trim()) {
      const term = materialCodeSearch.trim().toLowerCase();
      result = result.filter((c) =>
        (c.materialCode ?? "").toLowerCase().includes(term)
      );
    }
    if (fromDate) {
      const fromTime = new Date(fromDate).setHours(0, 0, 0, 0);
      result = result.filter((c) => {
        const time = new Date(c.consumedAt).getTime();
        return time >= fromTime;
      });
    }
    if (toDate) {
      const toTime = new Date(toDate).setHours(23, 59, 59, 999);
      result = result.filter((c) => {
        const time = new Date(c.consumedAt).getTime();
        return time <= toTime;
      });
    }
    return result;
  }, [data, selectedOperator, materialCodeSearch, fromDate, toDate]);

  const totals = useMemo(() => {
    let q = 0;
    let w = 0;
    filteredData.forEach((c) => {
      q += Number(c.qtyAssigned ?? 0);
      w += Number(c.weight ?? 0);
    });
    return { totalQty: q, totalWeight: w };
  }, [filteredData]);

  const hasFilters = selectedOperator !== null || materialCodeSearch.trim() !== "" || fromDate !== "" || toDate !== "";
  const clearFilters = () => {
    setSelectedOperator(null);
    setMaterialCodeSearch("");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ink Consumption"
        description="Log ink used on the floor. Each entry deducts its weight from the material's ink stock."
        actions={
          <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setDialogOpen(true)}>
            Log Consumption
          </AppButton>
        }
      />

      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Full History</TabsTrigger>
          <TabsTrigger value="by-operator">By Operator</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-4">
          <div className="overflow-hidden rounded-xl border bg-card shadow-card">
            <DataTable
              columns={columns}
              data={filteredData}
              loading={isLoading}
              getRowId={(row) => String(row.id)}
              enableColumnPinning
              showColumnToggle
              exportColumns={exportColumns}
              exportFilename="ink-consumption"
              empty={
                <DataTableEmpty
                  icon={<DropletIcon />}
                  title="No consumption recorded"
                  description="Nothing matches the current search or filters."
                />
              }
              toolbar={(table) => (
                <DataTableToolbar table={table} searchPlaceholder="Search notes, dates…">
                  <div className="relative flex items-center sm:w-48">
                    <Search className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground" />
                    <Input
                      value={materialCodeSearch}
                      onChange={(e) => setMaterialCodeSearch(e.target.value)}
                      placeholder="Filter Material Code…"
                      className="h-8 w-full pl-8 pr-7 text-xs"
                    />
                    {materialCodeSearch && (
                      <button
                        type="button"
                        onClick={() => setMaterialCodeSearch("")}
                        className="absolute right-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="sm:w-48">
                    <Combobox
                      options={operatorOptions}
                      value={selectedOperator}
                      onChange={setSelectedOperator}
                      placeholder="All Printed Operators"
                      emptyText="No operators found."
                      aria-label="Filter by printed operator"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3.5 text-muted-foreground shrink-0" />
                      <Input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        title="From Date"
                        aria-label="From Date"
                        className="h-8 w-32 px-2 text-xs"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">to</span>
                    <Input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      title="To Date"
                      aria-label="To Date"
                      className="h-8 w-32 px-2 text-xs"
                    />
                  </div>
                  {hasFilters && (
                    <AppButton
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 text-xs"
                    >
                      <FilterXIcon className="mr-1.5 size-3.5" />
                      Clear Filters
                    </AppButton>
                  )}
                </DataTableToolbar>
              )}
            />

            {!isLoading && filteredData.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-4 border-t bg-muted/30 px-5 py-3 text-sm">
                <div className="flex items-center gap-2 font-medium text-muted-foreground">
                  <span>Total Entries:</span>
                  <span className="font-semibold text-foreground">{formatNumber(filteredData.length, 0)}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <LayersIcon className="size-4 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Total Qty:</span>
                    <span className="font-semibold tabular-nums text-foreground">
                      {formatNumber(totals.totalQty, 2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ScaleIcon className="size-4 text-primary" />
                    <span className="font-medium text-muted-foreground">Total Weight:</span>
                    <span className="font-bold tabular-nums text-primary text-base">
                      {formatNumber(totals.totalWeight, 3)} kg
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="by-operator" className="mt-4">
          <InkOperatorBreakdown />
        </TabsContent>
      </Tabs>

      {dialogOpen && <InkConsumptionDialog open onClose={() => setDialogOpen(false)} />}
    </div>
  );
}
