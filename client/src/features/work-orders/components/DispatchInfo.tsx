import { useFormContext, Controller } from "react-hook-form";
import { AppInput } from "@/components/forms/AppInput";
import { ImageUploadField } from "@/components/forms/ImageUploadField";
import type { WorkOrderSchemaInput } from "../schemas/work-order-schemas";

export function DispatchInfo({ isDispatched }: { isDispatched: boolean }) {
  const { register, control, formState: { errors } } = useFormContext<WorkOrderSchemaInput>();

  return (
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
              hint="Upload or update label artwork for dispatch."
            />
          )}
        />
      </div>
      <p className="text-[11px] text-muted-foreground sm:col-span-2">
        {isDispatched
          ? "This order is dispatched. Paperwork and artwork stay editable for corrections."
          : "DC Number, LC Number and FBR Invoice Number are required to dispatch."}
      </p>
    </>
  );
}
