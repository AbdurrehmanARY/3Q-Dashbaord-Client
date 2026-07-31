import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useWorkOrderDetail, useDeleteWorkOrder } from "../hooks/use-work-orders";
import { useProductionOrderOverview } from "@/features/production-orders";
import { WORK_ORDER_STATUS_META } from "../types";
import { formatDate, formatNumber } from "@/lib/format";
import { WorkOrderDialog } from "../components/WorkOrderDialog";

/**
 * The sales order summary, split into the sections the floor actually reads: what was
 * ordered, what material it consumes, who is producing it, the label breakdown, and how
 * far along it is. Everything below "Order Information" is sourced from the production
 * order via the existing overview endpoint — the work order itself stores none of it.
 */
export function WorkOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: wo, isLoading: detailLoading } = useWorkOrderDetail(id || "");
  const deleteWorkOrder = useDeleteWorkOrder();
  const [editOpen, setEditOpen] = useState(false);

  const productionOrder = wo?.productionOrder ?? null;
  const { data: overview } = useProductionOrderOverview(
    productionOrder ? String(productionOrder.id) : ""
  );

  if (detailLoading) return <p className="text-muted-foreground p-6">Loading...</p>;
  if (!wo) return <p className="text-muted-foreground p-6">Work order not found.</p>;

  const statusMeta = WORK_ORDER_STATUS_META[wo.status];
  // Production has handed over — the dispatch card shows, and the header is locked while the
  // paperwork stays editable.
  const isComplete = wo.status === "complete" || wo.status === "dispatched";
  const canDelete = wo.status === "initiate_production";
  const lines = overview?.lines ?? [];
  const totals = overview?.totals;

  // Every distinct material this order consumes, with what it draws from each.
  const materials = Object.values(
    lines.reduce<
      Record<
        string,
        {
          code: string;
          description: string | null;
          materialType: string | null;
          weightPerRoll: number | null;
          assignedRolls: number;
          assignedWeight: number;
        }
      >
    >((acc, line) => {
      const code = line.material.materialCode;
      if (!code) return acc;
      const existing = acc[code] ?? {
        code,
        description: line.material.description,
        materialType: line.material.materialType,
        weightPerRoll: line.material.weightPerRoll,
        assignedRolls: 0,
        assignedWeight: 0,
      };
      existing.assignedRolls += line.material.assignedRolls;
      existing.assignedWeight += line.material.assignedWeight ?? 0;
      acc[code] = existing;
      return acc;
    }, {})
  );

  return (
    <div>
      <Button variant="ghost" className="mb-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>

      <PageHeader
        title={wo.soNumber}
        description={wo.poNumber ? `PO ${wo.poNumber}` : undefined}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge variant={statusMeta.variant}>{statusMeta.label}</StatusBadge>
            <AppButton
              variant="outline"
              onClick={() => setEditOpen(true)}
              leftIcon={<Pencil className="h-4 w-4" />}
            >
              {isComplete ? "Dispatch Details" : "Edit"}
            </AppButton>
            {productionOrder && (
              <AppButton
                onClick={() => navigate(`/production-orders/${productionOrder.id}`)}
                leftIcon={<Factory className="h-4 w-4" />}
              >
                Open {productionOrder.productionNumber}
              </AppButton>
            )}
            {canDelete && (
              <ConfirmDialog
                trigger={
                  <AppButton variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
                    Delete
                  </AppButton>
                }
                title="Delete work order?"
                description="This will permanently delete this work order."
                confirmLabel="Delete"
                loading={deleteWorkOrder.isPending}
                onConfirm={async () => {
                  await deleteWorkOrder.mutateAsync(wo.id);
                  navigate("/work-orders");
                }}
              />
            )}
          </div>
        }
      />

      <div className="space-y-4">
        {/* ---------------- Order Information ---------------- */}
        <AppCard title="Order Information">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
            <Field label="SO Number" value={wo.soNumber} mono />
            <Field label="PO Number" value={wo.poNumber ?? "—"} mono />
            <Field label="Company" value={wo.companyName ?? "—"} />
            <Field label="Brand" value={wo.brandName ?? "—"} />
            <Field label="Order Date" value={formatDate(wo.orderDate)} />
            <Field label="Delivery Date" value={formatDate(wo.dueDate)} />
            <Field label="Total Quantity" value={formatNumber(wo.totalQty, 0)} />
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">Status</dt>
              <dd className="mt-0.5">
                <StatusBadge variant={statusMeta.variant}>{statusMeta.label}</StatusBadge>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">Product Type</dt>
              <dd className="mt-0.5">
                <StatusBadge variant={wo.productType === "woven" ? "active" : "pending"}>
                  {wo.productType === "woven" ? "Woven" : "Printed"}
                </StatusBadge>
              </dd>
            </div>
          </dl>
        </AppCard>

        {/* ---------------- Woven design specification ---------------- */}
        {wo.productType === "woven" && (
          <AppCard title="Woven Design Specification">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
              <Field label="Design Code" value={wo.designCode ?? "—"} mono />
              <Field label="Pick" value={formatNumber(wo.pick, 0)} />
              <Field label="Repeat" value={formatNumber(wo.repeat, 2)} />
              <Field label="Density" value={formatNumber(wo.density, 0)} />
              <Field label="Extra" value={formatNumber(wo.extra, 2)} />
            </dl>
          </AppCard>
        )}

        {/* ---------------- Dispatch ---------------- */}
        {isComplete && (
          <AppCard
            title="Dispatch"
            description="DC Number, LC Number and FBR Invoice Number are all required to dispatch."
          >
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-5">
              <Field label="DC Number" value={wo.dcNumber ?? "—"} mono />
              <Field label="LC Number" value={wo.lcNumber ?? "—"} mono />
              <Field label="FBR Invoice" value={wo.fbrInvoiceNumber ?? "—"} mono />
              <Field label="Dispatched Date" value={formatDate(wo.dispatchedDate)} />
              <Field
                label="Dispatched Qty"
                value={wo.dispatchedQty != null ? formatNumber(wo.dispatchedQty, 0) : "—"}
              />
            </dl>
            {wo.status !== "dispatched" && (
              <p className="mt-3 text-xs font-medium text-warning">
                Not dispatched yet — record the DC, LC and FBR invoice numbers to move this order to
                Dispatched.
              </p>
            )}
          </AppCard>
        )}

        {!productionOrder ? (
          <AppCard title="Production">
            <p className="text-sm text-muted-foreground">
              No production order raised yet. Raise one from the{" "}
              <button
                className="font-medium text-primary underline-offset-2 hover:underline"
                onClick={() => navigate("/production-orders")}
              >
                Production Orders
              </button>{" "}
              page, then plan its label types.
            </p>
          </AppCard>
        ) : (
          <>
            {/* ---------------- Material Information ---------------- */}
            <AppCard
              title="Material Information"
              description="Raw material committed to this order, drawn from inventory during planning."
            >
              {materials.length === 0 ? (
                <p className="text-sm italic text-muted-foreground">
                  No material assigned yet — set one on the production plan.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <Th>Material Code</Th>
                        <Th>Material Description</Th>
                        <Th>Material Type</Th>
                        <Th align="right">Roll Weight (kg)</Th>
                        <Th align="right">Assigned Rolls</Th>
                        <Th align="right">Assigned Weight (kg)</Th>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materials.map((m) => (
                        <TableRow key={m.code}>
                          <TableCell className="font-mono font-medium">{m.code}</TableCell>
                          <TableCell>{m.description ?? "—"}</TableCell>
                          <TableCell className="text-muted-foreground">{m.materialType ?? "—"}</TableCell>
                          <TableCell className="text-right tabular-nums">
                            {m.weightPerRoll != null ? formatNumber(m.weightPerRoll, 4) : "—"}
                          </TableCell>
                          <TableCell className="text-right font-semibold tabular-nums">
                            {formatNumber(m.assignedRolls, 0)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatNumber(m.assignedWeight, 4)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </AppCard>

            {/* ---------------- Production Planning ---------------- */}
            <AppCard
              title="Production Planning"
              description={`Production order ${productionOrder.productionNumber}`}
            >
              <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Figure label="Required Rolls" value={formatNumber(totals?.requiredRolls ?? 0, 2)} />
                <Figure label="Total Rolls Issued" value={formatNumber(totals?.totalRolls ?? 0, 0)} accent />
                <Figure label="Assigned Rolls" value={formatNumber(totals?.assignedRolls ?? 0, 0)} />
                <Figure label="Assigned Weight (kg)" value={formatNumber(totals?.assignedWeight ?? 0, 2)} />
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <Th>Label Type</Th>
                      <Th>Printing Machine</Th>
                      <Th>Printing Operator</Th>
                      <Th align="right">Assigned Rolls</Th>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lines.map((line) => (
                      <TableRow key={line.id}>
                        <TableCell className="font-medium">{line.labelType}</TableCell>
                        <TableCell className={line.printing.machineName ? "" : "text-muted-foreground"}>
                          {line.printing.machineName ?? "Unassigned"}
                        </TableCell>
                        <TableCell className={line.printing.operatorName ? "" : "text-muted-foreground"}>
                          {line.printing.operatorName ?? "Unassigned"}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNumber(line.material.assignedRolls, 0)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {lines.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="h-20 text-center text-sm text-muted-foreground">
                          Not planned yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </AppCard>

            {/* ---------------- Label Details ---------------- */}
            <AppCard title="Label Details">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <Th>Label Type</Th>
                      <Th align="right">Quantity</Th>
                      <Th align="right">Rolls Required</Th>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lines.map((line) => (
                      <TableRow key={line.id}>
                        <TableCell className="font-medium">{line.labelType}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNumber(line.planning.quantity, 0)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNumber(line.planning.requiredRolls, 4)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {lines.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="h-20 text-center text-sm text-muted-foreground">
                          No label types planned yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </AppCard>

            {/* ---------------- Production Progress ---------------- */}
            <AppCard title="Production Progress">
              <div className="grid gap-4 sm:grid-cols-3">
                <StageProgress
                  label="Printing"
                  done={totals?.printedRolls ?? 0}
                  total={totals?.totalRolls ?? 0}
                />
                <StageProgress label="Cutting" done={totals?.cutRolls ?? 0} total={totals?.totalRolls ?? 0} />
                <StageProgress
                  label="Packaging"
                  done={totals?.packagedRolls ?? 0}
                  total={totals?.totalRolls ?? 0}
                />
              </div>
              <div className="mt-4 border-t pt-4">
                <StageProgress
                  label="Overall Completion"
                  done={totals?.packagedRolls ?? 0}
                  total={totals?.totalRolls ?? 0}
                  emphasis
                />
              </div>
            </AppCard>
          </>
        )}

        <AppCard title="Comments / Notes">
          {wo.comment ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{wo.comment}</p>
          ) : (
            <p className="text-sm italic text-muted-foreground">
              No comments or special instructions entered for this order.
            </p>
          )}
        </AppCard>
      </div>

      {editOpen && (
        <WorkOrderDialog open workOrder={wo} onClose={() => setEditOpen(false)} />
      )}
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: "right" }) {
  return (
    <TableHead
      className={`h-10 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </TableHead>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`mt-0.5 text-sm font-medium ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}

function Figure({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border bg-card px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-xl font-bold tabular-nums ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}

function StageProgress({
  label,
  done,
  total,
  emphasis,
}: {
  label: string;
  done: number;
  total: number;
  emphasis?: boolean;
}) {
  const pct = total > 0 ? Math.round((done / total) * 1000) / 10 : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className={`text-sm ${emphasis ? "font-semibold" : "font-medium"}`}>{label}</span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {formatNumber(done, 0)} / {formatNumber(total, 0)} rolls · {pct}%
        </span>
      </div>
      <Progress value={pct} />
    </div>
  );
}
