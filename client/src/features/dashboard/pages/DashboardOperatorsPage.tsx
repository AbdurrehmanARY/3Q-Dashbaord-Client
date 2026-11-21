import { UsersIcon, FileTextIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { useCeoOperators } from "@/features/dashboard/hooks/use-dashboard";
import { dashboardOperatorColumns } from "@/features/dashboard/components/DashboardOperatorColumns";
import type { OperatorItem } from "@/features/dashboard/services/ceo-dashboard-service";

const exportColumns: DataTableExportColumn<OperatorItem>[] = [
  { header: "Name", columnId: "name", value: (o) => o.name },
  { header: "Employee #", columnId: "employeeCode", value: (o) => o.employeeCode ?? "" },
  { header: "Designation", columnId: "designation", value: (o) => o.designation },
  { header: "Type", columnId: "operatorType", value: (o) => o.operatorType },
  { header: "Shift", columnId: "shift", value: (o) => o.shift ?? "" },
  { header: "Status", columnId: "status", value: (o) => o.status },
];

export function DashboardOperatorsPage() {
  const { data, isPending, isError } = useCeoOperators();
  const items = data?.items ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operators"
        description="All operators, with currently active batch assignments."
      />

      {data?.items && (
        <AppCard className="p-4">
          <div className="text-2xl font-bold">{data.items.length}</div>
          <div className="text-sm text-muted-foreground">Total Operators</div>
        </AppCard>
      )}

      {data?.utilization && data.utilization.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Currently Active on Batches</h3>
          {data.utilization.map((u) => (
            <div key={u.operatorId} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <span className="font-medium">{u.operatorName}</span>
                <span className="text-sm text-muted-foreground"> — {u.operatorDesignation}, {u.stage}</span>
              </div>
              <div className="text-right text-sm">
                <div>{u.batchCode}</div>
                <div className="text-muted-foreground">Prod #{u.productionNumber}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && <AppCard className="p-4 text-destructive">Error loading operators</AppCard>}

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <DataTable
          tableId="dashboard-operators"
          columns={dashboardOperatorColumns}
          data={items}
          loading={isPending}
          getRowId={(row) => String(row.id)}
          enableRowSelection={false}
          enableColumnPinning
          showColumnToggle
          stickyHeader
          maxBodyHeight="calc(100vh - 340px)"
          exportColumns={exportColumns}
          exportFilename="dashboard-operators"
          enablePrint
          empty={
            isPending ? (
              <DataTableEmpty
                icon={<UsersIcon />}
                title="Loading operators"
                description="Fetching data…"
              />
            ) : items.length === 0 ? (
              <DataTableEmpty
                icon={<UsersIcon />}
                title="No operators found"
                description="No data to display."
              />
            ) : (
              <DataTableEmpty
                icon={<FileTextIcon />}
                title="No matching operators"
                description="Nothing matches the current search or filters."
              />
            )
          }
          toolbar={(table) => (
            <DataTableToolbar table={table} searchPlaceholder="Search operators…" />
          )}
        />
      </div>
    </div>
  );
}
