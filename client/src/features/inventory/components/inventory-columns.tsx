import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatNumber } from "@/lib/format";
import { RollStockRowActions } from "./roll-stock-row-actions";
import type { StockLevel } from "../types";

/**
 * Roll stock ledger. Roll-weight is driven by purchasing (weight per roll on the purchase
 * record) now, so the old editable Roll Per KG / Per SKU Balance pair has been removed.
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
    cell: ({ row }) => {
      const w = Number(row.original.weightPerRoll) || 0;
      const rRolls = Number(row.original.receivedRolls) || 0;
      return (
        <div className="text-right">
          <span className="font-medium">{formatNumber(rRolls, 2)} rolls</span>
          {w > 0 && <p className="text-xs text-muted-foreground">{formatNumber(rRolls * w, 2)} kg</p>}
        </div>
      );
    },
    meta: { align: "right" },
  },
  {
    accessorKey: "issuedRolls",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Issued / Consumed" />,
    cell: ({ row }) => {
      const w = Number(row.original.weightPerRoll) || 0;
      const iRolls = Number(row.original.issuedRolls) || 0;
      return (
        <div className="text-right">
          <span className="font-medium">{formatNumber(iRolls, 2)} rolls</span>
          {w > 0 && <p className="text-xs text-muted-foreground">{formatNumber(iRolls * w, 2)} kg consumed</p>}
        </div>
      );
    },
    meta: { align: "right" },
  },
  {
    accessorKey: "balanceRolls",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Remaining Stock" />,
    cell: ({ row }) => {
      const w = Number(row.original.weightPerRoll) || 0;
      const bRolls = Number(row.original.balanceRolls) || 0;
      return (
        <div className="text-right">
          <span className="font-bold text-primary">{formatNumber(bRolls, 2)} rolls</span>
          {w > 0 && <p className="text-xs font-medium text-muted-foreground">{formatNumber(bRolls * w, 2)} kg remaining</p>}
        </div>
      );
    },
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
    enablePinning: true,
    size: 56,
    cell: ({ row }) => <RollStockRowActions stock={row.original} />,
  },
];
