import * as React from "react";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { formatNumber } from "@/lib/format";
import { useRecordOutput } from "../hooks/use-batches";
import {
  STAGE_LABEL,
  UNIT_LABEL,
  type LineKind,
  type ProductionBatch,
} from "../batch-types";

interface BatchOutputDialogProps {
  open: boolean;
  onClose: () => void;
  batch: ProductionBatch;
  kind: LineKind;
  orderId: string;
}

/**
 * Records what a batch has made. Absolute values, not deltas — "this batch has now made
 * 6 rolls" — which is what makes correcting a mistyped figure a re-entry rather than a
 * compensating adjustment.
 *
 * Waste is recordable at every stage. Unused reusable input at cutting/packaging is still
 * released upstream; destroyed input is recorded as waste and creates make-up headroom.
 */
export function BatchOutputDialog({ open, onClose, batch, kind, orderId }: BatchOutputDialogProps) {
  const recordOutput = useRecordOutput(orderId);
  const assigned = Number(batch.assignedRolls);
  const consumed = Number(batch.consumedRolls);
  const unit = UNIT_LABEL[kind];
  // Waste is allowed at all stages now. No first-stage gate.
  const isPackaging = batch.stage === "packaging";

  const [produced, setProduced] = React.useState(String(Number(batch.producedRolls)));
  const [wasted, setWasted] = React.useState(String(Number(batch.wastedRolls)));
  const [wasteReason, setWasteReason] = React.useState(batch.wasteReason ?? "");
  const [packagedQty, setPackagedQty] = React.useState(String(Number(batch.packagedQty)));

  const producedNum = Number(produced) || 0;
  const wastedNum = Number(wasted) || 0;

  const error = React.useMemo(() => {
    if (producedNum < 0 || wastedNum < 0) return "Output cannot be negative";
    if (!Number.isInteger(producedNum) || !Number.isInteger(wastedNum))
      return `${unit === "pcs" ? "Pieces" : "Rolls"} are whole units — enter 1, 2, 3…`;
    if (producedNum + wastedNum > assigned)
      return `${batch.batchCode} was assigned ${formatNumber(assigned, 0)} ${unit}`;
    if (producedNum < consumed)
      return `${formatNumber(consumed, 0)} ${unit} have already been taken downstream`;
    return null;
  }, [producedNum, wastedNum, assigned, consumed, batch.batchCode, unit]);

  async function handleSubmit() {
    await recordOutput.mutateAsync({
      stage: batch.stage,
      batchId: batch.id,
      body: {
        producedRolls: producedNum,
        wastedRolls: wastedNum,
        wasteReason: wasteReason || undefined,
        ...(isPackaging ? { packagedQty: Number(packagedQty) || 0 } : {}),
      },
    });
    onClose();
  }

  const pending = Math.max(0, assigned - producedNum - wastedNum);

  return (
    <AppDialog
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={`${batch.batchCode} — Record Output`}
      description={`${STAGE_LABEL[batch.stage]} · ${formatNumber(assigned, 0)} ${unit} assigned`}
      footer={
        <>
          <AppButton variant="outline" onClick={onClose}>
            Cancel
          </AppButton>
          <AppButton onClick={handleSubmit} disabled={!!error} loading={recordOutput.isPending}>
            Save Output
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <AppInput
          label={`${unit === "pcs" ? "Pieces" : "Rolls"} produced (total so far)`}
          type="number"
          min={producedNum}
          step="1"
          max={assigned}
          value={produced}
          onChange={(e) => setProduced(e.target.value)}
          error={error ?? undefined}
          
          autoFocus
        />

        <AppInput
          label={`${unit === "pcs" ? "Pieces" : "Rolls"} wasted`}
          type="number"
          min={0}
          step="1"
          value={wasted}
          onChange={(e) => setWasted(e.target.value)}
        />
        {wastedNum > 0 && (
          <AppInput
            label="Waste reason (optional)"
            value={wasteReason}
            onChange={(e) => setWasteReason(e.target.value)}
            maxLength={40}
        />
        )}

        {isPackaging && (
          <AppInput
            label="Labels packaged"
            type="number"
            min={0}
            step="1"
            value={packagedQty}
            onChange={(e) => setPackagedQty(e.target.value)}
          />
        )}

        <dl className="grid grid-cols-3 gap-2 rounded-md border bg-muted/40 px-3 py-2 text-center">
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">Produced</dt>
            <dd className="font-mono text-sm font-semibold tabular-nums">
              {formatNumber(producedNum, 0)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Still to run
            </dt>
            <dd className="font-mono text-sm font-semibold tabular-nums">
              {formatNumber(pending, 0)}
            </dd>
                    </div>
    </dl>

        <p className="text-[11px] text-muted-foreground">
          {isPackaging
            ? "Packaged rolls finish the pipeline for this label type."
            : "Produced rolls become available to the next stage immediately — the batch does not have to be completed first."}
        </p>
      </div>
    </AppDialog>
  );
}
