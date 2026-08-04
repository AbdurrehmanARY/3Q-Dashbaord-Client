import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  /** Optional count/badge shown after the label, e.g. a row count. */
  hint?: string | number;
}

interface SegmentedTabsProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * A segmented control for switching between views of the same page.
 *
 * Deliberately built from plain buttons with explicit utility classes rather than the
 * `ui/tabs` primitive: that primitive is authored against Tailwind v4 variant syntax
 * (`data-active:`, `data-horizontal:`), which this project's Tailwind v3.4 does not
 * compile — the generated CSS is simply missing, so the control renders unstyled and its
 * flex container never becomes a column. Owning the markup here keeps the styling
 * verifiable and the active state explicit rather than attribute-driven.
 *
 * Uses the WAI-ARIA tablist pattern (roving focus via arrow keys) so it is keyboard
 * operable and announced correctly.
 */
export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
}: SegmentedTabsProps<T>) {
  const move = (delta: number) => {
    const i = options.findIndex((o) => o.value === value);
    if (i === -1) return;
    const next = options[(i + delta + options.length) % options.length];
    onChange(next.value);
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex w-full items-center gap-1 rounded-xl border bg-muted/60 p-1 sm:w-auto",
        className
      )}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          move(1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          move(-1);
        }
      }}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            // Only the active tab is in the tab order; arrows move between them.
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium transition-colors sm:flex-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              selected
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
            {option.hint !== undefined && (
              <span
                className={cn(
                  "ml-2 rounded-md px-1.5 py-0.5 text-xs tabular-nums",
                  selected ? "bg-muted text-muted-foreground" : "bg-background/60 text-muted-foreground"
                )}
              >
                {option.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
