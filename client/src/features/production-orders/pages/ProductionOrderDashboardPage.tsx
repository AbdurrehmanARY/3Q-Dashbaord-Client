import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ClipboardList, Layers, Package, Percent, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { StatCard } from "@/components/cards/StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatNumber } from "@/lib/format";
import { ProductionOrderStatusBadge } from "../components/ProductionStatusBadge";
import { EditableLabelTypeTable } from "../components/EditableLabelTypeTable";
import { WovenProductionPanel } from "../components/WovenProductionPanel";
import { ProductionSummary } from "../components/ProductionSummary";
import { StockReconciliationCard } from "../components/StockReconciliationCard";
import { PlanLabelTypeDialog } from "../components/PlanLabelTypeDialog";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import type { ProductionOrderOverview, ProductionLineOverview } from "../types";
import { useProductionOrderOverview, useDeleteProductionOrder, useUpdateProductionOrder } from "../hooks/use-production-orders";
import { useCompletionCelebration } from "../hooks/use-completion-celebration";

/** The Production Manager dashboard: order header + the editable Production Progress table. */
export function ProductionOrderDashboardPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data: overview, isLoading, isError, error } = useProductionOrderOverview(id);
  const deleteOrder = useDeleteProductionOrder();
  const updateOrder = useUpdateProductionOrder();
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

  return (
    <div>
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

            {order.status !== "complete" && (
              <AppButton
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm"
                leftIcon={<CheckCircle2 className="h-4 w-4" />}
                loading={updateOrder.isPending}
                onClick={async () => {
                  await updateOrder.mutateAsync({ id, body: { status: "complete" } });
                }}
              >
                Mark as Complete
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

      <div className="mb-4">
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

      {planDialogOpen && (
        <PlanLabelTypeDialog
          open={planDialogOpen}
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

/** The printed workflow's body: roll planning stats, the progress table and roll tracking. */
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
  return (
    <>
      <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Label Types" value={totals.labelTypeCount} icon={Layers} />
        <StatCard
          title="Unplanned Qty"
          value={formatNumber(totals.unplannedQty, 0)}
          description={`${formatNumber(totals.plannedQty, 0)} of ${formatNumber(order.totalQty, 0)} planned`}
          icon={ClipboardList}
          iconColor={totals.unplannedQty > 0 ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"}
        />
        <StatCard
          title="Assigned Rolls"
          value={formatNumber(totals.assignedRolls, 2)}
          description={`${formatNumber(totals.assignedWeight, 2)} kg drawn from inventory`}
          icon={Package}
          iconColor="bg-success/10 text-success"
        />
        <StatCard
          title="Completion"
          value={`${totals.completionPct}%`}
          description={`${formatNumber(totals.packagedRolls, 2)} of ${formatNumber(totals.totalRolls, 2)} packaged`}
          icon={Percent}
          iconColor="bg-primary/10 text-primary"
        />
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
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Label Types Progress</h3>
            <AppButton size="sm" variant="outline" leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={onOpenPlanDialog}>
              Add Label Type
            </AppButton>
          </div>

          <div className="overflow-hidden rounded-xl border bg-card shadow-card">
            <EditableLabelTypeTable orderId={id} lines={lines} onEditPlan={onEditPlan} />
          </div>

          {/* Stock Reconciliation & Extra Stock Return */}
          <StockReconciliationCard orderId={id} lines={lines} />

          {/* Traceability: shown only after the order is fully completed. */}
          {order.status === "complete" && <ProductionSummary lines={lines} />}
        </div>
      )}
    </>
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
