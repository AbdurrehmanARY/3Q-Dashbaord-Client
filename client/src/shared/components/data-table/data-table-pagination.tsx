import type { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  /** How many numbered page links to show around the current page. */
  siblingCount?: number;
}

/**
 * Page numbers window: always shows first and last, plus `siblingCount` either side of
 * the current page, collapsing the gaps. Returns page indices; `-1` marks an ellipsis.
 */
function pageWindow(current: number, total: number, siblingCount: number): number[] {
  if (total <= siblingCount * 2 + 5) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages = new Set<number>([0, total - 1]);
  for (let i = current - siblingCount; i <= current + siblingCount; i++) {
    if (i >= 0 && i < total) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const withGaps: number[] = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) withGaps.push(-1);
    withGaps.push(page);
  });
  return withGaps;
}

/**
 * Page-size selector plus page navigation.
 *
 * The navigation is the **official shadcn `pagination` component** — this file only
 * binds it to TanStack's table state and adds the page-size Select, which Pagination
 * does not cover. Nothing here re-implements a shadcn primitive.
 */
export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 50, 100],
  siblingCount = 1,
}: DataTablePaginationProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;
  const pageCount = Math.max(table.getPageCount(), 1);
  const pageIndex = table.getState().pagination.pageIndex;

  return (
    <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-xs text-muted-foreground">
        {table.options.enableRowSelection
          ? `${selectedCount} of ${totalCount} row(s) selected.`
          : `${totalCount} row(s)`}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium whitespace-nowrap">Rows per page</span>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger size="sm" className="w-[4.5rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={!table.getCanPreviousPage()}
                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  table.previousPage();
                }}
              />
            </PaginationItem>

            {pageWindow(pageIndex, pageCount, siblingCount).map((page, index) =>
              page === -1 ? (
                <PaginationItem key={`gap-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageIndex}
                    onClick={(event) => {
                      event.preventDefault();
                      table.setPageIndex(page);
                    }}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled={!table.getCanNextPage()}
                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  table.nextPage();
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
