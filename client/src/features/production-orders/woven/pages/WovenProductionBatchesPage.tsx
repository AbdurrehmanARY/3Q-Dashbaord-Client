// WovenProductionBatchesPage.tsx
// Dedicated batches page for the woven workflow: Weaving → Cutting → Packaging (pieces).
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronDown, ClipboardList, Download, FileSpreadsheet, Grid2x2, Layers, Package, Percent, PlayCircle, Plus, Printer, RefreshCw, Scissors, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { StatCard } from "@/components/cards/StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ProductionOrderStatusBadge } from "../../components/ProductionStatusBadge";
import { WovenThreadReconciliationCard } from "../../components/WovenThreadReconciliationCard";
import { ProductionCompletionReport } from "../../components/ProductionCompletionReport";
import { UnifiedPlanningDialog } from "../../components/PlanLabelTypeDialog";
import { BatchStageBoard } from "../../components/BatchStageBoard";
import { StageProgressBars } from "../../components/StageProgressBars";
import type { WovenLineOverview } from "../../woven-types";
import { LineFlow } from "../../batch-types";
import {
  useWovenProductionOrderDetail,
  useDeleteWovenProductionOrder,
} from "../hooks/use-woven-production-orders";
import { useCompletionReport, useCompleteProductionOrder } from "../../hooks/use-production-orders";

/** The Production Manager batches page for woven orders. Stage tracking per label type, batch CRUD per stage. */
export function WovenProductionBatchesPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data: orderData, isLoading, isError, error } = useWovenProductionOrderDetail(id);
  const order = orderData?.data;
  const lines = (orderData?.lines ?? []) as unknown as WovenLineOverview[];
  const deleteOrder = useDeleteWovenProductionOrder();
  const completeOrder = useCompleteProductionOrder();
  const { data: report } = useCompletionReport(id);

  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [editingLineForPlan, setEditingLineForPlan] = useState<WovenLineOverview | null>(null);

  const handleOpenPlanForLine = (line: WovenLineOverview) => {
    setEditingLineForPlan(line);
    setPlanDialogOpen(true);
  };

  const handleClosePlanDialog = () => {
    setPlanDialogOpen(false);
    setEditingLineForPlan(null);
  };

  const handleDeleteOrder = () => {
    void deleteOrder.mutateAsync(Number(id));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <AppCard
        title="Woven Production Order Not Found"
        description={error ? (error as Error).message : "No order data available."}
      >
        <AppButton leftIcon={<ArrowLeft className="h-4 w-4" />} onClick={() => navigate(-1)}>
          Back
        </AppButton>
      </AppCard>
    );
  }

  const unit = "pcs";

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Woven Production Order — Batches`}
        description={`${order.productionNumber} · ${order.soNumber} · ${formatNumber(order.totalQty, 0)} labels`}
        actions={
          <div className="flex items-center gap-2">
            <AppButton
              variant="outline"
              size="sm"
              leftIcon={<Plus className="h-3 w-3" />}
              onClick={() => {
                setEditingLineForPlan(null);
                setPlanDialogOpen(true);
              }}
            >
              Add Label Type
            </AppButton>
            <AppButton
              leftIcon={<RefreshCw className="h-3 w-3" />}
              onClick={() => navigate(0)}
            >
              Refresh
            </AppButton>
            <ConfirmDialog
              trigger={
                <AppButton variant="destructive" leftIcon={<Trash2 className="h-3 w-3" />}>
                  Delete Order
                </AppButton>
              }
              title="Delete Production Order?"
              description={`Deleting ${order.productionNumber} releases all reserved thread stock back to inventory.`}
              onConfirm={handleDeleteOrder}
              confirmLabel="Delete Order"
              cancelLabel="Keep"
            />
          </div>
        }
      />

      <ProductionCompletionReport orderId={id} />

      {/* Order summary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <StatCard
          title="Woven Lines"
          value={lines.length.toString()}
          description={formatNumber(lines.reduce((s, l) => s + l.quantity, 0), 0) + " labels across " + lines.length + " label type" + (lines.length !== 1 ? "s" : "")}
          icon={Layers}
          iconColor="bg-blue-500/10 text-blue-600"
        />
        <StatCard
          title="Thread Reserved (kg)"
          value={formatNumber(lines.reduce((s, l) => s + l.planning.totalThreadWeightKg, 0), 2)}
          description="Dyed thread allocated to this order"
          icon={ClipboardList}
          iconColor="bg-cyan-500/10 text-cyan-600"
        />
        <StatCard
          title="Woven Pieces"
          value={formatNumber(lines.reduce((s, l) => s + l.weaving.wovenQty, 0), 0)}
          description="Output from the weaving stage"
          icon={Grid2x2}
          iconColor="bg-cyan-500/10 text-cyan-600"
        />
        <StatCard
          title="Cut Pieces"
          value={formatNumber(lines.reduce((s, l) => s + l.cutting.cutQty, 0), 0)}
          description="Output from the cutting stage"
          icon={Scissors}
          iconColor="bg-pink-500/10 text-pink-600"
        />
        <StatCard
          title="Packaged Pieces"
          value={formatNumber(lines.reduce((s, l) => s + l.packaging.packagedQty, 0), 0)}
          description="Output from the packaging stage"
          icon={Package}
          iconColor="bg-amber-500/10 text-amber-600"
        />
        <StatCard
          title="Remaining Pieces"
          value={formatNumber(lines.reduce((s, l) => s + Math.max(0, l.quantity - l.packaging.packagedQty), 0), 0)}
          description="Still to be packaged"
          icon={Percent}
          iconColor="bg-muted text-muted-foreground"
        />
      </div>

      {/* Woven production batches section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Production Batches
        </h3>

        <AppCard title="Stage Progress" description="Whole order, across every label type">
          <StageProgressBars
            totals={{
              planned: lines.reduce((s, l) => s + l.quantity, 0),
              quantity: order.totalQty,
              required: lines.reduce((s, l) => s + l.quantity, 0),
              printedProduced: lines.reduce((s, l) => s + l.weaving.wovenQty, 0),
              printedWasted: lines.reduce((s, l) => s + l.weaving.wastedTotal, 0),
              cutProduced: lines.reduce((s, l) => s + l.cutting.cutQty, 0),
              cutWasted: 0,
              packagedProduced: lines.reduce((s, l) => s + l.packaging.packagedQty, 0),
              packagedWasted: 0,
              wastedTotal: lines.reduce((s, l) => s + l.weaving.wastedTotal, 0),
            }}
            lines={(lines.map((l) => ({
              lineId: l.id,
              labelType: l.labelType,
              kind: "woven" as const,
              unit: "pcs" as const,
              quantity: l.quantity,
              materialCode: null,
              stages: [],
              planned: l.quantity,
              assignedToPrinting: 0,
              remainingPlanned: 0,
              printedProduced: l.weaving.wovenQty,
              printedAvailable: 0,
              printedWasted: l.weaving.wastedTotal,
              wastedTotal: l.weaving.wastedTotal,
              cutProduced: l.cutting.cutQty,
              cutAvailable: 0,
              cutWasted: 0,
              packagedProduced: l.packaging.packagedQty,
              packagedLabels: l.packaging.packagedQty,
              packagedWasted: 0,
              remainingRolls: 0,
              batchCounts: { printing: 0, cutting: 0, packaging: 0 },
              running: [],
              sizes: (l.sizes ?? []) as unknown as never[],
            })) as unknown as LineFlow[])}
            kind="woven"
            unit="pcs"
          />
        </AppCard>

        {lines.map((line) => (
          <BatchStageBoard
            key={line.id}
            orderId={id}
            flow={line as unknown as LineFlow}
            readOnly={false}
          />
        ))}
      </div>

      {/* Woven Thread Reconciliation */}
      {lines.map((line) => (
        <WovenThreadReconciliationCard
          key={line.id}
          orderId={id}
          lineId={line.id}
          threads={line.planning.threads}
          isLocked={line.weaving.isComplete}
        />
      ))}

      {/* Planning dialog (add / edit label type) */}
      <UnifiedPlanningDialog
        open={planDialogOpen}
        productType="woven"
        orderId={id}
        soNumber={order.soNumber}
        remainingQty={Math.max(0, order.totalQty - lines.reduce((s, l) => s + l.quantity, 0))}
        editing={editingLineForPlan}
        onClose={handleClosePlanDialog}
      />
    </div>
  );
}

export default WovenProductionBatchesPage;
