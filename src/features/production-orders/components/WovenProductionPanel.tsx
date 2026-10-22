import * as React from "react";
import { Layers, Palette, Percent, Scissors, CheckCircle2, Disc3, Lock, RefreshCw } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { StatCard } from "@/components/cards/StatCard";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, formatDateTime } from "@/lib/format";
import {
  useWovenOverview,
  useDeleteWovenLine,
} from "../hooks/use-woven-production";
import { UnifiedPlanningDialog } from "./PlanLabelTypeDialog";
// import type { ProductType } from "@/types";
import { BatchStageBoard } from "./BatchStageBoard";
import { StageProgressBars } from "./StageProgressBars";
import { useOrderFlow } from "../hooks/use-batches";
import { WovenTrackingTable } from "./WovenTrackingTable";
import { WovenThreadReconciliationCard } from "./WovenThreadReconciliationCard";
import type { WovenLineOverview } from "../woven-types";

/**
 * The woven half of the production dashboard: Planning → Weaving → Cutting → Packaging.
 *
 * Automatically switches presentation:
 * - Active Production: Live stage board, progress metrics, planning form.
 * - Completed Production: Planning locked read-only, live trackers replaced by Production Summary,
 *   and remaining thread weight inputs for inventory reconciliation.
 */
export function WovenProductionPanel({ orderId, totalQty }: { orderId: string; totalQty: number }) {
  const { data, isLoading } = useWovenOverview(orderId);
  /** Batch positions per label type — weaving, cutting and packaging all read from here. */
  const flow = useOrderFlow(orderId);
  const deleteLine = useDeleteWovenLine(orderId);

  const [planning, setPlanning] = React.useState(false);
  const [editing, setEditing] = React.useState<WovenLineOverview | null>(null);
  const [reconcileLine, setReconcileLine] = React.useState<WovenLineOverview | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const lines = data?.lines ?? [];
  const totals = data?.totals;
  const isOrderCompleted =
    data?.productionOrder.status === "complete" ||
    data?.productionOrder.status === "completed" ||
    (lines.length > 0 && lines.every((l) => l.status === "completed"));

  /** Order quantity not yet split into a label type — the same rule as the printed side. */
  const plannedQty = lines.reduce((n, l) => n + Number(l.quantity), 0);
  const remainingQty = Math.max(0, totalQty - plannedQty);

  return (
    <div className="space-y-4">
      {/* Top Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Woven Lines" value={totals?.lineCount ?? 0} icon={Layers} />
        <StatCard
          title="Thread Reserved"
          value={`${formatNumber(totals?.totalThreadWeightKg ?? 0, 2)} kg`}
          description="Drawn from dyed, then undyed stock"
          icon={Palette}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Woven / Cut"
          value={`${formatNumber(totals?.wovenQty ?? 0, 0)} / ${formatNumber(totals?.cutQty ?? 0, 0)}`}
          description={`of ${formatNumber(totals?.quantity ?? 0, 0)} planned`}
          icon={Scissors}
        />
        <StatCard
          title="Packaged"
          value={formatNumber(totals?.packagedQty ?? 0, 0)}
          description={`${formatNumber(totals?.packagedWeightKg ?? 0, 2)} kg`}
          icon={Percent}
          iconColor="bg-success/10 text-success"
        />
        {/* Auto-calculated: packaged weight − dyed thread consumed. Never entered by hand. */}
        <StatCard
          title="Beam Thread"
          value={`${formatNumber(totals?.beamThreadKg ?? 0, 3)} kg`}
          description={`Packaged ${formatNumber(totals?.packagedWeightKg ?? 0, 2)} kg − dyed used ${formatNumber(
            totals?.dyedThreadUsedKg ?? 0,
            3
          )} kg`}
          icon={Disc3}
          iconColor="bg-amber-500/10 text-amber-600"
        />
      </div>

      {/* Single planning dialog shared with the printed workflow — chosen by productType. */}
      {planning || editing !== null ? (
        <UnifiedPlanningDialog
          open
          productType="woven"
          orderId={orderId}
          soNumber={data?.productionOrder.soNumber}
          remainingQty={remainingQty}
          editing={editing}
          onClose={() => {
            setPlanning(false);
            setEditing(null);
          }}
        />
      ) : null}

      {/* No lines planned yet */}
      {lines.length === 0 && (
        <AppCard title="Pending Woven Planning">
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">
              Nothing planned yet. Assign thread colours, the loom, and its operator to begin — submitting reserves thread from stock.
            </p>
            <AppButton className="mt-4" onClick={() => setPlanning(true)}>
              Plan Woven Production
            </AppButton>
          </div>
        </AppCard>
      )}

      {/* Main Content Area */}
      {lines.length > 0 && (
        <div className="space-y-6">
          {!isOrderCompleted && (
            <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-2.5">
              <p className="text-xs text-muted-foreground">
                {formatNumber(plannedQty, 0)} of {formatNumber(totalQty, 0)} pcs planned across{" "}
                {lines.length} label type{lines.length === 1 ? "" : "s"}
                {remainingQty > 0 && (
                  <>
                    {" · "}
                    <strong className="text-amber-600 dark:text-amber-400">
                      {formatNumber(remainingQty, 0)} pcs unplanned
                    </strong>
                  </>
                )}
              </p>
              <AppButton
                size="sm"
                variant="outline"
                disabled={remainingQty <= 0}
                title={remainingQty <= 0 ? "The whole order quantity is already planned" : undefined}
                onClick={() => { setEditing(null); setPlanning(true); }}
              >
                Add Label Type
              </AppButton>
            </div>
          )}
          {/* Post-Completion Summary View */}
          {isOrderCompleted ? (
            <>
              {/* Locked Planning Audit Record */}
              <AppCard
                title="Production Plan (Locked — Completed)"
                description="Production planning is locked after completion to preserve audit integrity."
                headerActions={
                  <StatusBadge variant="completed">
                    <Lock className="mr-1 inline h-3 w-3" />
                    Read Only
                  </StatusBadge>
                }
              >
                {lines.map((line) => (
                  <div key={line.id} className="space-y-4">
                    <div className="rounded-lg border bg-muted/20 p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Thread Colours Planned ({line.planning.threadCount})
                      </h4>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {line.planning.threads.map((t) => (
                          <div key={t.id} className="rounded-md border bg-card p-3 text-xs">
                            <div className="font-semibold text-primary">{t.colorCode}</div>
                            <div className="font-medium text-foreground">{t.colorName}</div>
                            <div className="mt-1 flex items-center justify-between text-muted-foreground">
                              <span>{t.denier}D</span>
                              <span className="font-bold text-foreground tabular-nums">
                                {formatNumber(t.weightKg, 3)} kg
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Post-Completion Thread Reconciliation — button-triggered */}
                    <div className="flex justify-end">
                      <AppButton
                        size="sm"
                        leftIcon={<RefreshCw className="h-4 w-4" />}
                        onClick={() => setReconcileLine(line)}
                      >
                        Reconcile Thread Stock
                      </AppButton>
                    </div>
                  </div>
                ))}
              </AppCard>

            <AppDialog
              open={!!reconcileLine}
              onOpenChange={(open) => !open && setReconcileLine(null)}
              title="Thread Stock Reconciliation"
              description="Enter remaining unused thread weight to return to dyed stock."
              className="sm:max-w-[600px]"
            >
              {reconcileLine && (
                <WovenThreadReconciliationCard
                  orderId={orderId}
                  lineId={reconcileLine.id}
                  threads={reconcileLine.planning.threads}
                  isLocked={true}
                />
              )}
            </AppDialog>

            {/* Completed Production Summary */}

          {lines.map((line) => (
                <AppCard
                  key={line.id}
                  title="Completed Production Summary"
                  description="Output and timestamps per completed stage. Who ran each one is recorded on its batches."
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    {/* Weaving Stage Summary */}
                    <div className="rounded-xl border bg-card p-4">
                      <div className="mb-2 flex items-center justify-between border-b pb-2">
                        <span className="font-semibold">Weaving Stage</span>
                        <StatusBadge variant="completed">
                          <CheckCircle2 className="mr-1 inline h-3 w-3" /> Completed
                        </StatusBadge>
                      </div>
                      <dl className="space-y-1.5 text-xs text-muted-foreground">
                        <div>Started: <strong className="text-foreground">{formatDateTime(line.weaving.startedAt)}</strong></div>
                        <div>Ended: <strong className="text-foreground">{formatDateTime(line.weaving.endedAt)}</strong></div>
                        <div>Produced: <strong className="font-bold text-foreground">{formatNumber(line.weaving.wovenQty, 0)} pcs</strong></div>
                      </dl>
                    </div>

                    {/* Cutting Stage Summary */}
                    <div className="rounded-xl border bg-card p-4">
                      <div className="mb-2 flex items-center justify-between border-b pb-2">
                        <span className="font-semibold">Cutting Stage</span>
                        <StatusBadge variant="completed">
                          <CheckCircle2 className="mr-1 inline h-3 w-3" /> Completed
                        </StatusBadge>
                      </div>
                      <dl className="space-y-1.5 text-xs text-muted-foreground">
                        <div>Completed Date: <strong className="text-foreground">{formatDateTime(line.cutting.cuttingDate)}</strong></div>
                        <div>Processed: <strong className="font-bold text-foreground">{formatNumber(line.cutting.cutQty, 0)} pcs</strong></div>
                      </dl>
                    </div>

                    {/* Packaging Stage Summary */}
                    <div className="rounded-xl border bg-card p-4">
                      <div className="mb-2 flex items-center justify-between border-b pb-2">
                        <span className="font-semibold">Packaging Stage</span>
                        <StatusBadge variant="completed">
                          <CheckCircle2 className="mr-1 inline h-3 w-3" /> Completed
                        </StatusBadge>
                      </div>
                      <dl className="space-y-1.5 text-xs text-muted-foreground">
                        <div>Completed Date: <strong className="text-foreground">{formatDateTime(line.packaging.packagingDate)}</strong></div>
                        <div>Packed: <strong className="font-bold text-foreground">{formatNumber(line.packaging.packagedQty, 0)} pcs</strong></div>
                        <div>Packed Weight: <strong className="font-bold text-foreground">{formatNumber(line.packaging.packagedWeightKg, 2)} kg</strong></div>
                      </dl>
                    </div>
                  </div>
                </AppCard>
              ))}
            </>
          ) : (
            /* Active Production View (Stage Board & Live Progress) */
            <>
              {lines.map((line) => (
                <AppCard
                  key={line.id}
                  title={`${line.labelType} · ${formatNumber(line.quantity, 0)} pcs planned`}
                  description={`${line.planning.threadCount} thread colour(s) · ${formatNumber(
                    line.planning.totalThreadWeightKg,
                    3
                  )} kg reserved · beam thread ${formatNumber(line.planning.beamThreadKg, 3)} kg`}
                  headerActions={
                    <div className="flex gap-2">
                      <AppButton size="sm" variant="outline" onClick={() => setEditing(line)}>
                        Re-plan
                      </AppButton>
                      <AppButton
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                        loading={deleteLine.isPending}
                        onClick={() => deleteLine.mutate(line.id)}
                      >
                        Cancel
                      </AppButton>
                    </div>
                  }
                >
                  {(() => {
                    const lineFlow = flow.data?.lines.find((l) => l.lineId === line.id);
                    return lineFlow ? (
                      <BatchStageBoard orderId={orderId} flow={lineFlow} />
                    ) : (
                      <p className="py-4 text-center text-xs text-muted-foreground">
                        Loading batches…
                      </p>
                    );
                  })()}
                </AppCard>
              ))}

              {flow.data && flow.data.totals.planned > 0 && (
                <AppCard
                  title="Stage Progress"
                  description="Whole order, across every label type"
                >
                  <StageProgressBars totals={flow.data.totals} kind="woven" unit="pcs" />
                </AppCard>
              )}

              <AppCard
                title="Woven Production Tracking Summary"
                description="Live summary of planned, woven, cut, and packaged quantities."
                contentClassName="p-0"
              >
                <WovenTrackingTable lines={lines} />
              </AppCard>
            </>
          )}
        </div>
      )}
    </div>
  );
}
