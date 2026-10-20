import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronDown, ClipboardList, Download, FileSpreadsheet, Layers, Package, Percent, PlayCircle, Plus, Printer, Trash2, CheckCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { StatCard } from "@/components/cards/StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ProductionOrderStatusBadge } from "../components/ProductionStatusBadge";
import { PlannedLabelTypesTable } from "../components/PlannedLabelTypesTable";
import { WovenProductionPanel } from "../components/WovenProductionPanel";
import { ProductionSummary } from "../components/ProductionSummary";
import { ProductionCompletionReport } from "../components/ProductionCompletionReport";
import { StockReconciliationCard } from "../components/StockReconciliationCard";
import { UnifiedPlanningDialog } from "../components/PlanLabelTypeDialog";
import { BatchStageBoard } from "../components/BatchStageBoard";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProductionOrderOverview, ProductionLineOverview } from "../types";
import { useOrderFlow } from "../hooks/use-batches";
import { StageProgressBars } from "../components/StageProgressBars";
import {
  useProductionOrderOverview,
  useDeleteProductionOrder,
  useUpdateProductionOrder,
  useCompleteProductionOrder,
} from "../hooks/use-production-orders";
import { useCompletionCelebration } from "../hooks/use-completion-celebration";
import { exportProductionOrderToExcel, printProductionOrderJobTicket } from "../utils/production-order-export";

/** The Production Manager dashboard: order header + batch-based Production Progress & Stage Inventory pipeline. */
export function ProductionOrderDashboardPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data: overview, isLoading, isError, error } = useProductionOrderOverview(id);
  const deleteOrder = useDeleteProductionOrder();
  const updateOrder = useUpdateProductionOrder();
  const completeOrder = useCompleteProductionOrder();
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

  // Party poppers + a congratulation chime the moment this order becomes fully complete.
  useCompletionCelebration(overview?.productionOrder.status);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !overview) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        {(error as Error)?.message ?? "Production order not found."}
      </div>
    );
  }

  const { productionOrder: order, lines, totals } = overview;
  const isWoven = order.productType === "woven";
  const needsPlanning = lines.length === 0;
  const remainingQty = order.totalQty - totals.plannedQty;
  const isReadyForCompletion =
    (totals.stageInventory?.isReadyForCompletion || (totals.totalRolls > 0 && totals.packagedRolls >= totals.totalRolls)) &&
    order.status !== "complete";

  return (
    <div className="space-y-4">
      <Button variant="ghost" className="mb-2" onClick={() => navigate("/production-orders")}>
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

{/* 
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }), "gap-1 text-sm font-medium")}>
                <Download className="h-4 w-4" /> Export <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => exportProductionOrderToExcel(overview)}>
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-600" /> Export Excel (.xlsx)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => printProductionOrderJobTicket(overview)}>
                  <Printer className="mr-2 h-4 w-4 text-blue-600" /> Print / Job Ticket (PDF)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            {order.status !== "complete" && (
              <AppButton
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm"
                leftIcon={<CheckCircle2 className="h-4 w-4" />}
                loading={completeOrder.isPending || updateOrder.isPending}
                onClick={async () => {
                  await completeOrder.mutateAsync(id);
                }}
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
              loading={deleteOrder.isPending}
              onConfirm={async () => {
                await deleteOrder.mutateAsync(id);
                navigate("/production-orders");
              }}
            />
          </div>
        }
      />

      {/* Manual Completion Alert Banner (Section 20 of prompt) */}
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
            loading={completeOrder.isPending}
            onClick={async () => {
              await completeOrder.mutateAsync(id);
            }}
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
            <Field
              label="Unplanned Qty"
              value={formatNumber(totals.unplannedQty, 0)}
              highlight={totals.unplannedQty > 0}
            />
            <Field label="Due Date" value={formatDate(order.dueDate)} />
          </dl>
        </AppCard>
      </div>

      {/* Woven orders carry their own stats, planning and stage board. */}
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
        />
      )}

      {/* Order-wide completion report — shown once the order is complete, for both pipelines. */}
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

/** The printed workflow's body: Stage inventory pipeline, progress table, batch history, and reconciliation. */
function PrintedProductionBody({
  id,
  order,
  lines,
  totals,
  needsPlanning,
  onOpenPlanDialog,
  onEditPlan,
}: {
  id: string;
  order: ProductionOrderOverview["productionOrder"];
  lines: ProductionOrderOverview["lines"];
  totals: ProductionOrderOverview["totals"];
  needsPlanning: boolean;
  onOpenPlanDialog: () => void;
  onEditPlan?: (line: ProductionLineOverview) => void;
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
      {/* Stage Inventory Position Cards (Section 1, 9, 24 of prompt) */}
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
      ) : (
        <div className="space-y-4">
          <PlannedLabelTypesTable
            lines={lines}
            onOpenPlanDialog={onOpenPlanDialog}
            onEditPlan={onEditPlan!}
          />

          {/* Batch-based production: three stage CRUDs per label type. */}
          <BatchFlowSection orderId={id} readOnly={order.status === "complete"} />

          {/* Stock Reconciliation & Extra Stock Return */}
          <StockReconciliationCard orderId={id} lines={lines} />

          {/* Traceability: shown only after the order is fully completed. */}
          {order.status === "complete" && <ProductionSummary lines={lines} />}
        </div>
      )}
    </>
  );
}

/**
 * Batch-based production. One board per label type, each carrying its own Printing (or
 * Weaving), Cutting and Packaging batch CRUD.
 *
 * The label types are independent only at the FIRST stage. Cutting and packaging batches are
 * order-scoped — they carry no line at all — and the server accepts input for them from any
 * label type of the order, so the same cutting batch appears on every board and says which
 * label types fed it. Only the first-stage panels are genuinely per label type.
 */
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

