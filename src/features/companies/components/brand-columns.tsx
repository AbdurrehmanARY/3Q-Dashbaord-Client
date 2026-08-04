import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { BrandRowActions } from "./brand-row-actions";
import type { Brand, Company } from "../types";

/**
 * A factory, not a static array: every row's edit dialog needs the parent `Company` the
 * brand belongs to, and that's one value for the whole table rather than per-row data —
 * so it's captured once here instead of being threaded onto every `Brand` record.
 */
export function createBrandColumns(company: Company): ColumnDef<Brand>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Brand Name" />,
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      size: 56,
      cell: ({ row }) => <BrandRowActions brand={row.original} company={company} />,
    },
  ];
}
