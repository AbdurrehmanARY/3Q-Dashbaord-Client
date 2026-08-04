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
import { workOrderFormSchema, type WorkOrderSchemaInput } from "../schemas/work-order-schemas";
import {
  WORK_ORDER_STATUS_META,
  PRODUCT_TYPE_META,
  type ProductType,
  type WorkOrder,
  type WorkOrderDetail,
} from "../types";
import { useCreateWorkOrder, useUpdateWorkOrder } from "../hooks/use-work-orders";
import { useCompanies, useCompanyBrands } from "@/features/companies";
import { todayISO } from "@/lib/format";
import { cn } from "@/lib/utils";

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
    imageUrl: wo?.imageUrl ?? "",
    productType: wo?.productType ?? "printed",
    designCode: wo?.designCode ?? "",
    pick: wo?.pick ?? "",
    repeat: wo?.repeat != null ? Number(wo.repeat) : "",
    density: wo?.density ?? "",
    extra: wo?.extra != null ? Number(wo.extra) : "",
    dcNumber: wo?.dcNumber ?? "",
    lcNumber: wo?.lcNumber ?? "",
    fbrInvoiceNumber: wo?.fbrInvoiceNumber ?? "",
    dispatchedDate: wo?.dispatchedDate ?? "",
    dispatchedQty: wo?.dispatchedQty ?? "",
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
  // Production has handed over. The commercial header locks, but the dispatch paperwork
  // (DC / LC / FBR invoice) stays editable — filling it in is what marks the order dispatched.
  const isComplete = workOrder?.status === "complete" || workOrder?.status === "dispatched";
  const isDispatched = workOrder?.status === "dispatched";
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
    resolver: zodResolver(workOrderFormSchema) as any,
    defaultValues: defaultsFor(workOrder),
  });

  const selectedCompanyId = useWatch({ control, name: "companyId" });
  // The whole dialog serves both workflows; this is the switch that decides which extra
  // fields appear. Product type is fixed once created — an order cannot change workflow.
  const productType = (useWatch({ control, name: "productType" }) ?? "printed") as ProductType;
  const isWoven = productType === "woven";
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
      imageUrl: data.imageUrl || undefined,
    };

    // Only a woven order carries a loom spec; the server rejects it on a printed one.
    const wovenDetail = isWoven
      ? {
          designCode: String(data.designCode ?? ""),
          pick: Number(data.pick),
          repeat: Number(data.repeat),
          density: Number(data.density),
          extra: data.extra === "" || data.extra == null ? 0 : Number(data.extra),
        }
      : undefined;

    try {
      if (isEdit && workOrder) {
        // A completed order accepts only its dispatch paperwork; sending the commercial
        // header alongside it is what the server rejects.
        const dispatch = {
          dcNumber: data.dcNumber || undefined,
          lcNumber: data.lcNumber || undefined,
          fbrInvoiceNumber: data.fbrInvoiceNumber || undefined,
          dispatchedDate: data.dispatchedDate || undefined,
        };
        const body = isComplete
          ? dispatch
          : { ...header, ...dispatch, ...(wovenDetail ? { wovenDetail } : {}) };
        await updateWorkOrder.mutateAsync({ id: workOrder.id, body });
      } else {
        await createWorkOrder.mutateAsync({ ...header, productType, wovenDetail });
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

        {/* Product type drives which workflow the order runs through, and therefore which
            extra fields this dialog shows. Fixed after creation — changing workflow
            mid-order would invalidate any production already planned against it. */}
        <div className="sm:col-span-2">
          <Label className="text-xs font-semibold">Product Type *</Label>
          <Controller
            control={control}
            name="productType"
            render={({ field: { value, onChange } }) => (
              <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                {(Object.keys(PRODUCT_TYPE_META) as ProductType[]).map((type) => {
                  const meta = PRODUCT_TYPE_META[type];
                  const selected = value === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      disabled={isEdit || isLocked}
                      aria-pressed={selected}
                      onClick={() => onChange(type)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-left transition-colors",
                        selected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                          : "border-input hover:bg-muted/50",
                        (isEdit || isLocked) && "cursor-not-allowed opacity-60"
                      )}
                    >
                      <span className="block text-sm font-medium">{meta.label}</span>
                      <span className="block text-[11px] text-muted-foreground">{meta.description}</span>
                    </button>
                  );
                })}
              </div>
            )}
          />
          {isEdit && (
            <p className="mt-1 text-[11px] text-muted-foreground">
              Product type is fixed once the order is created.
            </p>
          )}
        </div>

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

        {/* Loom specification — woven orders only. */}
        {isWoven && (
          <div className="grid gap-4 rounded-lg border border-dashed bg-muted/20 p-3 sm:col-span-2 sm:grid-cols-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-4">
              Woven Design Specification
            </p>
            <div className="sm:col-span-2">
              <AppInput
                label="Design Code *"
                placeholder="e.g. Guess 13R"
                disabled={isLocked}
                error={errors.designCode?.message}
                {...register("designCode")}
              />
            </div>
            <AppInput
              label="Pick *"
              type="number"
              placeholder="e.g. 853"
              disabled={isLocked}
              error={errors.pick?.message}
              {...register("pick")}
            />
            <AppInput
              label="Repeat *"
              type="number"
              step="any"
              placeholder="e.g. 60"
              disabled={isLocked}
              error={errors.repeat?.message}
              {...register("repeat")}
            />
            <AppInput
              label="Density *"
              type="number"
              placeholder="e.g. 560"
              disabled={isLocked}
              error={errors.density?.message}
              {...register("density")}
            />
            <AppInput
              label="Extra"
              type="number"
              step="any"
              placeholder="e.g. 150"
              disabled={isLocked}
              error={errors.extra?.message}
              {...register("extra")}
            />
          </div>
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
            <AppInput label="LC Number" error={errors.lcNumber?.message} {...register("lcNumber")} />
            <AppInput
              label="FBR Invoice Number"
              error={errors.fbrInvoiceNumber?.message}
              {...register("fbrInvoiceNumber")}
            />
            <AppInput
              label="Dispatched Date"
              type="date"
              error={errors.dispatchedDate?.message}
              {...register("dispatchedDate")}
            />
            <p className="text-[11px] text-muted-foreground sm:col-span-2">
              {isDispatched
                ? "This order is dispatched. These fields stay editable so the paperwork can be corrected."
                : "DC Number, LC Number and FBR Invoice Number are all required to dispatch — use the Dispatch action to complete it."}
            </p>
          </>
        )}

        <div className="sm:col-span-2">
          <AppInput
            label="Artwork / Image URL"
            placeholder="https://…"
            disabled={isLocked}
            error={errors.imageUrl?.message}
            {...register("imageUrl")}
          />
          <p className="mt-1 text-[11px] text-muted-foreground">
            Optional. Previewed on the work order detail page.
          </p>
        </div>

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
