import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatDate, formatNumber } from "@/lib/format";
import { PurchaseRowActions } from "./purchase-row-actions";
import type { PurchaseRecord } from "../types";

/** Column definitions only — no state, no data fetching. See work-order-columns.tsx for the pattern. */
export const purchaseColumns: ColumnDef<PurchaseRecord>[] = [
  {
    accessorKey: "reportDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => <span className="text-sm">{formatDate(row.original.reportDate)}</span>,
  },
  {
    accessorKey: "materialCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Material Code" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-semibold">{row.original.materialCode}</span>
    ),
  },
  {
    id: "material",
    accessorFn: (p) => p.itemName ?? p.materialType ?? "",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Material" />,
    cell: ({ row }) => (
      <span className="block max-w-[140px] truncate text-sm text-muted-foreground">
        {row.original.itemName ?? row.original.materialType ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "vendor",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
    cell: ({ row }) => <span className="text-sm">{row.original.vendor}</span>,
  },
  {
    accessorKey: "cartonQty",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cartons" />,
    cell: ({ row }) => <span className="text-sm tabular-nums">{formatNumber(row.original.cartonQty, 0)}</span>,
    meta: { align: "right" },
  },
  {
    accessorKey: "rollsPerCarton",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rolls/Ctn" />,
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">{formatNumber(row.original.rollsPerCarton, 0)}</span>
    ),
    meta: { align: "right" },
  },
  {
    id: "totalRolls",
    accessorFn: (p) => p.cartonQty * p.rollsPerCarton,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Rolls" />,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        {formatNumber(row.original.cartonQty * row.original.rollsPerCarton, 0)}
      </span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "rollLength",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Roll Length" />,
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">{formatNumber(row.original.rollLength)} m</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "netWeight",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Net Wt (kg)" />,
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">{formatNumber(row.original.netWeight)} kg</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "totalRollPer200m",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Roll/200m" />,
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">{formatNumber(row.original.totalRollPer200m)}</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "invoiceWeight",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice Wt (kg)" />,
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">{formatNumber(row.original.invoiceWeight)} kg</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "localWeight",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Local Wt (kg)" />,
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">{formatNumber(row.original.localWeight)} kg</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "gdNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="GD #" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.gdNumber ?? "—"}</span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row }) => <PurchaseRowActions purchase={row.original} />,
  },
];
