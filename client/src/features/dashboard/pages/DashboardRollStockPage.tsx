import { PackageIcon, FileTextIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { useRollStock } from "@/features/dashboard/hooks/use-dashboard";
import { dashboardRollStockColumns } from "@/features/dashboard/components/DashboardRollStockColumns";
import type { RollStockItem } from "@/features/dashboard/services/ceo-dashboard-service";

const exportColumns: DataTableExportColumn<RollStockItem>[] = [
  { header: "Material Code", columnId: "materialCode", value: (i) => i.materialCode },
  { header: "Type", columnId: "materialType", value: (i) => i.materialType },
  { header: "Description", columnId: "description", value: (i) => i.description ?? "" },
  { header: "Weight/Roll", columnId: "weightPerRoll", value: (i) => Number(i.weightPerRoll) },
  { header: "Min Stock", columnId: "minStockLevel", value: (i) => Number(i.minStockLevel) },
  { header: "Opening Stock", columnId: "openingStock", value: (i) => Number(i.openingStock) },
  { header: "Received Rolls", columnId: "receivedRolls", value: (i) => Number(i.receivedRolls) },
  { header: "Issued Rolls", columnId: "issuedRolls", value: (i) => Number(i.issuedRolls) },
  { header: "Balance Rolls", columnId: "balanceRolls", value: (i) => Number(i.balanceRolls) },
  { header: "Roll/kg", columnId: "rollPerKg", value: (i) => Number(i.rollPerKg) },
  { header: "Low Stock", columnId: "isLowStock", value: (i) => (i.isLowStock ? "Yes" : "No") },
];

export function DashboardRollStockPage() {
  const { data, isPending, isError } = useRollStock();
  const items = data?.items ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roll Stock"
        description="Current roll inventory by material, with low-stock flagging."
      />

      {data?.summary && (
        <div className="grid gap-4 md:grid-cols-4">
          <AppCard className="p-4">
            <div className="text-2xl font-bold">{data.summary.totalMaterials}</div>
            <div className="text-sm text-muted-foreground">Materials</div>
          </AppCard>
          <AppCard className="p-4">
            <div className="text-2xl font-bold">{data.summary.totalBalanceRolls.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Total Balance Rolls</div>
          </AppCard>
          <AppCard className="p-4">
            <div className="text-2xl font-bold">{data.summary.totalIssuedRolls.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Total Issued Rolls</div>
          </AppCard>
          <AppCard className="p-4">
            <div className="text-2xl font-bold text-destructive">{data.summary.lowStockCount}</div>
            <div className="text-sm text-muted-foreground">Low Stock Items</div>
          </AppCard>
        </div>
      )}

      {isError && <AppCard className="p-4 text-destructive">Error loading roll stock</AppCard>}

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <DataTable
          tableId="dashboard-roll-stock"
          columns={dashboardRollStockColumns}
          data={items}
          loading={isPending}
          getRowId={(row) => row.materialCode}
          enableRowSelection={false}
          enableColumnPinning
          showColumnToggle
          stickyHeader
          maxBodyHeight="calc(100vh - 280px)"
          exportColumns={exportColumns}
          exportFilename="dashboard-roll-stock"
          enablePrint
          empty={
            isPending ? (
              <DataTableEmpty
                icon={<PackageIcon />}
                title="Loading roll stock"
                description="Fetching data…"
              />
            ) : items.length === 0 ? (
              <DataTableEmpty
                icon={<PackageIcon />}
                title="No roll stock found"
                description="No data to display."
              />
            ) : (
              <DataTableEmpty
                icon={<FileTextIcon />}
                title="No matching roll stock"
                description="Nothing matches the current search or filters."
              />
            )
          }
          toolbar={(table) => (
            <DataTableToolbar table={table} searchPlaceholder="Search material code, type…" />
          )}
        />
      </div>
    </div>
  );
}

