import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { formatNumber, todayISO } from "@/lib/format";
import { inkPurchaseSchema, type InkPurchaseSchemaInput } from "../schemas/ink-schemas";
import { useCreateInkPurchase, useUpdateInkPurchase } from "../hooks/use-ink";
import type { InkPurchase } from "../types";

interface Props {
  open: boolean;
  purchase: InkPurchase | null;
  onClose: () => void;
}

/** Create/edit an ink purchase. Total weight is derived (qty × weight/qty) and shown live. */
export function InkPurchaseDialog({ open, purchase, onClose }: Props) {
  const create = useCreateInkPurchase();
  const update = useUpdateInkPurchase();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InkPurchaseSchemaInput>({
    resolver: zodResolver(inkPurchaseSchema) as any,
    defaultValues: {
      reportDate: purchase?.reportDate ?? todayISO(),
      materialCode: purchase?.materialCode ?? "",
      vendor: purchase?.vendor ?? "",
      invoiceNumber: purchase?.invoiceNumber ?? "",
      quantity: purchase ? Number(purchase.quantity) : ("" as unknown as number),
      weightPerQty: purchase ? Number(purchase.weightPerQty) : ("" as unknown as number),
    },
  });

  const [quantity, weightPerQty] = useWatch({ control, name: ["quantity", "weightPerQty"] });
  const totalWeight = (Number(quantity) || 0) * (Number(weightPerQty) || 0);

  const submit = handleSubmit(async (data) => {
    const body = {
      reportDate: data.reportDate,
      materialCode: data.materialCode,
      vendor: data.vendor,
      invoiceNumber: data.invoiceNumber || undefined,
      quantity: Number(data.quantity),
      weightPerQty: Number(data.weightPerQty),
    };
    if (purchase) await update.mutateAsync({ id: purchase.id, body });
    else await create.mutateAsync(body);
    onClose();
  });

  const busy = create.isPending || update.isPending;

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title={purchase ? "Edit Ink Purchase" : "New Ink Purchase"}
      description="Total weight is calculated automatically from quantity × weight per quantity."
      className="sm:max-w-lg"
      footer={
        <>
          <AppButton variant="outline" onClick={onClose}>Cancel</AppButton>
          <AppButton loading={busy} onClick={submit}>{purchase ? "Save Changes" : "Record Purchase"}</AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
        <SubmitOnEnter disabled={busy} />
        <AppInput label="Report Date *" type="date" error={errors.reportDate?.message} {...register("reportDate")} />
        <AppInput label="Material Code *" placeholder="e.g. INK-CYAN" error={errors.materialCode?.message} {...register("materialCode")} />
        <AppInput label="Vendor *" error={errors.vendor?.message} {...register("vendor")} />
        <AppInput label="Invoice Number" error={errors.invoiceNumber?.message} {...register("invoiceNumber")} />
        <AppInput label="Quantity *" type="number" step="any" error={errors.quantity?.message} {...register("quantity", { valueAsNumber: true })} />
        <AppInput label="Weight Per Qty (kg) *" type="number" step="any" error={errors.weightPerQty?.message} {...register("weightPerQty", { valueAsNumber: true })} />

        <div className="sm:col-span-2 rounded-md bg-muted/30 px-3 py-2 text-sm">
          <span className="text-muted-foreground">Total Weight: </span>
          <span className="font-semibold tabular-nums">{formatNumber(totalWeight, 3)} kg</span>
        </div>
      </form>
    </AppDialog>
  );
}
