import { useEffect } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { workOrderSchema, type WorkOrderSchemaInput } from "../schemas/work-order-schemas";
import { WORK_ORDER_STATUS_META, type WorkOrder, type WorkOrderDetail } from "../types";
import { useCreateWorkOrder, useUpdateWorkOrder } from "../hooks/use-work-orders";
import { useCompanies, useCompanyBrands } from "@/features/companies";
import { todayISO } from "@/lib/format";

interface WorkOrderDialogProps {
  open: boolean;
  /**
   * null creates a new work order; passing one edits it (dispatch fields unlock once
   * complete). The row-actions menu only has the list row (`WorkOrder`, no linked
   * production order) on hand, while the detail page has the full `WorkOrderDetail` —
   * both are accepted since editing is only ever offered while `initiate_production`,
   * i.e. before a production order can exist either way.
   */
  workOrder: WorkOrder | WorkOrderDetail | null;
  onClose: () => void;
}

function defaultsFor(wo: WorkOrder | WorkOrderDetail | null): WorkOrderSchemaInput {
  return {
    soNumber: wo?.soNumber ?? "",
    poNumber: wo?.poNumber ?? "",
    orderDate: wo?.orderDate ?? todayISO(),
    dueDate: wo?.dueDate ?? "",
    totalQty: wo?.totalQty ?? 0,
    companyId: wo?.companyId ?? null,
    brandId: wo?.brandId ?? null,
    comment: wo?.comment ?? "",
    dcNumber: wo?.dcNumber ?? "",
    dispatchedDate: wo?.dispatchedDate ?? "",
  };
}

/**
 * Create and edit share one dialog, exactly like the rest of the app's create flows —
 * this replaced the standalone `/work-orders/new` and `/work-orders/:id/edit` pages.
 * A completed order locks its commercial header but keeps accepting dispatch paperwork
 * (DC Number, Dispatched Date), which is recorded after production finishes it.
 */
export function WorkOrderDialog({ open, workOrder, onClose }: WorkOrderDialogProps) {
  const isEdit = !!workOrder;
  const isComplete = workOrder?.status === "complete";
  const isLocked = isComplete;
  const productionOrder = workOrder && "productionOrder" in workOrder ? workOrder.productionOrder : null;
  const hasProductionOrder = !!productionOrder;

  const createWorkOrder = useCreateWorkOrder();
  const updateWorkOrder = useUpdateWorkOrder();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<WorkOrderSchemaInput>({
    resolver: zodResolver(workOrderSchema) as any,
    defaultValues: defaultsFor(workOrder),
  });

  const selectedCompanyId = useWatch({ control, name: "companyId" });
  const { data: companies } = useCompanies();
  const { data: brands, isLoading: brandsLoading } = useCompanyBrands(
    selectedCompanyId ? String(selectedCompanyId) : null
  );

  // Switching company mid-edit invalidates whatever brand was selected under the old one.
  useEffect(() => {
    if (selectedCompanyId && workOrder?.companyId !== selectedCompanyId) {
      setValue("brandId", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanyId]);

  const isSaving = createWorkOrder.isPending || updateWorkOrder.isPending;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: WorkOrderSchemaInput) => {
    // `data` is typed against the pre-validation shape (see the `z.input` note on the
    // schema), so `totalQty`/`brandId` still read as `unknown`/`number | null` here even
    // though the resolver already guaranteed them by the time this callback runs.
    const header = {
      soNumber: data.soNumber,
      orderDate: data.orderDate,
      totalQty: Number(data.totalQty),
      brandId: data.brandId as number,
      poNumber: data.poNumber || undefined,
      dueDate: data.dueDate || undefined,
      comment: data.comment || undefined,
    };

    try {
      if (isEdit && workOrder) {
        // A completed order accepts only its dispatch paperwork; sending the commercial
        // header alongside it is what the server rejects.
        const body = isComplete
          ? { dcNumber: data.dcNumber || undefined, dispatchedDate: data.dispatchedDate || undefined }
          : { ...header, dcNumber: data.dcNumber || undefined, dispatchedDate: data.dispatchedDate || undefined };
        await updateWorkOrder.mutateAsync({ id: workOrder.id, body });
      } else {
        await createWorkOrder.mutateAsync(header);
      }
      handleClose();
    } catch {
      // The hook's onError already toasts; keep the dialog open so the user can retry
      // without re-entering everything. (Avoids an unhandled rejection out of RHF.)
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) handleClose(); }}
      title={isEdit ? (isComplete ? "Dispatch Details" : "Edit Work Order") : "New Work Order"}
      description={
        isComplete
          ? "Production has completed this order. Only the dispatch details can still be edited."
          : "Status is set automatically by the production order — it is not editable here."
      }
      className="sm:max-w-2xl"
      footer={
        <>
          <AppButton variant="outline" onClick={handleClose}>
            Cancel
          </AppButton>
          <AppButton loading={isSaving} onClick={handleSubmit(onSubmit)}>
            {isEdit ? "Save Changes" : "Create Work Order"}
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={isSaving} />
        <AppInput
          label="SO Number *"
          disabled={isLocked}
          error={errors.soNumber?.message}
          {...register("soNumber")}
        />
        <AppInput
          label="PO Number"
          disabled={isLocked}
          error={errors.poNumber?.message}
          {...register("poNumber")}
        />

        <Controller
          control={control}
          name="companyId"
          render={({ field: { value, onChange } }) => (
            <AppCombobox
              label="Company *"
              value={value ? String(value) : undefined}
              onChange={(v) => onChange(v ? Number(v) : null)}
              options={(companies ?? []).map((c) => ({ value: String(c.id), label: c.name }))}
              disabled={isLocked}
              error={errors.companyId?.message}
              placeholder="Select company…"
              emptyText="No companies."
            />
          )}
        />

        <Controller
          control={control}
          name="brandId"
          render={({ field: { value, onChange } }) => (
            <AppCombobox
              label="Brand *"
              value={value ? String(value) : undefined}
              onChange={(v) => onChange(v ? Number(v) : null)}
              options={(brands ?? []).map((b) => ({ value: String(b.id), label: b.name }))}
              disabled={isLocked || !selectedCompanyId}
              loading={brandsLoading}
              error={errors.brandId?.message}
              placeholder="Select brand…"
              emptyText="No brands."
            />
          )}
        />

        <AppInput
          label="Order Date *"
          type="date"
          disabled={isLocked}
          error={errors.orderDate?.message}
          {...register("orderDate")}
        />

        <AppInput
          label="Due Date"
          type="date"
          disabled={isLocked}
          error={errors.dueDate?.message}
          {...register("dueDate")}
        />

        <AppInput
          label="Total Quantity *"
          type="number"
          disabled={isLocked || hasProductionOrder}
          error={errors.totalQty?.message}
          {...register("totalQty", { valueAsNumber: true })}
        />
        {hasProductionOrder && !isLocked && (
          <p className="text-[11px] text-muted-foreground sm:col-span-2 -mt-2">
            Quantity is locked — production order {productionOrder?.productionNumber} was
            raised against this order.
          </p>
        )}

        {isEdit && workOrder && (
          <div className="grid gap-1.5 sm:col-span-2">
            <Label className="text-xs font-semibold">Status</Label>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2">
              <StatusBadge variant={WORK_ORDER_STATUS_META[workOrder.status].variant}>
                {WORK_ORDER_STATUS_META[workOrder.status].label}
              </StatusBadge>
              <span className="text-xs text-muted-foreground">
                Derived from the production order — not editable.
              </span>
            </div>
          </div>
        )}

        {/* Dispatch paperwork, recorded once production has completed the order. */}
        {isComplete && (
          <>
            <AppInput label="DC Number" error={errors.dcNumber?.message} {...register("dcNumber")} />
            <AppInput
              label="Dispatched Date"
              type="date"
              error={errors.dispatchedDate?.message}
              {...register("dispatchedDate")}
            />
          </>
        )}

        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="wo-comment" className="text-xs font-semibold">
            Comment
          </Label>
          <Textarea
            id="wo-comment"
            disabled={isLocked}
            placeholder="Optional comments about this order..."
            rows={3}
            {...register("comment")}
          />
        </div>
      </form>
    </AppDialog>
  );
}
