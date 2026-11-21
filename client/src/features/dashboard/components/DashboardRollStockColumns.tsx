import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import type { RollStockItem } from "../services/ceo-dashboard-service";

/**
 * Column definitions for the dashboard's roll-stock table.
 * Includes a low-stock badge column and right-aligned numeric columns.
 */
export const dashboardRollStockColumns: ColumnDef<RollStockItem>[] = [
  {
    accessorKey: "materialCode",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Material Code" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">{row.original.materialCode}</span>
    ),
  },
  {
    accessorKey: "materialType",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <span className="text-sm">{row.original.materialType}</span>,
  },
  {
    accessorKey: "description",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => <span className="text-sm">{row.original.description ?? "—"}</span>,
  },
  {
    accessorKey: "balanceRolls",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance Rolls" align="right" />
    ),
    cell: ({ row }) => (
      <span className="tabular-nums">{row.original.balanceRolls.toFixed(1)}</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "issuedRolls",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Issued Rolls" align="right" />
    ),
    cell: ({ row }) => (
      <span className="tabular-nums">{row.original.issuedRolls.toFixed(1)}</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "isLowStock",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Low Stock" align="center" />
    ),
    cell: ({ row }) =>
      row.original.isLowStock ? (
        <StatusBadge variant="low-stock">Low</StatusBadge>
      ) : (
        <StatusBadge variant="in-stock">OK</StatusBadge>
      ),
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
];
