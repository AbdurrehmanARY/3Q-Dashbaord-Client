import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { MachineRowActions } from "./machine-row-actions";
import { OPERATOR_TYPE_META, type Machine } from "../types";

/** Column definitions only — no state, no data fetching. See work-order-columns.tsx for the pattern. */
export const machineColumns: ColumnDef<Machine>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    id: "code",
    accessorFn: (m) => m.machineCode,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code / Type" />,
    cell: ({ row }) => (
      <div className="text-sm">
        <span className="font-mono">{row.original.machineCode}</span>
        <p className="text-xs text-muted-foreground">{row.original.machineType}</p>
      </div>
    ),
  },
  {
    accessorKey: "productType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Label Line" />,
    cell: ({ row }) => {
      const meta = OPERATOR_TYPE_META[row.original.productType ?? "both"];
      return <StatusBadge variant={meta.variant}>{meta.label}</StatusBadge>;
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    accessorKey: "availability",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Availability" />,
    cell: ({ row }) => (
      <AvailabilityBadge availability={row.original.availability} heldBy={row.original.heldBy} />
    ),
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <StatusBadge variant={row.original.status === "Active" ? "online" : "offline"}>
        {row.original.status}
      </StatusBadge>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row }) => <MachineRowActions machine={row.original} />,
  },
];
