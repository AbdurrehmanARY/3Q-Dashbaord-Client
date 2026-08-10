import { useFormContext, Controller } from "react-hook-form";
import { AppInput } from "@/components/forms/AppInput";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  WORK_ORDER_PRIORITIES,
  WORK_ORDER_PRIORITY_META,
  WORK_ORDER_TYPES,
  WORK_ORDER_TYPE_META,
  PRODUCT_TYPE_META,
  type ProductType,
} from "../types";
import type { WorkOrderSchemaInput } from "../schemas/work-order-schemas";

export function WorkOrderBasicInfo({ isEdit, isLocked }: { isEdit: boolean; isLocked: boolean }) {
  const { register, control, formState: { errors } } = useFormContext<WorkOrderSchemaInput>();

  return (
    <>
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
        maxLength={50}
        error={errors.soNumber?.message}
        {...register("soNumber")}
      />
      <AppInput
        label="PO Number"
        disabled={isLocked}
        maxLength={50}
        error={errors.poNumber?.message}
        {...register("poNumber")}
      />

      <Controller
        control={control}
        name="priority"
        render={({ field: { value, onChange } }) => (
          <AppCombobox
            label="Priority *"
            value={value ?? "normal"}
            onChange={(v) => onChange(v ?? "normal")}
            options={WORK_ORDER_PRIORITIES.map((p) => ({ value: p, label: WORK_ORDER_PRIORITY_META[p].label }))}
            placeholder="Select priority…"
            disabled={isLocked}
            error={errors.priority?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="orderType"
        render={({ field: { value, onChange } }) => (
          <AppCombobox
            label="Order Type *"
            value={value ?? "normal order"}
            onChange={(v) => onChange(v ?? "normal order")}
            options={WORK_ORDER_TYPES.map((t) => ({ value: t, label: WORK_ORDER_TYPE_META[t].label }))}
            placeholder="Select order type…"
            disabled={isLocked}
            error={errors.orderType?.message}
          />
        )}
      />
    </>
  );
}
