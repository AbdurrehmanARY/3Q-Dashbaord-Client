import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Palette } from "lucide-react";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { AppButton } from "@/components/forms/AppButton";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { formatNumber } from "@/lib/format";
import { dyeBatchSchema, type DyeBatchSchemaInput } from "../schemas/thread-schemas";
import { useCreateDyeBatch, useThreadStocks } from "../hooks/use-thread";
import { THREAD_DENIERS, THREAD_BASE_COLORS } from "../types";

const DENIER_OPTIONS = THREAD_DENIERS.map((d) => ({ label: `${d} Denier`, value: d }));
const BASE_COLOR_OPTIONS = THREAD_BASE_COLORS.map((c) => ({ label: c, value: c }));

/**
 * Records a dyeing run: undyed primary stock in, dyed secondary stock out.
 *
 *   100 kg White 75D  →  20 kg Brown (22783) 75D
 *
 * Output is expected to be lower than input — dyeing has real process loss — so the form
 * shows the loss rather than forcing the two to match. Mount conditionally.
 */
export function DyeThreadDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createBatch = useCreateDyeBatch();
  const { data: stocks } = useThreadStocks({ stockType: "primary" });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<DyeBatchSchemaInput>({
    resolver: zodResolver(dyeBatchSchema) as any,
    defaultValues: {
      denier: "75",
      fromColorName: "White",
      toColorName: "",
      toColorCode: "",
      inputWeightKg: "" as unknown as number,
      outputWeightKg: "" as unknown as number,
      notes: "",
    },
  });

  const [denier, fromColorName, inputWeightKg, outputWeightKg] = useWatch({
    control,
    name: ["denier", "fromColorName", "inputWeightKg", "outputWeightKg"],
  });

  // What's actually on hand for the selected undyed thread — shown so the operator sees the
  // ceiling before the server rejects the batch.
  const available =
    (stocks ?? []).find((s) => s.denier === denier && s.colorName === fromColorName)?.balanceKg ?? 0;
  const input = Number(inputWeightKg) || 0;
  const output = Number(outputWeightKg) || 0;
  const loss = input > 0 && output > 0 ? input - output : 0;
  const insufficient = input > available;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: DyeBatchSchemaInput) => {
    try {
      await createBatch.mutateAsync({
        denier: data.denier,
        fromColorName: data.fromColorName,
        toColorName: String(data.toColorName),
        toColorCode: String(data.toColorCode),
        inputWeightKg: Number(data.inputWeightKg),
        outputWeightKg: Number(data.outputWeightKg),
        notes: data.notes || undefined,
      });
      handleClose();
    } catch {
      // Hook onError already toasts; keep the dialog open for correction.
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose();
      }}
      title="Dye Thread"
      description="Converts undyed (primary) stock into a dyed colour (secondary stock)."
      className="sm:max-w-2xl"
      footer={
        <>
          <AppButton variant="outline" onClick={handleClose}>
            Cancel
          </AppButton>
          <AppButton
            loading={createBatch.isPending}
            disabled={insufficient}
            leftIcon={<Palette className="h-4 w-4" />}
            onClick={handleSubmit(onSubmit)}
          >
            Record Dye Batch
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={createBatch.isPending} />

        <AppSelect label="Denier *" options={DENIER_OPTIONS} error={errors.denier?.message} {...register("denier")} />
        <AppSelect
          label="From (undyed) *"
          options={BASE_COLOR_OPTIONS}
          error={errors.fromColorName?.message}
          {...register("fromColorName")}
        />

        <div className="rounded-md bg-muted/40 px-3 py-2 text-xs sm:col-span-2">
          Available: <strong className="tabular-nums">{formatNumber(available, 3)} kg</strong> of{" "}
          {fromColorName} {denier}D
        </div>

        <AppInput
          label="Dyed Colour Name *"
          placeholder="e.g. Brown"
          error={errors.toColorName?.message}
          {...register("toColorName")}
        />
        <AppInput
          label="Colour Code *"
          placeholder="e.g. 22783"
          error={errors.toColorCode?.message}
          {...register("toColorCode")}
        />

        <AppInput
          label="Input Weight (kg) *"
          type="number"
          step="any"
          error={errors.inputWeightKg?.message}
          {...register("inputWeightKg")}
        />
        <AppInput
          label="Output Weight (kg) *"
          type="number"
          step="any"
          error={errors.outputWeightKg?.message}
          {...register("outputWeightKg")}
        />

        {loss > 0 && (
          <p className="text-xs text-muted-foreground sm:col-span-2">
            Process loss: <strong className="tabular-nums">{formatNumber(loss, 3)} kg</strong> (
            {formatNumber((loss / input) * 100, 1)}%)
          </p>
        )}
        {insufficient && (
          <p className="text-xs font-medium text-destructive sm:col-span-2">
            Only {formatNumber(available, 3)} kg of {fromColorName} {denier}D is in stock.
          </p>
        )}
      </form>
    </AppDialog>
  );
}
