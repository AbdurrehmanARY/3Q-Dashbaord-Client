import * as React from "react";
import { AlertCircle, Layers } from "lucide-react";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { formatNumber } from "@/lib/format";
import { useBatchSources, useCreateBatch, useStageResources } from "../hooks/use-batches";
import {
  STAGE_LABEL,
  UNIT_LABEL,
  UPSTREAM_STAGE,
  isFirstStage,
  stageInputLabel,
  type BatchStage,
  type LineKind,
  type SizeAssignment,
  type StageMachine,
  type StageOperator,
} from "../batch-types";
import { isSizeLabel } from "../label-types";
import { cn } from "@/lib/utils";

interface CreateBatchDialogProps {
  open: boolean;
  onClose: () => void;
  stage: BatchStage;
  lineId?: number;
  labelType?: string;
  /** Printed lines count rolls; woven lines count pieces. */
  kind: LineKind;
  orderId: string;
}

/**
 * Creating a batch means answering one question: where does its input come from?
 *
 * Printing draws from the plan, so it asks for a roll count bounded by what is still
 * unassigned. Cutting and packaging draw from named upstream batches of the SAME line — this
 * line's printed rolls, this line's cut output — so they show every such batch with output left
 * and let the user split across them, which is what makes "many sources feed one batch"
 * expressible in the UI as well as in the schema.
 */
export function CreateBatchDialog({
  open,
  onClose,
  stage,
  lineId,
  labelType = "",
  kind,
  orderId,
}: CreateBatchDialogProps) {
  const upstream = UPSTREAM_STAGE[kind][stage];
  const unit = UNIT_LABEL[kind];
  // Every stage is line-scoped: sources, machines and operators all come from this line.
  const sourcesQuery = useBatchSources(stage, lineId);
  // Already filtered by stage and by live holds — the UI never applies those rules itself.
  const resources = useStageResources(stage, lineId);
  const createBatch = useCreateBatch(orderId);

  const [assignedRolls, setAssignedRolls] = React.useState("");
  const [allocations, setAllocations] = React.useState<Record<number, string>>({});
  const [machineId, setMachineId] = React.useState("");
  const [operatorId, setOperatorId] = React.useState("");
  const [labelSize, setLabelSize] = React.useState("");
  const [notes, setNotes] = React.useState("");
  /** Snapshot of the sizes the sources query had when the user first interacted with the
   * dialog, so we only reset a stale choice when the choices actually change while the user
   * is mid-decision — not on every keystroke of a different field. */
  const sizesAtOpen = React.useRef<string[] | null>(null);

  // When the source-of-truth sizes arrive or change, keep `labelSize` honest: if the
  // user had picked a size that's no longer in the set, clear it so the server-side
  // "labelSize not in planned sizes" validation becomes an actionable prompt rather
  // than a dead-end error. This is run as an effect rather than folded into
  // `sizesToChoose` so the dropdown options never lie — they always reflect the live
  // data — but the selected value stays honest with the live data too.
  const sizeTracking = isSizeLabel(labelType) ? sourcesQuery.data?.sizes ?? [] : [];
  const sizeRequired = isFirstStage(kind, stage) && sizeTracking.length > 0;
  React.useEffect(() => {
    const available = sizeTracking.map((s) => s.size);
    const current = labelSize;
    // First time the sizes are non-empty (after the initial empty load), snapshot them.
    if (available.length > 0 && sizesAtOpen.current === null) {
      sizesAtOpen.current = available;
      return;
    }
    // If the snapshot hasn't been set yet (still loading), don't touch the selection.
    if (sizesAtOpen.current === null) return;
    // If the set of available sizes changed since open, and the current selection is
    // no longer in it, reset. If the current selection is still available, keep it.
    const changed =
      !sizesAtOpen.current?.every((s) => available.includes(s)) ||
      !available.every((s) => sizesAtOpen.current?.includes(s) ?? false);
    if (changed && current && !available.includes(current)) {
      setLabelSize("");
    }
    sizesAtOpen.current = available;
  }, [sizeTracking, labelSize]);

  // Filter machines/operators to weaving-specific resources for the weaving stage
  const isWeaving = stage === "weaving";
  const filteredMachines = React.useMemo(
    () =>
      (resources.data?.machines ?? []).filter(
        (m: StageMachine) => !isWeaving || m.machineType === "Woven" || m.machineType === "Weaving",
      ),
    [resources.data?.machines, isWeaving],
  );
  const filteredOperators = React.useMemo(
    () => resources.data?.operators ?? [],
    [resources.data?.operators],
  );

  const data = sourcesQuery.data;
  const fromPlan = isFirstStage(kind, stage);
  const remainingPlanned = data?.remainingPlanned ?? 0;
  const sourceOptions = data?.sources ?? [];

  /**
   * A woven Size Label's batches each weave ONE planned size, so a size with nothing left
   * cannot be picked at all. The server resolves the same figures from the line's own plan,
   * which is why the caps here are hints rather than the rule.
   */
  const selectedSize: SizeAssignment | null =
    sizeTracking.find((s) => s.size === labelSize) ?? null;
  /** Whichever runs out first: the whole plan, or this size's own untaken pieces. */
  const sizeCap = selectedSize
    ? Math.min(remainingPlanned, selectedSize.remaining)
    : remainingPlanned;

  const allocated = React.useMemo(
    () => Object.values(allocations).reduce((n, v) => n + Number(v || 0), 0),
    [allocations],
  );

  /** Keep the selected size honest: when the source data refreshes with a different set
   * of planned sizes, a previously-chosen size can become unavailable. Clear it so the
   * server-side "labelSize not in planned sizes" error surfaces as an actionable prompt
   * rather than confusing the user. Guard with a ref so the initial empty-load render
   * (when `sizeTracking` is still []) does not clear a size the user already chose.
   */
  const sizesLoaded = React.useRef(false);
  React.useEffect(() => {
    if (!sizesLoaded.current) {
      sizesLoaded.current = true;
      return;
    }
    if (!sizeRequired || !labelSize || sizeTracking.some((s) => s.size === labelSize)) return;
    setLabelSize("");
  }, [sizeTracking, sizeRequired, labelSize]);

  /** Reported on the size picker itself, so the count field keeps its own message. */
  const sizeError = sizeRequired && !labelSize ? "Select which planned size this batch weaves" : null;

  /** Every reason the form can't be submitted, stated the way the backend would state it. */
  const error = React.useMemo(
    () => {
      if (fromPlan) {
        if (sizeError) return sizeError;
        const rolls = Number(assignedRolls);
        if (!assignedRolls) return null;
        if (!Number.isFinite(rolls) || rolls <= 0) return "Enter a roll count greater than zero";
        if (!Number.isInteger(rolls))
          return `${unit === "pcs" ? "Pieces" : "Rolls"} are whole units — enter 1, 2, 3…`;
        if (rolls > sizeCap)
          return selectedSize
            ? `${selectedSize.size} has only ${formatNumber(sizeCap, 0)} ${unit} left to assign`
            : `Only ${formatNumber(sizeCap, 0)} of the planned ${unit} are unassigned`;
        return null;
      }
      for (const s of sourceOptions) {
        const want = Number(allocations[s.sourceBatchId] ?? 0);
        if (!Number.isInteger(want))
          return `${unit === "pcs" ? "Pieces" : "Rolls"} are whole units — enter 1, 2, 3…`;
        if (want > s.availableRolls)
          return `${s.batchCode} has only ${formatNumber(s.availableRolls, 0)} ${unit} available`;
      }
      return null;
    },
    [fromPlan, sizeError, assignedRolls, sizeCap, selectedSize, remainingPlanned, allocations, sourceOptions, unit],
  );

  /** The count field's own message — the size picker states its problem itself. */
  const countError = error && error !== sizeError ? error : null;

  const machines = resources.data?.machines ?? [];
  const operators = resources.data?.operators ?? [];
  const needsMachine = resources.data?.requiresMachine ?? stage !== "packaging";

  /**
   * A batch is a real job on a real press: it cannot be created without the machine and
   * operator that will run it. The server enforces the same rule, so this only saves a
   * round trip.
   */
  const resourcesReady = (!needsMachine || !!machineId) && !!operatorId;
  const inputReady = fromPlan ? Number(assignedRolls) > 0 : allocated > 0;
  /** A batch is created against its line, so no line id means no submit — for any stage. */
  const canSubmit = inputReady && resourcesReady && !error && !!lineId;

  async function handleSubmit() {
    const shared = {
      machineId: machineId ? Number(machineId) : null,
      operatorId: Number(operatorId),
      notes: notes.trim() || null,
    };

    const body = fromPlan
      ? { ...shared, assignedRolls: Number(assignedRolls), ...(sizeRequired ? { labelSize } : {}) }
      : {
          ...shared,
          sources: sourceOptions
            .filter((s) => Number(allocations[s.sourceBatchId]) > 0)
            .map((s) => ({
              sourceBatchId: s.sourceBatchId,
              rolls: Number(allocations[s.sourceBatchId]),
            })),
        };

    /**
     * The line decides the endpoint — every stage POSTs against its own line — while the order id
     * travels along only so the mutation knows which order's flow to invalidate afterwards.
     */
    await createBatch.mutateAsync({ stage, lineId, orderId, body });
    onClose();
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={`New ${STAGE_LABEL[stage]} Batch`}
      description={
        labelType
          ? `${labelType} — consumes ${stageInputLabel(kind, stage)} from this line`
          : `Consumes ${stageInputLabel(kind, stage)} from this line`
      }
      className="sm:max-w-[560px]"
      footer={
        <>
          <AppButton variant="outline" onClick={onClose}>
            Cancel
          </AppButton>
          <AppButton onClick={handleSubmit} disabled={!canSubmit} loading={createBatch.isPending}>
            Create Batch
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        {fromPlan ? (
          <>
            <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2">
              <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Layers className="h-3.5 w-3.5" />
                {selectedSize
                  ? `${selectedSize.size} still unassigned`
                  : `Unassigned planned ${unit}`}
              </span>
              <span className="font-mono text-sm font-semibold tabular-nums">
                {formatNumber(sizeCap, 0)}
              </span>
            </div>
            <AppInput
              label={`${unit === "pcs" ? "Pieces" : "Rolls"} to assign`}
              type="number"
              min={0}
              step="1"
              max={sizeCap}
              value={assignedRolls}
              onChange={(e) => setAssignedRolls(e.target.value)}
              placeholder="0"
              error={countError ?? undefined}
            />
            {sizeRequired && (
              <div className="rounded-md border border-primary/30 bg-primary/5 p-3 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-primary">Size this batch weaves *</span>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {sizeTracking.length} size{sizeTracking.length !== 1 ? "s" : ""} planned
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {sizeTracking.map((s) => {
                    const isSelected = labelSize === s.size;
                    const isExhausted = s.remaining <= 0;
                    return (
                      <button
                        key={s.size}
                        type="button"
                        disabled={isExhausted || createBatch.isPending}
                        onClick={() => setLabelSize(s.size)}
                        className={cn(
                          "rounded-md border px-3 py-2 text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                          isSelected
                            ? "border-primary bg-primary/10 ring-1 ring-primary"
                            : "border-input bg-background hover:border-primary/50",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{s.size}</span>
                          <span
                            className={cn(
                              "font-mono text-xs tabular-nums",
                              isExhausted ? "text-destructive" : "text-emerald-600",
                            )}
                          >
                            {formatNumber(s.remaining, 0)} left
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>{formatNumber(s.planned, 0)} planned</span>
                          <span>{formatNumber(s.assigned, 0)} assigned</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {sizeError && (
                  <p className="text-[11px] font-medium text-destructive">
                    <AlertCircle className="mr-0.5 inline h-3 w-3" />
                    {sizeError}
                  </p>
                )}
                {selectedSize && (
                  <div className="flex items-center gap-4 rounded-md bg-background/80 px-3 py-2 text-[11px]">
                    <span className="text-muted-foreground">
                      Planned: <strong className="text-foreground">{formatNumber(selectedSize.planned, 0)}</strong> {unit}
                    </span>
                    <span className="text-muted-foreground">
                      Assigned: <strong className="text-amber-600">{formatNumber(selectedSize.assigned, 0)}</strong> {unit}
                    </span>
                    <span className="text-muted-foreground">
                      Remaining: <strong className="text-emerald-600">{formatNumber(selectedSize.remaining, 0)}</strong> {unit}
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <SourcePicker
            stage={stage}
            kind={kind}
            upstreamLabel={upstream ? STAGE_LABEL[upstream] : ""}
            sources={sourceOptions}
            allocations={allocations}
            onChange={(id, value) => setAllocations((prev) => ({ ...prev, [id]: value }))}
            allocated={allocated}
            loading={sourcesQuery.isLoading}
            error={error}
          />
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {needsMachine && (
            <AppSelect
              label={`${STAGE_LABEL[stage]} machine *`}
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              placeholder={machines.some((m) => !m.isHeld) ? "Select a machine" : "None free"}
              options={filteredMachines.map((m: StageMachine) => ({
                label: m.isHeld ? `${m.name} — busy on ${m.heldBy}` : m.name,
                value: m.id,
                disabled: m.isHeld,
              }))}
            />
          )}

            <AppSelect
              label={`${STAGE_LABEL[stage]} operator *`}
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
              placeholder={operators.some((o) => !o.isHeld) ? "Select an operator" : "None free"}
              options={operators.map((o) => ({
                label: o.isHeld ? `${o.name} — busy on ${o.heldBy}` : o.name,
                value: o.id,
                disabled: o.isHeld,
              }))}
            />``
        </div>

        {!resources.isLoading && (needsMachine ? machines.length === 0 : false) && (
          <p className="text-[11px] font-medium text-destructive">
            No {STAGE_LABEL[stage].toLowerCase()} machines exist. Add one under
            Machines &amp; Operators first.
          </p>
        )}
        {!resources.isLoading && operators.length === 0 && (
          <p className="text-[11px] font-medium text-destructive">
            No operators are set to {STAGE_LABEL[stage]}. Set a designation under Machines
            &amp; Operators first.
          </p>
        )}

        <AppInput
          label="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Shift, remarks…"
        />

        <p className="text-[11px] text-muted-foreground">
          Creating the batch reserves this {needsMachine ? "machine and operator" : "operator"} —
          no other batch can use {needsMachine ? "them" : "them"} until it completes or is
          cancelled. Record output as the work happens; partial output reaches the next stage
          straight away.
        </p>
      </div>
    </AppDialog>
  );
}

/** Splits a batch's input across the upstream batches that still have output left. */
export function SourcePicker({
  stage,
  kind,
  upstreamLabel,
  sources,
  allocations,
  onChange,
  allocated,
  loading,
  error,
  ownAllocations,
}: {
  stage: BatchStage;
  kind: LineKind;
  upstreamLabel: string;
  sources: {
    sourceBatchId: number;
    batchCode: string;
    availableRolls: number;
    producedRolls: number;
    machineName: string | null;
  }[];
  allocations: Record<number, string>;
  onChange: (id: number, value: string) => void;
  allocated: number;
  loading: boolean;
  error: string | null; ownAllocations?: Record<number, number>;
}) {
  if (loading) {
    return <p className="py-6 text-center text-sm text-muted-foreground">Loading available batches…</p>;
  }

  if (sources.length === 0) {
    return (
      <div className="rounded-md border border-dashed px-4 py-6 text-center">
        <AlertCircle className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
        <p className="text-sm font-medium">No {stageInputLabel(kind, stage)} available</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Record output on a {upstreamLabel.toLowerCase()} batch first — its rolls appear here as
          soon as they are produced.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold">Take {stageInputLabel(kind, stage)} from</span>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {formatNumber(allocated, 0)} selected
        </span>
      </div>

      <div className="divide-y rounded-md border">
        {sources.map((s) => {
          const value = allocations[s.sourceBatchId] ?? "";
          const own = ownAllocations?.[s.sourceBatchId] ?? 0; const cap = s.availableRolls + own; const over = Number(value) > cap;
          return (
            <div key={s.sourceBatchId} className="flex items-center gap-3 px-3 py-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold">{s.batchCode}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {own > 0 ? `${formatNumber(cap, 0)} assignable — ${formatNumber(own, 0)} held` : `${formatNumber(s.availableRolls, 0)} available of ${formatNumber(s.producedRolls, 0)} made`}
                  </span>
                </div>
                {s.machineName && (
                  <p className="truncate text-[11px] text-muted-foreground">{s.machineName}</p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={cap}
                  step="1"
                  value={value}
                  onChange={(e) => onChange(s.sourceBatchId, e.target.value)}
                  placeholder="0"
                  aria-label={`Rolls to take from ${s.batchCode}`}
                  className={`h-8 w-24 rounded-md border bg-background px-2 text-right font-mono text-sm tabular-nums focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                    over ? "border-destructive focus-visible:ring-destructive" : "border-input"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => onChange(s.sourceBatchId, String(cap))}
                  className="rounded px-1.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  All
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {error && <p className="text-[11px] font-medium text-destructive">{error}</p>}
    </div>
  );
}
