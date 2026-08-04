import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { AppButton } from "@/components/forms/AppButton";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { formatNumber } from "@/lib/format";
import { useCreateThreadStock, useUpdateThreadStock } from "../hooks/use-thread";
import { THREAD_DENIERS, type ThreadStock } from "../types";

/**
 * Dyed (secondary) stock is identified by its dye lot, so a colour code is required there;
 * undyed (primary) stock has none by definition. Both rules are enforced server-side too.
 */
const threadStockSchema = z
  .object({
    stockType: z.enum(["primary", "secondary"]),
    denier: z.enum(THREAD_DENIERS),
    colorName: z.string().min(1, "Colour name is required"),
    colorCode: z.string().optional().or(z.literal("")),
    balanceKg: z.coerce.number().min(0, "Cannot be negative"),
    note: z.string().optional().or(z.literal("")),
  })
  .refine((v) => v.stockType !== "secondary" || !!v.colorCode?.trim(), {
    message: "Dyed stock requires a colour code",
    path: ["colorCode"],
  });

type ThreadStockSchemaInput = z.input<typeof threadStockSchema>;

const TYPE_OPTIONS = [
  { label: "Primary — undyed", value: "primary" },
  { label: "Secondary — dyed", value: "secondary" },
];
const DENIER_OPTIONS = THREAD_DENIERS.map((d) => ({ label: `${d} Denier`, value: d }));

interface ThreadStockDialogProps {
  open: boolean;
  /** null = create a ledger; a row = edit it (type and denier are then fixed). */
  stock: ThreadStock | null;
  onClose: () => void;
}

export function ThreadStockDialog({ open, stock, onClose }: ThreadStockDialogProps) {
  const isEdit = !!stock;
  const createStock = useCreateThreadStock();
  const updateStock = useUpdateThreadStock();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ThreadStockSchemaInput>({
    resolver: zodResolver(threadStockSchema) as any,
    defaultValues: {
      stockType: stock?.stockType ?? "primary",
      denier: stock?.denier ?? "75",
      colorName: stock?.colorName ?? "",
      colorCode: stock?.colorCode ?? "",
      balanceKg: stock?.balanceKg ?? 0,
      note: "",
    },
  });

  const [stockType, balanceKg] = useWatch({ control, name: ["stockType", "balanceKg"] });
  const isSecondary = stockType === "secondary";
  const delta = isEdit ? (Number(balanceKg) || 0) - (stock?.balanceKg ?? 0) : 0;

  const isLoading = createStock.isPending || updateStock.isPending;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: ThreadStockSchemaInput) => {
    try {
      if (isEdit && stock) {
        await updateStock.mutateAsync({
          id: stock.id,
          body: {
            colorName: String(data.colorName),
            colorCode: isSecondary ? String(data.colorCode ?? "") : null,
            balanceKg: Number(data.balanceKg),
            note: data.note || undefined,
          },
        });
      } else {
        await createStock.mutateAsync({
          stockType: data.stockType,
          denier: data.denier,
          colorName: String(data.colorName),
          colorCode: isSecondary ? String(data.colorCode ?? "") : null,
          openingKg: Number(data.balanceKg),
        });
      }
      handleClose();
    } catch {
      // Hook onError already toasts; leave the dialog open so the entry isn't lost.
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose();
      }}
      title={isEdit ? `Edit Thread Stock — ${stock?.colorName}` : "New Thread Ledger"}
      description={
        isEdit
          ? "Changing the balance records an adjustment in the movement history."
          : "Creates a thread ledger. Receiving and dyeing normally create these automatically."
      }
      className="sm:max-w-lg"
      footer={
        <>
          <AppButton variant="outline" onClick={handleClose}>
            Cancel
          </AppButton>
          <AppButton loading={isLoading} onClick={handleSubmit(onSubmit)}>
            {isEdit ? "Save Changes" : "Create Ledger"}
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={isLoading} />

        <AppSelect
          label="Stock Type *"
          options={TYPE_OPTIONS}
          disabled={isEdit}
          error={errors.stockType?.message}
          {...register("stockType")}
        />
        <AppSelect
          label="Denier *"
          options={DENIER_OPTIONS}
          disabled={isEdit}
          error={errors.denier?.message}
          {...register("denier")}
        />

        <AppInput
          label="Colour Name *"
          placeholder={isSecondary ? "e.g. Brown" : "White or Black"}
          error={errors.colorName?.message}
          {...register("colorName")}
        />
        <AppInput
          label={isSecondary ? "Colour Code *" : "Colour Code"}
          placeholder={isSecondary ? "e.g. 22783" : "Not used for undyed"}
          disabled={!isSecondary}
          error={errors.colorCode?.message}
          {...register("colorCode")}
        />

        <AppInput
          label={isEdit ? "Balance (kg) *" : "Opening Balance (kg)"}
          type="number"
          step="any"
          error={errors.balanceKg?.message}
          {...register("balanceKg")}
        />
        {isEdit && (
          <AppInput label="Adjustment Note" placeholder="Why is this changing?" {...register("note")} />
        )}

        {isEdit && Math.abs(delta) > 0.0005 && (
          <p className="text-xs sm:col-span-2">
            <span className="text-muted-foreground">This records an adjustment of </span>
            <strong className={delta > 0 ? "text-success" : "text-destructive"}>
              {delta > 0 ? "+" : ""}
              {formatNumber(delta, 3)} kg
            </strong>
          </p>
        )}
      </form>
    </AppDialog>
  );
}
