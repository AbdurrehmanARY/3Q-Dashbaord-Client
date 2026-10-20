import { ClipboardList, PackageCheck, AlertOctagon, Users, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppCard } from "@/components/cards/AppCard";
import { StatCard } from "@/components/cards/StatCard";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { useCompletionReport } from "../hooks/use-production-orders";
import { formatNumber } from "@/lib/format";

/**
 * Order-wide completion snapshot for BOTH pipelines (printed & woven).
 *
 * Where `ProductionSummary` answers "who ran each stage, and when" for printed orders only,
 * this card answers the completion questions the floor actually needs before an order can
 * be marked complete:
 *
 *   - How many rolls/pieces went in (issued), came out (produced), and were scrapped (wasted)?
 *   - Which stage consumed what, and how much did each lose?
 *   - Which operator wasted the most, and why?
 *
 * Numbers are computed server-side (never hand-entered on the client) and sourced from the
 * order's completed batches — so the same card works whether the line counts rolls (printed)
 * or pieces (woven).
 */
export function ProductionCompletionReport({ orderId }: { orderId: string }) {
  const { data: report, isPending, isError, error } = useCompletionReport(orderId);
  const unit = report?.unit ?? "rolls";
  const kindLabel = report?.productType === "woven" ? "Woven" : "Printed";

  if (isPending) {
    return (
      <AppCard title="Production Completion Report" description="Loading completion figures…">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </AppCard>
    );
  }

  if (isError) {
    return (
      <AppCard
        title="Production Completion Report"
        description="Could not load completion figures."
      >
        <p className="text-sm text-destructive">
          {(error as Error)?.message ?? "An unknown error occurred."}
        </p>
      </AppCard>
    );
  }

  if (!report) {
    return (
      <AppCard title="Production Completion Report" description={`No ${kindLabel} batches recorded yet.`}>
        <p className="text-sm text-muted-foreground">Awaiting completed batches for this order.</p>
      </AppCard>
    );
  }

  const t = report.totals;
  const hasWaste = report.wasteByOperator.length > 0;

  return (
    <AppCard
      title="Production Completion Report"
      description={`Order-wide totals for ${kindLabel} production, per-operator waste and per-stage detail (${unit}).`}
      contentClassName="p-0"
    >
      <div className="space-y-0 divide-y">
        {/* ---- Order-wide totals ---- */}
        <div className="grid gap-y-1 px-5 py-4 sm:grid-cols-2 lg:grid-cols-6">
          <StatCard title="Issued" value={formatNumber(t.issued, 0)} description={`Total ${unit} drawn in`} icon={ClipboardList} iconColor="bg-blue-500/10 text-blue-600" />
          <StatCard title="Produced" value={formatNumber(t.produced, 0)} description={`Good ${unit} packaged`} icon={PackageCheck} iconColor="bg-emerald-500/10 text-emerald-600" />
          <StatCard title="Wasted" value={formatNumber(t.wasted, 0)} description={`Scrapped ${unit}`} icon={Trash2} iconColor="bg-rose-500/10 text-rose-600" />
          <StatCard title="Remaining" value={formatNumber(t.remaining, 0)} description={`Still in process`} icon={AlertOctagon} iconColor={t.remaining > 0 ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"} />
          <StatCard title="Yield" value={`${formatNumber(t.yieldPct, 1)}%`} description={`Produced ÷ issued`} icon={PackageCheck} iconColor="bg-sky-500/10 text-sky-600" />
          <StatCard title="Waste %" value={`${formatNumber(t.wastePct, 1)}%`} description={`Wasted ÷ issued`} icon={Trash2} iconColor="bg-rose-500/10 text-rose-600" />
        </div>

        {/* ---- Per-stage detail ---- */}
        <div className="px-5 py-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Stage Detail
          </h3>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase">Stage</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase">Batches</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase">{`Issued (${unit})`}</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase">{`Produced (${unit})`}</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase">{`Wasted (${unit})`}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.stageDetail.map((s) => (
                <TableRow key={s.stage}>
                  <TableCell>
                    <span className="text-sm font-medium">{s.label}</span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{s.batchCount}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNumber(s.issued, 0)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNumber(s.produced, 0)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNumber(s.wasted, 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* ---- Per-operator waste breakdown ---- */}
        {hasWaste && (
          <div className="px-5 py-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Waste by Operator
            </h3>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase">Operator</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase">{`Wasted (${unit})`}</TableHead>
                  <TableHead className="text-xs font-semibold uppercase">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.wasteByOperator.map((op) => (
                  <TableRow key={op.operatorName}>
                    <TableCell>
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {op.operatorName}
                      </span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium text-rose-600">
                      {formatNumber(op.totalWasted, 0)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {op.breakdown.map((b, i) => (
                          <span
                            key={`${op.operatorName}-${i}`}
                            className="inline-flex items-center gap-1.5 rounded border bg-muted/40 px-1.5 py-0.5 text-xs"
                          >
                            <StatusBadge variant="pending">{b.stage}</StatusBadge>
                            {b.labelType}
                            <span className="text-muted-foreground">({b.reason})</span>
                            <span className="tabular-nums">{formatNumber(b.wasted, 0)}</span>
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* ---- Per-label-type waste ---- */}
        {hasWaste && (
          <div className="px-5 py-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Waste by Label Type
            </h3>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase">Label Type</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase">{`Wasted (${unit})`}</TableHead>
                  <TableHead className="text-xs font-semibold uppercase">Top Operator</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.wasteByLabelType.map((lt) => {
                  const top = lt.byOperator[0];
                  return (
                    <TableRow key={lt.labelType}>
                      <TableCell>
                        <span className="text-sm font-medium">{lt.labelType}</span>
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-medium text-rose-600">
                        {formatNumber(lt.totalWasted, 0)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {top ? `${top.operatorName} (${formatNumber(top.totalWasted, 0)})` : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {!hasWaste && (
          <div className="px-5 py-6 text-center text-sm text-muted-foreground">
            No waste recorded on completed batches for this order.
          </div>
        )}
      </div>
    </AppCard>
  );
}

