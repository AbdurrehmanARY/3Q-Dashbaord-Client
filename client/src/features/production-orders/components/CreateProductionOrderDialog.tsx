import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/format";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import {
  createProductionOrderSchema,
  type CreateProductionOrderSchemaInput,
} from "../schemas/production-order-schemas";
import { useCreateProductionOrder, useEligibleSalesOrders } from "../hooks/use-production-orders";

interface CreateProductionOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (productionOrderId: number) => void;
}

/**
 * Phase 1 — Office Staff. The production order is raised from a submitted sales order
 * and carries nothing but that link; all planning happens later.
 */
export function CreateProductionOrderDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateProductionOrderDialogProps) {
  const { data: salesOrders, isLoading } = useEligibleSalesOrders(open);
  const createOrder = useCreateProductionOrder();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProductionOrderSchemaInput>({
    resolver: zodResolver(createProductionOrderSchema) as any,
    defaultValues: { workOrderId: undefined, notes: "" },
  });

  useEffect(() => {
    if (open) reset({ workOrderId: undefined, notes: "" });
  }, [open, reset]);

  const selectedId = watch("workOrderId");
  const selected = salesOrders?.find((so) => so.id === Number(selectedId));

  const onSubmit = async (data: CreateProductionOrderSchemaInput) => {
    const created = await createOrder.mutateAsync({
      workOrderId: Number(data.workOrderId),
      notes: data.notes || undefined,
    });
    onOpenChange(false);
    onCreated?.(created.data.id);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Production Order"
      description="Raise a production order against a work order. Planning is done afterwards by the production manager."
      className="sm:max-w-[520px]"
      footer={
        <>
          <AppButton variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </AppButton>
          <AppButton loading={createOrder.isPending} onClick={handleSubmit(onSubmit)}>
            Create Production Order
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={createOrder.isPending} />
        <Controller
          control={control}
          name="workOrderId"
          render={({ field: { value, onChange } }) => (
            <AppCombobox
              label="Work Order *"
              value={value ? String(value) : undefined}
              onChange={(v) => onChange(v ? Number(v) : undefined)}
              options={(salesOrders ?? []).map((so) => ({
                value: String(so.id),
                label: `${so.soNumber}${so.poNumber ? ` / PO ${so.poNumber}` : ""}`,
                hint: `${so.companyName ?? "No company"} · ${so.brandName ?? "No brand"}`,
              }))}
              loading={isLoading}
              error={errors.workOrderId?.message}
              placeholder="Select a work order…"
              emptyText="No eligible work orders."
            />
          )}
        />

        {!isLoading && (salesOrders ?? []).length === 0 && (
          <p className="rounded-lg border border-warning/20 bg-warning/5 px-3 py-2 text-xs text-warning">
            No work orders are available. A work order must be in production and must not already
            have a production order raised against it.
          </p>
        )}

        {selected && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border bg-muted/20 p-3 text-sm">
            <dt className="text-xs text-muted-foreground">Company</dt>
            <dd className="text-right font-medium">{selected.companyName ?? "—"}</dd>
            <dt className="text-xs text-muted-foreground">Brand</dt>
            <dd className="text-right font-medium">{selected.brandName ?? "—"}</dd>
            <dt className="text-xs text-muted-foreground">Customer</dt>
            <dd className="text-right font-medium">{selected.companyName ?? "—"}</dd>
            <dt className="text-xs text-muted-foreground">Total Order Quantity</dt>
            <dd className="text-right font-semibold tabular-nums">
              {formatNumber(selected.totalQty, 0)}
            </dd>
          </dl>
        )}

        <div className="grid gap-1.5">
          <Label htmlFor="po-notes" className="text-xs font-semibold">
            Notes
          </Label>
          <Textarea id="po-notes" rows={3} placeholder="Optional notes…" {...register("notes")} />
        </div>
      </form>
    </AppDialog>
  );
}
