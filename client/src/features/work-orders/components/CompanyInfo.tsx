import { useEffect } from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { useCompanies, useCompanyBrands } from "@/features/companies";
import type { WorkOrderSchemaInput } from "../schemas/work-order-schemas";

export function CompanyInfo({
  isLocked,
  workOrderCompanyId,
}: {
  isLocked: boolean;
  workOrderCompanyId?: number | null;
}) {
  const { control, setValue, formState: { errors } } = useFormContext<WorkOrderSchemaInput>();
  const selectedCompanyId = useWatch({ control, name: "companyId" });
  const { data: companies } = useCompanies();
  const { data: brands, isLoading: brandsLoading } = useCompanyBrands(
    selectedCompanyId ? String(selectedCompanyId) : null
  );

  useEffect(() => {
    if (selectedCompanyId && workOrderCompanyId !== selectedCompanyId) {
      setValue("brandId", null);
    }
  }, [selectedCompanyId, workOrderCompanyId, setValue]);

  return (
    <>
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
    </>
  );
}
