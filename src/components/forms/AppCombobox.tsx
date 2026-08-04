import { Label } from "@/components/ui/label";
import { ComboboxSelect, type ComboboxOption } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

export type { ComboboxOption as AppComboboxOption };

interface AppComboboxProps<TValue extends string | number> {
  value: TValue | null | undefined;
  onChange: (value: TValue | null) => void;
  options: ComboboxOption<TValue>[];
  label?: string;
  error?: string;
  loading?: boolean;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * Field-wrapped combobox — the searchable-select counterpart to `AppInput`/`AppSelect`,
 * built on the official registry `combobox` primitive (`components/ui/combobox.tsx`).
 * Use this inside forms so label/error styling stays consistent with every other field.
 */
export function AppCombobox<TValue extends string | number>({
  value,
  onChange,
  options,
  label,
  error,
  loading,
  placeholder = "Select…",
  emptyText = "No results.",
  disabled,
  className,
  id,
}: AppComboboxProps<TValue>) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="grid w-full gap-1.5">
      {label && (
        <Label htmlFor={fieldId} className={cn("text-xs font-semibold", error && "text-destructive")}>
          {label}
        </Label>
      )}
      <ComboboxSelect
        id={fieldId}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={loading ? "Loading…" : placeholder}
        emptyText={emptyText}
        disabled={disabled || loading}
        className={cn(error && "[&_input]:border-destructive", className)}
        aria-label={label}
      />
      {error && <p className="text-[11px] font-medium text-destructive">{error}</p>}
    </div>
  );
}

