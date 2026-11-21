import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import type { MachineItem } from "../services/ceo-dashboard-service";

/**
 * Column definitions for the dashboard's machines table.
 *
 * Uses the dashboard API's MachineItem shape (no availability/heldBy fields — the
 * dashboard endpoint only provides a plain status and operatorName).
 */
export const dashboardMachineColumns: ColumnDef<MachineItem>[] = [
  {
    accessorKey: "name",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Machine" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    id: "code",
    accessorFn: (m) => m.machineCode,
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Machine Code" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.machineCode}</span>,
  },
  {
    accessorKey: "machineName",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Machine Name" />,
    cell: ({ row }) => <span className="text-sm">{row.original.machineName ?? "—"}</span>,
  },
  {
    accessorKey: "machineType",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <span className="text-sm">{row.original.machineType}</span>,
  },
  {
    accessorKey: "productType",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Type" />,
    cell: ({ row }) => {
      const pt = row.original.productType;
      return (
        <StatusBadge variant={pt === "woven" ? "active" : pt === "printed" ? "info" : "neutral"}>
          {pt.charAt(0).toUpperCase() + pt.slice(1)}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "capacityPerHour",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity/hr" align="right" />
    ),
    cell: ({ row }) =>
      row.original.capacityPerHour ? (
        <span className="tabular-nums">{row.original.capacityPerHour}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
    meta: { align: "right" },
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
  {
    accessorKey: "operatorName",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Operator" />,
    cell: ({ row }) => (
      <span className="text-sm">{row.original.operatorName ?? "—"}</span>
    ),
  },
];
