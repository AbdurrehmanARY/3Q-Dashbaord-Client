import { DropletIcon, FileTextIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { useThreadStock } from "@/features/dashboard/hooks/use-dashboard";
import { dashboardThreadStockColumns } from "@/features/dashboard/components/DashboardThreadStockColumns";
import type { ThreadStockItem } from "@/features/dashboard/services/ceo-dashboard-service";

const exportColumns: DataTableExportColumn<ThreadStockItem>[] = [
  { header: "Pool", columnId: "stockType", value: (i) => i.stockType },
  { header: "Denier", columnId: "denier", value: (i) => i.denier },
  { header: "Color", columnId: "colorName", value: (i) => i.colorName },
  { header: "Code", columnId: "colorCode", value: (i) => i.colorCode ?? "" },
  { header: "Balance (kg)", columnId: "balanceKg", value: (i) => Number(i.balanceKg) },
  { header: "Received (kg)", columnId: "receivedKg", value: (i) => Number(i.receivedKg) },
  { header: "Consumed (kg)", columnId: "consumedKg", value: (i) => Number(i.consumedKg) },
];

export function DashboardThreadStockPage() {
  const { data, isPending, isError } = useThreadStock();
  const items = data?.items ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Thread Stock"
        description="Thread balance by stock pool, denier and color."
      />

      {data?.summary && (
        <div className="grid gap-4 md:grid-cols-3">
          <AppCard className="p-4">
            <div className="text-2xl font-bold">{data.summary.undyedKg.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Undyed (kg)</div>
          </AppCard>
          <AppCard className="p-4">
            <div className="text-2xl font-bold">{data.summary.dyedKg.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Dyed (kg)</div>
          </AppCard>
          <AppCard className="p-4">
            <div className="text-2xl font-bold">{data.summary.totalKg.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Total (kg)</div>
          </AppCard>
        </div>
      )}

      {isError && <AppCard className="p-4 text-destructive">Error loading thread stock</AppCard>}

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <DataTable
          tableId="dashboard-thread-stock"
          columns={dashboardThreadStockColumns}
          data={items}
          loading={isPending}
          getRowId={(_row, index) => index.toString()}
          enableRowSelection={false}
          enableColumnPinning
          showColumnToggle
          stickyHeader
          maxBodyHeight="calc(100vh - 280px)"
          exportColumns={exportColumns}
          exportFilename="dashboard-thread-stock"
          enablePrint
          empty={
            isPending ? (
              <DataTableEmpty
                icon={<DropletIcon />}
                title="Loading thread stock"
                description="Fetching data…"
              />
            ) : items.length === 0 ? (
              <DataTableEmpty
                icon={<DropletIcon />}
                title="No thread stock found"
                description="No data to display."
              />
            ) : (
              <DataTableEmpty
                icon={<FileTextIcon />}
                title="No matching thread stock"
                description="Nothing matches the current search or filters."
              />
            )
          }
          toolbar={(table) => (
            <DataTableToolbar table={table} searchPlaceholder="Search denier, color…" />
          )}
        />
      </div>
    </div>
  );
}
