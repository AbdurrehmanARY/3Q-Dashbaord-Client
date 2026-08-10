import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { formatNumber, todayISO } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useProviders, useSendDyeing } from "../hooks/use-thread-dyeing";
import { DENIERS, BASE_COLORS, type Denier, type BaseColor } from "../types";

interface SendForm {
  serviceProviderId: string;
  sendingDate: string;
  senderTrackingNumber?: string;
  denier: Denier;
  baseThreadColor: BaseColor;
  totalWeightSent: number;
  allocations: { colorName: string; pantone?: string; colorCode?: string; allocatedWeight: number }[];
}

export function SendDyeingDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data: providers } = useProviders();
  const send = useSendDyeing();

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<SendForm>({
    defaultValues: {
      sendingDate: todayISO(),
      denier: "75",
      baseThreadColor: "White",
      totalWeightSent: 0,
      allocations: [{ colorName: "", allocatedWeight: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "allocations" });

  const allocations = watch("allocations");
  const totalWeightSent = Number(watch("totalWeightSent")) || 0;
  const sumAllocated = allocations.reduce((a, x) => a + (Number(x.allocatedWeight) || 0), 0);
  const matched = totalWeightSent > 0 && Math.abs(sumAllocated - totalWeightSent) < 0.0005;

  const onSubmit = handleSubmit(async (data) => {
    await send.mutateAsync({
      serviceProviderId: Number(data.serviceProviderId),
      sendingDate: data.sendingDate,
      senderTrackingNumber: data.senderTrackingNumber?.trim() || undefined,
      denier: data.denier,
      baseThreadColor: data.baseThreadColor,
      totalWeightSent: Number(data.totalWeightSent),
      allocations: data.allocations.map((a) => ({
        colorName: a.colorName,
        pantone: a.pantone?.trim() || undefined,
        colorCode: a.colorCode?.trim() || undefined,
        allocatedWeight: Number(a.allocatedWeight),
      })),
    });
    onClose();
  });

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title="Send Thread for Dyeing"
      description="Deducts the total from undyed stock immediately. Allocation weights must equal the total sent."
      className="sm:max-w-2xl"
      footer={
        <>
          <AppButton variant="outline" onClick={onClose}>Cancel</AppButton>
          <AppButton loading={send.isPending} disabled={!matched} onClick={onSubmit}>Send for Dyeing</AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
        <SubmitOnEnter disabled={send.isPending} />
        <AppSelect
          label="Service Provider *"
          placeholder={providers?.length ? "Select provider…" : "No providers — add one first"}
          options={(providers ?? []).map((p) => ({ value: String(p.id), label: p.name }))}
          error={errors.serviceProviderId?.message}
          {...register("serviceProviderId", { required: "Service provider is required" })}
        />
        <AppInput label="Sending Date *" type="date" {...register("sendingDate", { required: true })} />
        <AppSelect label="Denier *" options={DENIERS.map((d) => ({ value: d, label: `${d}D` }))} {...register("denier")} />
        <AppSelect label="Base Thread Colour *" options={BASE_COLORS.map((c) => ({ value: c, label: c }))} {...register("baseThreadColor")} />
        <AppInput label="Total Weight Sent (kg) *" type="number" step="any" {...register("totalWeightSent", { valueAsNumber: true })} />
        <AppInput label="Sender Tracking #" {...register("senderTrackingNumber")} />

        <div className="sm:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Colour Allocations</span>
            <AppButton type="button" variant="outline" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}
              onClick={() => append({ colorName: "", allocatedWeight: 0 })}>
              Add colour
            </AppButton>
          </div>

          {fields.map((field, i) => (
            <div key={field.id} className="grid grid-cols-[1fr_1fr_1fr_auto_auto] items-end gap-2">
              <AppInput label={i === 0 ? "Colour" : undefined} placeholder="Colour name"
                {...register(`allocations.${i}.colorName` as const, { required: true })} />
              <AppInput label={i === 0 ? "Pantone" : undefined} placeholder="Pantone"
                {...register(`allocations.${i}.pantone` as const)} />
              <AppInput label={i === 0 ? "Colour Code" : undefined} placeholder="Code"
                {...register(`allocations.${i}.colorCode` as const)} />
              <AppInput label={i === 0 ? "Weight (kg)" : undefined} type="number" step="any" className="w-28"
                {...register(`allocations.${i}.allocatedWeight` as const, { valueAsNumber: true })} />
              <AppButton type="button" variant="ghost" size="icon" className="h-9 w-9 text-destructive"
                disabled={fields.length === 1} onClick={() => remove(i)} aria-label="Remove colour">
                <Trash2 className="h-4 w-4" />
              </AppButton>
            </div>
          ))}

          <div className={cn(
            "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
            matched ? "border-success/30 bg-success/5 text-success" : "border-warning/30 bg-warning/5 text-warning"
          )}>
            <span className="flex items-center gap-1.5 font-medium">
              {matched ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              {matched ? "Allocations match the total sent" : "Allocations must equal the total sent"}
            </span>
            <span className="tabular-nums font-semibold">
              {formatNumber(sumAllocated, 3)} / {formatNumber(totalWeightSent, 3)} kg
            </span>
          </div>
        </div>
      </form>
    </AppDialog>
  );
}
