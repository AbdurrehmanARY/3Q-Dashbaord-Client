import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { MachineSelect } from "@/features/machines-operators/components/MachineSelect";
import { OperatorSelect } from "@/features/machines-operators/components/OperatorSelect";
import { RUN_REASONS, RUN_REASON_LABELS, type RunReason } from "../types";
import { useLogProductionRun } from "../hooks/use-production-runs";

interface FormValues {
  quantityProduced: number;
  runReason: RunReason;
  machineId?: string;
  operatorId?: string;
  productId?: string;
  notes?: string;
}

interface LogProductionRunDialogProps {
  saleOrderId: number;
  open: boolean;
  onClose: () => void;
}

/**
 * Logs one append-only production pass. A per-dialog `idempotencyKey` (regenerated each time
 * the dialog mounts) makes an accidental double-submit safe — the server returns the same run
 * rather than inserting a second.
 */
export function LogProductionRunDialog({ saleOrderId, open, onClose }: LogProductionRunDialogProps) {
  const log = useLogProductionRun(saleOrderId);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { quantityProduced: 0, runReason: "initial" },
  });

  const close = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: FormValues) => {
    await log.mutateAsync({
      quantityProduced: Number(data.quantityProduced),
      runReason: data.runReason,
      machineId: data.machineId ? Number(data.machineId) : undefined,
      operatorId: data.operatorId ? Number(data.operatorId) : undefined,
      productId: data.productId?.trim() || undefined,
      notes: data.notes?.trim() || undefined,
      idempotencyKey,
    });
    close();
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) close(); }}
      title="Log Production Run"
      description="Every pass is appended to the production history — earlier runs are never overwritten."
      className="sm:max-w-lg"
      footer={
        <>
          <AppButton variant="outline" onClick={close}>Cancel</AppButton>
          <AppButton loading={log.isPending} onClick={handleSubmit(onSubmit)}>Log Run</AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={log.isPending} />
        <AppInput
          label="Quantity Produced *"
          type="number"
          step="any"
          error={errors.quantityProduced?.message}
          {...register("quantityProduced", {
            valueAsNumber: true,
            required: "Quantity is required",
            min: { value: 0.0001, message: "Must be greater than 0" },
          })}
        />
        <AppSelect
          label="Run Reason *"
          options={RUN_REASONS.map((r) => ({ value: r, label: RUN_REASON_LABELS[r] }))}
          {...register("runReason")}
        />

        <Controller
          control={control}
          name="machineId"
          render={({ field: { value, onChange } }) => (
            <MachineSelect label="Machine" value={value} onChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="operatorId"
          render={({ field: { value, onChange } }) => (
            <OperatorSelect label="Operator" value={value} onChange={onChange} />
          )}
        />

        <AppInput label="Product / Label Type" placeholder="e.g. Care Label" {...register("productId")} />

        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="run-notes" className="text-xs font-semibold">Notes</Label>
          <Textarea id="run-notes" rows={2} placeholder="Optional notes about this pass…" {...register("notes")} />
        </div>
      </form>
    </AppDialog>
  );
}
