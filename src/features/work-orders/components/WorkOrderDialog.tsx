import { useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { workOrderFormSchema, type WorkOrderSchemaInput } from "../schemas/work-order-schemas";
import {
  WORK_ORDER_STATUS_META,
  type ProductType,
  type WorkOrder,
  type WorkOrderDetail,
} from "../types";
import { useCreateWorkOrder, useUpdateWorkOrder } from "../hooks/use-work-orders";
import { todayISO } from "@/lib/format";
import { WorkOrderBasicInfo } from "./WorkOrderBasicInfo";
import { CompanyInfo } from "./CompanyInfo";
import { OrderInfo } from "./OrderInfo";
import { WovenSpecification } from "./WovenSpecification";
import { DispatchInfo } from "./DispatchInfo";
import { ArtworkAndComment } from "./ArtworkAndComment";

interface WorkOrderDialogProps {
  open: boolean;
  /**
   * null creates a new work order; passing one edits it. If `childOrderType` is specified,
   * this `workOrder` acts as the parent template for a new child order.
   */
  workOrder?: WorkOrder | WorkOrderDetail | null;
  /** When set, creates a new child order (shortfall, recut, or additional) cloned from `workOrder`. */
  childOrderType?: "shortfall" | "recut order" | "additional order";
  onClose: () => void;
}

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
      comment: wo.comment ? `[Ref: ${wo.soNumber}] ${wo.comment}` : `Reference parent order: ${wo.soNumber}`,
      priority: wo.priority ?? "normal",
      orderType: childOrderType,
      imageUrl: wo.imageUrl ?? "",
      productType: wo.productType ?? "printed",
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
    productType: wo?.productType ?? "printed",
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
 * Clean main container for creating/editing work orders using modular sub-components:
 * - WorkOrderBasicInfo
 * - CompanyInfo
 * - OrderInfo
 * - WovenSpecification
 * - DispatchInfo
 * - ArtworkAndComment
 */
export function WorkOrderDialog({ open, workOrder, childOrderType, onClose }: WorkOrderDialogProps) {
  const isCreatingChild = !!childOrderType && !!workOrder;
  const isEdit = !!workOrder && !isCreatingChild;
  const isComplete = workOrder?.status === "complete" || workOrder?.status === "dispatched";
  const isDispatched = workOrder?.status === "dispatched";

  // Work orders can now be edited anytime — no locked state on commercial fields.
  const isLocked = false;

  const productionOrder = workOrder && "productionOrder" in workOrder ? workOrder.productionOrder : null;
  const hasProductionOrder = !!productionOrder;

  const [sizeLabels, setSizeLabels] = useState<string[]>(workOrder?.sizeLabels ?? []);

  const createWorkOrder = useCreateWorkOrder();
  const updateWorkOrder = useUpdateWorkOrder();

  const methods = useForm<WorkOrderSchemaInput>({
    resolver: zodResolver(workOrderFormSchema) as any,
    defaultValues: defaultsFor(workOrder, childOrderType),
  });

  const productType = (useWatch({ control: methods.control, name: "productType" }) ?? "printed") as ProductType;
  const isWoven = productType === "woven";

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
    };

    const wovenDetail = isWoven
      ? {
        designCode: String(data.designCode ?? ""),
        pick: Number(data.pick),
        repeat: Number(data.repeat),
        density: Number(data.density),
        speed: data.speed === "" || data.speed == null ? 0 : Number(data.speed),
        extra: data.extra === "" || data.extra == null ? 0 : Number(data.extra),
        sizeLabels,
      }
      : undefined;

    try {
      if (isEdit && workOrder) {
        const dispatch = {
          dcNumber: data.dcNumber || undefined,
          lcNumber: data.lcNumber || undefined,
          fbrInvoiceNumber: data.fbrInvoiceNumber || undefined,
          dispatchedDate: data.dispatchedDate || undefined,
        };
        const body = { ...header, ...dispatch, ...(wovenDetail ? { wovenDetail } : {}) };
        await updateWorkOrder.mutateAsync({ id: workOrder.id, body });
      } else {
        await createWorkOrder.mutateAsync({ ...header, productType, wovenDetail });
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
    : "Fill out the fields to create a new work order.";

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

          <WorkOrderBasicInfo isEdit={isEdit} isLocked={isLocked} />
          <CompanyInfo isLocked={isLocked} workOrderCompanyId={workOrder?.companyId} />
          <OrderInfo
            isLocked={isLocked}
            hasProductionOrder={hasProductionOrder}
            productionNumber={productionOrder?.productionNumber}
          />

          {isWoven && (
            <WovenSpecification
              isLocked={isLocked}
              sizeLabels={sizeLabels}
              setSizeLabels={setSizeLabels}
            />
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

          {(isComplete || isEdit) && <DispatchInfo isDispatched={isDispatched} />}

          <ArtworkAndComment isLocked={isLocked} />
        </form>
      </FormProvider>
    </AppDialog>
  );
}
