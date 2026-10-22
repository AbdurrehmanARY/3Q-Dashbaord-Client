import * as React from "react";
import { AlertCircle, Layers } from "lucide-react";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { formatNumber } from "@/lib/format";
import { useBatchSources, useStageResources, useUpdateBatch } from "../hooks/use-batches";
import {
  STAGE_LABEL,
  UNIT_LABEL,
  UPSTREAM_STAGE,
  isFirstStage,
  stageInputLabel,
  type LineKind,
  type ProductionBatch,
  type StageMachine,
} from "../batch-types";
import { isSizeLabel } from "../label-types";
import {
  buildBatchUpdateBody,
  editFloor,
  firstStageCap,
  mergeEditSources,
  ownEdgesOf,
  validateBatchEdit,
  wholeUnitWord,
  type BatchEditValues,
} from "../utils/batch-edit";
import { SourcePicker } from "./CreateBatchDialog";

export interface EditBatchDialogProps {
  open: boolean;
  onClose: () => void;
  batch: ProductionBatch;
  lineId?: number;
  kind: LineKind;
  labelType?: string;
  orderId: string;
}

/**
 * Editing reassigns the machine and operator and adjusts the assignment (or the input
 * split) — it never touches output already recorded. The server still has the final say:
 * it refuses edits to completed/cancelled batches and any change that drops the input
 * below what has already been produced or wasted. The validation below mirrors those
 * guards so the form is blocked before it is submitted.
 */
export function EditBatchDialog({
  open,
  onClose,
  batch,
  lineId,
  kind,
  labelType = "",
  orderId,
}: EditBatchDialogProps) {
  const stage = batch.stage;
  const unit = UNIT_LABEL[kind];
  const fromPlan = isFirstStage(kind, stage);
  const upstream = UPSTREAM_STAGE[kind][stage] ?? null;

  // The batch id in the resources query keeps this batch's OWN machine and operator
  // selectable: the server reports a resource as busy only when someone ELSE holds it.
  const sourcesQuery = useBatchSources(stage, lineId);
  const resources = useStageResources(stage, lineId, batch.id);
  const updateBatch = useUpdateBatch(orderId);

  const [assignedRolls, setAssignedRolls] = React.useState(() => String(Number(batch.assignedRolls)));
  const [allocations, setAllocations] = React.useState<Record<number, string>>(() => {
    const seeded: Record<number, string> = {};
    for (const e of batch.sources) seeded[e.sourceBatchId] = String(Number(e.rolls));
    return seeded;
  });
  const [machineId, setMachineId] = React.useState(batch.machineId ? String(batch.machineId) : "");
  const [operatorId, setOperatorId] = React.useState(batch.operatorId ? String(batch.operatorId) : "");
  const [labelSize, setLabelSize] = React.useState(batch.labelSize ?? "");
  const [notes, setNotes] = React.useState(batch.notes ?? "");

  const data = sourcesQuery.data;
  const sizeTracking = isSizeLabel(labelType) && fromPlan ? data?.sizes ?? [] : [];
  const ownEdges = React.useMemo(() => ownEdgesOf(batch), [batch]);
  const sourceOptions = React.useMemo(
    () => mergeEditSources(data?.sources ?? [], batch),
    [data?.sources, batch]
  );
  const remainingPlanned = data?.remainingPlanned ?? 0;

  const machines = resources.data?.machines ?? [];
  const operators = resources.data?.operators ?? [];
  const requiresMachine = resources.data?.requiresMachine ?? stage !== "packaging";
  const isWeaving = stage === "weaving";
  const machineOptions = React.useMemo(
    () =>
      machines.filter(
        (m: StageMachine) => !isWeaving || m.machineType === "Woven" || m.machineType === "Weaving"
      ),
    [machines, isWeaving]
  );

  const allocated = React.useMemo(
    () => Object.values(allocations).reduce((n, v) => n + Number(v || 0), 0),
    [allocations]
  );

  const produced = Number(batch.producedRolls);
  const wasted = Number(batch.wastedRolls);
  const floor = editFloor(batch);
  const planCap = fromPlan ? firstStageCap(remainingPlanned, batch) : null;

  const values: BatchEditValues = {
    batch,
    kind,
    fromPlan,
    assignedRolls,
    allocations,
    machineId,
    operatorId,
    labelSize,
    notes,
    requiresMachine,
    sizeTracking,
    remainingPlanned,
    sources: sourceOptions,
  };
  const error = validateBatchEdit(values);

  async function handleSubmit() {
    const body = buildBatchUpdateBody(values);
    await updateBatch.mutateAsync({ stage, batchId: batch.id, body });
    onClose();
  }
  return (
    <AppDialog
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={`Edit ${batch.batchCode}`}
      description={
        labelType
          ? `${labelType} — ${STAGE_LABEL[stage].toLowerCase()} batch on this line`
          : `${STAGE_LABEL[stage].toLowerCase()} batch on this line`
      }
      className="sm:max-w-[560px]"
      footer={
        <>
          <AppButton variant="outline" onClick={onClose} disabled={updateBatch.isPending}>
            Cancel
          </AppButton>
          <AppButton onClick={handleSubmit} disabled={!!error} loading={updateBatch.isPending}>
            Save changes
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
                Unassigned plan left on this line
              </span>
              <span className="font-mono text-sm font-semibold tabular-nums">
                {formatNumber(planCap ?? 0, 0)} {unit}
              </span>
            </div>

            <AppInput
              label={`${wholeUnitWord(kind)} to assign`}
              type="number"
              min={0}
              step="1"
              max={planCap ?? undefined}
              value={assignedRolls}
              onChange={(e) => setAssignedRolls(e.target.value)}
              placeholder="0"
            />

            {sizeTracking.length > 0 && (
              <AppSelect
                label="Size this batch weaves *"
                value={labelSize}
                onChange={(e) => setLabelSize(e.target.value)}
                placeholder="Select a size"
                options={sizeTracking.map((s) => ({
                  label: `${s.size} — ${formatNumber(s.remaining, 0)} of ${formatNumber(s.planned, 0)} ${unit} left`,
                  value: s.size,
                  disabled: s.remaining <= 0 && s.size !== labelSize,
                }))}
              />
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
            ownAllocations={ownEdges}
          />
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {requiresMachine && (
            <AppSelect
              label={`${STAGE_LABEL[stage]} machine`}
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              placeholder={machineOptions.some((m) => !m.isHeld) ? "Select a machine" : "None free"}
              options={machineOptions.map((m) => ({
                label: m.isHeld ? `${m.name} — busy on ${m.heldBy}` : m.name,
                value: m.id,
                disabled: m.isHeld,
              }))}
            />
          )}

          <AppSelect
            label={`${STAGE_LABEL[stage]} operator`}
            value={operatorId}
            onChange={(e) => setOperatorId(e.target.value)}
            placeholder={operators.some((o) => !o.isHeld) ? "Select an operator" : "None free"}
            options={operators.map((o) => ({
              label: o.isHeld ? `${o.name} — busy on ${o.heldBy}` : o.name,
              value: o.id,
              disabled: o.isHeld,
            }))}
            />
        </div>

        {!resources.isLoading && operators.length === 0 && (
          <p className="text-[11px] font-medium text-destructive">
            No operators are set to {STAGE_LABEL[stage].toLowerCase()}. Set a designation under
            Machines &amp; Operators first.
          </p>
        )}

        <AppInput
          label="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Shift, remarks…"
        />

        {floor > 0 && (
          <p className="text-[11px] text-muted-foreground">
            {formatNumber(produced, 0)} {unit} already produced and {formatNumber(wasted, 0)} wasted — the
            assignment can never drop below {formatNumber(floor, 0)} {unit}. Already-recorded output and
            sourced material are kept either way.
          </p>
        )}
        {error && (
          <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-[11px]">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
            <span className="text-destructive">{error}</span>
          </div>
        )}

        <p className="text-[11px] text-muted-foreground">
          Editing reassigns the {requiresMachine ? "machine and operator" : "operator"} and adjusts the
          {fromPlan ? " assignment" : " input split"} — it does not change output already recorded on this
          batch.
        </p>
      </div>
    </AppDialog>
  );
}
