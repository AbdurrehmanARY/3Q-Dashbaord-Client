import { Grid2x2, Package, Printer, Scissors } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatNumber } from "@/lib/format";
import { STAGE_LABEL, STAGES_OF, type BatchStage, type LineFlow, type LineKind } from "../batch-types";

/** Ink-derived accents: printing cyan, cutting magenta, packaging amber. */
const STAGE_STYLE: Record<BatchStage, { icon: React.ElementType; bar: string; text: string }> = {
  /** Weaving is woven's opening stage, so it shares printing's hue and slot. */
  weaving: {
    icon: Grid2x2,
    bar: "[&_[data-slot=progress-indicator]]:bg-cyan-600 dark:[&_[data-slot=progress-indicator]]:bg-cyan-400",
    text: "text-cyan-700 dark:text-cyan-400",
  },
  printing: {
    icon: Printer,
    bar: "[&_[data-slot=progress-indicator]]:bg-cyan-600 dark:[&_[data-slot=progress-indicator]]:bg-cyan-400",
    text: "text-cyan-700 dark:text-cyan-400",
  },
  cutting: {
    icon: Scissors,
    bar: "[&_[data-slot=progress-indicator]]:bg-pink-600 dark:[&_[data-slot=progress-indicator]]:bg-pink-400",
    text: "text-pink-700 dark:text-pink-400",
  },
  packaging: {
    icon: Package,
    bar: "[&_[data-slot=progress-indicator]]:bg-amber-600 dark:[&_[data-slot=progress-indicator]]:bg-amber-400",
    text: "text-amber-700 dark:text-amber-400",
  },
};

export interface StageTotals {
  planned: number;
  /** Required rolls (plan minus extra) — the progress target; falls back to planned when 0. */
  required?: number;
  printedProduced: number;
  cutProduced: number;
  packagedProduced: number;
}

interface StageProgressBarsProps {
  totals: StageTotals;
  /** Per-label-type breakdown, shown under the summary when there is more than one. */
  lines?: LineFlow[];
  /** Which pipeline to name the stages after. */
  kind?: LineKind;
  unit?: string;
  compact?: boolean;
}

/**
 * How far each stage has worked through the plan, as a bar and a percentage.
 *
 * All three stages are measured against the same denominator — the REQUIRED roll
 * count (the plan minus the extra buffer). Producing beyond that target is allowed
 * and simply reads as 100%: the stage is already complete. Printing is always at
 * or ahead of cutting, which is at or ahead of packaging.
 */
export function StageProgressBars({
  totals,
  lines,
  kind = "printed",
  unit = "rolls",
  compact,
}: StageProgressBarsProps) {
  const stages = stageRowsOf(totals, kind);

  return (
    <div className="space-y-3">
      {stages.map((s) => (
        <StageBar key={s.stage} {...s} unit={unit} />
      ))}

      {!compact && lines && lines.length > 1 && (
        <div className="mt-4 space-y-3 border-t pt-3">
          {lines.map((line) => (
            <div key={line.lineId}>
              <p className="mb-1.5 text-[11px] font-semibold text-muted-foreground">
                {line.labelType}
              </p>
              <div className="space-y-1.5">
                {stageRowsOf(line, line.kind ?? kind).map((s) => (
                  <StageBar key={s.stage} {...s} unit={unit} dense />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function stageRowsOf(t: StageTotals, kind: LineKind) {
  const required = Number(t.required);
  const planned = Number(t.planned) || 0;
  const target = required > 0 ? required : planned;
  const pct = (done: number) => (target > 0 ? Math.min(100, (done / target) * 100) : 0);
  const [first] = STAGES_OF[kind];
  return [
    { stage: first, done: t.printedProduced, planned: target, percent: pct(t.printedProduced) },
    { stage: "cutting" as const, done: t.cutProduced, planned: target, percent: pct(t.cutProduced) },
    { stage: "packaging" as const, done: t.packagedProduced, planned: target, percent: pct(t.packagedProduced) },
  ];
}

function StageBar({
  stage,
  done,
  planned,
  percent,
  unit,
  dense,
}: {
  stage: BatchStage;
  done: number;
  planned: number;
  percent: number;
  unit: string;
  dense?: boolean;
}) {
  const style = STAGE_STYLE[stage];
  const Icon = style.icon;

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span
          className={`flex items-center gap-1.5 font-semibold uppercase tracking-wider ${
            dense ? "text-[10px]" : "text-[11px]"
          } ${style.text}`}
        >
          <Icon className={dense ? "h-3 w-3" : "h-3.5 w-3.5"} />
          {STAGE_LABEL[stage]}
        </span>
        <span className={`font-mono tabular-nums ${dense ? "text-[10px]" : "text-xs"}`}>
          <span className="font-semibold">{percent.toFixed(0)}%</span>
          <span className="ml-1.5 text-muted-foreground">
            {formatNumber(done, 0)}/{formatNumber(planned, 0)} {unit}
          </span>
        </span>
      </div>
      <Progress
        value={percent}
        aria-label={`${STAGE_LABEL[stage]} progress`}
        className={`${
          dense
            ? "[&_[data-slot=progress-track]]:h-1.5"
            : "[&_[data-slot=progress-track]]:h-2"
        } ${style.bar}`}
      />
    </div>
  );
}
