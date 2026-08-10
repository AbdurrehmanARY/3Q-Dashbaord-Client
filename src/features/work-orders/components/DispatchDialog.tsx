import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Truck } from "lucide-react";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { ImageUploadField } from "@/components/forms/ImageUploadField";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { todayISO, formatNumber } from "@/lib/format";
import { dispatchSchema, type DispatchSchemaInput } from "../schemas/work-order-schemas";
import { useDispatchWorkOrder } from "../hooks/use-work-orders";
import type { WorkOrder, WorkOrderDetail } from "../types";

interface DispatchDialogProps {
  open: boolean;
  workOrder: WorkOrder | WorkOrderDetail;
  onClose: () => void;
}

/**
 * Completes dispatch for a finished order. DC Number and LC Number are both **required** —
 * they are the paperwork proving the goods left the facility, and the server rejects a
 * dispatch without either. Shared by both product types: dispatch is the one stage the
 * printed and woven workflows have in common.
 *
 * Mount conditionally (`{open && <DispatchDialog … />}`) so the form starts fresh.
 */
export function DispatchDialog({ open, workOrder, onClose }: DispatchDialogProps) {
  const dispatchOrder = useDispatchWorkOrder();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DispatchSchemaInput>({
    resolver: zodResolver(dispatchSchema) as any,
    defaultValues: {
      dcNumber: workOrder.dcNumber ?? "",
      lcNumber: workOrder.lcNumber ?? "",
      fbrInvoiceNumber: workOrder.fbrInvoiceNumber ?? "",
      dispatchedDate: workOrder.dispatchedDate ?? todayISO(),
      dispatchedQty: workOrder.dispatchedQty ?? workOrder.totalQty,
      imageUrl: workOrder.imageUrl ?? "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: DispatchSchemaInput) => {
    try {
      await dispatchOrder.mutateAsync({
        id: workOrder.id,
        body: {
          dcNumber: String(data.dcNumber),
          lcNumber: String(data.lcNumber),
          fbrInvoiceNumber: String(data.fbrInvoiceNumber),
          dispatchedDate: String(data.dispatchedDate),
          dispatchedQty: Number(data.dispatchedQty),
          imageUrl: data.imageUrl || undefined,
        },
      });
      handleClose();
    } catch {
      // Hook onError already toasts; keep the dialog open so the user can correct and retry.
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose();
      }}
      title="Dispatch Order"
      description={`${workOrder.soNumber} · ${formatNumber(workOrder.totalQty, 0)} ordered`}
      className="sm:max-w-xl"
      footer={
        <>
          <AppButton variant="outline" onClick={handleClose}>
            Cancel
          </AppButton>
          <AppButton
            loading={dispatchOrder.isPending}
            leftIcon={<Truck className="h-4 w-4" />}
            onClick={handleSubmit(onSubmit)}
          >
            Confirm Dispatch
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={dispatchOrder.isPending} />
        <AppInput label="DC Number *" error={errors.dcNumber?.message} {...register("dcNumber")} />
        <AppInput label="LC Number *" error={errors.lcNumber?.message} {...register("lcNumber")} />
        <div className="sm:col-span-2">
          <AppInput
            label="FBR Invoice Number *"
            error={errors.fbrInvoiceNumber?.message}
            {...register("fbrInvoiceNumber")}
          />
        </div>
        <AppInput
          label="Dispatch Date *"
          type="date"
          error={errors.dispatchedDate?.message}
          {...register("dispatchedDate")}
        />
        <AppInput
          label="Dispatch Quantity *"
          type="number"
          error={errors.dispatchedQty?.message}
          {...register("dispatchedQty")}
        />
        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <ImageUploadField
                label="Artwork"
                value={field.value}
                onChange={field.onChange}
                error={errors.imageUrl?.message}
                alt="Order artwork"
                hint="Optional. Upload final label artwork for dispatch."
              />
            )}
          />
        </div>
        <p className="text-[11px] text-muted-foreground sm:col-span-2">
          The DC, LC and FBR invoice numbers are all required — recording them moves this order to{" "}
          <strong>Dispatched</strong>. Dispatch quantity cannot exceed the ordered quantity of{" "}
          {formatNumber(workOrder.totalQty, 0)}.
        </p>
      </form>
    </AppDialog>
  );
}
