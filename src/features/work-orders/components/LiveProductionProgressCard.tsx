import { CheckCircle2, Clock, PlayCircle, ArrowRight, Cpu, User } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { formatNumber, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface LiveProductionProgressCardProps {
  productType: "woven" | "printed";
  /** Sourced from overview for printed orders or wovenOverview for woven orders */
  overview: any;
  totalQty: number;
}

export function LiveProductionProgressCard({
  productType,
  overview,
  totalQty,
}: LiveProductionProgressCardProps) {
  const isWoven = productType === "woven";

  let plannedQty = totalQty;
  let producedQty = 0;
  let cutQty = 0;
  let packagedQty = 0;

  let currentStageName = "Planning";
  let stage1Status: "completed" | "active" | "pending" = "pending";
  let stage2Status: "completed" | "active" | "pending" = "pending";
  let stage3Status: "completed" | "active" | "pending" = "pending";

  let stage1Machine = "";
  let stage1Operator = "";
  let stage2Operator = "";
  let stage3Operator = "";
  let lastUpdated: string | null = null;

  if (isWoven && overview) {
    const totals = overview.totals;
    const lines = overview.lines ?? [];
    plannedQty = totals?.quantity || totalQty || 1;
    producedQty = totals?.wovenQty ?? 0;
    cutQty = totals?.cutQty ?? 0;
    packagedQty = totals?.packagedQty ?? 0;

    const firstLine = lines[0];
    if (firstLine) {
      stage1Machine = firstLine.weaving.machineName ?? "Unassigned";
      stage1Operator = firstLine.weaving.operatorName ?? "Unassigned";
      stage2Operator = firstLine.cutting.operatorName ?? "Unassigned";
      stage3Operator = firstLine.packaging.operatorName ?? "Unassigned";
      lastUpdated = firstLine.weaving.endedAt || firstLine.weaving.startedAt || firstLine.planning.completedAt;
    }

    if (producedQty >= plannedQty && plannedQty > 0) stage1Status = "completed";
    else if (producedQty > 0 || (firstLine && firstLine.weaving.startedAt)) stage1Status = "active";

    if (cutQty >= producedQty && producedQty > 0) stage2Status = "completed";
    else if (cutQty > 0 || (stage1Status === "completed" && cutQty < producedQty)) stage2Status = "active";

    if (packagedQty >= plannedQty && plannedQty > 0) stage3Status = "completed";
    else if (packagedQty > 0 || (stage2Status === "completed" && packagedQty < cutQty)) stage3Status = "active";

  } else if (!isWoven && overview) {
    const totals = overview.totals;
    const lines = overview.lines ?? [];
    const totalRolls = totals?.totalRolls || 1;
    const assignedRolls = totals?.assignedRolls || totalRolls;
    plannedQty = totalRolls;
    producedQty = totals?.printedRolls ?? 0;
    cutQty = totals?.cutRolls ?? 0;
    packagedQty = totals?.packagedRolls ?? 0;
    const sentToCuttingRolls = totals?.sentToCuttingRolls ?? 0;
    const sentToPackagingRolls = totals?.sentToPackagingRolls ?? 0;

    const firstLine = lines[0];
    if (firstLine) {
      stage1Machine = firstLine.printing.machineName ?? "Unassigned";
      stage1Operator = firstLine.printing.operatorName ?? "Unassigned";
      stage2Operator = firstLine.cutting.operatorName ?? "Unassigned";
      stage3Operator = firstLine.packaging.operatorName ?? "Unassigned";
      lastUpdated = firstLine.printing.completedAt || firstLine.cutting.completedAt || firstLine.packaging.completedAt;
    }

    if (producedQty >= plannedQty && plannedQty > 0) stage1Status = "completed";
    else if (producedQty > 0) stage1Status = "active";

    if (cutQty >= producedQty && producedQty > 0) stage2Status = "completed";
    else if (cutQty > 0 || (stage1Status === "completed" && cutQty < producedQty)) stage2Status = "active";

    if (packagedQty >= plannedQty && plannedQty > 0) stage3Status = "completed";
    else if (packagedQty > 0 || (stage2Status === "completed" && packagedQty < cutQty)) stage3Status = "active";
  }

  const remainingQty = Math.max(0, plannedQty - producedQty);
  const overallPct = plannedQty > 0 ? Math.min(100, Math.round((packagedQty / plannedQty) * 1000) / 10) : 0;
  const unit = isWoven ? "pcs" : "rolls";
  const totals = overview?.totals;
  const assignedRollsTotal = totals?.assignedRolls || plannedQty;
  const sentToCuttingTotal = totals?.sentToCuttingRolls ?? 0;
  const sentToPackagingTotal = totals?.sentToPackagingRolls ?? 0;

  if (stage3Status === "active") currentStageName = "Packaging";
  else if (stage2Status === "active") currentStageName = "Cutting";
  else if (stage1Status === "active") currentStageName = isWoven ? "Weaving" : "Printing";
  else if (stage1Status === "completed") currentStageName = "Cutting";
  else currentStageName = isWoven ? "Weaving" : "Printing";

  const stage1Label = isWoven ? "Weaving" : "Printing";

  return (
    <AppCard
      title="Live Production Progress"
      description={`Currently active on the floor · Last updated ${formatDateTime(lastUpdated ?? new Date())}`}
    >
      <div className="space-y-6">
        {/* Overall Progress Header */}
        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Overall Progress
              </span>
              <h3 className="text-xl font-bold text-foreground">{overallPct}% Completed</h3>
            </div>
            <StatusBadge variant="active">
              <PlayCircle className="mr-1 inline h-3.5 w-3.5 animate-pulse text-primary" />
              Stage: {currentStageName}
            </StatusBadge>
          </div>
          <Progress value={overallPct} className="h-3" />
        </div>

        {/* Planned / Produced / Remaining Figures */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border bg-card p-3">
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Planned Qty
            </span>
            <div className="mt-1 text-lg font-bold tabular-nums">
              {formatNumber(plannedQty, 0)} {unit}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Produced Qty
            </span>
            <div className="mt-1 text-lg font-bold tabular-nums text-primary">
              {formatNumber(producedQty, 0)} {unit}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Remaining Qty
            </span>
            <div className="mt-1 text-lg font-bold tabular-nums text-warning">
              {formatNumber(remainingQty, 0)} {unit}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Packaged Qty
            </span>
            <div className="mt-1 text-lg font-bold tabular-nums text-emerald-600">
              {formatNumber(packagedQty, 0)} {unit}
            </div>
          </div>
        </div>

        {/* Visual Stage Workflow Flow (Weaving/Printing -> Cutting -> Packaging) */}
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Production Stage Flow
          </h4>
          <div className="grid gap-3 sm:grid-cols-3">
            {/* Stage 1: Weaving / Printing */}
            <div
              className={cn(
                "relative rounded-xl border p-4 transition-colors",
                stage1Status === "active" && "border-primary/50 bg-primary/5 ring-1 ring-primary/20",
                stage1Status === "completed" && "border-emerald-500/30 bg-emerald-500/5"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{stage1Label}</span>
                <StagePill status={stage1Status} />
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-foreground/70" />
                  <span>Machine: <strong className="font-medium text-foreground">{stage1Machine}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-foreground/70" />
                  <span>Operator: <strong className="font-medium text-foreground">{stage1Operator}</strong></span>
                </div>
                <div className="tabular-nums pt-1">
                  {isWoven ? "Woven Pcs: " : "Printed Rolls: "}
                  <strong className="font-medium text-foreground">{formatNumber(producedQty, 0)}</strong> / {formatNumber(isWoven ? plannedQty : assignedRollsTotal, 0)} {unit}
                </div>
              </div>
            </div>

            {/* Stage 2: Cutting */}
            <div
              className={cn(
                "relative rounded-xl border p-4 transition-colors",
                stage2Status === "active" && "border-primary/50 bg-primary/5 ring-1 ring-primary/20",
                stage2Status === "completed" && "border-emerald-500/30 bg-emerald-500/5"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Cutting</span>
                <StagePill status={stage2Status} />
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-foreground/70" />
                  <span>Operator: <strong className="font-medium text-foreground">{stage2Operator}</strong></span>
                </div>
                <div className="tabular-nums pt-1">
                  Cut Rolls: <strong className="font-medium text-foreground">{formatNumber(cutQty, 0)}</strong> / {formatNumber(isWoven ? producedQty : sentToCuttingTotal, 0)} {unit}
                </div>
              </div>
            </div>

            {/* Stage 3: Packaging */}
            <div
              className={cn(
                "relative rounded-xl border p-4 transition-colors",
                stage3Status === "active" && "border-primary/50 bg-primary/5 ring-1 ring-primary/20",
                stage3Status === "completed" && "border-emerald-500/30 bg-emerald-500/5"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Packaging</span>
                <StagePill status={stage3Status} />
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-foreground/70" />
                  <span>Operator: <strong className="font-medium text-foreground">{stage3Operator}</strong></span>
                </div>
                <div className="tabular-nums pt-1">
                  Packaged Rolls: <strong className="font-medium text-foreground">{formatNumber(packagedQty, 0)}</strong> / {formatNumber(isWoven ? cutQty : sentToPackagingTotal, 0)} {unit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppCard>
  );
}

function StagePill({ status }: { status: "completed" | "active" | "pending" }) {
  if (status === "completed") {
    return (
      <StatusBadge variant="completed">
        <CheckCircle2 className="mr-1 inline h-3 w-3" />
        Completed
      </StatusBadge>
    );
  }
  if (status === "active") {
    return (
      <StatusBadge variant="active">
        <PlayCircle className="mr-1 inline h-3 w-3 animate-spin text-primary" />
        In Progress
      </StatusBadge>
    );
  }
  return (
    <StatusBadge variant="neutral">
      <Clock className="mr-1 inline h-3 w-3" />
      Pending
    </StatusBadge>
  );
}
