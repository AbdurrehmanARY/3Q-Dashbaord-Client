// PrintedProductionBatchesPage.tsx
// Dedicated batches page for the printed workflow: Printing → Cutting → Packaging (rolls).
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronDown, ClipboardList, Download, FileSpreadsheet, Layers, Package, Percent, PlayCircle, Plus, Printer, RefreshCw, Trash2 } from "lucide-react";
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
import { PlannedLabelTypesTable } from "../../components/PlannedLabelTypesTable";
import { ProductionCompletionReport } from "../../components/ProductionCompletionReport";
import { StockReconciliationCard } from "../../components/StockReconciliationCard";
import { UnifiedPlanningDialog } from "../../components/PlanLabelTypeDialog";
import { BatchStageBoard } from "../../components/BatchStageBoard";
import { StageProgressBars } from "../../components/StageProgressBars";
import { useOrderFlow } from "../../hooks/use-batches";
import type { ProductionLineOverview } from "../../types";
import { LineFlow } from "../../batch-types";
import {
  usePrintedProductionOrderDetail,
  useDeletePrintedProductionOrder,
} from "../hooks/use-printed-production-orders";
import { useCompletionReport, useCompleteProductionOrder } from "../../hooks/use-production-orders";

/** The Production Manager batches page for printed orders. Stage inventory per label type, batch CRUD per stage. */
export function PrintedProductionBatchesPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data: orderData, isLoading, isError, error } = usePrintedProductionOrderDetail(id);
  const order = orderData?.data;
  const lines = (orderData?.lines ?? []) as unknown as ProductionLineOverview[];
  const deleteOrder = useDeletePrintedProductionOrder();
  const completeOrder = useCompleteProductionOrder();
  const { data: report } = useCompletionReport(id);

  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [editingLineForPlan, setEditingLineForPlan] = useState<ProductionLineOverview | null>(null);

  const handleOpenPlanForLine = (line: ProductionLineOverview) => {
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
        title="Printed Production Order Not Found"
        description={error ? (error as Error).message : "No order data available."}
      >
        <AppButton leftIcon={<ArrowLeft className="h-4 w-4" />} onClick={() => navigate(-1)}>
          Back
        </AppButton>
      </AppCard>
    );
  }

  const unit = "rolls";

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Printed Production Order — Batches`}
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
              description={`Deleting ${order.productionNumber} releases all reserved material stock back to inventory.`}
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
          title="Planned Rolls"
          value={formatNumber(lines.reduce((s, l) => s + Number(l.planning.totalRolls), 0), 0)}
          description={formatNumber(lines.reduce((s, l) => s + Number(l.planning.quantity), 0), 0) + " labels across " + lines.length + " label type" + (lines.length !== 1 ? "s" : "")}
          icon={Layers}
          iconColor="bg-blue-500/10 text-blue-600"
        />
        <StatCard
          title="Printed Rolls"
          value={formatNumber(lines.reduce((s, l) => s + Number(l.printing.printedRolls), 0), 0)}
          description="Output from the printing stage"
          icon={Printer}
          iconColor="bg-cyan-500/10 text-cyan-600"
        />
        <StatCard
          title="Cut Rolls"
          value={formatNumber(lines.reduce((s, l) => s + Number(l.cutting.cutRolls), 0), 0)}
          description="Output from the cutting stage"
          icon={Package}
          iconColor="bg-pink-500/10 text-pink-600"
        />
        <StatCard
          title="Packaged Rolls"
          value={formatNumber(lines.reduce((s, l) => s + Number(l.packaging.packagedRolls), 0), 0)}
          description="Output from the packaging stage"
          icon={ClipboardList}
          iconColor="bg-amber-500/10 text-amber-600"
        />
        <StatCard
          title="Remaining Rolls"
          value={formatNumber(lines.reduce((s, l) => s + Math.max(0, Number(l.planning.totalRolls) - Number(l.packaging.packagedRolls)), 0), 0)}
          description="Still to be packaged"
          icon={Percent}
          iconColor="bg-muted text-muted-foreground"
        />
      </div>

      {/* Planned label types table */}
      <PlannedLabelTypesTable
        lines={lines}
        onOpenPlanDialog={() => {
          setEditingLineForPlan(null);
          setPlanDialogOpen(true);
        }}
        onEditPlan={handleOpenPlanForLine}
      />

      {/* Batch-based production: one board per label type, each with its own Printing/Cutting/Packaging CRUD. */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Production Batches
        </h3>

        <AppCard title="Stage Progress" description="Whole order, across every label type">
          <StageProgressBars
            totals={{
              planned: lines.reduce((s, l) => s + Number(l.planning.totalRolls), 0),
              quantity: order.totalQty,
              required: lines.reduce((s, l) => s + Number(l.planning.totalRolls), 0),
              printedProduced: lines.reduce((s, l) => s + Number(l.printing.printedRolls), 0),
              printedWasted: lines.reduce((s, l) => s + Number(l.printing.wastedRolls ?? 0), 0),
              cutProduced: lines.reduce((s, l) => s + Number(l.cutting.cutRolls), 0),
              cutWasted: lines.reduce((s, l) => s + Number(l.cutting.wastedRolls ?? 0), 0),
              packagedProduced: lines.reduce((s, l) => s + Number(l.packaging.packagedRolls), 0),
              packagedWasted: lines.reduce((s, l) => s + Number(l.packaging.wastedRolls ?? 0), 0),
              wastedTotal: lines.reduce((s, l) => s + Number(l.printing.wastedRolls ?? 0) + Number(l.cutting.wastedRolls ?? 0) + Number(l.packaging.wastedRolls ?? 0), 0),
            }}
            lines={lines.map((l) => ({
              lineId: l.id,
              labelType: l.labelType,
              kind: "printed" as const,
              unit: "rolls" as const,
              quantity: Number(l.planning.totalRolls),
              materialCode: null,
              stages: [],
              planned: Number(l.planning.totalRolls),
              assignedToPrinting: 0,
              remainingPlanned: 0,
              printedProduced: Number(l.printing.printedRolls),
              printedAvailable: 0,
              printedWasted: Number(l.printing.wastedRolls ?? 0),
              wastedTotal: Number(l.printing.wastedRolls ?? 0) + Number(l.cutting.wastedRolls ?? 0) + Number(l.packaging.wastedRolls ?? 0),
              cutProduced: Number(l.cutting.cutRolls),
              cutAvailable: 0,
              cutWasted: Number(l.cutting.wastedRolls ?? 0),
              packagedProduced: Number(l.packaging.packagedRolls),
              packagedLabels: Number(l.packaging.packagedQty),
              packagedWasted: Number(l.packaging.wastedRolls ?? 0),
              remainingRolls: 0,
              batchCounts: { printing: 0, cutting: 0, packaging: 0 },
              running: [],
              sizes: [],
            })) as LineFlow[]}
            kind="printed"
            unit="rolls"
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

      {/* Stock Reconciliation & Extra Stock Return */}
      <StockReconciliationCard orderId={id} lines={lines} />

      {/* Planning dialog (add / edit label type) */}
      <UnifiedPlanningDialog
        open={planDialogOpen}
        productType="printed"
        orderId={id}
        soNumber={order.soNumber}
        remainingQty={Math.max(0, order.totalQty - lines.reduce((s, l) => s + Number(l.planning.quantity), 0))}
        editing={editingLineForPlan}
        onClose={handleClosePlanDialog}
      />
    </div>
  );
}

export default PrintedProductionBatchesPage;
