import { CpuIcon, FileTextIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { useCeoMachines } from "@/features/dashboard/hooks/use-dashboard";
import { dashboardMachineColumns } from "@/features/dashboard/components/DashboardMachineColumns";
import type { MachineItem } from "@/features/dashboard/services/ceo-dashboard-service";

const exportColumns: DataTableExportColumn<MachineItem>[] = [
  { header: "Machine", columnId: "name", value: (m) => m.name },
  { header: "Machine Code", columnId: "code", value: (m) => m.machineCode },
  { header: "Machine Name", columnId: "machineName", value: (m) => m.machineName ?? "" },
  { header: "Type", columnId: "machineType", value: (m) => m.machineType },
  { header: "Product Type", columnId: "productType", value: (m) => m.productType },
  { header: "Capacity/hr", columnId: "capacityPerHour", value: (m) => m.capacityPerHour ?? 0 },
  { header: "Status", columnId: "status", value: (m) => m.status },
  { header: "Operator", columnId: "operatorName", value: (m) => m.operatorName ?? "" },
];

export function DashboardMachinesPage() {
  const { data, isPending, isError } = useCeoMachines();
  const items = data?.items ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Machines"
        description="All machines, with currently running batches."
      />

      {data?.items && (
        <AppCard className="p-4">
          <div className="text-2xl font-bold">{data.items.length}</div>
          <div className="text-sm text-muted-foreground">Total Machines</div>
        </AppCard>
      )}

      {data?.utilization && data.utilization.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Currently Running Batches</h3>
          {data.utilization.map((u) => (
            <div key={u.machineId} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <span className="font-medium">{u.machineName}</span>
                <span className="text-sm text-muted-foreground"> — {u.machineType}, {u.stage}</span>
              </div>
              <div className="text-right text-sm">
                <div>{u.batchCode}</div>
                <div className="text-muted-foreground">Prod #{u.productionNumber} · {u.assignedRolls} rolls</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && <AppCard className="p-4 text-destructive">Error loading machines</AppCard>}

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <DataTable
          tableId="dashboard-machines"
          columns={dashboardMachineColumns}
          data={items}
          loading={isPending}
          getRowId={(row) => String(row.id)}
          enableRowSelection={false}
          enableColumnPinning
          showColumnToggle
          stickyHeader
          maxBodyHeight="calc(100vh - 340px)"
          exportColumns={exportColumns}
          exportFilename="dashboard-machines"
          enablePrint
          empty={
            isPending ? (
              <DataTableEmpty
                icon={<CpuIcon />}
                title="Loading machines"
                description="Fetching data…"
              />
            ) : items.length === 0 ? (
              <DataTableEmpty
                icon={<CpuIcon />}
                title="No machines found"
                description="No data to display."
              />
            ) : (
              <DataTableEmpty
                icon={<FileTextIcon />}
                title="No matching machines"
                description="Nothing matches the current search or filters."
              />
            )
          }
          toolbar={(table) => (
            <DataTableToolbar table={table} searchPlaceholder="Search machines…" />
          )}
        />
      </div>
    </div>
  );
}
