import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { CompanyRowActions } from "./company-row-actions";
import type { Company } from "../types";

/** Column definitions only — no state, no data fetching. See work-order-columns.tsx for the pattern. */
export const companyColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.email ?? "—"}</span>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.location ?? "—"}</span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row }) => <CompanyRowActions company={row.original} />,
  },
];
