import type { Column, Table } from "@tanstack/react-table";
import { Settings2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Nice column name for the toggle list — `meta.label`, else a de-camelCased id. */
function columnLabel<TData>(column: Column<TData>): string {
  const label = column.columnDef.meta?.label;
  if (label) return label;
  return column.id
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

/**
 * "Columns" dropdown — show/hide any column where `getCanHide()` is true. The `select` and
 * `actions` columns opt out via `enableHiding: false`, so they never appear here.
 */
export function DataTableViewOptions<TData>({ table }: { table: Table<TData> }) {
  const hideable = table.getAllColumns().filter((c) => c.getCanHide());
  if (hideable.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8")}>
        <Settings2Icon className="size-4" />
        Columns
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-80 w-48 overflow-y-auto">
        {/* A plain heading, not DropdownMenuLabel — base-ui's GroupLabel throws unless it
            sits inside a DropdownMenuGroup, which would crash the whole menu render. */}
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Toggle columns</div>
        <DropdownMenuSeparator />
        {hideable.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            {columnLabel(column)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
