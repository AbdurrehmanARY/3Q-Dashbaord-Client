import * as React from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { AppSelect } from "@/components/forms/AppSelect";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { purchaseSchema, type PurchaseSchemaInput } from "../schemas/purchase-schemas";
import { useCreatePurchase, useUpdatePurchase } from "../hooks/use-purchases";
import { formatNumber, totalRollEquivalent200m, calculateInvoiceWeight, todayISO } from "@/lib/format";
import type { Material } from "@/features/materials/types";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import type { PurchaseRecord } from "../types";

interface PurchaseFormProps {
  open: boolean;
  materials: Material[];
  purchase?: PurchaseRecord | null;
  onClose: () => void;
}

export function PurchaseForm({ open, materials, purchase, onClose }: PurchaseFormProps) {
  const createPurchase = useCreatePurchase();
  const updatePurchase = useUpdatePurchase();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PurchaseSchemaInput>({
    resolver: zodResolver(purchaseSchema) as any,
    defaultValues: {
      reportDate: purchase?.reportDate ?? todayISO(),
      materialCode: purchase?.materialCode ?? materials[0]?.code ?? "",
      invoiceNumber: purchase?.invoiceNumber ?? "",
      vendor: purchase?.vendor ?? "",
      cartonQty: purchase?.cartonQty ?? 0,
      rollsPerCarton: purchase?.rollsPerCarton ?? 0,
      rollLength: purchase ? Number(purchase.rollLength) : 100,
      netWeight: purchase ? Number(purchase.netWeight) : 0,
      // Weight per roll is now enterable — seeded from the record (edit) or the first
      // material's weight (create), but the user can override it.
      weightPerRoll: purchase?.localWeight != null ? Number(purchase.localWeight) : Number(materials[0]?.weightPerRoll ?? 0),
      gdNumber: purchase?.gdNumber ?? "",
      efs: purchase?.efs ?? "",
    },
  });

  const cartonQty = useWatch({ control, name: "cartonQty" }) || 0;
  const rollsPerCarton = useWatch({ control, name: "rollsPerCarton" }) || 0;
  const rollLength = useWatch({ control, name: "rollLength" }) || 100;
  const netWeight = useWatch({ control, name: "netWeight" }) || 0;
  const weightPerRoll = useWatch({ control, name: "weightPerRoll" }) || 0;

  const totalRoll = cartonQty * rollsPerCarton;
  const totalRollPer200m = totalRollEquivalent200m(totalRoll, rollLength);
  const invoiceWeight = calculateInvoiceWeight(netWeight, totalRoll, rollLength);
  const totalWeightAuto = totalRoll * weightPerRoll;

  const isLoading = createPurchase.isPending || updatePurchase.isPending;

  const onSubmit = async (data: PurchaseSchemaInput) => {
    if (purchase) {
      await updatePurchase.mutateAsync({ id: purchase.id, body: data });
    } else {
      await createPurchase.mutateAsync(data);
    }
    reset();
    onClose();
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) { reset(); onClose(); } }}
      title={purchase ? "Edit Purchase Record" : "New Purchase Record"}
      className="max-w-2xl"
      footer={
        <>
          <AppButton variant="outline" onClick={() => { reset(); onClose(); }}>Cancel</AppButton>
          <AppButton loading={isLoading} onClick={handleSubmit(onSubmit)}>
            {purchase ? "Update Purchase" : "Create Purchase"}
          </AppButton>
        </>
      }
    >
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={isLoading} />
        <AppInput label="Report Date *" type="date" error={errors.reportDate?.message} {...register("reportDate")} />
        <Controller
          control={control}
          name="materialCode"
          render={({ field: { value, onChange } }) => (
            <AppCombobox
              label="Material Code *"
              value={value || undefined}
              onChange={(v) => onChange(v ?? "")}
              options={materials.map((m) => ({
                value: m.code,
                label: m.code,
                hint: `${m.type}${m.description ? ` · ${m.description}` : ""}`,
              }))}
              error={errors.materialCode?.message}
              placeholder="Select material…"
              emptyText="No materials found."
            />
          )}
        />
        <AppInput label="Vendor *" placeholder="Supplier name" error={errors.vendor?.message} {...register("vendor")} />
        <AppInput label="Invoice Number *" placeholder="Invoice number" error={errors.invoiceNumber?.message} {...register("invoiceNumber")} />
        <AppInput label="GD Number" placeholder="Optional GD #" error={errors.gdNumber?.message} {...register("gdNumber")} />

        <AppInput label="Carton Quantity *" type="number" error={errors.cartonQty?.message} {...register("cartonQty", { valueAsNumber: true })} />
        <AppInput label="Rolls Per Carton *" type="number" error={errors.rollsPerCarton?.message} {...register("rollsPerCarton", { valueAsNumber: true })} />
        <AppSelect
          label="Roll Length *"
          options={[
            { value: "100", label: "100 mm" },
            { value: "200", label: "200 mm" },
            { value: "400", label: "400 mm" },
          ]}
          error={errors.rollLength?.message}
          {...register("rollLength", { valueAsNumber: true })}
        />
        <AppInput label="Net Weight (kg) *" type="number" step="any" error={errors.netWeight?.message} {...register("netWeight", { valueAsNumber: true })} />
        <AppInput label="Weight Per Roll (kg) *" type="number" step="any" error={errors.weightPerRoll?.message} {...register("weightPerRoll", { valueAsNumber: true })} />

        <AppInput label="Total Rolls" type="number" value={totalRoll} readOnly disabled />
        <AppInput label="Total Roll / 200m" type="text" value={formatNumber(totalRollPer200m, 2)} readOnly disabled />
        <AppInput label="Total Weight (kg, auto)" type="text" value={formatNumber(totalWeightAuto, 2)} readOnly disabled />
        <AppInput label="Invoice Weight (kg)" type="text" value={formatNumber(invoiceWeight, 2)} readOnly disabled />

        <div className="col-span-2">
          <AppInput label="EFS Reference" placeholder="Optional EFS reference" error={errors.efs?.message} {...register("efs")} />
        </div>
      </form>

      <div className="mt-4 flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-3 text-sm">
        <div className="space-y-0.5">
          <p className="text-muted-foreground text-xs font-semibold">Total Rolls</p>
          <p className="font-bold text-lg text-foreground">{formatNumber(totalRoll, 0)}</p>
        </div>
        <div className="text-right space-y-0.5">
          <p className="text-muted-foreground text-xs font-semibold">Total Roll / 200m</p>
          <p className="font-semibold text-primary">{formatNumber(totalRollPer200m, 2)} rolls</p>
        </div>
      </div>
    </AppDialog>
  );
}
