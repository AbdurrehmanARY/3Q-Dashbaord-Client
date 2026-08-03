import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type TableMeta,
  type VisibilityState,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableEmpty } from "./data-table-empty";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableSkeleton } from "./data-table-skeleton";
import "./types";

function alignClass(align: "left" | "center" | "right" | undefined) {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return undefined;
}

/**
 * Frozen columns need an opaque background of their own, otherwise the scrolling cells
 * show through them. The edge shadow is what makes the freeze read as intentional rather
 * than as clipped content.
 */
function stickyClass(pinned: "first" | "last" | null, header: boolean) {
  if (!pinned) return undefined;
  return cn(
    "sticky",
    pinned === "first"
      ? "left-0 z-20 border-r border-border/80 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)]"
      : "right-0 z-20 border-l border-border/80 shadow-[-2px_0_4px_-1px_rgba(0,0,0,0.06)]",
    header ? "bg-muted/95 backdrop-blur font-semibold" : "bg-card"
  );
}

export interface DataTableProps<TData extends RowData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Forwarded verbatim to `useReactTable`. The table never inspects it. */
  meta?: TableMeta<TData>;
  /** Rendered above the table; receives the table instance so it can drive filters. */
  toolbar?: (table: ReturnType<typeof useReactTable<TData>>) => React.ReactNode;
  loading?: boolean;
  /** Replaces the default zero-row state — pass a `<DataTableEmpty />` with real copy. */
  empty?: React.ReactNode;
  /** Prepends a checkbox column. Off by default so most tables pay nothing for it. */
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  /** Stable row identity — needed so selection survives sorting and pagination. */
  getRowId?: (row: TData, index: number) => string;
  /** Makes the whole row clickable (navigate, select-as-master, etc). Unrelated to the checkbox `enableRowSelection`. */
  onRowClick?: (row: TData) => void;
  /** Highlights a row as the current selection — e.g. the company whose brands are shown alongside. Purely visual; doesn't require `enableRowSelection`. */
  isRowActive?: (row: TData) => boolean;
  pagination?: boolean;
  initialPageSize?: number;
  className?: string;
  /** Pin the first column while scrolling horizontally — usually the row's identifier. Default: true */
  stickyFirstColumn?: boolean;
  /** Pin the last column while scrolling horizontally — usually an Actions column. Default: true */
  stickyLastColumn?: boolean;
}

/**
 * Generic, feature-agnostic table: TanStack `useReactTable` rendered through the shadcn
 * Table primitives.
 *
 * It knows about columns, rows, sorting, filtering, pagination and selection — and
 * nothing else. Editability is **not** a mode of this component: it is a property of
 * individual columns (`cell: EditableCell`), which is why a single table can mix
 * editable and read-only columns. All this component does is forward `meta` to
 * TanStack so those cells can find their `updateData` callback.
 */
export function DataTable<TData extends RowData, TValue>({
  columns,
  data,
  meta,
  toolbar,
  loading = false,
  empty,
  enableRowSelection = false,
  onRowSelectionChange,
  getRowId,
  onRowClick,
  isRowActive,
  pagination = true,
  initialPageSize = 20,
  className,
  stickyFirstColumn = true,
  stickyLastColumn = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const selectionColumn = React.useMemo<ColumnDef<TData, TValue>>(
    () => ({
      id: "select",
      enableSorting: false,
      enableHiding: false,
      size: 36,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          // base-ui takes `indeterminate` as its own prop, not as a `checked` value.
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(checked) => row.toggleSelected(!!checked)}
          aria-label="Select row"
        />
      ),
    }),
    []
  );

  const resolvedColumns = React.useMemo(
    () => (enableRowSelection ? [selectionColumn, ...columns] : columns),
    [enableRowSelection, selectionColumn, columns]
  );

  const table = useReactTable<TData>({
    data,
    columns: resolvedColumns,
    meta,
    getRowId,
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
    enableRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: (updater) => {
      setRowSelection((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        onRowSelectionChange?.(next);
        return next;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    initialState: { pagination: { pageSize: initialPageSize } },
  });

  const rows = table.getRowModel().rows;

  const pinnedAt = (index: number): "first" | "last" | null => {
    if (stickyFirstColumn && index === 0) return "first";
    if (stickyLastColumn && index === resolvedColumns.length - 1) return "last";
    return null;
  };

  return (
    <div className={cn("w-full", className)}>
      {toolbar?.(table)}

      <div className="relative w-full overflow-auto">
        {loading ? (
          <DataTableSkeleton columnCount={resolvedColumns.length} />
        ) : rows.length === 0 ? (
          // Headers stay mounted so the empty state reads as "this table has no rows"
          // rather than as a missing table.
          <>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((group) => (
                  <TableRow key={group.id} className="bg-muted/30 hover:bg-muted/30">
                    {group.headers.map((header, index) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "h-10",
                          alignClass(header.column.columnDef.meta?.align),
                          stickyClass(pinnedAt(index), true)
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
            </Table>
            {empty ?? <DataTableEmpty />}
          </>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id} className="bg-muted/30 hover:bg-muted/30">
                  {group.headers.map((header, index) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "h-10 whitespace-nowrap",
                        alignClass(header.column.columnDef.meta?.align),
                        stickyClass(pinnedAt(index), true)
                      )}
                      style={header.getSize() !== 150 ? { width: header.getSize() } : undefined}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() || isRowActive?.(row.original) ? "selected" : undefined}
                  className={cn(onRowClick && "cursor-pointer")}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "py-2 text-sm",
                        alignClass(cell.column.columnDef.meta?.align),
                        stickyClass(pinnedAt(index), false)
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {pagination && !loading && rows.length > 0 && <DataTablePagination table={table} />}
    </div>
  );
}
