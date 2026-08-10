import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { ProgressBar } from "@/shared/components/progress-bar";
import { formatNumber } from "@/lib/format";
import type { ProductionLineOverview } from "../types";

/**
 * Read-only summary columns for the roll-tracking table. Editing Printed Rolls (and every
 * other counter) happens exclusively in the Production Progress table so there is one
 * source of edits — see the note in `RollTrackingTable`.
 */
export const rollColumns: ColumnDef<ProductionLineOverview>[] = [
  {
    accessorKey: "labelType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Label Type" />,
    cell: ({ row }) => <span className="font-medium">{row.original.labelType}</span>,
  },
  {
    id: "stage",
    accessorFn: (line) => line.status,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stage" />,
    cell: ({ row }) => {
      const line = row.original;
      const stage =
        line.packaging.packagedRolls > 0
          ? "Packaging"
          : line.cutting.cutRolls > 0
            ? "Cutting"
            : line.printing.printedRolls > 0
              ? "Printing"
              : "Not started";
      return (
        <StatusBadge variant={stage === "Not started" ? "pending" : "active"}>{stage}</StatusBadge>
      );
    },
  },
  {
    id: "totalRolls",
    accessorFn: (line) => line.planning.totalRolls,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Planned" />,
    cell: ({ row }) => (
      <span className="tabular-nums font-medium">
        {formatNumber(row.original.planning.totalRolls, 2)}
      </span>
    ),
  },
  {
    id: "unprinted",
    accessorFn: (line) => Math.max(line.planning.totalRolls - line.printing.printedRolls, 0),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unprinted Balance" />,
    cell: ({ row }) => {
      const unprinted = Math.max(row.original.planning.totalRolls - row.original.printing.printedRolls, 0);
      return (
        <span className="tabular-nums font-semibold text-blue-600 dark:text-blue-400">
          {formatNumber(unprinted, 2)}
        </span>
      );
    },
  },
  {
    id: "printedRolls",
    accessorFn: (line) => line.printing.printedRolls,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Printed" />,
    cell: ({ row }) => (
      <span className="tabular-nums">{formatNumber(row.original.printing.printedRolls, 2)}</span>
    ),
  },
  {
    id: "waitingForCutting",
    accessorFn: (line) => line.liveProgress.waitingForCutting,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Avail for Cutting" />,
    cell: ({ row }) => (
      <span className="tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
        {formatNumber(row.original.liveProgress.waitingForCutting, 2)}
      </span>
    ),
  },
  {
    id: "cutRolls",
    accessorFn: (line) => line.cutting.cutRolls,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cutted" />,
    cell: ({ row }) => (
      <span className="tabular-nums">{formatNumber(row.original.cutting.cutRolls, 2)}</span>
    ),
  },
  {
    id: "waitingForPackaging",
    accessorFn: (line) => line.liveProgress.waitingForPackaging,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Avail for Packaging" />,
    cell: ({ row }) => (
      <span className="tabular-nums font-semibold text-indigo-600 dark:text-indigo-400">
        {formatNumber(row.original.liveProgress.waitingForPackaging, 2)}
      </span>
    ),
  },
  {
    id: "packaged",
    accessorFn: (line) => line.packaging.packagedRolls,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Packaged" />,
    cell: ({ row }) => (
      <span className="tabular-nums font-semibold text-success">
        {formatNumber(row.original.packaging.packagedRolls, 2)}
      </span>
    ),
  },
  {
    id: "completion",
    accessorFn: (line) => line.liveProgress.completionPct,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Completion" />,
    cell: ({ row }) => (
      <ProgressBar
        value={row.original.packaging.packagedRolls}
        max={row.original.planning.totalRolls}
        unit="rolls"
      />
    ),
    size: 160,
  },
];
