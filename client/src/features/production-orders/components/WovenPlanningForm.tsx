import * as React from "react";
import { Plus, Trash2, AlertTriangle } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useMachines, useOperators } from "@/features/machines-operators";
import { useThreadStocks, THREAD_DENIERS, type ThreadDenier } from "@/features/thread";
import type { WovenLineOverview, PlanWovenInput } from "../woven-types";

/** The planning spec allows at most eight thread colours per woven line. */
const MAX_COLORS = 8;

interface ColorRow {
  key: string;
  colorName: string;
  denier: ThreadDenier;
  colorCode: string;
  weightKg: string;
}

const emptyRow = (i: number): ColorRow => ({
  key: `row-${i}-${Math.random().toString(36).slice(2, 8)}`,
  colorName: "",
  denier: "75",
  colorCode: "",
  weightKg: "",
});

interface WovenPlanningFormProps {
  /** Set when re-planning an existing line; null when planning a new one. */
  editing: WovenLineOverview | null;
  defaultQuantity: number;
  saving: boolean;
  onSubmit: (body: PlanWovenInput) => Promise<void>;
  onCancel: () => void;
}

/**
 * Woven planning: the thread colours a design needs, plus the loom and its operator.
 *
 * Colours are added and removed dynamically up to eight. Total thread weight is shown live
 * but always recalculated server-side. Submitting reserves the thread from stock — dyed
 * first, undyed as fallback — so the available-stock hint under each colour is what stops
 * the operator planning something the floor cannot supply.
 */
export function WovenPlanningForm({
  editing,
  defaultQuantity,
  saving,
  onSubmit,
  onCancel,
}: WovenPlanningFormProps) {
  const { data: machines } = useMachines();
  // Woven job → woven + both operators only; printed-only operators are excluded server-side.
  const { data: operators } = useOperators({ productType: "woven" });
  const { data: stocks } = useThreadStocks();

  const [quantity, setQuantity] = React.useState(String(editing?.quantity ?? defaultQuantity ?? ""));
  const [machineId, setMachineId] = React.useState<number | null>(editing?.weaving.machineId ?? null);
  const [operatorId, setOperatorId] = React.useState<number | null>(editing?.weaving.operatorId ?? null);
  const [rows, setRows] = React.useState<ColorRow[]>(() =>
    editing && editing.planning.threads.length > 0
      ? editing.planning.threads.map((t, i) => ({
          key: `existing-${t.id}-${i}`,
          colorName: t.colorName,
          denier: t.denier,
          colorCode: t.colorCode,
          weightKg: String(t.weightKg),
        }))
      : [emptyRow(0)]
  );

  const setRow = (key: string, patch: Partial<ColorRow>) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const totalWeight = rows.reduce((sum, r) => sum + (Number(r.weightKg) || 0), 0);

  /** Dyed stock first, then undyed of the same denier — mirrors the server's deduction rule. */
  const availableFor = (row: ColorRow) => {
    const all = stocks ?? [];
    const dyed = all
      .filter(
        (s) =>
          s.stockType === "secondary" &&
          s.denier === row.denier &&
          s.colorName.toLowerCase() === row.colorName.trim().toLowerCase() &&
          (s.colorCode ?? "").toLowerCase() === row.colorCode.trim().toLowerCase()
      )
      .reduce((a, s) => a + s.balanceKg, 0);
    const undyed = all
      .filter((s) => s.stockType === "primary" && s.denier === row.denier)
      .reduce((a, s) => a + s.balanceKg, 0);
    return { dyed, undyed, total: dyed + undyed };
  };

  const machineOptions = (machines ?? []).map((m) => ({ value: String(m.id), label: m.machineName }));
  const operatorOptions = (operators ?? [])
    .filter((o) => o.designation === "Printing" || o.designation === "Cutting" || o.designation === "Packaging")
    .map((o) => ({ value: String(o.id), label: `${o.name} · ${o.designation}` }));

  // Planning cannot proceed until every required field on every colour is present.
  const rowErrors = rows.map((r) => {
    if (!r.colorName.trim()) return "Colour name required";
    if (!r.colorCode.trim()) return "Colour code required";
    if (!(Number(r.weightKg) > 0)) return "Weight required";
    if (availableFor(r).total < Number(r.weightKg)) return "Insufficient thread stock";
    return null;
  });
  const incomplete =
    !(Number(quantity) > 0) || machineId == null || operatorId == null || rowErrors.some(Boolean);

  const submit = async () => {
    if (incomplete) return;
    await onSubmit({
      quantity: Number(quantity),
      weavingMachineId: machineId as number,
      weavingOperatorId: operatorId as number,
      threads: rows.map((r) => ({
        colorName: r.colorName.trim(),
        denier: r.denier,
        colorCode: r.colorCode.trim(),
        weightKg: Number(r.weightKg),
      })),
    });
  };

  return (
    <AppCard
      title={editing ? "Re-plan Woven Line" : "Plan Woven Production"}
      description="Assign thread colours, the loom and its operator. Submitting reserves the thread from stock."
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <AppInput
            label="Quantity *"
            type="number"
            value={quantity}
            disabled={saving}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <AppCombobox
            label="Weaving Machine *"
            value={machineId != null ? String(machineId) : undefined}
            onChange={(v) => setMachineId(v ? Number(v) : null)}
            options={machineOptions}
            placeholder="Select machine…"
            emptyText="No machines."
            disabled={saving}
          />
          <AppCombobox
            label="Weaving Operator *"
            value={operatorId != null ? String(operatorId) : undefined}
            onChange={(v) => setOperatorId(v ? Number(v) : null)}
            options={operatorOptions}
            placeholder="Select operator…"
            emptyText="No operators."
            disabled={saving}
          />
        </div>

        {/* ---- Thread colours: up to 8, added/removed dynamically ---- */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Thread Colours</p>
              <p className="text-xs text-muted-foreground">
                {rows.length} of {MAX_COLORS} used · dyed stock is consumed first, then undyed
              </p>
            </div>
            <AppButton
              size="sm"
              variant="outline"
              leftIcon={<Plus className="h-4 w-4" />}
              disabled={rows.length >= MAX_COLORS || saving}
              onClick={() => setRows((prev) => [...prev, emptyRow(prev.length)])}
            >
              Add Colour
            </AppButton>
          </div>

          <div className="space-y-2">
            {rows.map((row, i) => {
              const stock = availableFor(row);
              const error = rowErrors[i];
              return (
                <div
                  key={row.key}
                  className={cn(
                    "grid gap-3 rounded-lg border p-3 sm:grid-cols-[2fr_1fr_1.5fr_1fr_auto]",
                    error && "border-destructive/40 bg-destructive/5"
                  )}
                >
                  <AppInput
                    label={i === 0 ? "Colour Name *" : undefined}
                    placeholder="e.g. Brown"
                    value={row.colorName}
                    disabled={saving}
                    onChange={(e) => setRow(row.key, { colorName: e.target.value })}
                  />
                  <AppCombobox
                    label={i === 0 ? "Denier *" : undefined}
                    value={row.denier}
                    onChange={(v) => setRow(row.key, { denier: (v as ThreadDenier) ?? "75" })}
                    options={THREAD_DENIERS.map((d) => ({ value: d, label: `${d}D` }))}
                    placeholder="Denier"
                    emptyText="—"
                    disabled={saving}
                  />
                  <AppInput
                    label={i === 0 ? "Colour Code *" : undefined}
                    placeholder="e.g. 22783"
                    value={row.colorCode}
                    disabled={saving}
                    onChange={(e) => setRow(row.key, { colorCode: e.target.value })}
                  />
                  <AppInput
                    label={i === 0 ? "Weight (kg) *" : undefined}
                    type="number"
                    step="any"
                    value={row.weightKg}
                    disabled={saving}
                    onChange={(e) => setRow(row.key, { weightKg: e.target.value })}
                  />
                  <div className={cn("flex items-end", i === 0 && "pb-0.5")}>
                    <AppButton
                      size="sm"
                      variant="ghost"
                      className="h-9 px-2 text-destructive"
                      aria-label={`Remove colour ${i + 1}`}
                      disabled={rows.length === 1 || saving}
                      onClick={() => setRows((prev) => prev.filter((r) => r.key !== row.key))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </AppButton>
                  </div>

                  <p className="text-[11px] text-muted-foreground sm:col-span-5">
                    Available: <strong className="tabular-nums">{formatNumber(stock.dyed, 3)} kg</strong>{" "}
                    dyed + <strong className="tabular-nums">{formatNumber(stock.undyed, 3)} kg</strong>{" "}
                    undyed ({row.denier}D)
                    {error && (
                      <span className="ml-2 font-medium text-destructive">
                        <AlertTriangle className="mr-0.5 inline h-3 w-3" />
                        {error}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t pt-3 text-xs">
          <span className="text-muted-foreground">
            Total Thread Weight:{" "}
            <strong className="tabular-nums text-primary">{formatNumber(totalWeight, 3)} kg</strong>
          </span>
          <span className="text-muted-foreground">
            Colours: <strong className="tabular-nums text-foreground">{rows.length}</strong>
          </span>
        </div>

        <div className="flex gap-2 border-t pt-4">
          <AppButton loading={saving} disabled={incomplete} onClick={submit}>
            {editing ? "Save Plan" : "Plan & Reserve Thread"}
          </AppButton>
          <AppButton variant="outline" disabled={saving} onClick={onCancel}>
            Cancel
          </AppButton>
          {incomplete && (
            <p className="self-center text-xs text-muted-foreground">
              Complete every colour, the quantity, machine and operator to continue.
            </p>
          )}
        </div>
      </div>
    </AppCard>
  );
}
