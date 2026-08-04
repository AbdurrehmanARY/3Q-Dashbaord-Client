import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { MaterialSelect } from "@/features/materials";
import { formatNumber } from "@/lib/format";
import { useCreateRollStock, useUpdateRollStock } from "../hooks/use-inventory";
import type { StockLevel } from "../types";

/**
 * Balance is deliberately absent: the server always derives it as
 * `opening + received - issued`, so offering it as a field would let the inputs and the
 * balance disagree. The form previews the derived figure instead.
 */
const rollStockSchema = z.object({
  materialCode: z.string().min(1, "Material is required"),
  openingStock: z.coerce.number().min(0, "Cannot be negative"),
  receivedRolls: z.coerce.number().min(0, "Cannot be negative"),
  issuedRolls: z.coerce.number().min(0, "Cannot be negative"),
  rollPerKg: z.coerce.number().min(0, "Cannot be negative"),
  note: z.string().optional().or(z.literal("")),
});

type RollStockSchemaInput = z.input<typeof rollStockSchema>;

interface RollStockDialogProps {
  open: boolean;
  /** null = create a ledger; a row = edit it (material is then fixed). */
  stock: StockLevel | null;
  onClose: () => void;
}

export function RollStockDialog({ open, stock, onClose }: RollStockDialogProps) {
  const isEdit = !!stock;
  const createStock = useCreateRollStock();
  const updateStock = useUpdateRollStock();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RollStockSchemaInput>({
    resolver: zodResolver(rollStockSchema) as any,
    defaultValues: {
      materialCode: stock?.materialCode ?? "",
      openingStock: Number(stock?.openingStock ?? 0),
      receivedRolls: Number(stock?.receivedRolls ?? 0),
      issuedRolls: Number(stock?.issuedRolls ?? 0),
      rollPerKg: Number(stock?.rollPerKg ?? 0),
      note: "",
    },
  });

  const [materialCode, opening, received, issued, rollPerKg] = useWatch({
    control,
    name: ["materialCode", "openingStock", "receivedRolls", "issuedRolls", "rollPerKg"],
  });

  // Mirrors the server formula so the operator sees the resulting balance before saving.
  const balance = (Number(opening) || 0) + (Number(received) || 0) - (Number(issued) || 0);
  const perSku = balance * (Number(rollPerKg) || 0);
  const invalidBalance = balance < 0;

  const isLoading = createStock.isPending || updateStock.isPending;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: RollStockSchemaInput) => {
    try {
      const body = {
        openingStock: Number(data.openingStock),
        receivedRolls: Number(data.receivedRolls),
        issuedRolls: Number(data.issuedRolls),
        rollPerKg: Number(data.rollPerKg),
      };
      if (isEdit && stock) {
        await updateStock.mutateAsync({
          materialCode: stock.materialCode,
          body: { ...body, note: data.note || undefined },
        });
      } else {
        await createStock.mutateAsync({ materialCode: String(data.materialCode), ...body });
      }
      handleClose();
    } catch {
      // Hook onError already toasts; keep the dialog open so the entry isn't lost.
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose();
      }}
      title={isEdit ? `Edit Stock — ${stock?.materialCode}` : "New Roll Stock Ledger"}
      description={
        isEdit
          ? "Adjusting these figures records a movement in the stock history."
          : "Creates a stock ledger for a material. The opening balance is recorded as its first movement."
      }
      className="sm:max-w-lg"
      footer={
        <>
          <AppButton variant="outline" onClick={handleClose}>
            Cancel
          </AppButton>
          <AppButton loading={isLoading} disabled={invalidBalance} onClick={handleSubmit(onSubmit)}>
            {isEdit ? "Save Changes" : "Create Ledger"}
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={isLoading} />

        <div className="sm:col-span-2">
          {isEdit ? (
            <AppInput label="Material" value={stock?.materialCode ?? ""} disabled readOnly />
          ) : (
            <MaterialSelect
              label="Material *"
              value={materialCode || undefined}
              onChange={(v) => setValue("materialCode", v ?? "", { shouldValidate: true })}
              error={errors.materialCode?.message}
            />
          )}
        </div>

        <AppInput
          label="Opening Stock"
          type="number"
          step="any"
          error={errors.openingStock?.message}
          {...register("openingStock")}
        />
        <AppInput
          label="Received Rolls"
          type="number"
          step="any"
          error={errors.receivedRolls?.message}
          {...register("receivedRolls")}
        />
        <AppInput
          label="Issued Rolls"
          type="number"
          step="any"
          error={errors.issuedRolls?.message}
          {...register("issuedRolls")}
        />
        <AppInput
          label="Rolls per KG"
          type="number"
          step="any"
          error={errors.rollPerKg?.message}
          {...register("rollPerKg")}
        />

        {isEdit && (
          <div className="sm:col-span-2">
            <AppInput label="Adjustment Note" placeholder="Why is this changing?" {...register("note")} />
          </div>
        )}

        {/* Derived figures, shown so the result is visible before saving. */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 rounded-md bg-muted/40 px-3 py-2 text-xs sm:col-span-2">
          <span className="text-muted-foreground">
            Balance:{" "}
            <strong className={invalidBalance ? "text-destructive" : "text-primary"}>
              {formatNumber(balance, 2)} rolls
            </strong>
          </span>
          <span className="text-muted-foreground">
            Per SKU: <strong className="text-foreground">{formatNumber(perSku, 2)}</strong>
          </span>
        </div>

        {invalidBalance && (
          <p className="text-xs font-medium text-destructive sm:col-span-2">
            Issued rolls cannot exceed opening plus received — the balance would go negative.
          </p>
        )}
      </form>
    </AppDialog>
  );
}
