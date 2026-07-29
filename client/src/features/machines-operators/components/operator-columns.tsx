import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { OperatorRowActions } from "./operator-row-actions";
import type { Operator } from "../types";

/** Column definitions only — no state, no data fetching. See work-order-columns.tsx for the pattern. */
export const operatorColumns: ColumnDef<Operator>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "designation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Designation" />,
    cell: ({ row }) => (
      <div className="text-sm">
        <span>{row.original.designation}</span>
        <p className="text-xs text-muted-foreground">
          {row.original.employeeCode ?? "—"}
          {row.original.shift ? ` · ${row.original.shift}` : ""}
        </p>
      </div>
    ),
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
    cell: ({ row }) => <OperatorRowActions operator={row.original} />,
  },
];
