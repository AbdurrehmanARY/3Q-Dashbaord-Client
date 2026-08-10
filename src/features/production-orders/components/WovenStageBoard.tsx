import * as React from "react";
import { Lock, Pencil, Check, X } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { formatDate, formatNumber, todayISO } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useOperators } from "@/features/machines-operators";
import {
  useUpdateWeaving,
  useUpdateWovenCutting,
  useUpdateWovenPackaging,
} from "../hooks/use-woven-production";
import type { WovenLineOverview } from "../woven-types";

/**
 * A stage panel that is either editable or visibly locked. A stage the workflow has not
 * reached yet shows *why* it is locked rather than silently rejecting input later —
 * cutting waits on weaving finishing, packaging waits on cutting catching up.
 */
function StageCard({
  title,
  locked,
  lockReason,
  complete,
  children,
}: {
  title: string;
  locked: boolean;
  lockReason?: string;
  complete: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-4", locked && "opacity-70")}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold">{title}</h4>
        {complete ? (
          <StatusBadge variant="completed">Complete</StatusBadge>
        ) : locked ? (
          <StatusBadge variant="neutral">
            <Lock className="mr-1 inline h-3 w-3" />
            Locked
          </StatusBadge>
        ) : (
          <StatusBadge variant="active">In Progress</StatusBadge>
        )}
      </div>
      {locked ? (
        <p className="text-xs text-muted-foreground">{lockReason}</p>
      ) : (
        <div className="space-y-3">{children}</div>
      )}
    </div>
  );
}

/** A number field that only submits on Save, so a half-typed value never hits the server. */
function EditableNumber({
  label,
  value,
  max,
  suffix,
  disabled,
  onSave,
}: {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
  disabled?: boolean;
  onSave: (next: number) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(String(value));

  React.useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  const invalid = !(Number(draft) >= 0) || (max !== undefined && Number(draft) > max);

  if (!editing) {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="flex items-center gap-2">
          <span className="text-sm font-medium tabular-nums">
            {formatNumber(value, 2)}
            {suffix ? ` ${suffix}` : ""}
          </span>
          <AppButton
            size="sm"
            variant="ghost"
            className="h-6 px-1.5"
            disabled={disabled}
            aria-label={`Edit ${label}`}
            onClick={() => setEditing(true)}
          >
            <Pencil className="h-3 w-3" />
          </AppButton>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2">
      <AppInput
        label={label}
        type="number"
        step="any"
        value={draft}
        error={invalid ? (max !== undefined ? `Max ${formatNumber(max, 2)}` : "Invalid") : undefined}
        onChange={(e) => setDraft(e.target.value)}
      />
      <AppButton
        size="sm"
        className="h-9 px-2"
        disabled={invalid}
        aria-label={`Save ${label}`}
        onClick={() => {
          onSave(Number(draft));
          setEditing(false);
        }}
      >
        <Check className="h-3.5 w-3.5" />
      </AppButton>
      <AppButton
        size="sm"
        variant="outline"
        className="h-9 px-2"
        aria-label={`Cancel ${label}`}
        onClick={() => {
          setDraft(String(value));
          setEditing(false);
        }}
      >
        <X className="h-3.5 w-3.5" />
      </AppButton>
    </div>
  );
}

/**
 * The woven production board for one line: Planning → Weaving → Cutting → Packaging.
 *
 * Each stage is gated on the one before it, exactly as the server enforces, so the UI never
 * offers an action the API would reject.
 */
export function WovenStageBoard({ orderId, line }: { orderId: string; line: WovenLineOverview }) {
  // Woven job → woven + both operators only (filtered server-side).
  const { data: operators } = useOperators({ productType: "woven" });
  const weaving = useUpdateWeaving(orderId);
  const cutting = useUpdateWovenCutting(orderId);
  const packaging = useUpdateWovenPackaging(orderId);

  const operatorOptions = React.useMemo(() => {
    const list = (operators ?? []).filter((o) => {
      return o.operatorType === "woven" || o.operatorType === "both" || (o.designation ?? "").toLowerCase().includes("woven") || (o.designation ?? "").toLowerCase().includes("weaving");
    });
    return list.map((o) => ({
      value: String(o.id),
      label: `${o.name} · ${o.designation} Operator`,
    }));
  }, [operators]);

  const weavingPct = Math.min(100, Math.round(((line.weaving.wovenQty ?? 0) / (line.quantity || 1)) * 1000) / 10);
  const cutPct = Math.min(100, Math.round(((line.cutting.cutQty ?? 0) / (line.quantity || 1)) * 1000) / 10);
  const packagedPct = Math.min(100, Math.round(((line.packaging.packagedQty ?? 0) / (line.quantity || 1)) * 1000) / 10);

  return (
    <div className="space-y-4">
      <AppCard title="Thread Plan" contentClassName="p-0">
        <div className="divide-y">
          {line.planning.threads.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3 px-4 py-2 text-sm">
              <span className="flex items-center gap-2">
                <span className="font-medium">{t.colorName}</span>
                <span className="font-mono text-xs text-muted-foreground">{t.colorCode}</span>
                <StatusBadge variant="neutral">{t.denier}D</StatusBadge>
              </span>
              <span className="tabular-nums">{formatNumber(t.weightKg, 3)} kg</span>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold">
            <span>Total Thread Weight</span>
            <span className="tabular-nums text-primary">
              {formatNumber(line.planning.totalThreadWeightKg, 3)} kg
            </span>
          </div>
        </div>
      </AppCard>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* ---------------- Weaving ---------------- */}
        <StageCard
          title="Weaving"
          locked={!line.planning.completedAt}
          lockReason="Complete planning to begin weaving."
          complete={line.weaving.isComplete}
        >
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>Machine: {line.weaving.machineName ?? "Unassigned"}</div>
            <div>Operator: {line.weaving.operatorName ?? "Unassigned"}</div>
          </div>
          <Progress value={weavingPct} />
          <p className="text-xs tabular-nums text-muted-foreground font-medium">
            {formatNumber(line.weaving.wovenQty, 0)} of {formatNumber(line.quantity, 0)} pcs woven ({weavingPct}%)
          </p>
          <EditableNumber
            label="Woven Qty"
            value={line.weaving.wovenQty}
            max={line.quantity}
            disabled={weaving.isPending}
            onSave={(wovenQty) => {
              const body = !line.weaving.startedAt ? { wovenQty, started: true } : { wovenQty };
              weaving.mutate({ lineId: line.id, body });
            }}
          />
          {line.weaving.startedAt && !line.weaving.endedAt && (
            <div className="flex gap-2">
              <AppButton
                size="sm"
                variant="outline"
                loading={weaving.isPending}
                onClick={() => weaving.mutate({ lineId: line.id, body: { ended: true } })}
              >
                End Weaving
              </AppButton>
            </div>
          )}
          {line.weaving.startedAt && (
            <p className="text-[11px] text-muted-foreground">
              Started {formatDate(line.weaving.startedAt)}
              {line.weaving.endedAt ? ` · Ended ${formatDate(line.weaving.endedAt)}` : ""}
            </p>
          )}
        </StageCard>

        {/* ---------------- Cutting ---------------- */}
        <StageCard
          title="Cutting"
          locked={!line.cutting.canStart}
          lockReason={`Weaving must reach 100% first (${formatNumber(line.weaving.wovenQty, 0)} of ${formatNumber(line.quantity, 0)} woven).`}
          complete={line.cutting.isComplete}
        >
          <AppCombobox
            label="Cutting Operator"
            value={line.cutting.operatorId != null ? String(line.cutting.operatorId) : undefined}
            onChange={(v) =>
              cutting.mutate({ lineId: line.id, body: { cuttingOperatorId: v ? Number(v) : undefined } })
            }
            options={operatorOptions}
            placeholder="Assign operator…"
            emptyText="No operators."
          />
          <Progress value={cutPct} />
          <p className="text-xs tabular-nums text-muted-foreground font-medium">
            {formatNumber(line.cutting.cutQty, 0)} of {formatNumber(line.quantity, 0)} pcs cut out of total ({cutPct}%)
          </p>
          <EditableNumber
            label="Cut Qty"
            value={line.cutting.cutQty}
            max={line.weaving.wovenQty}
            disabled={cutting.isPending}
            onSave={(cutQty) =>
              cutting.mutate({
                lineId: line.id,
                body: { cutQty, cuttingDate: line.cutting.cuttingDate ?? todayISO() },
              })
            }
          />
          <p className="text-[11px] text-muted-foreground">
            Cutting date: {formatDate(line.cutting.cuttingDate)}
          </p>
        </StageCard>

        {/* ---------------- Packaging ---------------- */}
        <StageCard
          title="Packaging"
          locked={!line.packaging.canStart}
          lockReason={`Cutting must match the woven quantity first (${formatNumber(line.cutting.cutQty, 0)} cut of ${formatNumber(line.weaving.wovenQty, 0)} woven).`}
          complete={line.packaging.isComplete}
        >
          <AppCombobox
            label="Packaging Operator"
            value={line.packaging.operatorId != null ? String(line.packaging.operatorId) : undefined}
            onChange={(v) =>
              packaging.mutate({
                lineId: line.id,
                body: { packagingOperatorId: v ? Number(v) : undefined },
              })
            }
            options={operatorOptions}
            placeholder="Assign operator…"
            emptyText="No operators."
          />
          <Progress value={packagedPct} />
          <p className="text-xs tabular-nums text-muted-foreground font-medium">
            {formatNumber(line.packaging.packagedQty, 0)} of {formatNumber(line.quantity, 0)} pcs packaged out of total ({packagedPct}%)
          </p>
          <EditableNumber
            label="Packaged Qty"
            value={line.packaging.packagedQty}
            max={line.cutting.cutQty}
            disabled={packaging.isPending}
            onSave={(packagedQty) =>
              packaging.mutate({
                lineId: line.id,
                body: { packagedQty, packagingDate: line.packaging.packagingDate ?? todayISO() },
              })
            }
          />
          <EditableNumber
            label="Packaged Weight"
            value={line.packaging.packagedWeightKg}
            suffix="kg"
            disabled={packaging.isPending}
            onSave={(packagedWeightKg) =>
              packaging.mutate({ lineId: line.id, body: { packagedWeightKg } })
            }
          />
          <p className="text-[11px] text-muted-foreground">
            Packaging date: {formatDate(line.packaging.packagingDate)}
          </p>
        </StageCard>
      </div>
    </div>
  );
}
