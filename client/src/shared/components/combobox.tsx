import * as React from "react";
import {
  Combobox as ComboboxRoot,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

/**
 * Generic single-select combobox.
 *
 * Typed on the option's value so it works for an operator, a machine, a material or a
 * status without a per-use-case rewrite — the caller supplies `options` and the value
 * type is inferred from them.
 *
 * Built on the registry's `combobox` primitives (base-ui), which is what shadcn ships
 * for this today; the older Command + Popover recipe is no longer the current answer.
 */
export interface ComboboxOption<TValue extends string | number> {
  value: TValue;
  label: string;
  disabled?: boolean;
  /** Secondary line — e.g. an operator's designation or a material's description. */
  hint?: string;
}

export interface ComboboxProps<TValue extends string | number> {
  options: ComboboxOption<TValue>[];
  value: TValue | null | undefined;
  onChange: (value: TValue | null) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  /** Fixed max height for the option list before it scrolls. */
  maxHeight?: number;
  className?: string;
  "aria-label"?: string;
  /** Forwarded to the underlying input — lets a wrapping <Label htmlFor> associate correctly. */
  id?: string;
}

export function Combobox<TValue extends string | number>({
  options,
  value,
  onChange,
  placeholder = "Select…",
  emptyText = "No results.",
  disabled,
  maxHeight = 260,
  className,
  "aria-label": ariaLabel,
  id,
}: ComboboxProps<TValue>) {
  const selected = React.useMemo(
    () => options.find((o) => o.value === value) ?? null,
    [options, value]
  );

  // The primitive works in item objects; map back to the caller's value on change.
  return (
    <ComboboxRoot
      items={options}
      value={selected}
      onValueChange={(next: ComboboxOption<TValue> | null) => onChange(next?.value ?? null)}
      itemToStringLabel={(item: ComboboxOption<TValue>) => item.label}
      disabled={disabled}
    >
      <ComboboxInput
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        showClear={!!selected}
        className={cn("w-full", className)}
        aria-label={ariaLabel}
      />
      <ComboboxContent>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        {/* ScrollArea only here: the option list is the one place that needs a fixed
            scrollable height. Everything else uses the primitive directly. */}
        <ScrollArea style={{ maxHeight }}>
          <ComboboxList>
            {(item: ComboboxOption<TValue>) => (
              <ComboboxItem key={String(item.value)} value={item} disabled={item.disabled}>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate">{item.label}</span>
                  {item.hint && (
                    <span className="truncate text-xs text-muted-foreground">{item.hint}</span>
                  )}
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ScrollArea>
      </ComboboxContent>
    </ComboboxRoot>
  );
}
