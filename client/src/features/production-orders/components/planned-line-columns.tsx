import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatNumber } from "@/lib/format";
import { PlannedLineRowActions } from "./planned-line-row-actions";
import type { ProductionLineOverview } from "../types";

/**
 * A factory, not a static array: whether a row's edit/cancel actions are disabled
 * depends on the order's lock state, and editing selects the line into the page's plan
 * form rather than opening a self-contained dialog — both are page-level concerns
 * captured once here rather than threaded onto every line record.
 */
export function createPlannedLineColumns({
  isLocked,
  onEdit,
}: {
  isLocked: boolean;
  onEdit: (line: ProductionLineOverview) => void;
}): ColumnDef<ProductionLineOverview>[] {
  return [
    {
      accessorKey: "labelType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Label Type" />,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.labelType}</p>
          <StatusBadge variant={row.original.liveProgress.printedRolls > 0 ? "active" : "pending"}>
            {row.original.liveProgress.printedRolls > 0 ? "In Production" : "Reserved"}
          </StatusBadge>
        </div>
      ),
    },
    {
      id: "quantity",
      accessorFn: (l) => l.planning.quantity,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
      cell: ({ row }) => formatNumber(row.original.planning.quantity, 0),
      meta: { align: "right" },
    },
    {
      id: "labelSize",
      accessorFn: (l) => l.planning.labelSize,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Size (mm)" />,
      cell: ({ row }) => formatNumber(row.original.planning.labelSize, 0),
      meta: { align: "right" },
    },
    {
      id: "material",
      accessorFn: (l) => l.material.materialCode ?? "",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Material" />,
      cell: ({ row }) => (
        <div>
          <p className="font-mono text-xs font-medium">{row.original.material.materialCode ?? "—"}</p>
          <p className="text-xs text-muted-foreground">{row.original.material.description ?? ""}</p>
        </div>
      ),
    },
    {
      id: "assignedRolls",
      accessorFn: (l) => l.material.assignedRolls,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned Rolls" />,
      cell: ({ row }) => (
        <span className="font-semibold tabular-nums">{formatNumber(row.original.material.assignedRolls, 2)}</span>
      ),
      meta: { align: "right" },
    },
    {
      id: "totalRolls",
      accessorFn: (l) => l.planning.totalRolls,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total Rolls" />,
      cell: ({ row }) => formatNumber(row.original.planning.totalRolls, 2),
      meta: { align: "right" },
    },
    {
      id: "printingMachine",
      accessorFn: (l) => l.printing.machineName ?? "",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Printing Machine" />,
      cell: ({ row }) => row.original.printing.machineName ?? "—",
    },
    {
      id: "printingOperator",
      accessorFn: (l) => l.printing.operatorName ?? "",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Printing Operator" />,
      cell: ({ row }) => row.original.printing.operatorName ?? "—",
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      size: 96,
      cell: ({ row }) => (
        <PlannedLineRowActions
          line={row.original}
          disabled={isLocked || row.original.liveProgress.printedRolls > 0}
          onEdit={onEdit}
        />
      ),
    },
  ];
}
