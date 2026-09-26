import * as React from "react";
import { Plus, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useThreadStocks, THREAD_DENIERS, type ThreadDenier } from "@/features/thread";
import type { ThreadPlanInput } from "../woven-types";
import { allocateSharedThreads } from "../utils/planning-rows";

/** The planning spec allows at most eight thread colours for a woven plan. */
export const MAX_THREAD_COLORS = 8;

/** One colour of the SHARED allocation. Weights are the whole plan's, not one label type's. */
export interface ThreadAllocationRow {
  key: string;
  threadStockId: number | null;
  colorName: string;
  denier: ThreadDenier;
  colorCode: string;
  weightKg: string;
}

export const emptyThreadAllocationRow = (i: number): ThreadAllocationRow => ({
  key: `alloc-${i}-${Math.random().toString(36).slice(2, 8)}`,
  threadStockId: null,
  colorName: "",
  denier: "75",
  colorCode: "",
  weightKg: "",
});

/** Rows of the shared allocation → the wire shape the allocation endpoint expects. */
export function threadAllocationToThreads(rows: ThreadAllocationRow[]): ThreadPlanInput[] {
  return rows.map((r) => ({
    colorName: r.colorName.trim(),
    denier: r.denier,
    colorCode: r.colorCode.trim(),
    weightKg: Number(r.weightKg),
    threadStockId: r.threadStockId,
  }));
}

/** Existing woven lines → allocation rows, used when re-planning a single line. */
export function threadsToAllocationRows(
  threads: { threadStockId?: number | null; colorName: string; denier: ThreadDenier; colorCode: string; weightKg: number }[]
): ThreadAllocationRow[] {
  return threads.map((t, i) => ({
    key: `existing-${i}-${t.colorCode}-${t.colorName}`,
    threadStockId: t.threadStockId ?? null,
    colorName: t.colorName,
    denier: t.denier,
    colorCode: t.colorCode,
    weightKg: String(t.weightKg),
  }));
}

/** Minimal structural view of a thread-stock row — enough to price the allocation. */
export interface ThreadStockLike {
  id: number;
  stockType: string;
  denier: string;
  colorName: string;
  colorCode?: string | null;
  balanceKg: number;
}

/** Stock the server would draw for one colour: dyed first, undyed fallback, aggregated. */
export function threadAvailabilityFor(
  row: Pick<ThreadAllocationRow, "threadStockId" | "denier" | "colorName" | "colorCode">,
  stocks: ThreadStockLike[]
): { dyed: number; undyed: number; total: number } {
  const dyed = stocks
    .filter(
      (s) =>
        s.stockType === "secondary" &&
        (row.threadStockId ? s.id === row.threadStockId : true) &&
        s.denier === row.denier &&
        s.colorName.toLowerCase() === row.colorName.trim().toLowerCase() &&
        (s.colorCode ?? "").toLowerCase() === row.colorCode.trim().toLowerCase()
    )
    .reduce((sum, s) => sum + Number(s.balanceKg), 0);
  const undyed = stocks
    .filter((s) => s.stockType === "primary" && s.denier === row.denier)
    .reduce((sum, s) => sum + Number(s.balanceKg), 0);
  return { dyed, undyed, total: dyed + undyed };
}

/**
 * The per-colour rules planning has always enforced — colour chosen, weight entered, and
 * enough stock (dyed + undyed fallback) for the allocated weight. Exported so the form can
 * gate submission on exactly the same rules the editor displays.
 */
export function threadAllocationRowErrors(
  rows: ThreadAllocationRow[],
  stocks: ThreadStockLike[]
): (string | null)[] {
  return rows.map((row) => {
    if (!row.colorCode.trim() && !row.threadStockId) return "Dyed inventory colour code required";
    if (!row.colorName.trim()) return "Colour name required";
    if (!(Number(row.weightKg) > 0)) return "Weight required";
    if (threadAvailabilityFor(row, stocks).total < Number(row.weightKg)) return "Insufficient thread stock";
    return null;
  });
}

interface SharedThreadAllocationProps {
  rows: ThreadAllocationRow[];
  onChange: (rows: ThreadAllocationRow[]) => void;
  /** Label-type rows the ONE allocation will be split across — drives the split preview. */
  labelRows: { labelType: string; quantity: number | string }[];
  disabled?: boolean;
}

/**
 * One shared thread allocation for the whole woven plan.
 *
 * Colours are chosen from Dyed Inventory (searchable by code or name) and the weight entered
 * here covers EVERY woven label type planned beside it — it is not repeated per row. At submit
 * the allocation is split across the rows by quantity (`allocateSharedThreads`), so stock is
 * drawn once while each line still carries its own share for consumption tracking.
 */
export function SharedThreadAllocation({ rows, onChange, labelRows, disabled }: SharedThreadAllocationProps) {
  const { data: stocks } = useThreadStocks();
  const stockRows = React.useMemo<ThreadStockLike[]>(() => stocks ?? [], [stocks]);
  const dyedStocks = React.useMemo(() => stockRows.filter((s) => s.stockType === "secondary"), [stockRows]);

  // Re-planning keeps the colour's inventory FK: bind existing rows to their dyed record
  // once stocks settle (a stored plan only keeps colour/denier/code).
  const boundRef = React.useRef(false);
  React.useEffect(() => {
    if (boundRef.current || dyedStocks.length === 0) return;
    boundRef.current = true;
    if (rows.every((r) => r.threadStockId || (!r.colorCode && !r.colorName))) return;
    onChange(
      rows.map((r) => {
        if (r.threadStockId) return r;
        const match = dyedStocks.find(
          (s) =>
            (r.colorCode && (s.colorCode ?? "").toLowerCase() === r.colorCode.toLowerCase()) ||
            (r.colorName && s.colorName.toLowerCase() === r.colorName.toLowerCase())
        );
        return match ? { ...r, threadStockId: match.id } : r;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dyedStocks]);

  const setRow = (key: string, patch: Partial<ThreadAllocationRow>) =>
    onChange(rows.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const rowErrors = threadAllocationRowErrors(rows, stockRows);
  const totalWeight = rows.reduce((sum, r) => sum + (Number(r.weightKg) || 0), 0);

  const dyedStockOptions = React.useMemo(
    () =>
      dyedStocks.map((s) => ({
        value: String(s.id),
        label: `${s.colorCode ? s.colorCode + " — " : ""}${s.colorName} (${s.denier}D) · ${formatNumber(
          s.balanceKg,
          3
        )} kg avail`,
      })),
    [dyedStocks]
  );

  /** Preview of the split submission will produce, so the shared nature is visible. */
  const split = React.useMemo(
    () => allocateSharedThreads(threadAllocationToThreads(rows), labelRows),
    [rows, labelRows]
  );

  return (
    <div className="rounded-lg border bg-muted/20 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Shared Thread Allocation</p>
          <p className="text-xs text-muted-foreground">
            One allocation for the whole plan — it covers every label type above
            {labelRows.length > 1 ? ` (${labelRows.length} label types)` : ""}. Dyed stock is drawn first, undyed as
            fallback.
          </p>
        </div>
        <AppButton
          size="sm"
          variant="outline"
          type="button"
          leftIcon={<Plus className="h-4 w-4" />}
          disabled={disabled || rows.length >= MAX_THREAD_COLORS}
          onClick={() => onChange([...rows, emptyThreadAllocationRow(rows.length)])}
        >
          Add Colour
        </AppButton>
      </div>

      <div className="space-y-3">
        {rows.map((row, i) => {
          const error = rowErrors[i];
          const stock = threadAvailabilityFor(row, stockRows);
          return (
            <div
              key={row.key}
              className={cn(
                "grid gap-3 rounded-lg border bg-background p-3 sm:grid-cols-[2fr_1.5fr_1fr_1fr_auto]",
                error && "border-destructive/40 bg-destructive/5"
              )}
            >
              <AppCombobox
                label={i === 0 ? "Color Code / Dyed Thread *" : undefined}
                value={row.threadStockId ? String(row.threadStockId) : undefined}
                onChange={(val) => {
                  if (!val) {
                    setRow(row.key, { threadStockId: null, colorCode: "", colorName: "" });
                    return;
                  }
                  const match = dyedStocks.find((s) => String(s.id) === val);
                  if (match) {
                    setRow(row.key, {
                      threadStockId: match.id,
                      colorCode: match.colorCode ?? "",
                      colorName: match.colorName,
                      denier: match.denier as ThreadDenier,
                    });
                  }
                }}
                options={dyedStockOptions}
                placeholder="Search Color Code or Name…"
                emptyText="No dyed inventory records."
                disabled={disabled}
              />

              <AppInput
                label={i === 0 ? "Colour Name" : undefined}
                placeholder="Auto-populated"
                value={row.colorName}
                disabled={disabled || Boolean(row.threadStockId)}
                onChange={(e) => setRow(row.key, { colorName: e.target.value })}
              />
              <AppCombobox
                label={i === 0 ? "Denier" : undefined}
                value={row.denier}
                onChange={(v) => setRow(row.key, { denier: (v as ThreadDenier) ?? "75" })}
                options={THREAD_DENIERS.map((d) => ({ value: d, label: `${d}D` }))}
                placeholder="Denier"
                emptyText="—"
                disabled={disabled || Boolean(row.threadStockId)}
              />

              <AppInput
                label={i === 0 ? "Weight (kg) *" : undefined}
                type="number"
                step="any"
                value={row.weightKg}
                disabled={disabled}
                onChange={(e) => setRow(row.key, { weightKg: e.target.value })}
              />

              <div className={cn("flex items-end", i === 0 && "pb-0.5")}>
                <AppButton
                  size="sm"
                  variant="ghost"
                  type="button"
                  className="h-9 px-2 text-destructive"
                  aria-label={`Remove colour ${i + 1}`}
                  disabled={rows.length === 1 || disabled}
                  onClick={() => onChange(rows.filter((r) => r.key !== row.key))}
                >
                  <Trash2 className="h-4 w-4" />
                </AppButton>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-1.5 text-[11px] text-muted-foreground sm:col-span-5">
                <span>
                  Available Stock:{" "}
                  <strong className="tabular-nums text-foreground">{formatNumber(stock.dyed, 3)} kg</strong> dyed (
                  {row.colorCode ? `${row.colorCode} · ` : ""}
                  {row.colorName || "Unselected"}) +{" "}
                  <strong className="tabular-nums text-foreground">{formatNumber(stock.undyed, 3)} kg</strong> undyed (
                  {row.denier}D)
                </span>
                {row.threadStockId && (
                  <span className="inline-flex items-center font-medium text-emerald-600">
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
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 border-t pt-3 text-xs">
        <span className="text-muted-foreground">
          Total Thread Weight:{" "}
          <strong className="tabular-nums text-primary">{formatNumber(totalWeight, 3)} kg</strong>
        </span>
        <span className="text-muted-foreground">
          Colours:{" "}
          <strong className="tabular-nums text-foreground">
            {rows.length} of {MAX_THREAD_COLORS}
          </strong>
        </span>
      </div>

      {split && labelRows.length > 1 && (
        <div className="mt-2 rounded-md border border-dashed bg-background/60 px-3 py-2 text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground">Allocation split by quantity:</span>{" "}
          {labelRows
            .map((r, i) => {
              const kg = (split[i] ?? []).reduce((sum, t) => sum + Number(t.weightKg), 0);
              return `${r.labelType || `Label ${i + 1}`} → ${formatNumber(kg, 3)} kg`;
            })
            .join(" · ")}
        </div>
      )}
      {!split && labelRows.length > 1 && (
        <p className="mt-2 text-[11px] font-medium text-destructive">
          <AlertTriangle className="mr-0.5 inline h-3 w-3" />
          This allocation cannot be split across {labelRows.length} label types — enter a positive weight and quantity
          for every colour and label type.
        </p>
      )}
    </div>
  );
}

