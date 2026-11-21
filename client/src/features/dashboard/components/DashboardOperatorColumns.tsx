import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import type { OperatorItem } from "../services/ceo-dashboard-service";

/**
 * Column definitions for the dashboard's operators table.
 *
 * Uses the dashboard API's OperatorItem shape (no availability/heldBy fields — the
 * dashboard endpoint only provides a plain status).
 */
export const dashboardOperatorColumns: ColumnDef<OperatorItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    id: "employeeCode",
    accessorFn: (o) => o.employeeCode,
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Employee #" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.original.employeeCode ?? "—"}</span>
    ),
  },
  {
    accessorKey: "designation",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Designation" />,
    cell: ({ row }) => <span className="text-sm">{row.original.designation}</span>,
  },
  {
    accessorKey: "operatorType",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const ot = row.original.operatorType;
      return <StatusBadge variant="neutral">{ot}</StatusBadge>;
    },
  },
  {
    accessorKey: "shift",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Shift" />,
    cell: ({ row }) => (
      <span className="text-sm">{row.original.shift ?? "—"}</span>
    ),
  },
  {
    accessorKey: "status",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <StatusBadge variant={row.original.status === "Active" ? "online" : "offline"}>
        {row.original.status}
      </StatusBadge>
    ),
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
];
