import * as React from "react";
import { Layers, Palette, Percent, Scissors, CheckCircle2, Lock } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { StatCard } from "@/components/cards/StatCard";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, formatDateTime } from "@/lib/format";
import {
  useWovenOverview,
  usePlanWovenLine,
  useDeleteWovenLine,
} from "../hooks/use-woven-production";
import { WovenPlanningForm } from "./WovenPlanningForm";
import { WovenStageBoard } from "./WovenStageBoard";
import { WovenTrackingTable } from "./WovenTrackingTable";
import { WovenThreadReconciliationCard } from "./WovenThreadReconciliationCard";
import type { WovenLineOverview, PlanWovenInput } from "../woven-types";

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
  const planLine = usePlanWovenLine(orderId);
  const deleteLine = useDeleteWovenLine(orderId);

  const [planning, setPlanning] = React.useState(false);
  const [editing, setEditing] = React.useState<WovenLineOverview | null>(null);

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

  const showForm = !isOrderCompleted && (planning || editing !== null);

  const handleSubmit = async (body: PlanWovenInput) => {
    await planLine.mutateAsync({ lineId: editing?.id ?? null, body });
    setPlanning(false);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      {/* Top Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>

      {/* Active Planning Form */}
      {showForm && (
        <WovenPlanningForm
          editing={editing}
          defaultQuantity={totalQty}
          saving={planLine.isPending}
          onSubmit={handleSubmit}
          onCancel={() => {
            setPlanning(false);
            setEditing(null);
          }}
        />
      )}

      {/* No lines planned yet */}
      {lines.length === 0 && !showForm && (
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

                    {/* Post-Completion Thread Reconciliation Card */}
                    <WovenThreadReconciliationCard
                      orderId={orderId}
                      lineId={line.id}
                      threads={line.planning.threads}
                      isLocked={true}
                    />
                  </div>
                ))}
              </AppCard>

              {/* Completed Production Summary */}
              {lines.map((line) => (
                <AppCard
                  key={line.id}
                  title="Completed Production Summary"
                  description="Detailed record of machines, operators, timestamps, and output for each completed stage."
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
                        <div>Machine: <strong className="text-foreground">{line.weaving.machineName ?? "—"}</strong></div>
                        <div>Operator: <strong className="text-foreground">{line.weaving.operatorName ?? "—"}</strong></div>
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
                        <div>Operator: <strong className="text-foreground">{line.cutting.operatorName ?? "—"}</strong></div>
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
                        <div>Operator: <strong className="text-foreground">{line.packaging.operatorName ?? "—"}</strong></div>
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
                  title={`Woven Line · ${formatNumber(line.quantity, 0)} pcs planned`}
                  description={`${line.planning.threadCount} thread colour(s) · ${formatNumber(line.planning.totalThreadWeightKg, 3)} kg reserved`}
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
                  <WovenStageBoard orderId={orderId} line={line} />
                </AppCard>
              ))}

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
