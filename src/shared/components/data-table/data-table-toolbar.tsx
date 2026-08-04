import type { Table } from "@tanstack/react-table";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  /** Placeholder for the global search box. Omit the box entirely with `searchable={false}`. */
  searchPlaceholder?: string;
  searchable?: boolean;
  /** Feature-specific filters. The toolbar lays them out but knows nothing about them. */
  children?: React.ReactNode;
  /** Rendered flush right — bulk actions, export, etc. */
  actions?: React.ReactNode;
}

/**
 * Generic toolbar: a global-filter search box plus a slot for whatever filters the
 * feature wants to pass as children. It reads and writes only TanStack state, so it
 * carries no domain knowledge.
 */
export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Search…",
  searchable = true,
  children,
  actions,
}: DataTableToolbarProps<TData>) {
  const globalFilter = (table.getState().globalFilter as string) ?? "";
  // Column filters are the feature's business; the toolbar only needs to know whether
  // anything is active so it can offer a reset.
  const isFiltered = globalFilter.length > 0 || table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        {searchable && (
          <div className="relative sm:max-w-xs sm:flex-1">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={globalFilter}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-8 pl-8"
            />
          </div>
        )}

        {children}

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              table.setGlobalFilter("");
              table.resetColumnFilters();
            }}
          >
            <XIcon />
            Reset
          </Button>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2">
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          {actions}
        </div>
      )}
    </div>
  );
}
