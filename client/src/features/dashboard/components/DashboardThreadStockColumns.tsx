import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatNumber } from "@/lib/format";
import type { ThreadStockItem } from "../services/ceo-dashboard-service";

/**
 * Column definitions for the dashboard's thread-stock table.
 * Includes a balance-based low-stock badge and right-aligned numeric columns.
 */
export const dashboardThreadStockColumns: ColumnDef<ThreadStockItem>[] = [
  {
    accessorKey: "stockType",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pool" />,
    cell: ({ row }) => <span className="capitalize">{row.original.stockType}</span>,
  },
  {
    accessorKey: "denier",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Denier" />,
    cell: ({ row }) => <span className="text-sm">{row.original.denier}</span>,
  },
  {
    accessorKey: "colorName",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Color" />,
    cell: ({ row }) => <span className="text-sm">{row.original.colorName}</span>,
  },
  {
    accessorKey: "colorCode",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.colorCode ?? "—"}</span>
    ),
  },
  {
    accessorKey: "balanceKg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance (kg)" align="right" />
    ),
    cell: ({ row }) => (
      <span className="tabular-nums">{formatNumber(row.original.balanceKg, 2)}</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "receivedKg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Received (kg)" align="right" />
    ),
    cell: ({ row }) => (
      <span className="tabular-nums">{formatNumber(row.original.receivedKg, 2)}</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "consumedKg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Consumed (kg)" align="right" />
    ),
    cell: ({ row }) => (
      <span className="tabular-nums">{formatNumber(row.original.consumedKg, 2)}</span>
    ),
    meta: { align: "right" },
  },
  {
    id: "lowStock",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" align="center" />
    ),
    cell: ({ row }) => {
      const isLow = row.original.balanceKg < 1;
      return isLow ? (
        <StatusBadge variant="low-stock">Low</StatusBadge>
      ) : (
        <StatusBadge variant="in-stock">OK</StatusBadge>
      );
    },
  },
];
