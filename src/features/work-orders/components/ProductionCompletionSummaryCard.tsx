import { CheckCircle2, Printer, Scissors, PackageCheck, Cpu, User, Calendar } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { OperatorAvatar } from "@/components/feedback/OperatorAvatar";
import { formatDateTime } from "@/lib/format";

interface ProductionCompletionSummaryCardProps {
  productType: "woven" | "printed";
  wovenOverview?: any;
  overview?: any;
  workOrder: any;
}

export function ProductionCompletionSummaryCard({
  productType,
  wovenOverview,
  overview,
  workOrder,
}: ProductionCompletionSummaryCardProps) {
  const isWoven = productType === "woven";

  let stage1Name = isWoven ? "Weaving" : "Printing";
  let Stage1Icon = isWoven ? Cpu : Printer;

  let stage1Machine = "—";
  let stage1Operator = "—";
  let stage1OperatorAvatar: string | null = null;
  let stage1CompletedOn: string | Date | null = null;

  let stage2Machine = "Cutting Station";
  let stage2Operator = "—";
  let stage2OperatorAvatar: string | null = null;
  let stage2CompletedOn: string | Date | null = null;

  let stage3Operator = "—";
  let stage3OperatorAvatar: string | null = null;
  let stage3CompletedOn: string | Date | null = null;

  if (isWoven && wovenOverview) {
    const lines = wovenOverview.lines ?? [];
    const line = lines[0];
    if (line) {
      stage1Machine = line.weaving.machineName ?? "Woven Machine";
      stage1Operator = line.weaving.operatorName ?? "Floor Operator";
      stage1CompletedOn = line.weaving.endedAt || line.weaving.startedAt || line.planning.completedAt;

      stage2Operator = line.cutting.operatorName ?? "Cutting Operator";
      stage2CompletedOn = line.cutting.cuttingDate || line.weaving.endedAt;

      stage3Operator = line.packaging.operatorName ?? "Packaging Operator";
      stage3CompletedOn = line.packaging.packagingDate || line.cutting.cuttingDate;
    }
  } else if (!isWoven && overview) {
    const lines = overview.lines ?? [];
    const line = lines[0];
    if (line) {
      stage1Machine = line.printing.machineName ?? "Printing Machine";
      stage1Operator = line.printing.operatorName ?? "Printing Operator";
      stage1OperatorAvatar = line.printing.operatorAvatarUrl ?? null;
      stage1CompletedOn = line.printing.completedAt;

      stage2Operator = line.cutting.operatorName ?? "Cutting Operator";
      stage2OperatorAvatar = line.cutting.operatorAvatarUrl ?? null;
      stage2CompletedOn = line.cutting.completedAt;

      stage3Operator = line.packaging.operatorName ?? "Packaging Operator";
      stage3OperatorAvatar = line.packaging.operatorAvatarUrl ?? null;
      stage3CompletedOn = line.packaging.completedAt;
    }
  }

  // Fallback to Work Order dispatched / completed date if stage completion timestamp is absent
  const fallbackDate = workOrder.dispatchedDate || workOrder.updatedAt;
  if (!stage1CompletedOn) stage1CompletedOn = fallbackDate;
  if (!stage2CompletedOn) stage2CompletedOn = fallbackDate;
  if (!stage3CompletedOn) stage3CompletedOn = fallbackDate;

  return (
    <AppCard
      title="Production Completion Summary"
      description="Traceability record detailing machines used, operators responsible, and completion timestamps for each production stage."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Stage 1: Weaving / Printing */}
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <span className="flex items-center gap-2 font-semibold text-foreground">
              <Stage1Icon className="h-4 w-4 text-primary" />
              {stage1Name}
            </span>
            <StatusBadge variant="completed">
              <CheckCircle2 className="mr-1 inline h-3 w-3" />
              Completed
            </StatusBadge>
          </div>
          <dl className="space-y-2.5 text-xs">
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <Cpu className="h-3.5 w-3.5" /> Machine Used:
              </dt>
              <dd className="mt-0.5 font-medium text-foreground">{stage1Machine}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <User className="h-3.5 w-3.5" /> Completed By:
              </dt>
              <dd className="mt-1 flex items-center gap-1.5">
                <OperatorAvatar name={stage1Operator} avatarUrl={stage1OperatorAvatar} size="sm" />
                <span className="font-semibold text-foreground">{stage1Operator}</span>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> Completed On:
              </dt>
              <dd className="mt-0.5 font-medium text-foreground">{formatDateTime(stage1CompletedOn)}</dd>
            </div>
          </dl>
        </div>

        {/* Stage 2: Cutting */}
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <span className="flex items-center gap-2 font-semibold text-foreground">
              <Scissors className="h-4 w-4 text-primary" />
              Cutting
            </span>
            <StatusBadge variant="completed">
              <CheckCircle2 className="mr-1 inline h-3 w-3" />
              Completed
            </StatusBadge>
          </div>
          <dl className="space-y-2.5 text-xs">
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <Cpu className="h-3.5 w-3.5" /> Machine / Station:
              </dt>
              <dd className="mt-0.5 font-medium text-foreground">{stage2Machine}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <User className="h-3.5 w-3.5" /> Completed By:
              </dt>
              <dd className="mt-1 flex items-center gap-1.5">
                <OperatorAvatar name={stage2Operator} avatarUrl={stage2OperatorAvatar} size="sm" />
                <span className="font-semibold text-foreground">{stage2Operator}</span>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> Completed On:
              </dt>
              <dd className="mt-0.5 font-medium text-foreground">{formatDateTime(stage2CompletedOn)}</dd>
            </div>
          </dl>
        </div>

        {/* Stage 3: Packaging */}
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <span className="flex items-center gap-2 font-semibold text-foreground">
              <PackageCheck className="h-4 w-4 text-primary" />
              Packaging
            </span>
            <StatusBadge variant="completed">
              <CheckCircle2 className="mr-1 inline h-3 w-3" />
              Completed
            </StatusBadge>
          </div>
          <dl className="space-y-2.5 text-xs">
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <User className="h-3.5 w-3.5" /> Completed By:
              </dt>
              <dd className="mt-1 flex items-center gap-1.5">
                <OperatorAvatar name={stage3Operator} avatarUrl={stage3OperatorAvatar} size="sm" />
                <span className="font-semibold text-foreground">{stage3Operator}</span>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> Completed On:
              </dt>
              <dd className="mt-0.5 font-medium text-foreground">{formatDateTime(stage3CompletedOn)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </AppCard>
  );
}
