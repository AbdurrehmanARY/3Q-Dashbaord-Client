import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { formatNumber } from "@/lib/format";
import { useOperators } from "@/features/machines-operators";
import { inkConsumptionSchema, type InkConsumptionSchemaInput } from "../schemas/ink-schemas";
import { useCreateInkConsumption, useInkStock } from "../hooks/use-ink";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Log ink consumption. The weight cannot exceed the material's live balance (checked here and server-side). */
export function InkConsumptionDialog({ open, onClose }: Props) {
  const create = useCreateInkConsumption();
  const { data: stock } = useInkStock();
  const { data: operators } = useOperators();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InkConsumptionSchemaInput>({
    resolver: zodResolver(inkConsumptionSchema) as any,
    defaultValues: {
      materialCode: "",
      qtyAssigned: "" as unknown as number,
      operatorId: null,
      weight: "" as unknown as number,
      note: "",
    },
  });

  const [materialCode, weight] = useWatch({ control, name: ["materialCode", "weight"] });
  const balance = (stock ?? []).find((s) => s.materialCode === materialCode)?.balanceWeight;
  const insufficient = balance !== undefined && (Number(weight) || 0) > balance;

  const materialOptions = (stock ?? []).map((s) => ({
    value: s.materialCode,
    label: s.materialCode,
    hint: `${formatNumber(s.balanceWeight, 3)} kg available`,
  }));

  const submit = handleSubmit(async (data) => {
    const op = (operators ?? []).find((o) => Number(o.id) === data.operatorId);
    await create.mutateAsync({
      materialCode: data.materialCode,
      qtyAssigned: Number(data.qtyAssigned),
      operatorId: data.operatorId ?? undefined,
      operatorName: op?.name,
      weight: Number(data.weight),
      note: data.note || undefined,
    });
    onClose();
  });

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title="Log Ink Consumption"
      description="Records ink used on the floor and deducts the weight from stock."
      className="sm:max-w-lg"
      footer={
        <>
          <AppButton variant="outline" onClick={onClose}>Cancel</AppButton>
          <AppButton loading={create.isPending} disabled={insufficient} onClick={submit}>
            Record Consumption
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
        <SubmitOnEnter disabled={create.isPending} />

        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="materialCode"
            render={({ field: { value, onChange } }) => (
              <AppCombobox
                label="Material Code *"
                value={value || undefined}
                onChange={(v) => onChange(v ?? "")}
                options={materialOptions}
                placeholder="Select ink…"
                emptyText="No ink in stock."
                error={errors.materialCode?.message}
              />
            )}
          />
          {balance !== undefined && (
            <p className="mt-1 text-[11px] text-muted-foreground">
              Available: <span className="font-semibold tabular-nums">{formatNumber(balance, 3)} kg</span>
            </p>
          )}
        </div>

        <AppInput label="Qty Assigned *" type="number" step="any" error={errors.qtyAssigned?.message} {...register("qtyAssigned", { valueAsNumber: true })} />
        <AppInput label="Weight (kg) *" type="number" step="any" error={errors.weight?.message} {...register("weight", { valueAsNumber: true })} />

        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="operatorId"
            render={({ field: { value, onChange } }) => (
              <AppCombobox
                label="Operator"
                value={value != null ? String(value) : undefined}
                onChange={(v) => onChange(v ? Number(v) : null)}
                options={(operators ?? []).map((o) => ({ value: String(o.id), label: o.name, hint: o.designation }))}
                placeholder="Select operator…"
                emptyText="No operators."
                error={errors.operatorId?.message}
              />
            )}
          />
        </div>

        <div className="sm:col-span-2 grid gap-1.5">
          <Label htmlFor="ink-note" className="text-xs font-semibold">Note</Label>
          <Textarea id="ink-note" rows={2} placeholder="Optional…" {...register("note")} />
        </div>

        {insufficient && (
          <p className="sm:col-span-2 flex items-center gap-1.5 text-xs font-medium text-destructive">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            Only {formatNumber(balance ?? 0, 3)} kg of {materialCode} in stock — cannot consume {formatNumber(Number(weight) || 0, 3)} kg.
          </p>
        )}
      </form>
    </AppDialog>
  );
}
