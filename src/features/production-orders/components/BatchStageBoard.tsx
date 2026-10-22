import * as React from "react";
import {
  AlertCircle,
  Ban,
  CheckCircle2,
  ChevronRight,
  Clock,
  GitBranch,
  Grid2x2,
  Play,
  Plus,
  Printer,
  Scissors,
  Package,
  Trash2,
  Pencil,
  PencilLine,
} from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatNumber } from "@/lib/format";
import {
  useBatchSources,
  useCancelBatch,
  useCompleteBatch,
  useDeleteBatch,
  useLineBatches,
  useStartBatch,
} from "../hooks/use-batches";
import { CreateBatchDialog } from "./CreateBatchDialog";
import { BatchOutputDialog } from "./BatchOutputDialog";
import { EditBatchDialog } from "./EditBatchDialog";
import { BatchTraceDialog } from "./BatchTraceDialog";
import {
  STAGE_LABEL,
  formatDuration,
  isBatchOpen,
  isFirstStage,
  type BatchStage,
  type BatchStatus,
  type LineFlow,
  type ProductionBatch,
} from "../batch-types";

const STAGE_ICON: Record<BatchStage, React.ElementType> = {
  weaving: Grid2x2,
  printing: Printer,
  cutting: Scissors,
  packaging: Package,
};

/** Ink-derived accents: printing cyan, cutting magenta, packaging amber. */
const STAGE_ACCENT: Record<BatchStage, string> = {
  /** Weaving and printing are each their workflow's opening stage, so they share the hue. */
  weaving: "text-cyan-700 dark:text-cyan-400",
  printing: "text-cyan-700 dark:text-cyan-400",
  cutting: "text-pink-700 dark:text-pink-400",
  packaging: "text-amber-700 dark:text-amber-400",
};

const STATUS_VARIANT: Record<BatchStatus, "default" | "secondary" | "outline" | "destructive"> = {
  PLANNED: "outline",
  ASSIGNED: "secondary",
  IN_PROGRESS: "default",
  COMPLETED: "secondary",
  CANCELLED: "destructive",
};

const STATUS_LABEL: Record<BatchStatus, string> = {
  PLANNED: "Planned",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "Running",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

interface BatchStageBoardProps {
  orderId: string;
  flow: LineFlow;
  /** Blocks batch creation once the order is shipped or closed. */
  readOnly?: boolean;
  /** Collapse on mount — useful when an order has many label types. */
  defaultOpen?: boolean;
}

/**
 * One label type's stages, each with its own batch CRUD.
 *
 * The stages are shown side by side because that is how the material moves: what printing makes
 * available is exactly what cutting can take. Each panel's header states its own position, so the
 * operator never has to compute availability themselves.
 *
 * Since migration 0025 all of these panels read the same scope — this label type's LINE. Cutting
 * and packaging batches used to belong to the whole order and had to be read from an order
 * endpoint; they now carry this line's id like every other batch, so the same `C-001` never
 * appears on a neighbouring board.
 */
export function BatchStageBoard({ orderId, flow, readOnly, defaultOpen = true }: BatchStageBoardProps) {
  const [createStage, setCreateStage] = React.useState<BatchStage | null>(null);
  const [outputBatch, setOutputBatch] = React.useState<ProductionBatch | null>(null);
  const [traceBatch, setTraceBatch] = React.useState<ProductionBatch | null>(null);
  const [editBatch, setEditBatch] = React.useState<ProductionBatch | null>(null);
  /** A whole label type folds away, so an order with many stays navigable. */
  const [open, setOpen] = React.useState(defaultOpen);

  const donePct =
    flow.planned > 0 ? Math.min(100, Math.round((flow.packagedProduced / flow.planned) * 100)) : 0;

  return (
    <AppCard
      title={
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-1.5 rounded text-left hover:opacity-80"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`} />
          {flow.labelType}
          <span className="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] font-normal text-muted-foreground">
            {donePct}% packaged
          </span>
        </button>
      }
      description={`${formatNumber(flow.planned, 0)} planned ${flow.unit}${
        flow.kind === "printed" ? ` · ${formatNumber(flow.quantity, 0)} labels` : ""
      }${flow.materialCode ? ` · ${flow.materialCode}` : ""}`}
    >
     
      {!open ? null : (
      <div className="grid gap-3 lg:grid-cols-3">
        {flow.stages.map((stage) => (
          <StagePanel
            key={stage}
            stage={stage}
            orderId={orderId}
            flow={flow}
            readOnly={readOnly}
            onCreate={() => setCreateStage(stage)}
            onRecordOutput={setOutputBatch}
            onTrace={setTraceBatch}
            onEdit={setEditBatch}
          />
        ))}
      </div>
      )}

      {createStage && (
        <CreateBatchDialog
          open
          stage={createStage}
          lineId={flow.lineId}
          kind={flow.kind}
          labelType={flow.labelType}
          orderId={orderId}
          onClose={() => setCreateStage(null)}
        />
      )}
      {outputBatch && (
        <BatchOutputDialog
          open
          batch={outputBatch}
          kind={flow.kind}
          orderId={orderId}
          onClose={() => setOutputBatch(null)}
        />
      )}
      {traceBatch && (
        <BatchTraceDialog open batch={traceBatch} onClose={() => setTraceBatch(null)} />
      )}
      {editBatch && (
        <EditBatchDialog
          open
          batch={editBatch}
          lineId={flow.lineId}
          kind={flow.kind}
          labelType={flow.labelType}
          orderId={orderId}
          onClose={() => setEditBatch(null)}
        />
      )}
    </AppCard>
  );
}

function StagePanel({
  stage,
  orderId,
  flow,
  readOnly,
  onCreate,
  onRecordOutput,
  onTrace,
  onEdit,
}: {
  stage: BatchStage;
  orderId: string;
  flow: LineFlow;
  readOnly?: boolean;
  onCreate: () => void;
  onRecordOutput: (b: ProductionBatch) => void;
  onTrace: (b: ProductionBatch) => void;
  onEdit: (b: ProductionBatch) => void;
}) {
  /** The batches of this stage — every one of them carries this line's id. */
  const batches = useLineBatches(stage, flow.lineId);
  /**
   * Whether a batch can be started at all, asked of the SOURCES rather than of this panel's own
   * figures: cutting may only consume what this line printed, packaging only what this line cut,
   * and the sources query is what knows how much of that is still unallocated.
   * The dialog reads the same query key, so this costs no extra request.
   */
  const sourcesQuery = useBatchSources(stage, flow.lineId, !readOnly);
  /** Until the sources answer, the button stays enabled — the dialog guards the submission. */
  const sourcesData = sourcesQuery.data;
  const canCreate = !sourcesData
    ? true
    : sourcesData.fromPlan
      ? (sourcesData.remainingPlanned ?? 0) > 0
      : (sourcesData.totalAvailable ?? 0) > 0;
  const Icon = STAGE_ICON[stage];
  /* What this stage can still take in, and what it has ready for the next one. The first
     stage draws from the plan; the rest draw from the stage above them. */
  const first = isFirstStage(flow.kind, stage);
  const firstOutputLabel = flow.kind === "woven" ? "Woven" : "Printed";
  const intake = first
    ? { label: "Unassigned plan", value: flow.remainingPlanned }
    : stage === "cutting"
      ? { label: `${firstOutputLabel} available`, value: flow.printedAvailable }
      : { label: "Cut available", value: flow.cutAvailable };

  const output = first
    ? { label: firstOutputLabel, value: flow.printedProduced }
    : stage === "cutting"
      ? { label: "Cut", value: flow.cutProduced }
      : { label: "Packaged", value: flow.packagedProduced };

  const rows = batches.data ?? [];
  console.log("rows",rows)
  // console.log("flow",flow)
  /** Stages open by default — the batch rows inside them are what collapse. */
  const [open, setOpen] = React.useState(true);
  const liveCount = rows.filter((b) => b.status !== "CANCELLED").length;

  return (
    <div className="flex flex-col rounded-lg border bg-card">
      <div className="border-b px-3 py-2.5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={`flex items-center gap-1.5 rounded text-xs font-bold uppercase tracking-wider hover:opacity-80 ${STAGE_ACCENT[stage]}`}
          >
            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`} />
            <Icon className="h-3.5 w-3.5" />
            {STAGE_LABEL[stage]}
            {liveCount > 0 && (
              <span className="rounded bg-muted px-1 font-mono text-[10px] text-muted-foreground">
                {liveCount}
              </span>
            )}
          </button>
          {!readOnly && (
            <AppButton
              size="sm"
              variant="outline"
              className="h-7 px-2"
              leftIcon={<Plus className="h-3.5 w-3.5" />}
              onClick={onCreate}
              disabled={!canCreate}
              title={canCreate ? undefined : `No ${intake.label.toLowerCase()} to draw from`}
            >
              Batch
            </AppButton>
          )}
        </div>

        <dl className="mt-2 grid grid-cols-2 gap-2">
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">{intake.label}</dt>
            <dd className="font-mono text-sm font-semibold tabular-nums">
              {formatNumber(intake.value, 0)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">{output.label}</dt>
            <dd className="font-mono text-sm font-semibold tabular-nums">
              {formatNumber(output.value, 0)}
            </dd>
          </div>
                </dl>
        {first && flow.kind === "woven" && flow.sizes.length > 0 && (
          <div className="mt-2 border-t pt-2">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Size Assignment
            </p>
            <div className="flex flex-wrap gap-2">
              {flow.sizes.map((s) => {
                const done = s.remaining === 0;
                const partial = s.assigned > 0;
                return (
                  <span
                    key={s.size}
                    className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-medium tabular-nums"
                    title={`${s.size}: ${s.assigned} assigned, ${s.remaining} still to assign`}
                  >
                    {s.size}
                    <span className="text-muted-foreground">
                      {formatNumber(s.assigned, 0)}/{formatNumber(s.planned, 0)}
                    </span>
                    {done ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    ) : partial ? (
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                    ) : (
                      <Clock className="h-3 w-3 text-muted-foreground" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {open && (
      <div className="flex-1 divide-y">
        {batches.isPending && (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">Loading…</p>
        )}
        {!batches.isPending && rows.length === 0 && (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">
            No {STAGE_LABEL[stage].toLowerCase()} batches yet.
          </p>
        )}
        {rows.map((batch) => (
          <BatchRow
            key={batch.id}
            batch={batch}
            orderId={orderId}
            readOnly={readOnly}
            onRecordOutput={() => onRecordOutput(batch)}
            onTrace={() => onTrace(batch)}
            onEdit={() => onEdit(batch)}
          />
        ))}
      </div>
      )}
    </div>
  );
}

function BatchRow({
  batch,
  orderId,
  readOnly,
  onRecordOutput,
  onTrace,
  onEdit,
}: {
  batch: ProductionBatch;
  orderId: string;
  readOnly?: boolean;
  onRecordOutput: () => void;
  onTrace: () => void;
  onEdit: () => void;
}) {
  const startBatch = useStartBatch(orderId);
  const completeBatch = useCompleteBatch(orderId);
  const cancelBatch = useCancelBatch(orderId);
  const deleteBatch = useDeleteBatch(orderId);
  const [confirm, setConfirm] = React.useState<null | "cancel" | "delete">(null);

  
  /**
   * Batches collapse by default. The header line carries what is asked most often — code,
   * status, produced/assigned — so a stage with a dozen batches stays scannable, and the
   * detail and actions are one click away.
   */
  const [expanded, setExpanded] = React.useState(false);

  /**
   * Derived values for batch actions
   */
  const open = isBatchOpen(batch.status);
  const produced = Number(batch.producedRolls);
  const assigned = Number(batch.assignedRolls);
  const available = Number(batch.availableRolls);
  const wasted = Number(batch.wastedRolls);
    const canDelete = open && batch.sources.length === 0;
  // settled = good output made so far, plus waste scrapped at any stage.
  const settled = produced + wasted;
  const EPS = 0.01;
  // Start: allowed while not yet running — the server accepts PLANNED or ASSIGNED.
  const canStart = open && (batch.status === "PLANNED" || batch.status === "ASSIGNED");
  const pct = assigned > 0 ? Math.min(100, Math.round((produced / assigned) * 100)) : 0;

  // Output and Complete are mutually exclusive on the settled/assigned threshold,
  // giving the clean Start -> Output -> Complete hand-off you want.
  const started = batch.status === "IN_PROGRESS";
  // Output appears only after Start, while quantities remain to record.
  const canOutput = started && settled < assigned - EPS;
  // Complete appears once everything assigned is produced (+wasted) — matches the
  // server's completeBatch precondition (produced > 0 && settled >= assigned).
  const canComplete = started && produced > 0 && settled >= assigned - EPS;

  const canCancel = (batch.status === "PLANNED" || batch.status === "IN_PROGRESS") && 
    !canDelete;

  // Hide Cancel/Delete buttons for COMPLETED batches
  const canTakeAction = (batch.status === "PLANNED" || batch.status === "ASSIGNED" || 
    batch.status === "IN_PROGRESS");

  return (
    <div className="px-3 py-2">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-2 rounded text-left hover:bg-muted/40"
      >
        <ChevronRight
          className={`h-3.5 w-3.5 flex-none text-muted-foreground transition-transform ${
            expanded ? "rotate-90" : ""
          }`}
        />
        <span className="font-mono text-sm font-semibold">{batch.batchCode}</span>
        {batch.labelSize && (
          <Badge variant="outline" className="h-4 px-1.5 text-[10px] font-normal">
            {batch.labelSize}
          </Badge>
        )}
        <Badge variant={STATUS_VARIANT[batch.status]} className="h-4 px-1.5 text-[10px]">
          {STATUS_LABEL[batch.status]}
        </Badge>
        <span className="ml-auto flex items-center gap-2">
          {available > 0 && (
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              {formatNumber(available, 0)} avail
            </span>
          )}
          {/* Estimated run time. `00:00` until this stage's formula is defined. */}
          <span
            className="flex items-center gap-0.5 font-mono text-[11px] tabular-nums text-muted-foreground"
            title="Estimated time to complete this batch"
          >
            <Clock className="h-3 w-3" />
            {formatDuration(batch.estimatedMinutes)}
          </span>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {formatNumber(produced, 0)}/{formatNumber(assigned, 0)}
          </span>
        </span>
      </button>

      {/* A hairline of progress stays visible while collapsed. */}
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${
            batch.status === "CANCELLED" ? "bg-muted-foreground/40" : "bg-primary"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {!expanded ? null : (
        <div className="mt-2">
      {batch.sources.length > 0 && (
        <p className="truncate text-[11px] text-muted-foreground">
          from {batch.sources.map((s) => `${s.sourceBatchCode} ${formatNumber(s.rolls, 0)}`).join(", ")}
        </p>
      )}
      {(batch.machineName || batch.operatorName) && (
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          {[batch.machineName, batch.operatorName].filter(Boolean).join(" · ")}
        </p>
      )}
      {batch.notes && (
        <p className="mt-0.5 truncate text-[11px] italic text-muted-foreground">{batch.notes}</p>
      )}

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px]">
        {available > 0 && (
          <span className="font-medium text-emerald-600 dark:text-emerald-400">
            {formatNumber(available, 0)} available
          </span>
        )}
        {wasted > 0 && <span className="text-muted-foreground">{formatNumber(wasted, 0)} wasted</span>}
        <span className="text-muted-foreground">
          Est. {formatDuration(batch.estimatedMinutes)}
          {batch.estimatedMinutes === 0 && " — formula not set for this stage yet"}
        </span>
      </div>

      {!readOnly && canTakeAction && (
        <div className="mt-2 flex flex-wrap gap-1">
          <RowAction icon={Pencil} label="Edit" onClick={onEdit} />
          {canStart && (
            <RowAction
              icon={Play}
              label="Start"
              loading={startBatch.isPending}
              onClick={() => startBatch.mutate({ stage: batch.stage, batchId: batch.id })}
            />
          )}
          {canOutput && (
            <RowAction icon={PencilLine} label="Output" onClick={onRecordOutput} />
          )}
          {canComplete && (
            <RowAction
              icon={CheckCircle2}
              label="Complete"
              loading={completeBatch.isPending}
              onClick={() => completeBatch.mutate({ stage: batch.stage, batchId: batch.id })}
            />
          )}
          {batch.sources.length > 0 && <RowAction icon={GitBranch} label="Trace" onClick={onTrace} />}
          {canCancel && (
            <RowAction icon={Ban} label="Cancel" onClick={() => setConfirm("cancel")} />
          )}
          {canDelete && <RowAction icon={Trash2} label="Delete" onClick={() => setConfirm("delete")} />}
        </div>
      )}
        </div>
      )}

      <AlertDialog open={confirm !== null} onOpenChange={(v) => !v && setConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirm === "delete" ? `Delete ${batch.batchCode}?` : `Cancel ${batch.batchCode}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirm === "delete"
                ? "This batch never ran, so it can be removed outright."
                : "A cancelled batch counts for nothing. Its input goes back to the previous stage, and it is refused if anything downstream already took its output."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const args = { stage: batch.stage, batchId: batch.id };
                if (confirm === "delete") deleteBatch.mutate(args);
                else cancelBatch.mutate(args);
                setConfirm(null);
              }}
            >
              {confirm === "delete" ? "Delete" : "Cancel batch"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function RowAction({
  icon: Icon,
  label,
  onClick,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}
