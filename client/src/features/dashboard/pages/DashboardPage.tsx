import { Link } from "react-router-dom";
import { Package, Droplet, FileText, Factory, Users, Cpu } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { formatNumber } from "@/lib/format";
import { WORK_ORDER_STATUS_META, type WorkOrderStatus } from "@/features/work-orders/types";
import { ProductionOrderStatusBadge } from "@/features/production-orders/components/ProductionStatusBadge";
import {
  useRollStock,
  useThreadStock,
  useCeoWorkOrders,
  useCeoProduction,
  useCeoOperators,
  useCeoMachines,
} from "@/features/dashboard/hooks/use-dashboard";
import type {
  WorkOrderItem,
  ProductionItem,
  MachineItem,
  OperatorItem,
  RollStockItem,
} from "@/features/dashboard/services/ceo-dashboard-service";

const RECENT_LIMIT = 5;

const productTypeBadge = (type: "printed" | "woven") => (
  <StatusBadge variant={type === "woven" ? "active" : "info"}>
    {type === "woven" ? "Woven" : "Printed"}
  </StatusBadge>
);

const workOrderStatusBadge = (status: string) => {
  const meta =
    WORK_ORDER_STATUS_META[status as WorkOrderStatus] ?? {
      label: status,
      variant: "neutral" as const,
    };
  return <StatusBadge variant={meta.variant}>{meta.label}</StatusBadge>;
};

const recentWorkOrderColumns: ColumnDef<WorkOrderItem>[] = [
  {
    accessorKey: "soNumber",
    header: "SO #",
    enableSorting: false,
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.soNumber}</span>,
  },
  {
    accessorKey: "productType",
    header: "Type",
    cell: ({ row }) => productTypeBadge(row.original.productType as "printed" | "woven"),
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => <span className="text-xs">{row.original.companyName ?? "—"}</span>,
  },
  {
    accessorKey: "totalQty",
    header: "Qty",
    meta: { align: "right" },
    cell: ({ row }) => (
      <span className="text-xs tabular-nums">{formatNumber(row.original.totalQty, 0)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => workOrderStatusBadge(row.original.status),
  },
];

const recentProductionColumns: ColumnDef<ProductionItem>[] = [
  {
    accessorKey: "productionNumber",
    header: "Prod #",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.productionNumber}</span>,
  },
  {
    accessorKey: "productType",
    header: "Type",
    cell: ({ row }) => productTypeBadge(row.original.productType as "printed" | "woven"),
  },
  {
    accessorKey: "soNumber",
    header: "SO #",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.soNumber}</span>,
  },
  {
    accessorKey: "totalQty",
    header: "Qty",
    meta: { align: "right" },
    cell: ({ row }) => (
      <span className="text-xs tabular-nums">{formatNumber(row.original.totalQty, 0)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ProductionOrderStatusBadge status={row.original.status as never} />,
  },
];


const dashboardMachineColumns: ColumnDef<MachineItem>[] = [
  {
    accessorKey: "name",
    header: "Machine",
    cell: ({ row }) => <span className="font-medium text-xs">{row.original.name}</span>,
  },
  {
    accessorKey: "machineType",
    header: "Type",
    cell: ({ row }) => <span className="text-xs">{row.original.machineType}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge variant={row.original.status === "Active" ? "online" : "offline"}>
        {row.original.status}
      </StatusBadge>
    ),
  },
];

const dashboardOperatorColumns: ColumnDef<OperatorItem>[] = [
  {
    accessorKey: "name",
    header: "Operator",
    cell: ({ row }) => <span className="font-medium text-xs">{row.original.name}</span>,
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => <span className="text-xs">{row.original.designation}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge variant={row.original.status === "Active" ? "online" : "offline"}>
        {row.original.status}
      </StatusBadge>
    ),
  },
];

const dashboardRollStockColumns: ColumnDef<RollStockItem>[] = [
  {
    accessorKey: "materialCode",
    header: "Code",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.materialCode}</span>,
  },
  {
    accessorKey: "materialType",
    header: "Type",
    cell: ({ row }) => <span className="text-xs">{row.original.materialType}</span>,
  },
  {
    accessorKey: "balanceRolls",
    header: "Balance",
    meta: { align: "right" },
    cell: ({ row }) => (
      <span className="text-xs tabular-nums">{row.original.balanceRolls.toFixed(1)}</span>
    ),
  },
  {
    accessorKey: "isLowStock",
    header: "Status",
    cell: ({ row }) =>
      row.original.isLowStock ? (
        <StatusBadge variant="low-stock">Low</StatusBadge>
      ) : (
        <StatusBadge variant="in-stock">OK</StatusBadge>
      ),
  },
];


function renderCell(columns: ColumnDef<any>[], row: any, col: ColumnDef<any>, i: number) {
  const accessorKey = (col as any).accessorKey;
  const accessorFn = (col as any).accessorFn;
  let value: unknown;
  if (accessorFn) {
    value = accessorFn(row);
  } else if (accessorKey) {
    value = row[accessorKey];
  }
  const cellFn = col.cell as ((ctx: { row: { original: any } }) => React.ReactNode) | undefined;
  const cellContent: React.ReactNode = cellFn ? cellFn({ row: { original: row } }) : String(value ?? "—");
  return (
    <td
      key={col.id ?? accessorKey ?? i}
      className={`px-3 py-2 text-xs ${(col as any).meta?.align === "right" ? "text-right" : "text-left"}`}
    >
      {cellContent}
    </td>
  );
}


function RecentSection<T>({
  title,
  to,
  columns,
  data,
  isLoading,
  getRowId,
}: {
  title: string;
  to: string;
  columns: ColumnDef<T>[];
  data: T[];
  isLoading: boolean;
  getRowId: (row: T) => string;
}) {
  return (
    <AppCard title={title} contentClassName="p-0">
      <Link
        to={to}
        className="block px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        View all →
      </Link>
      {isLoading ? (
        <div className="animate-pulse p-3">
          {Array.from({ length: RECENT_LIMIT }).map((_, i) => (
            <div key={i} className="h-8 rounded bg-muted mb-1 last:mb-0" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {columns.map((col) => {
                  const colAny = col as any;
                  return (
                    <th
                      key={col.id ?? colAny.accessorKey ?? "header"}
                      className="px-3 py-2 text-left text-xs font-medium text-muted-foreground"
                    >
                      {typeof col.header === "string" ? col.header : col.id ?? colAny.accessorKey ?? ""}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={getRowId(row)} className="border-t hover:bg-muted/30">
                  {columns.map((col, i) => renderCell(columns, row, col, i))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppCard>
  );
}


export function DashboardPage() {
  const rollStock = useRollStock();
  const threadStock = useThreadStock();
  const workOrders = useCeoWorkOrders();
  const production = useCeoProduction();
  const operators = useCeoOperators();
  const machines = useCeoMachines();

  const recentWorkOrders = (workOrders.data?.items ?? []).slice(0, RECENT_LIMIT);
  const recentProduction = (production.data?.items ?? []).slice(0, RECENT_LIMIT);
  const recentMachines = (machines.data?.items ?? []).slice(0, RECENT_LIMIT);
  const recentOperators = (operators.data?.items ?? []).slice(0, RECENT_LIMIT);
  const lowStockRolls = (rollStock.data?.items ?? []).filter((i) => i.isLowStock);
  const rollDisplay = lowStockRolls.length > 0
    ? lowStockRolls.slice(0, RECENT_LIMIT)
    : (rollStock.data?.items ?? []).slice(0, RECENT_LIMIT);
  const threadSummary = threadStock.data?.summary;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Facility-wide monitoring — read-only views across stock, orders, production, operators and machines."
      />


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AppCard className="p-4">
          <Link to="/dashboard/roll-stock" className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Roll Stock</h3>
              {!rollStock.isPending && !rollStock.isError && rollStock.data && (
                <p className="text-sm text-muted-foreground">
                  {rollStock.data.summary.totalMaterials} materials
                </p>
              )}
            </div>
          </Link>
        </AppCard>
        <AppCard className="p-4">
          <Link to="/dashboard/thread-stock" className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Droplet className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Thread Stock</h3>
              {!threadStock.isPending && !threadStock.isError && threadStock.data && (
                <p className="text-sm text-muted-foreground">
                  {threadStock.data.summary.totalKg.toFixed(1)} kg thread
                </p>
              )}
            </div>
          </Link>
        </AppCard>
        <AppCard className="p-4">
          <Link to="/dashboard/work-orders" className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Work Orders</h3>
              {!workOrders.isPending && !workOrders.isError && workOrders.data && (
                <p className="text-sm text-muted-foreground">
                  {workOrders.data.summary.total} orders
                </p>
              )}
            </div>
          </Link>
        </AppCard>
        <AppCard className="p-4">
          <Link to="/dashboard/production-orders" className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Factory className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Production</h3>
              {!production.isPending && !production.isError && production.data && (
                <p className="text-sm text-muted-foreground">
                  {production.data.summary.total} production runs
                </p>
              )}
            </div>
          </Link>
        </AppCard>
        <AppCard className="p-4">
          <Link to="/dashboard/operators" className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Operators</h3>
              {!operators.isPending && !operators.isError && operators.data && (
                <p className="text-sm text-muted-foreground">
                  {operators.data.items.length} operators
                </p>
              )}
            </div>
          </Link>
        </AppCard>
        <AppCard className="p-4">
          <Link to="/dashboard/machines" className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Machines</h3>
              {!machines.isPending && !machines.isError && machines.data && (
                <p className="text-sm text-muted-foreground">
                  {machines.data.items.length} machines
                </p>
              )}
            </div>
          </Link>
        </AppCard>
      </div>


      <div className="grid gap-6 lg:grid-cols-2">
        <RecentSection<WorkOrderItem>
          title="Recent Work Orders"
          to="/dashboard/work-orders"
          columns={recentWorkOrderColumns}
          data={recentWorkOrders}
          isLoading={workOrders.isPending}
          getRowId={(row) => String(row.id)}
        />


        <RecentSection<ProductionItem>
          title="Recent Production Orders"
          to="/dashboard/production-orders"
          columns={recentProductionColumns}
          data={recentProduction}
          isLoading={production.isPending}
          getRowId={(row) => String(row.id)}
        />

        <RecentSection<MachineItem>
          title="Active Machines"
          to="/dashboard/machines"
          columns={dashboardMachineColumns}
          data={recentMachines}
          isLoading={machines.isPending}
          getRowId={(row) => String(row.id)}
        />
        <RecentSection<OperatorItem>
          title="Active Operators"
          to="/dashboard/operators"
          columns={dashboardOperatorColumns}
          data={recentOperators}
          isLoading={operators.isPending}
          getRowId={(row) => String(row.id)}
        />
        <RecentSection<RollStockItem>
          title={lowStockRolls.length > 0 ? "Low Stock Rolls" : "Roll Stock"}
          to="/dashboard/roll-stock"
          columns={dashboardRollStockColumns}
          data={rollDisplay}
          isLoading={rollStock.isPending}
          getRowId={(row) => row.materialCode}
        />
        <AppCard
          title="Thread Stock"
          headerActions={
            <Link
              to="/dashboard/thread-stock"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View all →
            </Link>
          }
          contentClassName="p-4"
        >
          {threadStock.isPending ? (
            <div className="animate-pulse space-y-2">
              <div className="h-6 w-3/4 rounded bg-muted" />
              <div className="h-6 w-1/2 rounded bg-muted" />
              <div className="h-6 w-1/4 rounded bg-muted" />
            </div>
          ) : threadSummary ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Undyed (kg)</span>
                <span className="font-medium tabular-nums">{threadSummary.undyedKg.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dyed (kg)</span>
                <span className="font-medium tabular-nums">{threadSummary.dyedKg.toFixed(1)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Total (kg)</span>
                <span className="font-bold tabular-nums">{threadSummary.totalKg.toFixed(1)}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No data.</p>
          )}
        </AppCard>
      </div>
    </div>
  );
}

