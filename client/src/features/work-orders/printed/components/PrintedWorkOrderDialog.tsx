import { useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { workOrderFormSchema, type WorkOrderSchemaInput } from "@/features/work-orders/schemas/work-order-schemas";
import {
  WORK_ORDER_STATUS_META,
  type ProductType,
  type WorkOrder,
  type WorkOrderDetail,
} from "@/features/work-orders/types";
import { useCreatePrintedWorkOrder, useUpdatePrintedWorkOrder } from "../hooks/use-printed-work-orders";
import { todayISO } from "@/lib/format";
import { WorkOrderBasicInfo } from "@/features/work-orders/components/WorkOrderBasicInfo";
import { CompanyInfo } from "@/features/work-orders/components/CompanyInfo";
import { OrderInfo } from "@/features/work-orders/components/OrderInfo";
import { DispatchInfo } from "@/features/work-orders/components/DispatchInfo";
import { ArtworkAndComment } from "@/features/work-orders/components/ArtworkAndComment";

interface PrintedWorkOrderDialogProps {
  open: boolean;
  /** null creates a new work order; passing one edits it. If `childOrderType` is specified, this `workOrder` acts as the parent template for a new child order. */
  workOrder?: WorkOrder | WorkOrderDetail | null;
  /** When set, creates a new child order (shortfall, recut, or additional) cloned from `workOrder`. */
  childOrderType?: "shortfall" | "recut order" | "additional order";
  onClose: () => void;
}

/** The product type is always "printed" — fixed by the workflow. */
const FIXED_PRODUCT_TYPE: ProductType = "printed";

function defaultsFor(
  wo: WorkOrder | WorkOrderDetail | null | undefined,
  childOrderType?: "shortfall" | "recut order" | "additional order"
): WorkOrderSchemaInput {
  if (childOrderType && wo) {
    const suffixMap = {
      shortfall: "SF",
      "recut order": "RC",
      "additional order": "ADD",
    };
    const suffix = suffixMap[childOrderType];
    const baseDesignCode = wo.designCode ?? "";

    return {
      soNumber: `${wo.soNumber}-${suffix}`,
      poNumber: wo.poNumber ?? "",
      orderDate: todayISO(),
      dueDate: wo.dueDate ?? "",
      totalQty: wo.totalQty ?? 0,
      companyId: wo.companyId ?? null,
      brandId: wo.brandId ?? null,
      comment: wo.comment
        ? `[Ref: ${wo.soNumber}] ${wo.comment}`
        : `Reference parent order: ${wo.soNumber}`,
      priority: wo.priority ?? "normal",
      orderType: childOrderType,
      imageUrl: wo.imageUrl ?? "",
      dcImageUrl: "",
      productType: FIXED_PRODUCT_TYPE,
      designCode: baseDesignCode ? `${baseDesignCode}-${suffix}` : "",
      pick: wo.pick ?? "",
      repeat: wo.repeat != null ? Number(wo.repeat) : "",
      density: wo.density ?? "",
      speed: wo.speed != null ? Number(wo.speed) : "",
      extra: wo.extra != null ? Number(wo.extra) : "",
      dcNumber: "",
      lcNumber: "",
      fbrInvoiceNumber: "",
      dispatchedDate: "",
      dispatchedQty: "",
    };
  }

  return {
    soNumber: wo?.soNumber ?? "",
    poNumber: wo?.poNumber ?? "",
    orderDate: wo?.orderDate ?? todayISO(),
    dueDate: wo?.dueDate ?? "",
    totalQty: wo?.totalQty ?? 0,
    companyId: wo?.companyId ?? null,
    brandId: wo?.brandId ?? null,
    comment: wo?.comment ?? "",
    priority: wo?.priority ?? "normal",
    orderType: wo?.orderType ?? "normal order",
    imageUrl: wo?.imageUrl ?? "",
    dcImageUrl: wo?.dcImageUrl ?? "",
    productType: FIXED_PRODUCT_TYPE,
    designCode: wo?.designCode ?? "",
    pick: wo?.pick ?? "",
    repeat: wo?.repeat != null ? Number(wo.repeat) : "",
    density: wo?.density ?? "",
    speed: wo?.speed != null ? Number(wo.speed) : "",
    extra: wo?.extra != null ? Number(wo.extra) : "",
    dcNumber: wo?.dcNumber ?? "",
    lcNumber: wo?.lcNumber ?? "",
    fbrInvoiceNumber: wo?.fbrInvoiceNumber ?? "",
    dispatchedDate: wo?.dispatchedDate ?? "",
    dispatchedQty: wo?.dispatchedQty ?? "",
  };
}

/**
 * Create / edit a printed work order. Product type is fixed to "printed" — no selector,
 * no woven specification section.
 *
 * Sub-components (WorkOrderBasicInfo, CompanyInfo, OrderInfo, ArtworkAndComment) are the
 * shared feature components so the layout stays identical to the combined dialog; only the
 * product-type selector and the woven-spec section are omitted.
 */
export function PrintedWorkOrderDialog({
  open,
  workOrder,
  childOrderType,
  onClose,
}: PrintedWorkOrderDialogProps) {
  const createWorkOrder = useCreatePrintedWorkOrder();
  const updateWorkOrder = useUpdatePrintedWorkOrder();

  const isEdit = !!workOrder && open;
  const isCreatingChild = !!childOrderType;
  // A child order or a re-edit is locked once production has started.
  const productionOrder =
    workOrder && "productionOrder" in workOrder ? workOrder.productionOrder : null;
  const hasProductionOrder = !!productionOrder;
  const isLocked = isEdit && (!!productionOrder || workOrder?.status !== "initiate_production");

  const methods = useForm<WorkOrderSchemaInput>({
    resolver: zodResolver(workOrderFormSchema) as any,
    defaultValues: defaultsFor(workOrder, childOrderType),
  });
  const { control } = methods;

  // Product type is fixed by the workflow — no need to watch it from the form.
  const productType = useWatch({ control, name: "productType" }) as ProductType;
  const isWoven = productType === "woven"; // always false for printed

  const isSaving = createWorkOrder.isPending || updateWorkOrder.isPending;

  const handleClose = () => {
    methods.reset();
    onClose();
  };

  const onSubmit = async (data: WorkOrderSchemaInput) => {
    const header = {
      soNumber: data.soNumber,
      orderDate: data.orderDate,
      totalQty: Number(data.totalQty),
      brandId: data.brandId as number,
      poNumber: data.poNumber || undefined,
      dueDate: data.dueDate || undefined,
      comment: data.comment || undefined,
      priority: data.priority,
      orderType: data.orderType,
      imageUrl: data.imageUrl || undefined,
      dcImageUrl: data.dcImageUrl || undefined,
    };

    try {
      if (isEdit && workOrder) {
        const dispatch = {
          dcNumber: data.dcNumber || undefined,
          lcNumber: data.lcNumber || undefined,
          fbrInvoiceNumber: data.fbrInvoiceNumber || undefined,
          dispatchedDate: data.dispatchedDate || undefined,
        };
        const body = { ...header, productType: FIXED_PRODUCT_TYPE, ...dispatch };
        await updateWorkOrder.mutateAsync({ id: workOrder.id, body });
      } else {
        await createWorkOrder.mutateAsync({ ...header, productType: FIXED_PRODUCT_TYPE });
      }
      handleClose();
    } catch {
      // Error toasted by mutation hook
    }
  };

  const dialogTitle = isCreatingChild
    ? childOrderType === "shortfall"
      ? "New Shortfall Order"
      : childOrderType === "recut order"
      ? "New Recut Order"
      : "New Additional Order"
    : isEdit
    ? "Edit Work Order"
    : "New Work Order";

  const dialogDescription = isCreatingChild
    ? childOrderType === "recut order"
      ? `Create a recut order for ${workOrder?.soNumber}. Modify the quantity and PO number as needed.`
      : `Create a ${childOrderType} for ${workOrder?.soNumber}. Modify the required quantity as needed.`
    : isEdit
    ? "Update order information below."
    : "Fill out the fields to create a new printed work order.";



  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) handleClose(); }}
      title={dialogTitle}
      description={dialogDescription}
      className="sm:max-w-2xl max-h-[90vh] flex flex-col"
      footer={
        <>
          <AppButton variant="outline" onClick={handleClose}>
            Cancel
          </AppButton>
          <AppButton loading={isSaving} onClick={methods.handleSubmit(onSubmit)}>
            {isEdit ? "Save Changes" : isCreatingChild ? "Create Order" : "Create Work Order"}
          </AppButton>
        </>
      }
    >
      <FormProvider {...methods}>
        <form className="grid gap-4 sm:grid-cols-2 max-h-[65vh] overflow-y-auto pr-1" onSubmit={methods.handleSubmit(onSubmit)}>
          <SubmitOnEnter disabled={isSaving} />

          <WorkOrderBasicInfo isEdit={isEdit} isLocked={isLocked} hideProductType />
          <CompanyInfo isLocked={isLocked} workOrderCompanyId={workOrder?.companyId} />
          <OrderInfo
            isLocked={isLocked}
            hasProductionOrder={hasProductionOrder}
            productionNumber={productionOrder?.productionNumber}
          />

          {/* Woven specification is omitted for printed orders. */}

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

          {(workOrder?.status === "complete" || workOrder?.status === "dispatched" || isEdit) &&
            workOrder && (
              <DispatchInfo isDispatched={workOrder.status === "dispatched" || workOrder.status === "complete"} />
            )}

          <ArtworkAndComment isLocked={isLocked} />
        </form>
      </FormProvider>
    </AppDialog>
  );
}

