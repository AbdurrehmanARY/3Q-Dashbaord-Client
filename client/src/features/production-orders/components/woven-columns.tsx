import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { ProgressBar } from "@/shared/components/progress-bar";
import { formatNumber } from "@/lib/format";
import type { WovenLineOverview } from "../woven-types";

export const wovenColumns: ColumnDef<WovenLineOverview>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Line #" />,
    cell: ({ row }) => <span className="font-mono font-medium">Line #{row.original.id}</span>,
    size: 100,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Planned Qty" />,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatNumber(row.original.quantity, 0)} pcs</span>
    ),
    size: 120,
  },
  {
    id: "estimatedWeavingTime",
    accessorFn: (row) => row.weaving.estimatedWeavingHours ?? 0,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Est. Weaving Time" />,
    cell: ({ row }) => {
      const hrs = row.original.weaving.estimatedWeavingHours;
      return hrs != null && hrs > 0 ? (
        <span className="font-semibold tabular-nums text-foreground">{formatNumber(hrs, 2)} hrs</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
    meta: { align: "right" },
    size: 140,
  },
  {
    id: "weavingProgress",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Weaving Stage" />,
    cell: ({ row }) => (
      <div className="py-1">
        <ProgressBar value={row.original.weaving.wovenQty} max={row.original.quantity} unit="pcs" />
      </div>
    ),
  },
  {
    id: "cuttingProgress",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cutting Stage" />,
    cell: ({ row }) => (
      <div className="py-1">
        <ProgressBar value={row.original.cutting.cutQty} max={row.original.quantity} unit="pcs" />
      </div>
    ),
  },
  {
    id: "packagingProgress",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Packaging Stage" />,
    cell: ({ row }) => (
      <div className="py-1">
        <ProgressBar value={row.original.packaging.packagedQty} max={row.original.quantity} unit="pcs" />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const isComplete = row.original.packaging.isComplete;
      const isActive = row.original.weaving.wovenQty > 0 || row.original.cutting.cutQty > 0;
      const variant = isComplete ? "completed" : isActive ? "active" : "pending";
      const label = isComplete ? "Complete" : isActive ? "In Progress" : "Pending";
      return <StatusBadge variant={variant}>{label}</StatusBadge>;
    },
    size: 130,
  },
];
