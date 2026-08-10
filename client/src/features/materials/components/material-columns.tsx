import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatNumber } from "@/lib/format";
import { MaterialRowActions } from "./material-row-actions";
import type { Material } from "../types";

/** Column definitions only — no state, no data fetching. See work-order-columns.tsx for the pattern. */
export const materialColumns: ColumnDef<Material>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
    cell: ({ row }) => <span className="font-mono font-medium">{row.original.code}</span>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Material Description" />,
    cell: ({ row }) => (
      <span className="block max-w-xs truncate">{row.original.description}</span>
    ),
  },
  {
    accessorKey: "weightPerRoll",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Weight / Roll (kg)" />,
    cell: ({ row }) => (
      <span className="tabular-nums">{formatNumber(row.original.weightPerRoll)}</span>
    ),
    meta: { align: "right" },
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row }) => <MaterialRowActions material={row.original} />,
  },
];
