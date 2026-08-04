import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader, EditableCellNumber } from "@/shared/components/data-table";
import { formatNumber } from "@/lib/format";
import { RollStockRowActions } from "./roll-stock-row-actions";
import type { StockLevel } from "../types";

/**
 * A single table mixing read-only and editable columns: only `rollPerKg` opts into
 * editing (`cell: EditableCellNumber`) — everything else, including the computed
 * `perSkuBalance` right next to it, stays plain read-only in the same table.
 */
export const inventoryColumns: ColumnDef<StockLevel>[] = [
  {
    accessorKey: "materialCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Material Code" />,
    cell: ({ row }) => <span className="font-mono font-semibold">{row.original.materialCode}</span>,
  },
  {
    id: "details",
    accessorFn: (s) => s.itemName ?? "",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Details" />,
    cell: ({ row }) => (
      <div>
        <span className="font-medium">{row.original.itemName}</span>
        <p className="text-xs text-muted-foreground">Type: {row.original.materialType}</p>
      </div>
    ),
  },
  {
    accessorKey: "receivedRolls",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Received" />,
    cell: ({ row }) => <span>{formatNumber(row.original.receivedRolls, 0)} rolls</span>,
    meta: { align: "right" },
  },
  {
    accessorKey: "issuedRolls",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Issued" />,
    cell: ({ row }) => <span>{formatNumber(row.original.issuedRolls, 0)} rolls</span>,
    meta: { align: "right" },
  },
  {
    accessorKey: "balanceRolls",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Remaining Rolls" />,
    cell: ({ row }) => (
      <span className="font-bold text-primary">{formatNumber(row.original.balanceRolls, 0)} rolls</span>
    ),
    meta: { align: "right" },
  },
  {
    // THE editable column — see inventory-stock-table.tsx for the commit/optimistic-update wiring.
    accessorKey: "rollPerKg",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Roll Per KG" />,
    cell: EditableCellNumber,
    meta: { align: "right" },
    size: 120,
  },
  {
    accessorKey: "perSkuBalance",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Per SKU Balance" />,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatNumber(row.original.perSkuBalance ?? 0, 2)}</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status ?? "in-stock";
      return (
        <StatusBadge variant={status}>
          {status === "in-stock" ? "In Stock" : status === "low-stock" ? "Low Stock" : "Out of Stock"}
        </StatusBadge>
      );
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row }) => <RollStockRowActions stock={row.original} />,
  },
];
