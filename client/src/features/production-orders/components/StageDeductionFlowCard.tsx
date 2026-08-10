import { ArrowRight, Printer, Scissors, PackageCheck, Layers, AlertCircle } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { formatNumber } from "@/lib/format";
import type { ProductionLineOverview } from "../types";

interface StageDeductionFlowCardProps {
  lines: ProductionLineOverview[];
}

export function StageDeductionFlowCard({ lines }: StageDeductionFlowCardProps) {
  if (lines.length === 0) return null;

  // Real-time aggregate stage deduction balances
  const totalPlanned = lines.reduce((acc, l) => acc + l.planning.totalRolls, 0);
  const totalPrinted = lines.reduce((acc, l) => acc + l.printing.printedRolls, 0);
  const totalSentCutting = lines.reduce((acc, l) => acc + l.cutting.sentToCuttingRolls, 0);
  const totalCut = lines.reduce((acc, l) => acc + l.cutting.cutRolls, 0);
  const totalSentPkg = lines.reduce((acc, l) => acc + l.packaging.sentToPackagingRolls, 0);
  const totalPackaged = lines.reduce((acc, l) => acc + l.packaging.packagedRolls, 0);

  // Stage buffers (Goods Consumption balances)
  const unprintedBalance = Math.max(totalPlanned - totalPrinted, 0);
  const waitingForCutting = Math.max(totalPrinted - totalSentCutting, 0);
  const inCuttingProcess = Math.max(totalSentCutting - totalCut, 0);
  const waitingForPackaging = Math.max(totalCut - totalSentPkg, 0);
  const inPackagingProcess = Math.max(totalSentPkg - totalPackaged, 0);

  const stages = [
    {
      id: "unprinted",
      title: "Planned (Unprinted)",
      subtitle: "Deducted by Printing",
      count: unprintedBalance,
      total: totalPlanned,
      icon: Layers,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      badgeColor: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    },
    {
      id: "printed",
      title: "Waiting for Cutting",
      subtitle: "Printed ready to Transfer",
      count: waitingForCutting,
      total: totalPrinted,
      icon: Printer,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      id: "cutting",
      title: "In Cutting Process",
      subtitle: "Sent but not yet Cut",
      count: inCuttingProcess,
      total: totalSentCutting,
      icon: Scissors,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },
    {
      id: "cut_buffer",
      title: "Waiting for Packaging",
      subtitle: "Cut ready to Transfer",
      count: waitingForPackaging,
      total: totalCut,
      icon: Scissors,
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      badgeColor: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
    },
    {
      id: "packaging",
      title: "In Packaging Process",
      subtitle: "Sent but not yet Boxed",
      count: inPackagingProcess,
      total: totalSentPkg,
      icon: PackageCheck,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      badgeColor: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    },
    {
      id: "packaged",
      title: "Packaged Finished",
      subtitle: "Completed Output",
      count: totalPackaged,
      total: totalPlanned,
      icon: PackageCheck,
      color: "bg-success/10 text-success border-success/20",
      badgeColor: "bg-success/15 text-success",
    },
  ];

  return (
    <AppCard
      title="Real-Time Production Stage Inventory & Deduction Pipeline"
      description="Live WIP roll consumption tracking across production stages. Increments in downstream stages deduct available rolls from preceding stages in real-time."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div key={stage.id} className="relative flex flex-col justify-between rounded-xl border p-3 bg-card shadow-sm transition-all hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${stage.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${stage.badgeColor}`}>
                    Stage {idx + 1}
                  </span>
                </div>

                <div className="text-xs font-semibold text-foreground leading-tight">
                  {stage.title}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {stage.subtitle}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t flex items-baseline justify-between">
                <span className="text-base font-bold tabular-nums text-foreground">
                  {formatNumber(stage.count, 2)}
                </span>
                <span className="text-[10px] text-muted-foreground">rolls</span>
              </div>

              {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm">
                    <ArrowRight className="h-2.5 w-2.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppCard>
  );
}
