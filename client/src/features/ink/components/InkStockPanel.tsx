import { DropletIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { formatNumber } from "@/lib/format";
import { useInkStock } from "../hooks/use-ink";

/** Live ink stock per material code: purchased − consumed, in both weight and quantity. */
export function InkStockPanel() {
  const { data, isLoading } = useInkStock();
  const rows = data ?? [];

  return (
    <div className="rounded-xl border bg-card shadow-card">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <DropletIcon className="size-4 text-primary" />
        <h3 className="text-sm font-semibold">Ink Stock (live balance)</h3>
      </div>
      <div className="max-h-[280px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Material Code</TableHead>
              <TableHead className="text-right">Purchased (kg)</TableHead>
              <TableHead className="text-right">Consumed (kg)</TableHead>
              <TableHead className="text-right">Balance (kg)</TableHead>
              <TableHead className="text-right">Balance Qty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center text-sm text-muted-foreground">Loading…</TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center text-sm text-muted-foreground">
                  No ink stock yet — record a purchase to get started.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r.materialCode}>
                  <TableCell className="font-mono text-sm font-semibold">{r.materialCode}</TableCell>
                  <TableCell className="text-right text-sm tabular-nums">{formatNumber(r.purchasedWeight, 3)}</TableCell>
                  <TableCell className="text-right text-sm tabular-nums">{formatNumber(r.consumedWeight, 3)}</TableCell>
                  <TableCell className="text-right text-sm font-semibold tabular-nums">
                    <StatusBadge variant={r.balanceWeight <= 0 ? "out-of-stock" : r.balanceWeight < 1 ? "low-stock" : "in-stock"}>
                      {formatNumber(r.balanceWeight, 3)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">{formatNumber(r.balanceQty, 2)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
