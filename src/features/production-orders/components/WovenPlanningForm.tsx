import * as React from "react";
import { Plus, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
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
  threadStockId: number | null;
  colorName: string;
  denier: ThreadDenier;
  colorCode: string;
  weightKg: string;
}

const emptyRow = (i: number): ColorRow => ({
  key: `row-${i}-${Math.random().toString(36).slice(2, 8)}`,
  threadStockId: null,
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
 * Colours are selected from existing Dyed Inventory records using a searchable combobox
 * (searchable by Color Code or Color Name). Related fields (Color Name, Denier, Stock, FK)
 * auto-populate immediately upon selection.
 */
export function WovenPlanningForm({
  editing,
  defaultQuantity,
  saving,
  onSubmit,
  onCancel,
}: WovenPlanningFormProps) {
  // Woven job → woven + both machines & operators only; printed-only machines & operators are excluded server-side.
  const { data: machines } = useMachines({ productType: "woven" });
  const { data: operators } = useOperators({ productType: "woven" });
  const { data: stocks } = useThreadStocks();

  const [quantity, setQuantity] = React.useState(String(editing?.quantity ?? defaultQuantity ?? ""));
  const [machineId, setMachineId] = React.useState<number | null>(editing?.weaving.machineId ?? null);
  const [operatorId, setOperatorId] = React.useState<number | null>(editing?.weaving.operatorId ?? null);
  const [rows, setRows] = React.useState<ColorRow[]>(() =>
    editing && editing.planning.threads.length > 0
      ? editing.planning.threads.map((t, i) => ({
        key: `existing-${t.id}-${i}`,
        threadStockId: t.threadStockId ?? null,
        colorName: t.colorName,
        denier: t.denier,
        colorCode: t.colorCode,
        weightKg: String(t.weightKg),
      }))
      : [emptyRow(0)]
  );

  const dyedStocks = React.useMemo(
    () => (stocks ?? []).filter((s) => s.stockType === "secondary"),
    [stocks]
  );

  // Auto-bind threadStockId for existing edit rows once stocks query settles
  React.useEffect(() => {
    if (dyedStocks.length === 0) return;
    setRows((prev) =>
      prev.map((r) => {
        if (r.threadStockId) return r;
        const match = dyedStocks.find(
          (s) =>
            (r.colorCode && s.colorCode?.toLowerCase() === r.colorCode.toLowerCase()) ||
            (r.colorName && s.colorName.toLowerCase() === r.colorName.toLowerCase())
        );
        return match ? { ...r, threadStockId: match.id } : r;
      })
    );
  }, [dyedStocks]);

  const setRow = (key: string, patch: Partial<ColorRow>) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const totalWeight = rows.reduce((sum, r) => sum + (Number(r.weightKg) || 0), 0);

  /** Combobox options displaying both Color Code and Color Name + Denier & Available stock */
  const dyedStockOptions = React.useMemo(
    () =>
      dyedStocks.map((s) => ({
        value: String(s.id),
        label: `${s.colorCode ? s.colorCode + " — " : ""}${s.colorName} (${s.denier}D) · ${formatNumber(s.balanceKg, 3)} kg avail`,
      })),
    [dyedStocks]
  );

  /** Dyed stock first, then undyed of the same denier — mirrors the server's deduction rule. */
  const availableFor = (row: ColorRow) => {
    const all = stocks ?? [];
    const dyed = all
      .filter(
        (s) =>
          s.stockType === "secondary" &&
          (row.threadStockId ? s.id === row.threadStockId : true) &&
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

  const machineOptions = React.useMemo(() => {
    const list = (machines ?? []).filter((m) => {
      const typeStr = (m.machineType ?? "").toLowerCase();
      const nameStr = (m.machineName ?? m.name ?? "").toLowerCase();
      return typeStr.includes("woven") || typeStr.includes("weaving") || nameStr.includes("woven") || nameStr.includes("weaving") || m.productType === "woven" || m.productType === "both";
    });
    return list.map((m) => ({ value: String(m.id), label: `${m.machineName || m.name} (${m.machineType || "Woven"})` }));
  }, [machines]);

  const operatorOptions = React.useMemo(() => {
    const list = (operators ?? []).filter((o) => {
      return o.operatorType === "woven" || o.operatorType === "both" || (o.designation ?? "").toLowerCase().includes("woven") || (o.designation ?? "").toLowerCase().includes("weaving");
    });
    return list.map((o) => ({
      value: String(o.id),
      label: `${o.name} · ${o.designation} Operator`,
    }));
  }, [operators]);

  // Planning cannot proceed until every required field on every colour is present.
  const rowErrors = rows.map((r) => {
    if (!r.colorCode.trim() && !r.threadStockId) return "Dyed inventory colour code required";
    if (!r.colorName.trim()) return "Colour name required";
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
        threadStockId: r.threadStockId,
      })),
    });
  };

  return (
    <AppCard
      title={editing ? "Re-plan Woven Line" : "Plan Woven Production"}
      description="Select thread colours from dyed inventory, assign the weaving loom and operator. Submitting reserves the thread from stock."
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
            emptyText="No woven machines available."
            disabled={saving}
          />
          <AppCombobox
            label="Weaving Operator *"
            value={operatorId != null ? String(operatorId) : undefined}
            onChange={(v) => setOperatorId(v ? Number(v) : null)}
            options={operatorOptions}
            placeholder="Select operator…"
            emptyText="No woven operators available."
            disabled={saving}
          />
        </div>

        {/* ---- Thread colours: up to 8, selected from Dyed Inventory ---- */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Thread Colours (Dyed Inventory)</p>
              <p className="text-xs text-muted-foreground">
                {rows.length} of {MAX_COLORS} used · select from dyed inventory (dyed stock consumed first, then undyed fallback)
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

          <div className="space-y-3">
            {rows.map((row, i) => {
              const stock = availableFor(row);
              const error = rowErrors[i];
              return (
                <div
                  key={row.key}
                  className={cn(
                    "grid gap-3 rounded-lg border p-3 sm:grid-cols-[2fr_1.5fr_1fr_1fr_auto]",
                    error && "border-destructive/40 bg-destructive/5"
                  )}
                >
                  {/* 1. Color Code Searchable Combobox */}
                  <AppCombobox
                    label={i === 0 ? "Color Code / Dyed Thread *" : undefined}
                    value={row.threadStockId ? String(row.threadStockId) : undefined}
                    onChange={(val) => {
                      if (!val) {
                        setRow(row.key, {
                          threadStockId: null,
                          colorCode: "",
                          colorName: "",
                        });
                        return;
                      }
                      const match = dyedStocks.find((s) => String(s.id) === val);
                      if (match) {
                        setRow(row.key, {
                          threadStockId: match.id,
                          colorCode: match.colorCode ?? "",
                          colorName: match.colorName,
                          denier: match.denier,
                        });
                      }
                    }}
                    options={dyedStockOptions}
                    placeholder="Search Color Code or Name…"
                    emptyText="No dyed inventory records."
                    disabled={saving}
                  />

                  {/* 2. Color Name (Auto-populated from Dyed Inventory) */}
                  <AppInput
                    label={i === 0 ? "Colour Name" : undefined}
                    placeholder="Auto-populated"
                    value={row.colorName}
                    disabled={saving || Boolean(row.threadStockId)}
                    onChange={(e) => setRow(row.key, { colorName: e.target.value })}
                  />

                  {/* 3. Denier / Thread Count (Auto-populated) */}
                  <AppCombobox
                    label={i === 0 ? "Denier" : undefined}
                    value={row.denier}
                    onChange={(v) => setRow(row.key, { denier: (v as ThreadDenier) ?? "75" })}
                    options={THREAD_DENIERS.map((d) => ({ value: d, label: `${d}D` }))}
                    placeholder="Denier"
                    emptyText="—"
                    disabled={saving || Boolean(row.threadStockId)}
                  />

                  {/* 4. Weight (kg) Input */}
                  <AppInput
                    label={i === 0 ? "Weight (kg) *" : undefined}
                    type="number"
                    step="any"
                    value={row.weightKg}
                    disabled={saving}
                    onChange={(e) => setRow(row.key, { weightKg: e.target.value })}
                  />

                  {/* 5. Action / Delete Button */}
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

                  {/* Stock Availability Hint */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground sm:col-span-5 border-t pt-1.5 mt-1">
                    <span>
                      Available Stock: <strong className="tabular-nums text-foreground">{formatNumber(stock.dyed, 3)} kg</strong>{" "}
                      dyed ({row.colorCode ? `${row.colorCode} · ` : ""}{row.colorName || "Unselected"}) + <strong className="tabular-nums text-foreground">{formatNumber(stock.undyed, 3)} kg</strong>{" "}
                      undyed ({row.denier}D)
                    </span>
                    {row.threadStockId && (
                      <span className="inline-flex items-center text-emerald-600 font-medium">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Linked to Dyed Inventory Record #{row.threadStockId}
                      </span>
                    )}
                    {error && (
                      <span className="font-medium text-destructive">
                        <AlertTriangle className="mr-0.5 inline h-3 w-3" />
                        {error}
                      </span>
                    )}
                  </div>
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
              Select every dyed thread colour, quantity, machine and operator to continue.
            </p>
          )}
        </div>
      </div>
    </AppCard>
  );
}

