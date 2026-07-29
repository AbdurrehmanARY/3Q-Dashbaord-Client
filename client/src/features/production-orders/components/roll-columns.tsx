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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Planned Rolls" />,
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {formatNumber(row.original.planning.totalRolls, 0)}
      </span>
    ),
  },
  {
    id: "printedRolls",
    accessorFn: (line) => line.printing.printedRolls,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Printed Rolls" />,
    cell: ({ row }) => (
      <span className="tabular-nums">{formatNumber(row.original.printing.printedRolls, 0)}</span>
    ),
    size: 120,
  },
  {
    id: "completion",
    accessorFn: (line) => line.liveProgress.completionPct,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Completion" />,
    cell: ({ row }) => (
      <ProgressBar
        value={row.original.printing.printedRolls}
        max={row.original.planning.totalRolls}
        unit="rolls"
      />
    ),
    size: 180,
  },
  {
    id: "packaged",
    accessorFn: (line) => line.packaging.packagedRolls,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Packaged" />,
    cell: ({ row }) => (
      <span className="tabular-nums">{formatNumber(row.original.packaging.packagedRolls, 0)}</span>
    ),
  },
];
