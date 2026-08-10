import { useForm, useFieldArray } from "react-hook-form";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { formatNumber } from "@/lib/format";
import { useReceiveDyeing } from "../hooks/use-thread-dyeing";
import type { DyeingSend } from "../types";

interface ReceiveForm {
  receivingDate: string;
  receiverTrackingNumber?: string;
  invoiceNumber?: string;
  allocations: {
    id: number;
    colorName: string;
    allocatedWeight: number;
    colorCode: string;
    receivedWeight: number;
  }[];
}

export function ReceiveDyeingDialog({
  send,
  open,
  onClose,
}: {
  send: DyeingSend;
  open: boolean;
  onClose: () => void;
}) {
  const receive = useReceiveDyeing();

  const { register, handleSubmit, control } = useForm<ReceiveForm>({
    defaultValues: {
      receivingDate: new Date().toISOString().slice(0, 10),
      allocations: send.allocations.map((a) => ({
        id: a.id,
        colorName: a.colorName,
        allocatedWeight: a.allocatedWeight,
        colorCode: a.colorCode ?? "",
        // Default the received (after) weight to the sent weight; the user adjusts for loss.
        receivedWeight: a.allocatedWeight,
      })),
    },
  });
  const { fields } = useFieldArray({ control, name: "allocations" });

  const onSubmit = handleSubmit(async (data) => {
    await receive.mutateAsync({
      sendId: send.id,
      body: {
        receivingDate: data.receivingDate,
        receiverTrackingNumber: data.receiverTrackingNumber?.trim() || undefined,
        invoiceNumber: data.invoiceNumber?.trim() || undefined,
        allocations: data.allocations.map((a) => ({
          id: a.id,
          colorCode: a.colorCode?.trim() || undefined,
          receivedWeight: Number(a.receivedWeight),
        })),
      },
    });
    onClose();
  });

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title={`Receive Dyed Thread — ${send.serviceProviderName ?? "Provider"}`}
      description="Finalise each colour code and enter the actual weight received; the after-weight is credited to dyed stock."
      className="sm:max-w-2xl"
      footer={
        <>
          <AppButton variant="outline" onClick={onClose}>Cancel</AppButton>
          <AppButton loading={receive.isPending} onClick={onSubmit}>Receive into Stock</AppButton>
        </>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <SubmitOnEnter disabled={receive.isPending} />
        <div className="grid gap-4 sm:grid-cols-3">
          <AppInput label="Receiving Date *" type="date" {...register("receivingDate", { required: true })} />
          <AppInput label="Receiver Tracking #" {...register("receiverTrackingNumber")} />
          <AppInput label="Invoice Number" {...register("invoiceNumber")} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Colours ({send.denier}D) — before vs after
          </p>
          <div className="grid grid-cols-[1fr_auto_1fr_1fr] items-end gap-2 text-[11px] font-medium uppercase text-muted-foreground">
            <span>Colour</span>
            <span className="text-right">Sent (kg)</span>
            <span>Colour Code</span>
            <span>Received (kg)</span>
          </div>
          {fields.map((field, i) => (
            <div key={field.id} className="grid grid-cols-[1fr_auto_1fr_1fr] items-center gap-2">
              <span className="text-sm font-medium">{field.colorName}</span>
              <span className="text-right text-sm tabular-nums text-muted-foreground">
                {formatNumber(field.allocatedWeight, 3)}
              </span>
              <AppInput placeholder="Code" {...register(`allocations.${i}.colorCode` as const)} />
              <AppInput
                type="number"
                step="any"
                {...register(`allocations.${i}.receivedWeight` as const, { valueAsNumber: true })}
              />
            </div>
          ))}
        </div>
      </form>
    </AppDialog>
  );
}
