import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { type SizePlan } from "../label-types";

interface SizePlanEditorProps {
  /** Planned sizes: each row is one size and how many pieces of it. */
  value: SizePlan[];
  /** Called with the full array on every change. */
  onChange: (value: SizePlan[]) => void;
  /** The line's total quantity — for the "must sum to N" check. */
  totalQuantity: number;
  disabled?: boolean;
  error?: string;
  className?: string;
}

/**
 * Inline editor for the size rows of a Size Label: size name + piece quantity per row.
 *
 * The rows must sum to the line's quantity exactly — that equality is what makes
 * "remaining per size" a real figure on the floor. The check is enforced server-side too
 * (see `@api/constants/labels`), so this inline message is a convenience, not the guard.
 */
export function SizePlanEditor({
  value,
  onChange,
  totalQuantity,
  disabled,
  error,
  className,
}: SizePlanEditorProps) {
  const [rows, setRows] = React.useState<SizePlan[]>(() => value || []);

  React.useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(rows)) {
      setRows(value || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const updateRow = (idx: number, patch: Partial<SizePlan>) => {
    const next = [...rows];
    next[idx] = { ...next[idx], ...patch };
    setRows(next);
    onChange(next);
  };

  const addRow = () => {
    const next = [...rows, { size: "", quantity: 0 }];
    setRows(next);
    onChange(next);
  };

  const removeRow = (idx: number) => {
    const next = rows.filter((_, i) => i !== idx);
    setRows(next);
    onChange(next);
  };

  const planSum = rows.reduce((n, r) => n + (r.quantity || 0), 0);
  const mismatch = totalQuantity > 0 && planSum !== totalQuantity;

  const rowError = (idx: number) => {
    const r = rows[idx];
    if (!r.size.trim()) return "Size name is required";
    if (!Number.isInteger(r.quantity) || r.quantity <= 0) return "Enter a positive whole number";
    return null;
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-muted-foreground">
          Sizes (must sum to {formatNumber(totalQuantity, 0)} pcs)
        </span>
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            mismatch ? "text-destructive font-bold" : "text-emerald-600"
          )}
        >
          {formatNumber(planSum, 0)} / {formatNumber(totalQuantity, 0)} pcs
        </span>
      </div>

      {rows.map((r, i) => (
        <div key={i} className="flex items-end gap-2">
          <div className="flex-1">
            <AppInput
              label={i === 0 ? "Size" : undefined}
              placeholder="e.g. XL, 32/32…"
              value={r.size}
              disabled={disabled}
              error={rowError(i) ? undefined : undefined}
              onChange={(e) => updateRow(i, { size: e.target.value })}
              aria-label={`Size ${i + 1}`}
            />
            {rowError(i) && (
              <p className="mt-0.5 text-[10px] font-medium text-destructive">{rowError(i)}</p>
            )}
          </div>
          <div className="w-24">
            <AppInput
              label={i === 0 ? "Qty" : undefined}
              type="number"
              min={1}
              step="1"
              value={r.quantity || ""}
              disabled={disabled}
              onChange={(e) => updateRow(i, { quantity: Number(e.target.value) || 0 })}
              aria-label={`Quantity for size ${i + 1}`}
            />
          </div>
          {rows.length > 1 && (
            <AppButton
              size="sm"
              variant="ghost"
              className="h-9 w-9 px-0 text-destructive"
              disabled={disabled}
              aria-label={`Remove size ${i + 1}`}
              onClick={() => removeRow(i)}
            >
              <Trash2 className="h-4 w-4" />
            </AppButton>
          )}
        </div>
      ))}

      <AppButton
        size="sm"
        variant="outline"
        leftIcon={<Plus className="h-3.5 w-3.5" />}
        onClick={addRow}
        disabled={disabled || rows.length >= 50}
      >
        Add Size
      </AppButton>

      {mismatch && (
        <p className="text-[11px] font-medium text-destructive">
          Sizes sum to {formatNumber(planSum, 0)}, but the line is planned for{" "}
          {formatNumber(totalQuantity, 0)} pcs — adjust until they match.
        </p>
      )}
      {error && <p className="text-[11px] font-medium text-destructive">{error}</p>}
    </div>
  );
}
