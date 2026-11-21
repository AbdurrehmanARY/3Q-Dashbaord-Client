import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatDate, formatNumber } from "@/lib/format";
import { ProductionOrderStatusBadge } from "@/features/production-orders/components/ProductionStatusBadge";
import type { ProductionOrderStatus } from "@/features/production-orders/types";
import { DashboardProductionOrderRowActions } from "./DashboardProductionOrderRowActions";
import type { ProductionItem } from "../services/ceo-dashboard-service";

const PRIORITY_META: Record<
  string,
  { label: string; variant: "neutral" | "warning" | "error" }
> = {
  normal: { label: "Normal", variant: "neutral" },
  urgent: { label: "Urgent", variant: "warning" },
  emergency: { label: "Emergency", variant: "error" },
};

/**
 * Column definitions for the dashboard's combined (printed + woven) production-orders table.
 *
 * Adds a "Product Type" badge column so users can distinguish printed from woven orders
 * at a glance. Row actions are always read-only (View only).
 */
export const dashboardProductionOrderColumns: ColumnDef<ProductionItem>[] = [
  {
    accessorKey: "productionNumber",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Production No." />,
    cell: ({ row }) => (
      <span className="font-mono font-medium">{row.original.productionNumber}</span>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const p = row.original.priority ?? "normal";
      const meta = PRIORITY_META[p] ?? PRIORITY_META.normal;
      return <StatusBadge variant={meta.variant}>{meta.label}</StatusBadge>;
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    accessorKey: "status",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <ProductionOrderStatusBadge status={row.original.status as ProductionOrderStatus} />
    ),
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    accessorKey: "soNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SO Number" />,
    cell: ({ row }) => <span className="font-mono font-medium">{row.original.soNumber}</span>,
  },
  {
    accessorKey: "poNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PO Number" />,
    cell: ({ row }) =>
      row.original.poNumber ? (
        <span className="font-mono">{row.original.poNumber}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "productType",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Type" />,
    cell: ({ row }) => {
      const label = row.original.productType === "woven" ? "Woven" : "Printed";
      return (
        <StatusBadge variant={row.original.productType === "woven" ? "active" : "info"}>
          {label}
        </StatusBadge>
      );
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    id: "companyBrand",
    accessorFn: (po) => `${po.companyName ?? ""} ${po.brandName ?? ""}`,
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company / Brand" />,
    cell: ({ row }) => (
      <div className="text-sm leading-tight">
        <div className="font-medium text-foreground">{row.original.companyName ?? "—"}</div>
        <div className="text-xs text-muted-foreground">{row.original.brandName ?? "—"}</div>
      </div>
    ),
  },
  {
    accessorKey: "totalQty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Qty" align="right" />
    ),
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatNumber(row.original.totalQty, 0)}</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "plannedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Planned" />,
    cell: ({ row }) => (row.original.plannedAt ? formatDate(row.original.plannedAt) : "—"),
  },
  {
    accessorKey: "completedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Completed" />,
    cell: ({ row }) => (row.original.completedAt ? formatDate(row.original.completedAt) : "—"),
  },
  {
    id: "createdAt",
    accessorFn: (po) => po.createdAt,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row }) => <DashboardProductionOrderRowActions order={row.original} />,
  },
];
