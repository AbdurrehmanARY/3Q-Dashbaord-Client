// Shared dashboard body used by ProductionOrderDashboardPage, PrintedProductionOrderDashboardPage,
// and WovenProductionOrderDashboardPage.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ClipboardList, Layers, Package, Percent, Plus, RefreshCw, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { StatCard } from "@/components/cards/StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatNumber } from "@/lib/format";
import { ProductionOrderStatusBadge } from "../components/ProductionStatusBadge";
import { PlannedLabelTypesTable } from "../components/PlannedLabelTypesTable";
import { WovenProductionPanel } from "../components/WovenProductionPanel";
import { ProductionSummary } from "../components/ProductionSummary";
import { ProductionCompletionReport } from "../components/ProductionCompletionReport";
import { StockReconciliationCard } from "../components/StockReconciliationCard";
import { UnifiedPlanningDialog } from "../components/PlanLabelTypeDialog";
import { BatchStageBoard } from "../components/BatchStageBoard";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import type { ProductionOrderHeader, ProductionLineOverview, ProductionOrderTotals } from "../types";
import { useOrderFlow } from "../hooks/use-batches";
import { StageProgressBars } from "../components/StageProgressBars";
import { useCompletionCelebration } from "../hooks/use-completion-celebration";

interface ProductionOrderDashboardBodyProps {
  id: string;
  order: ProductionOrderHeader;
  lines: ProductionLineOverview[];
  totals: ProductionOrderTotals;
  navigateBackUrl: string;
  onComplete: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export function ProductionOrderDashboardBody({ id, order, lines, totals, navigateBackUrl, onComplete, onDelete }: ProductionOrderDashboardBodyProps) {
  const navigate = useNavigate();
  const isWoven = order.productType === "woven";
  const needsPlanning = lines.length === 0;
  const remainingQty = order.totalQty - totals.plannedQty;
  const isReadyForCompletion =
    (totals.stageInventory?.isReadyForCompletion || (totals.totalRolls > 0 && totals.packagedRolls >= totals.totalRolls)) &&
    order.status !== "complete";

  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [editingLineForPlan, setEditingLineForPlan] = useState<ProductionLineOverview | null>(null);
  const [reconcileDialogOpen, setReconcileDialogOpen] = useState(false);

  const handleOpenPlanForLine = (line: ProductionLineOverview) => {
    setEditingLineForPlan(line);
    setPlanDialogOpen(true);
  };

  const handleClosePlanDialog = () => {
    setPlanDialogOpen(false);
    setEditingLineForPlan(null);
  };

  useCompletionCelebration(order.status);

  return (
    <div className="space-y-4">
      <Button variant="ghost" className="mb-2" onClick={() => navigate(navigateBackUrl)}>
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Production Orders
      </Button>

      <PageHeader
        title={order.productionNumber}
        description={`Sales Order ${order.soNumber} · ${order.companyName ?? "Direct customer"}`}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge variant={isWoven ? "active" : "pending"}>
              {isWoven ? "Woven" : "Printed"}
            </StatusBadge>
            <ProductionOrderStatusBadge status={order.status} />

            {order.status !== "complete" && (
              <AppButton
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm"
                leftIcon={<CheckCircle2 className="h-4 w-4" />}
                loading={false}
                onClick={onComplete}
              >
                Complete Production
              </AppButton>
            )}

            {!isWoven && (
              <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => { setEditingLineForPlan(null); setPlanDialogOpen(true); }}>
                {needsPlanning ? "Plan Production" : "Add Label Type"}
              </AppButton>
            )}
            <ConfirmDialog
              trigger={
                <AppButton variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
                  Delete Order
                </AppButton>
              }
              title="Delete production order?"
              description={`This will permanently delete ${order.productionNumber} and release any reserved material stock.`}
              confirmLabel="Delete"
              loading={false}
              onConfirm={onDelete}
            />
          </div>
        }
      />

      {isReadyForCompletion && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-700 dark:text-emerald-300 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold">READY FOR COMPLETION</p>
              <p className="text-xs text-muted-foreground">
                All {formatNumber(totals.totalRolls, 0)} planned rolls have reached final packaging. Confirm completion to mark this order complete.
              </p>
            </div>
          </div>
          <AppButton
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shrink-0"
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
            loading={false}
            onClick={onComplete}
          >
            Complete Production Now
          </AppButton>
        </div>
      )}

      <div>
        <AppCard title="Order Information">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            <Field label="Production Number" value={order.productionNumber} mono />
            <Field label="Sales Order" value={order.soNumber} mono />
            <Field label="PO Number" value={order.poNumber ?? "—"} mono />
            <Field label="Company" value={order.companyName ?? "—"} />
            <Field label="Brand" value={order.brandName ?? "—"} />
            <Field label="Customer" value={order.customer ?? "—"} />
            <Field label="Total Quantity" value={formatNumber(order.totalQty, 0)} />
            <Field label="Planned Qty" value={formatNumber(totals.plannedQty, 0)} />
            <Field label="Unplanned Qty" value={formatNumber(totals.unplannedQty, 0)} highlight={totals.unplannedQty > 0} />
            <Field label="Due Date" value={formatDate(order.dueDate)} />
          </dl>
        </AppCard>
      </div>

      {isWoven ? (
        <WovenProductionPanel orderId={id} totalQty={order.totalQty} />
      ) : (
        <PrintedProductionBody
          id={id}
          order={order}
          lines={lines}
          totals={totals}
          needsPlanning={needsPlanning}
          onOpenPlanDialog={() => { setEditingLineForPlan(null); setPlanDialogOpen(true); }}
          onEditPlan={handleOpenPlanForLine}
          reconcileDialogOpen={reconcileDialogOpen}
          setReconcileDialogOpen={setReconcileDialogOpen}
        />
      )}

      {order.status === "complete" && <ProductionCompletionReport orderId={id} />}

      {planDialogOpen && (
        <UnifiedPlanningDialog
          open={planDialogOpen}
          productType={order.productType}
          orderId={id}
          soNumber={order.soNumber}
          remainingQty={remainingQty}
          editing={editingLineForPlan}
          onClose={handleClosePlanDialog}
        />
      )}
    </div>
  );
}

function PrintedProductionBody({
  id,
  order,
  lines,
  totals,
  needsPlanning,
  onOpenPlanDialog,
  onEditPlan,
  reconcileDialogOpen,
  setReconcileDialogOpen,
}: {
  id: string;
  order: ProductionOrderHeader;
  lines: ProductionLineOverview[];
  totals: ProductionOrderTotals;
  needsPlanning: boolean;
  onOpenPlanDialog: () => void;
  onEditPlan?: (line: ProductionLineOverview) => void;
  reconcileDialogOpen: boolean;
  setReconcileDialogOpen: (open: boolean) => void;
}) {
  const inv = totals.stageInventory ?? {
    plannedRolls: totals.totalRolls,
    printedTotal: totals.printedRolls,
    cuttedTotal: totals.cutRolls,
    packagedTotal: totals.packagedRolls,
    printedAvailable: totals.waitingForCutting,
    cuttedAvailable: totals.waitingForPackaging,
    remainingRolls: Math.max(0, totals.totalRolls - totals.packagedRolls),
  };

  return (
    <>
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Current Stage Inventory Position
          </h3>
          <span className="text-xs text-muted-foreground">
            Completion: <strong className="text-foreground">{totals.completionPct}%</strong>
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="1. Planned Rolls"
            value={formatNumber(inv.plannedRolls, 0)}
            description={`${formatNumber(totals.plannedQty, 0)} pcs total requirement`}
            icon={Layers}
            iconColor="bg-muted text-muted-foreground"
          />
          <StatCard
            title="2. Printed Available"
            value={formatNumber(inv.printedAvailable, 2)}
            description={`${formatNumber(inv.printedTotal, 2)} printed · waiting for cutting`}
            icon={ClipboardList}
            iconColor={inv.printedAvailable > 0 ? "bg-blue-500/10 text-blue-600" : "bg-muted text-muted-foreground"}
          />
          <StatCard
            title="3. Cutted Available"
            value={formatNumber(inv.cuttedAvailable, 2)}
            description={`${formatNumber(inv.cuttedTotal, 2)} cutted · waiting for packaging`}
            icon={Package}
            iconColor={inv.cuttedAvailable > 0 ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"}
          />
          <StatCard
            title="4. Packaged Output"
            value={formatNumber(inv.packagedTotal, 2)}
            description={`${formatNumber(totals.packagedQty, 0)} finished labels packaged`}
            icon={CheckCircle2}
            iconColor="bg-emerald-500/10 text-emerald-600"
          />
          <StatCard
            title="5. Remaining"
            value={formatNumber(inv.remainingRolls, 2)}
            description="Rolls still to be packaged"
            icon={Percent}
            iconColor={inv.remainingRolls > 0 ? "bg-purple-500/10 text-purple-600" : "bg-emerald-500/10 text-emerald-600"}
          />
        </div>
      </div>

      {needsPlanning ? (
        <AppCard title="Pending Production Planning">
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">
              This production order has no label types yet. Split the order quantity of{" "}
              <strong>{formatNumber(order.totalQty, 0)}</strong> into label types to begin.
            </p>
            <AppButton className="mt-4" leftIcon={<Plus className="h-4 w-4" />} onClick={onOpenPlanDialog}>
              Plan Production
            </AppButton>
          </div>
        </AppCard>
      ) : order.status === "complete" ? (
        <div className="space-y-4">
          <ProductionSummary lines={lines} />
          <div className="flex justify-end">
            <AppButton
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={() => setReconcileDialogOpen(true)}
            >
              Reconcile Stock
            </AppButton>
          </div>

          <AppDialog
            open={reconcileDialogOpen}
            onOpenChange={setReconcileDialogOpen}
            title="Stock Reconciliation & Return"
            description="Record actual rolls/weight used in production and return extra leftover rolls & weight back to the main roll stock."
            className="sm:max-w-[700px]"
          >
            <StockReconciliationCard orderId={id} lines={lines} />
          </AppDialog>
        </div>
      ) : (
        <div className="space-y-4">
          <PlannedLabelTypesTable
            lines={lines}
            onOpenPlanDialog={onOpenPlanDialog}
            onEditPlan={onEditPlan!}
          />

          <BatchFlowSection orderId={id} readOnly={false} />

          <StockReconciliationCard orderId={id} lines={lines} />
        </div>
      )}
    </>
  );
}

function BatchFlowSection({ orderId, readOnly }: { orderId: string; readOnly: boolean }) {
  const flow = useOrderFlow(orderId);

  if (flow.isLoading) return <Skeleton className="h-64 w-full" />;
  if (!flow.data || flow.data.lines.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Production Batches
        </h3>
        {flow.data.readyForCompletion && !readOnly && (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Every label type has packaged its plan — ready to complete
          </span>
        )}
      </div>

      <AppCard
        title="Stage Progress"
        description="Whole order, across every label type"
      >
        <StageProgressBars
          totals={flow.data.totals}
          lines={flow.data.lines}
          kind={flow.data.kind}
          unit={flow.data.unit}
        />
      </AppCard>

      {flow.data.lines.map((line) => (
        <BatchStageBoard key={line.lineId} orderId={orderId} flow={line} readOnly={readOnly} />
      ))}
    </div>
  );
}

function Field({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`text-sm font-medium ${mono ? "font-mono" : ""} ${highlight ? "text-amber-600 dark:text-amber-400 font-semibold" : ""}`}>{value}</dd>
    </div>
  );
}