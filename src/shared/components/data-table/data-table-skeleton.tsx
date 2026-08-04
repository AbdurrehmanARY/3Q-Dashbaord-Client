import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableSkeletonProps {
  /** Column count — match the real table's so the layout does not jump on load. */
  columnCount: number;
  rowCount?: number;
  /** Render placeholder headers too. Off when the caller keeps its real header mounted. */
  withHeader?: boolean;
}

/** Placeholder rows shown while a query is in flight. */
export function DataTableSkeleton({
  columnCount,
  rowCount = 8,
  withHeader = true,
}: DataTableSkeletonProps) {
  const columns = Array.from({ length: columnCount });

  return (
    <Table>
      {withHeader && (
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            {columns.map((_, i) => (
              <TableHead key={i} className="h-10">
                <Skeleton className="h-3 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {Array.from({ length: rowCount }).map((_, row) => (
          <TableRow key={row}>
            {columns.map((_, col) => (
              <TableCell key={col} className="py-3">
                {/* Varying widths read as data rather than as a loading grid. */}
                <Skeleton className="h-4" style={{ width: `${55 + ((row * 7 + col * 13) % 40)}%` }} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
