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
import { useProductionOrderOverview, useWovenOverview } from "@/features/production-orders";
import { WORK_ORDER_STATUS_META } from "../types";
import { formatDate, formatNumber } from "@/lib/format";
import { WorkOrderDialog } from "../components/WorkOrderDialog";
import { ProductionSummary } from "@/features/production-orders";
import { LiveProductionProgressCard } from "../components/LiveProductionProgressCard";
import { ProductionCompletionSummaryCard } from "../components/ProductionCompletionSummaryCard";

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
  const isWoven = wo?.productType === "woven";

  const { data: overview } = useProductionOrderOverview(
    productionOrder && !isWoven ? String(productionOrder.id) : ""
  );

  const { data: wovenOverview } = useWovenOverview(
    productionOrder && isWoven ? String(productionOrder.id) : "",
    !!productionOrder && isWoven
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
            {productionOrder && !isWoven && (
              <>
                <Field label="Total Rolls Assigned" value={formatNumber(totals?.assignedRolls ?? 0, 0)} />
                <Field label="Total Weight Assigned (kg)" value={formatNumber(totals?.assignedWeight ?? 0, 2)} />
              </>
            )}
          </dl>
        </AppCard>

        {/* ---------------- Woven design specification ---------------- */}
        {wo.productType === "woven" && (
          <AppCard title="Woven Design Specification">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              <Field label="Design Code" value={wo.designCode ?? "—"} mono />
              <Field label="Pick" value={formatNumber(wo.pick, 0)} />
              <Field label="Repeat" value={formatNumber(wo.repeat, 2)} />
              <Field label="Density" value={formatNumber(wo.density, 0)} />
              <Field label="Speed (RPM)" value={wo.speed != null && Number(wo.speed) > 0 ? `${formatNumber(wo.speed, 0)} RPM` : "—"} />
              <Field label="Extra" value={formatNumber(wo.extra, 2)} />
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">Size Labels</dt>
                <dd className="mt-1 flex flex-wrap gap-1">
                  {wo.sizeLabels && wo.sizeLabels.length > 0 ? (
                    wo.sizeLabels.map((lbl) => (
                      <span key={lbl} className="rounded border bg-muted px-1.5 py-0.5 text-xs font-semibold">
                        {lbl}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">—</span>
                  )}
                </dd>
              </div>
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

        {/* ---------------- Dynamic Production UI Switch (In Production vs Completed) ---------------- */}
        {productionOrder && (
          isComplete ? (
            <ProductionCompletionSummaryCard
              productType={wo.productType}
              wovenOverview={wovenOverview}
              overview={overview}
              workOrder={wo}
            />
          ) : (
            <LiveProductionProgressCard
              productType={wo.productType}
              overview={isWoven ? wovenOverview : overview}
              totalQty={wo.totalQty}
            />
          )
        )}


        {/* ---------------- Woven vs Printed Production View ---------------- */}
        {isWoven ? (
          <WovenProductionDetailView
            productionOrder={productionOrder}
            wovenOverview={wovenOverview}
            totalQty={wo.totalQty}
            navigate={navigate}
          />
        ) : !productionOrder ? (
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

            {/* ---------------- Label Details ---------------- */}
            <AppCard title="Label Details">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <Th>Label Type</Th>
                      <Th align="right">Quantity</Th>
                      <Th align="right">Assigned Rolls</Th>
                      <Th align="right">Assigned Weight (kg)</Th>
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
                          {formatNumber(line.material.assignedRolls, 0)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {line.material.assignedWeight != null
                            ? formatNumber(line.material.assignedWeight, 2)
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {lines.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="h-20 text-center text-sm text-muted-foreground">
                          No label types planned yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
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
      className={`h-10 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground ${align === "right" ? "text-right" : ""
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

function WovenProductionDetailView({
  productionOrder,
  wovenOverview,
  totalQty,
  navigate,
}: {
  productionOrder: any;
  wovenOverview: any;
  totalQty: number;
  navigate: ReturnType<typeof useNavigate>;
}) {
  if (!productionOrder) {
    return (
      <AppCard title="Production">
        <p className="text-sm text-muted-foreground">
          No production order raised yet. Raise one from the{" "}
          <button
            className="font-medium text-primary underline-offset-2 hover:underline"
            onClick={() => navigate("/production-orders")}
          >
            Production Orders
          </button>{" "}
          page, then plan its loom & thread colors.
        </p>
      </AppCard>
    );
  }

  const lines = wovenOverview?.lines ?? [];
  const totals = wovenOverview?.totals;
  const targetQty = totals?.quantity || totalQty || 1;

  const allThreads = lines.flatMap((line: any) =>
    (line.planning?.threads ?? []).map((t: any) => ({
      ...t,
      lineId: line.id,
    }))
  );

  return (
    <>
      {/* ---------------- Woven Thread & Planning Information ---------------- */}
      <AppCard
        title="Woven Production & Thread Plan"
        description={`Production order ${productionOrder.productionNumber} · ${lines.length} woven line(s)`}
      >
        <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <Figure label="Planned Qty" value={`${formatNumber(totals?.quantity ?? totalQty, 0)} pcs`} accent />
          <Figure label="Woven Lines" value={formatNumber(totals?.lineCount ?? lines.length, 0)} />
          <Figure label="Thread Issued" value={`${formatNumber(totals?.totalThreadWeightKg ?? 0, 3)} kg`} />
          <Figure label="Packaged Weight" value={`${formatNumber(totals?.packagedWeightKg ?? 0, 2)} kg`} />
          <Figure label="Beam Total (Auto)" value={`${formatNumber(totals?.beamTotal ?? 0, 3)} kg`} accent />
        </div>

        {allThreads.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">
            No thread plan assigned yet — plan loom & thread colors on the production dashboard.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <Th>Line #</Th>
                  <Th>Color Name</Th>
                  <Th>Color Code</Th>
                  <Th>Denier</Th>
                  <Th align="right">Weight (kg)</Th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allThreads.map((t: any, index: number) => (
                  <TableRow key={`${t.lineId}-${t.id}-${index}`}>
                    <TableCell className="font-mono text-xs">Line #{t.lineId}</TableCell>
                    <TableCell className="font-medium">{t.colorName}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{t.colorCode}</TableCell>
                    <TableCell>
                      <StatusBadge variant="neutral">{t.denier}D</StatusBadge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{formatNumber(t.weightKg, 3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </AppCard>
    </>
  );
}

function StageProgressPcs({
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
  const pct = total > 0 ? Math.min(100, Math.round((done / total) * 1000) / 10) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className={`text-sm ${emphasis ? "font-semibold" : "font-medium"}`}>{label}</span>
        <span className="text-xs tabular-nums text-muted-foreground font-medium">
          {formatNumber(done, 0)} / {formatNumber(total, 0)} pcs · {pct}%
        </span>
      </div>
      <Progress value={pct} />
    </div>
  );
}
