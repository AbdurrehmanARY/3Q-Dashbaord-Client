import { CheckCircle2, Circle, Printer, Scissors, PackageCheck } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { OperatorAvatar } from "@/components/feedback/OperatorAvatar";
import { formatDateTime, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProductionLineOverview } from "../types";

interface StageSummary {
  key: string;
  label: string;
  icon: typeof Printer;
  operatorName: string | null;
  operatorAvatarUrl: string | null;
  machineName?: string | null;
  completedAt: string | null;
  quantity: number;
}

/** One stage's row: who did it, on what, and when it finished. */
function StageRow({ stage, unit }: { stage: StageSummary; unit: string }) {
  const Icon = stage.icon;
  const done = !!stage.completedAt;

  return (
    <div className="flex items-start gap-3 py-3">
      <div
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          done ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">{stage.label}</span>
          {done ? (
            <StatusBadge variant="completed">
              <CheckCircle2 className="mr-1 inline h-3 w-3" />
              Complete
            </StatusBadge>
          ) : (
            <StatusBadge variant="pending">
              <Circle className="mr-1 inline h-3 w-3" />
              In progress
            </StatusBadge>
          )}
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            {stage.operatorName ? (
              <>
                <OperatorAvatar name={stage.operatorName} avatarUrl={stage.operatorAvatarUrl} size="sm" />
                <span className="font-medium text-foreground">{stage.operatorName}</span>
              </>
            ) : (
              <span className="italic">No operator recorded</span>
            )}
          </span>
          {stage.machineName && <span>on {stage.machineName}</span>}
          <span className="tabular-nums">
            {formatNumber(stage.quantity, 2)} {unit}
          </span>
        </div>
      </div>

      <div className="shrink-0 text-right text-xs">
        {done ? (
          <>
            <div className="font-medium">{formatDateTime(stage.completedAt)}</div>
            <div className="text-muted-foreground">completed</div>
          </>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>
    </div>
  );
}

/**
 * The production traceability record for a printed order: who ran each stage, on which
 * machine, and when that stage finished.
 *
 * Shown once an order is complete (and on the work-order detail page), so a finished order
 * can always answer "who made this, and when". Stage timestamps come from the server, which
 * stamps them the first time a counter reaches the planned total.
 */
export function ProductionSummary({
  lines,
  title = "Production Summary",
  description = "Who completed each stage, and when.",
}: {
  lines: ProductionLineOverview[];
  title?: string;
  description?: string;
}) {
  if (lines.length === 0) return null;

  return (
    <AppCard title={title} description={description} contentClassName="p-0">
      <div className="divide-y">
        {lines.map((line) => {
          const stages: StageSummary[] = [
            {
              key: "printing",
              label: "Printing",
              icon: Printer,
              operatorName: line.printing.operatorName,
              operatorAvatarUrl: line.printing.operatorAvatarUrl ?? null,
              machineName: line.printing.machineName,
              completedAt: line.printing.completedAt ?? null,
              quantity: line.printing.printedRolls,
            },
            {
              key: "cutting",
              label: "Cutting",
              icon: Scissors,
              operatorName: line.cutting.operatorName,
              operatorAvatarUrl: line.cutting.operatorAvatarUrl ?? null,
              machineName: line.cutting.machineName,
              completedAt: line.cutting.completedAt ?? null,
              quantity: line.cutting.cutRolls,
            },
            {
              key: "packaging",
              label: "Packaging",
              icon: PackageCheck,
              operatorName: line.packaging.operatorName,
              operatorAvatarUrl: line.packaging.operatorAvatarUrl ?? null,
              completedAt: line.packaging.completedAt ?? null,
              quantity: line.packaging.packagedRolls,
            },
          ];

          return (
            <div key={line.id} className="px-4 py-2">
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <span className="text-sm font-semibold">{line.labelType}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {formatNumber(line.planning.totalRolls, 2)} rolls planned ·{" "}
                  {formatNumber(line.packaging.packagedQty, 0)} labels packaged
                </span>
              </div>
              <div className="divide-y">
                {stages.map((stage) => (
                  <StageRow key={stage.key} stage={stage} unit="rolls" />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AppCard>
  );
}
