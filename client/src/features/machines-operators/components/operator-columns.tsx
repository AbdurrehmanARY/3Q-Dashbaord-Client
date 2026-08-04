import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { OperatorAvatarName } from "@/components/feedback/OperatorAvatar";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { OperatorRowActions } from "./operator-row-actions";
import { OPERATOR_TYPE_META, type Operator } from "../types";

/** Column definitions only — no state, no data fetching. See work-order-columns.tsx for the pattern. */
export const operatorColumns: ColumnDef<Operator>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Operator" />,
    // Small circular avatar beside the name — the standard table treatment.
    cell: ({ row }) => (
      <OperatorAvatarName
        name={row.original.name}
        avatarUrl={row.original.avatarUrl}
        hint={row.original.employeeCode}
      />
    ),
  },
  {
    accessorKey: "designation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Designation" />,
    cell: ({ row }) => (
      <div className="text-sm">
        <span>{row.original.designation}</span>
        <p className="text-xs text-muted-foreground">{row.original.shift ?? "—"}</p>
      </div>
    ),
  },
  {
    // Which product line they can work — drives which production pickers offer them.
    accessorKey: "operatorType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const meta = OPERATOR_TYPE_META[row.original.operatorType ?? "both"];
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
    cell: ({ row }) => <OperatorRowActions operator={row.original} />,
  },
];
