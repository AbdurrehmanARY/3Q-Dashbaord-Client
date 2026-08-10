import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatDate, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ProductionOrderStatusBadge } from "./ProductionStatusBadge";
import { ProductionOrderRowActions } from "./production-order-row-actions";
import type { ProductionOrder } from "../types";

const PRIORITY_META: Record<string, { label: string; variant: "neutral" | "warning" | "error" }> = {
  normal: { label: "Normal", variant: "neutral" },
  urgent: { label: "Urgent", variant: "warning" },
  emergency: { label: "Emergency", variant: "error" },
};

/**
 * Enhanced column definitions for Production Orders matching full application table standards.
 */
export const productionOrderColumns: ColumnDef<ProductionOrder>[] = [
  {
    accessorKey: "productionNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Production No." />,
    cell: ({ row }) => (
      <span className="font-mono font-medium">{row.original.productionNumber}</span>
    ),
    enableGlobalFilter: false,
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
    enableGlobalFilter: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <ProductionOrderStatusBadge status={row.original.status} />,
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "productType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Production Type" />,
    cell: ({ row }) => {
      const type = row.original.productType ?? "printed";
      return (
        <StatusBadge variant={type === "woven" ? "active" : "pending"}>
          {type === "woven" ? "Woven Label" : "Printed Label"}
        </StatusBadge>
      );
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "soNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SO Number" />,
    cell: ({ row }) => <span className="font-mono font-medium">{row.original.soNumber}</span>,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "poNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PO Number" />,
    cell: ({ row }) => (
      row.original.poNumber ? (
        <span className="font-mono">{row.original.poNumber}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      )
    ),
    enableGlobalFilter: true,
  },
  {
    id: "companyBrand",
    accessorFn: (po) => `${po.companyName ?? ""} ${po.brandName ?? ""}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company / Brand" />,
    cell: ({ row }) => (
      <div className="text-sm leading-tight">
        <div className="font-medium text-foreground">{row.original.companyName ?? "—"}</div>
        <div className="text-xs text-muted-foreground">{row.original.brandName ?? "—"}</div>
      </div>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: "totalQty",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Qty" />,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatNumber(row.original.totalQty, 0)}</span>
    ),
    meta: { align: "right" },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "unplannedQty",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unplanned Qty" />,
    cell: ({ row }) => {
      const un = row.original.unplannedQty ?? Math.max(0, row.original.totalQty - (row.original.plannedQty ?? 0));
      return (
        <span className={cn("font-medium tabular-nums", un > 0 ? "text-amber-600 dark:text-amber-400 font-semibold" : "text-muted-foreground")}>
          {formatNumber(un, 0)}
        </span>
      );
    },
    meta: { align: "right" },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "machineName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Machine" />,
    cell: ({ row }) =>
      row.original.machineName ? (
        <span className="text-sm font-medium">{row.original.machineName}</span>
      ) : (
        <span className="text-muted-foreground">Unassigned</span>
      ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created Date" />,
    cell: ({ row }) => formatDate(row.original.createdAt ?? row.original.orderDate),
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
    size: 56,
    cell: ({ row }) => <ProductionOrderRowActions order={row.original} />,
  },
];
