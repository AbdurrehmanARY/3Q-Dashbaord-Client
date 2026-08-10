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
      id: "companyBrand",
      accessorFn: (row) => `${company.name} ${row.name}`,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Company / Brand" />,
      cell: ({ row }) => (
        <div className="text-sm leading-tight">
          <div className="font-medium text-foreground">{company.name}</div>
          <div className="text-xs text-muted-foreground">{row.original.name}</div>
        </div>
      ),
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
