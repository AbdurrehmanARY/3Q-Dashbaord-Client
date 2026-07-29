import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number;
  max: number;
  /** Unit noun for the caption, e.g. "rolls" -> "42 / 100 rolls". Caller-supplied so no
   *  feature wording lives in shared code. */
  unit?: string;
  /** Hide the numeric caption and show only the bar. */
  showLabel?: boolean;
  className?: string;
}

/**
 * Thin wrapper over shadcn Progress that adds the "42 / 100 rolls" caption and does the
 * percentage arithmetic once, instead of every caller repeating it.
 */
export function ProgressBar({ value, max, unit, showLabel = true, className }: ProgressBarProps) {
  const safeMax = max > 0 ? max : 0;
  // Clamp: a counter can legitimately overshoot its plan, but the bar must not overflow.
  const pct = safeMax > 0 ? Math.min(Math.round((value / safeMax) * 1000) / 10, 100) : 0;

  return (
    <div className={cn("min-w-[7rem] space-y-1", className)}>
      <Progress value={pct} />
      {showLabel && (
        <p className="text-xs tabular-nums text-muted-foreground">
          {value.toLocaleString()} / {safeMax.toLocaleString()}
          {unit ? ` ${unit}` : ""} · {pct}%
        </p>
      )}
    </div>
  );
}
