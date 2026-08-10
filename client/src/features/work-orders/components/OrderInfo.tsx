import { useFormContext } from "react-hook-form";
import { AppInput } from "@/components/forms/AppInput";
import type { WorkOrderSchemaInput } from "../schemas/work-order-schemas";

export function OrderInfo({
  isLocked,
  hasProductionOrder,
  productionNumber,
}: {
  isLocked: boolean;
  hasProductionOrder: boolean;
  productionNumber?: string;
}) {
  const { register, formState: { errors } } = useFormContext<WorkOrderSchemaInput>();

  return (
    <>
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
          Quantity is locked — production order {productionNumber} was raised against this order.
        </p>
      )}
    </>
  );
}
