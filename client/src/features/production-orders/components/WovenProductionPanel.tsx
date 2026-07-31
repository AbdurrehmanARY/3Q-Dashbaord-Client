import * as React from "react";
import { Layers, Palette, Percent, Scissors } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { StatCard } from "@/components/cards/StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/format";
import {
  useWovenOverview,
  usePlanWovenLine,
  useDeleteWovenLine,
} from "../hooks/use-woven-production";
import { WovenPlanningForm } from "./WovenPlanningForm";
import { WovenStageBoard } from "./WovenStageBoard";
import type { WovenLineOverview, PlanWovenInput } from "../woven-types";

/**
 * The woven half of the production dashboard: Planning → Weaving → Cutting → Packaging.
 *
 * Rendered by `ProductionOrderDashboardPage` when the order's sales order is a woven one;
 * printed orders render the roll-based progress table instead. Both hang off the same
 * production order, so the page header, stats and dispatch flow stay shared.
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
  const showForm = planning || editing !== null;

  const handleSubmit = async (body: PlanWovenInput) => {
    await planLine.mutateAsync({ lineId: editing?.id ?? null, body });
    setPlanning(false);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
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

      {lines.length === 0 && !showForm ? (
        <AppCard title="Pending Woven Planning">
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">
              Nothing planned yet. Assign the thread colours (up to 8), the loom and its operator to
              begin — submitting reserves the thread from stock.
            </p>
            <AppButton className="mt-4" onClick={() => setPlanning(true)}>
              Plan Woven Production
            </AppButton>
          </div>
        </AppCard>
      ) : (
        <div className="space-y-6">
          {lines.map((line) => (
            <AppCard
              key={line.id}
              title={`Line #${line.id} · ${formatNumber(line.quantity, 0)} pcs`}
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

          {!showForm && (
            <AppButton variant="outline" onClick={() => setPlanning(true)}>
              Plan Another Line
            </AppButton>
          )}
        </div>
      )}
    </div>
  );
}
