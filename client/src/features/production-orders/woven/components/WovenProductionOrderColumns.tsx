import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatDate, formatNumber } from "@/lib/format";
import { ProductionOrderStatusBadge } from "../../components/ProductionStatusBadge";
import { WovenProductionOrderRowActions } from "./WovenProductionOrderRowActions";
import type { ProductionOrder } from "@/features/production-orders/types";

const PRIORITY_META: Record<string, { label: string; variant: "neutral" | "warning" | "error" }> = {
  normal: { label: "Normal", variant: "neutral" },
  urgent: { label: "Urgent", variant: "warning" },
  emergency: { label: "Emergency", variant: "error" },
};

/**
 * Column definitions for the woven workflow table.
 *
 * These mirror `productionOrderColumns` but:
 *  — Omit the "Production Type" badge column (this page is woven-only).
 *  — Surface the "Est. Weaving Time" column prominently.
 *
 * Pass `readOnly: true` to render only the View action — used by read-only
 * dashboard pages.
 */
export const wovenProductionOrderColumns = (readOnly = false): ColumnDef<ProductionOrder>[] => [
  {
    accessorKey: "productionNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Production No." />,
    cell: ({ row }) => (
      <span className="font-mono font-medium">{row.original.productionNumber}</span>
    ),
    enableSorting: false,
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
    id: "companyBrand",
    accessorFn: (po) => `${po.companyName ?? ""} ${po.brandName ?? ""}`,
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Qty" align="right" />,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatNumber(row.original.totalQty, 0)}</span>
    ),
    meta: { align: "right" },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "unplannedQty",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unplanned Qty" align="right" />,
    cell: ({ row }) => {
      const un = row.original.unplannedQty ?? Math.max(0, row.original.totalQty - (row.original.plannedQty ?? 0));
      return (
        <span className={`font-medium tabular-nums ${un > 0 ? "text-amber-600 dark:text-amber-400 font-semibold" : "text-muted-foreground"}`}>
          {formatNumber(un, 0)}
        </span>
      );
    },
    meta: { align: "right" },
    enableGlobalFilter: false,
  },
  {
    id: "estimatedWeavingTime",
    accessorFn: (row) => row.estimatedWeavingHours ?? 0,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Est. Weaving Time" align="right" />,
    cell: ({ row }) => {
      const hrs = row.original.estimatedWeavingHours;
      if (hrs == null || hrs <= 0) return <span className="text-muted-foreground">—</span>;
      return <span className="font-semibold tabular-nums text-foreground">{formatNumber(hrs, 2)} hrs</span>;
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
    cell: ({ row }) => <WovenProductionOrderRowActions order={row.original} readOnly={readOnly} />,
  },
];
