import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { useInkConsumptionByOperator } from "../hooks/use-ink";

/** Ink consumption totalled per operator — the operator-breakdown view. */
export function InkOperatorBreakdown() {
  const { data, isLoading } = useInkConsumptionByOperator();
  const rows = data ?? [];

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="max-h-[calc(100vh-320px)] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Operator</TableHead>
              <TableHead className="text-right">Entries</TableHead>
              <TableHead className="text-right">Total Qty</TableHead>
              <TableHead className="text-right">Total Weight (kg)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">Loading…</TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                  No consumption recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={`${r.operatorId ?? "none"}-${r.operatorName}`}>
                  <TableCell className="text-sm font-medium">{r.operatorName}</TableCell>
                  <TableCell className="text-right text-sm tabular-nums">{formatNumber(Number(r.entries), 0)}</TableCell>
                  <TableCell className="text-right text-sm tabular-nums">{formatNumber(Number(r.totalQty), 2)}</TableCell>
                  <TableCell className="text-right text-sm font-semibold tabular-nums">{formatNumber(Number(r.totalWeight), 3)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
