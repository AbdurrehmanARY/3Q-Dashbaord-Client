import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable, DataTableEmpty } from "@/shared/components/data-table";
import { formatDate, formatNumber } from "@/lib/format";
import { PlanLabelTypeForm } from "../components/PlanLabelTypeForm";
import { ProductionOrderStatusBadge } from "../components/ProductionStatusBadge";
import { createPlannedLineColumns } from "../components/planned-line-columns";
import {
  useProductionOrderOverview,
  usePlanLine,
  useUpdateLinePlan,
} from "../hooks/use-production-orders";
import type { PlanLineInput, ProductionLineOverview } from "../types";

/**
 * Phase 2 — planning, **one label type at a time**. Each submitted record immediately
 * reserves its material, printing machine and printing operator, so the reservations
 * accumulate as the planner works down the order rather than all landing at the end.
 */
export function ProductionOrderPlanningPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data: overview, isLoading, isError, error } = useProductionOrderOverview(id);
  const planLine = usePlanLine(id);
  const updateLinePlan = useUpdateLinePlan();

  const [editing, setEditing] = useState<ProductionLineOverview | null>(null);

  // Every hook must run on every render — including while `overview` is still loading —
  // so this sits above the early returns below. `isLocked` defaults to false until the
  // real status is known, which only matters for a single frame before data arrives.
  const isLocked = overview?.productionOrder.status === "complete";
  const columns = useMemo(
    () =>
      createPlannedLineColumns({
        isLocked,
        onEdit: (line) => setEditing(line),
      }),
    [isLocked]
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
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
  const remainingQty = order.totalQty - totals.plannedQty;

  const handleSubmit = async (body: PlanLineInput) => {
    if (editing) {
      await updateLinePlan.mutateAsync({ lineId: String(editing.id), body });
      setEditing(null);
    } else {
      await planLine.mutateAsync(body);
    }
  };

  return (
    <div>
      <Button variant="ghost" className="mb-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>

      <PageHeader
        title={`Plan ${order.productionNumber}`}
        description="Plan one label type at a time. Each submission reserves its material, machine and operator."
        actions={
          <div className="flex items-center gap-2">
            <ProductionOrderStatusBadge status={order.status} />
            <AppButton variant="outline" onClick={() => navigate(`/production-orders/${id}`)}>
              Open Dashboard
            </AppButton>
          </div>
        }
      />

      <div className="mb-4">
        <AppCard title="Order Information">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            <Field label="Production Number" value={order.productionNumber} mono />
            <Field label="Sales Order" value={order.soNumber} mono />
            <Field label="Company" value={order.companyName ?? "—"} />
            <Field label="Brand" value={order.brandName ?? "—"} />
            <Field label="Order Quantity" value={formatNumber(order.totalQty, 0)} />
            <Field label="Planned" value={formatNumber(totals.plannedQty, 0)} />
            <Field
              label="Unplanned"
              value={formatNumber(remainingQty, 0)}
              accent={remainingQty === 0 ? "success" : "warning"}
            />
            <Field label="Due Date" value={formatDate(order.dueDate)} />
          </dl>
        </AppCard>
      </div>

      {isLocked ? (
        <div className="mb-4 rounded-lg border border-warning/20 bg-warning/5 px-4 py-3 text-sm text-warning">
          This production order is complete and can no longer be planned.
        </div>
      ) : remainingQty <= 0 && !editing ? (
        <div className="mb-4 rounded-lg border border-success/20 bg-success/5 px-4 py-3 text-sm text-success">
          The full order quantity of {formatNumber(order.totalQty, 0)} is planned. Cancel a label type
          to free up quantity.
        </div>
      ) : (
        <div className="mb-4">
          <PlanLabelTypeForm
            remainingQty={remainingQty}
            editing={editing}
            saving={planLine.isPending || updateLinePlan.isPending}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      <AppCard
        title="Planned Label Types"
        description={`${lines.length} planned · ${formatNumber(totals.assignedRolls, 0)} rolls reserved from inventory`}
        contentClassName="p-0"
      >
        <DataTable
          columns={columns}
          data={lines}
          getRowId={(line) => String(line.id)}
          pagination={false}
          stickyFirstColumn
          stickyLastColumn
          empty={<DataTableEmpty title="Nothing planned yet" description="Add the first label type above." />}
        />
      </AppCard>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: "success" | "warning";
}) {
  const accentClass = accent === "success" ? "text-success" : accent === "warning" ? "text-warning" : "";
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`text-sm font-medium ${mono ? "font-mono" : ""} ${accentClass}`}>{value}</dd>
    </div>
  );
}
