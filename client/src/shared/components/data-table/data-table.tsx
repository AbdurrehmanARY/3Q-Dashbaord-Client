import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Cell,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type Header,
  type Row,
  type RowData,
  type RowPinningState,
  type RowSelectionState,
  type SortingState,
  type Table as TanstackTable,
  type TableMeta,
  type VisibilityState,
} from "@tanstack/react-table";
import { FileSpreadsheetIcon, PrinterIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppButton } from "@/components/forms/AppButton";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { DataTableEmpty } from "./data-table-empty";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableSkeleton } from "./data-table-skeleton";
import { DataTableViewOptions } from "./data-table-view-options";
import { PrintTable, exportRowsToExcel, type DataTableExportColumn } from "./data-table-export";
import "./types";

function alignClass(align: "left" | "center" | "right" | undefined) {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return undefined;
}

/**
 * Legacy sticky, keyed by column index (first/last). Used when `enableColumnPinning` is off,
 * so every existing table keeps its exact freeze behaviour with no changes.
 */
// function legacyStickyClass(pinned: "first" | "last" | null, header: boolean) {
//   if (!pinned) return undefined;
//   return cn(
//     "sticky",
//     pinned === "first"
//       ? "left-0 z-20 border-r border-border/80 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)]"
//       : "right-0 z-20 border-l border-border/80 shadow-[-2px_0_4px_-1px_rgba(0,0,0,0.06)]",
//     header ? "bg-muted/95 backdrop-blur font-semibold" : "bg-card"
//   );
// }

/**
 * TanStack column-pinning sticky offset — accurate for any number of pinned columns.
 * The background is set inline (not via a `bg-*` class) so it is guaranteed opaque and
 * cannot be stripped by class-merging: a see-through frozen column lets the scrolling
 * body bleed under it and reads as "not frozen". Header cells sit on `--muted`, body
 * cells on `--card`, matching the rest of the table.
 */
function pinStyle<TData>(column: Column<TData, unknown>, header: boolean): React.CSSProperties | undefined {
  const pinned = column.getIsPinned();
  if (!pinned) return undefined;
  const base: React.CSSProperties = { zIndex: 20, background: header ? "var(--muted)" : "var(--card)" };
  return pinned === "left"
    ? { position: "sticky", left: column.getStart("left"), ...base }
    : { position: "sticky", right: column.getAfter("right"), ...base };
}

function pinClass<TData>(column: Column<TData, unknown>, header: boolean): string | undefined {
  const pinned = column.getIsPinned();
  if (!pinned) return undefined;
  const isEdge = pinned === "left" ? column.getIsLastColumn("left") : column.getIsFirstColumn("right");
  return cn(
    pinned === "left" && isEdge && "border-r border-border/80 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)]",
    pinned === "right" && isEdge && "border-l border-border/80 shadow-[-2px_0_4px_-1px_rgba(0,0,0,0.06)]",
    header && "font-semibold"
  );
}

/** The id TanStack will assign a column def (id, else accessorKey). */
function resolveColumnId<TData, TValue>(col: ColumnDef<TData, TValue>): string | undefined {
  if (col.id) return col.id;
  const accessorKey = (col as { accessorKey?: string | number }).accessorKey;
  return accessorKey != null ? String(accessorKey) : undefined;
}

/** Drop export columns whose matching table column is hidden, so export == what's on screen. */
function visibleExportColumns<TData>(
  table: TanstackTable<TData>,
  columns: DataTableExportColumn<TData>[]
): DataTableExportColumn<TData>[] {
  return columns.filter((c) => {
    if (!c.columnId) return true;
    const col = table.getColumn(c.columnId);
    return !col || col.getIsVisible();
  });
}

export interface DataTableProps<TData extends RowData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: TableMeta<TData>;
  toolbar?: (table: TanstackTable<TData>) => React.ReactNode;
  loading?: boolean;
  empty?: React.ReactNode;
  /** Prepends a checkbox column and shows the "X of Y selected" status line. */
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  getRowId?: (row: TData, index: number) => string;
  onRowClick?: (row: TData) => void;
  isRowActive?: (row: TData) => boolean;
  pagination?: boolean;
  initialPageSize?: number;
  className?: string;
  /** Legacy freeze of the first column by index. Ignored when `enableColumnPinning`. Default: false
   *  (column pinning replaces the old always-on freeze). */
  stickyFirstColumn?: boolean;
  /** Legacy freeze of the last column by index. Ignored when `enableColumnPinning`. Default: false */
  stickyLastColumn?: boolean;

  /* ---- Opt-in advanced features ---- */
  /** TanStack column pinning: per-column Pin left/right/unpin, sticky via getStart/getAfter. */
  enableColumnPinning?: boolean;
  /** TanStack row pinning: rows pinned top/bottom stay put through sort/filter. */
  enableRowPinning?: boolean;
  /** Show a "Columns" show/hide dropdown in the action bar. */
  showColumnToggle?: boolean;
  /** Providing these enables Export All / Export Selected (and Print if `enablePrint`). */
  exportColumns?: DataTableExportColumn<TData>[];
  exportFilename?: string;
  /** Show "Print Selected" — renders a plain print-only table of the selected rows. */
  enablePrint?: boolean;
  /** Freeze the header row while the body scrolls (needs `maxBodyHeight` to scroll internally). */
  stickyHeader?: boolean;
  /** Cap the scroll container height (any CSS length) so the body scrolls under a sticky header. */
  maxBodyHeight?: string;
  /** Show "Delete Selected" — confirmed once, then this runs for the selected originals. */
  onDeleteSelected?: (rows: TData[]) => void | Promise<void>;
  deleteSelectedLabel?: string;
}

/**
 * Generic, feature-agnostic table over TanStack `useReactTable` + shadcn primitives.
 *
 * Sorting, filtering, pagination, selection, editability (per-column `EditableCell`),
 * column/row pinning, column visibility, export and print are all supported — every
 * advanced feature is opt-in so the ~15 existing tables are unaffected by default.
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
  stickyFirstColumn = false,
  stickyLastColumn = false,
  enableColumnPinning = false,
  enableRowPinning = false,
  showColumnToggle = false,
  exportColumns,
  exportFilename = "export",
  enablePrint = false,
  stickyHeader = false,
  maxBodyHeight,
  onDeleteSelected,
  deleteSelectedLabel = "record",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowPinning, setRowPinning] = React.useState<RowPinningState>({ top: [], bottom: [] });

  const selectionColumn = React.useMemo<ColumnDef<TData, TValue>>(
    () => ({
      id: "select",
      enableSorting: false,
      enableHiding: false,
      enablePinning: true,
      size: 36,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
          onClick={(e) => e.stopPropagation()}
        />
      ),
    }),
    []
  );

  const resolvedColumns = React.useMemo(
    () => (enableRowSelection ? [selectionColumn, ...columns] : columns),
    [enableRowSelection, selectionColumn, columns]
  );

  // Default pins, only in the pinning-enabled path: select left, last column (actions) right,
  // and — when there's no selection column — the first column left.
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(() => {
    if (!enableColumnPinning) return { left: [], right: [] };
    const left: string[] = [];
    const right: string[] = [];
    if (stickyFirstColumn && !enableRowSelection) {
      const first = resolveColumnId(columns[0]);
      if (first) left.push(first);
    }
    if (stickyLastColumn) {
      const last = resolveColumnId(columns[columns.length - 1]);
      if (last) right.push(last);
    }
    return { left, right };
  });

  const table = useReactTable<TData>({
    data,
    columns: resolvedColumns,
    meta,
    getRowId,
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter, columnPinning, rowPinning },
    enableRowSelection,
    enableColumnPinning,
    enableRowPinning,
    keepPinnedRows: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onColumnPinningChange: setColumnPinning,
    onRowPinningChange: setRowPinning,
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

  const centerRows = table.getRowModel().rows;
  const hasRows = centerRows.length > 0 || (enableRowPinning && (table.getTopRows().length || table.getBottomRows().length));

  const columnCount = resolvedColumns.length;
  const sticky = (col: Column<TData, unknown>, index: number, header: boolean) => {
    if (enableColumnPinning) return { className: pinClass(col, header), style: pinStyle(col, header) };
    const legacy =
      stickyFirstColumn && index === 0 ? "first" : stickyLastColumn && index === columnCount - 1 ? "last" : null;
    // Opaque inline background here too, for the same reason as pinStyle (see its note).
    const style: React.CSSProperties | undefined = legacy
      ? { background: header ? "var(--muted)" : "var(--card)" }
      : undefined;
    // return { className: legacyStickyClass(legacy, header), style };
    return { className: "", style };

  };

  const renderCell = (cell: Cell<TData, unknown>, index: number) => {
    const s = sticky(cell.column, index, false);
    return (
      <TableCell
        key={cell.id}
        className={cn("py-2 text-sm", alignClass(cell.column.columnDef.meta?.align), s.className)}
        style={s.style}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  };

  const renderRow = (row: Row<TData>) => (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() || isRowActive?.(row.original) ? "selected" : undefined}
      className={cn(
        "hover:bg-muted/50",
        onRowClick && "cursor-pointer",
        row.getIsPinned() && "bg-primary/5"
      )}
      onClick={onRowClick ? () => onRowClick(row.original) : undefined}
    >
      {row.getVisibleCells().map((cell, index) => renderCell(cell, index))}
    </TableRow>
  );

  const renderHeader = (header: Header<TData, unknown>, index: number) => {
    const s = sticky(header.column, index, true);
    const style: React.CSSProperties = {
      ...(header.getSize() !== 150 ? { width: header.getSize() } : {}),
      ...s.style,
    };
    if (stickyHeader) {
      // Freeze the header row. A pinned header cell already carries a left/right offset,
      // opaque background and z-index from pinStyle — keep it above the pinned body cells;
      // a plain header cell gets its own sticky-top offset, muted background and z-index.
      const pinnedCell = s.style?.position === "sticky";
      style.position = "sticky";
      style.top = 0;
      style.zIndex = pinnedCell ? 30 : 10;
      if (!style.background) style.background = "var(--muted)";
    }
    return (
      <TableHead
        key={header.id}
        className={cn("h-10 whitespace-nowrap", alignClass(header.column.columnDef.meta?.align), s.className)}
        style={style}
      >
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
      </TableHead>
    );
  };

  const selectedRows = enableRowSelection ? table.getFilteredSelectedRowModel().rows.map((r) => r.original) : [];
  // Show when there's a selection status to display, a Columns toggle, or export buttons
  // (Export All works without any selection).
  const showActionBar = enableRowSelection || showColumnToggle || !!exportColumns;

  return (
    <div className={cn("w-full", className)}>
      {toolbar?.(table)}

      {showActionBar && (
        <DataTableActionBar
          table={table}
          enableRowSelection={enableRowSelection}
          showColumnToggle={showColumnToggle}
          exportColumns={exportColumns}
          exportFilename={exportFilename}
          enablePrint={enablePrint}
          onDeleteSelected={onDeleteSelected}
          deleteSelectedLabel={deleteSelectedLabel}
        />
      )}

      <div className="relative w-full overflow-auto" style={maxBodyHeight ? { maxHeight: maxBodyHeight } : undefined}>
        {loading ? (
          <DataTableSkeleton columnCount={columnCount} />
        ) : !hasRows ? (
          <>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((group) => (
                  <TableRow key={group.id} className="bg-muted/30 hover:bg-muted/30">
                    {group.headers.map((header, index) => renderHeader(header, index))}
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
                  {group.headers.map((header, index) => renderHeader(header, index))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {enableRowPinning ? (
                <>
                  {table.getTopRows().map(renderRow)}
                  {table.getCenterRows().map(renderRow)}
                  {table.getBottomRows().map(renderRow)}
                </>
              ) : (
                centerRows.map(renderRow)
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {pagination && !loading && centerRows.length > 0 && <DataTablePagination table={table} />}

      {/* Print-only mirror of the current selection. Hidden on screen (display:none), shown
          by @media print in index.css. Kept in sync with selection, so Print just fires. */}
      {enablePrint && exportColumns && selectedRows.length > 0 && (
        <div id="print-area" className="hidden print:block">
          <PrintTable rows={selectedRows} columns={visibleExportColumns(table, exportColumns)} />
        </div>
      )}
    </div>
  );
}

function DataTableActionBar<TData>({
  table,
  enableRowSelection,
  showColumnToggle,
  exportColumns,
  exportFilename,
  enablePrint,
  onDeleteSelected,
  deleteSelectedLabel,
}: {
  table: TanstackTable<TData>;
  enableRowSelection: boolean;
  showColumnToggle: boolean;
  exportColumns?: DataTableExportColumn<TData>[];
  exportFilename: string;
  enablePrint: boolean;
  onDeleteSelected?: (rows: TData[]) => void | Promise<void>;
  deleteSelectedLabel: string;
}) {
  const [deleting, setDeleting] = React.useState(false);
  const selectedCount = enableRowSelection ? table.getFilteredSelectedRowModel().rows.length : 0;
  const totalCount = table.getFilteredRowModel().rows.length;
  const hasSelection = selectedCount > 0;

  const getSelected = () => table.getFilteredSelectedRowModel().rows.map((r) => r.original);
  const getAll = () => table.getFilteredRowModel().rows.map((r) => r.original);

  return (
    <div className="flex flex-col gap-2 border-b px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      {enableRowSelection ? (
        <p className="text-xs text-muted-foreground">
          {selectedCount} of {totalCount} row(s) selected
        </p>
      ) : (
        <span />
      )}

      <div className="flex flex-wrap items-center gap-2">
        {exportColumns && (
          <>
            <AppButton
              variant="outline"
              size="sm"
              leftIcon={<FileSpreadsheetIcon className="size-4" />}
              onClick={() =>
                exportRowsToExcel(getAll(), visibleExportColumns(table, exportColumns), `${exportFilename}-all`)
              }
            >
              Export All
            </AppButton>
            <AppButton
              variant="outline"
              size="sm"
              disabled={!hasSelection}
              leftIcon={<FileSpreadsheetIcon className="size-4" />}
              onClick={() =>
                exportRowsToExcel(getSelected(), visibleExportColumns(table, exportColumns), `${exportFilename}-selected`)
              }
            >
              Export Selected
            </AppButton>
          </>
        )}

        {enablePrint && exportColumns && (
          <AppButton
            variant="outline"
            size="sm"
            disabled={!hasSelection}
            leftIcon={<PrinterIcon className="size-4" />}
            onClick={() => window.print()}
          >
            Print Selected
          </AppButton>
        )}

        {onDeleteSelected && (
          <ConfirmDialog
            trigger={
              <AppButton variant="destructive" size="sm" disabled={!hasSelection || deleting} leftIcon={<Trash2Icon className="size-4" />}>
                Delete Selected
              </AppButton>
            }
            title={`Delete ${selectedCount} ${deleteSelectedLabel}${selectedCount === 1 ? "" : "s"}?`}
            description="This cannot be undone."
            confirmLabel="Delete"
            loading={deleting}
            onConfirm={async () => {
              setDeleting(true);
              try {
                await onDeleteSelected(getSelected());
                table.resetRowSelection();
              } finally {
                setDeleting(false);
              }
            }}
          />
        )}

        {showColumnToggle && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
