import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { companySchema, type CompanySchemaInput } from "../schemas/company-schemas";
import { useCreateCompany, useUpdateCompany } from "../hooks/use-companies";
import type { Company } from "../types";

interface CompanyDialogProps {
  open: boolean;
  company: Company | null;
  onClose: () => void;
}

export function CompanyDialog({ open, company, onClose }: CompanyDialogProps) {
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanySchemaInput>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company?.name ?? "",
      email: company?.email ?? "",
      location: company?.location ?? "",
      contactPerson: company?.contactPerson ?? "",
      phone: company?.phone ?? "",
    },
  });

  const isLoading = createCompany.isPending || updateCompany.isPending;

  const onSubmit = async (data: CompanySchemaInput) => {
    const body = {
      name: data.name,
      email: data.email || undefined,
      location: data.location || undefined,
      contactPerson: data.contactPerson || undefined,
      phone: data.phone || undefined,
    };
    if (company) {
      await updateCompany.mutateAsync({ id: company.id, body });
    } else {
      await createCompany.mutateAsync(body);
    }
    reset();
    onClose();
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) { reset(); onClose(); } }}
      title={company ? "Edit Company" : "Create Company"}
      footer={
        <>
          <AppButton variant="outline" onClick={() => { reset(); onClose(); }}>
            Cancel
          </AppButton>
          <AppButton
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {company ? "Update" : "Create"}
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={isLoading} />
        <AppInput
          label="Company Name *"
          placeholder="e.g. Acme Labels Ltd."
          error={errors.name?.message}
          {...register("name")}
        />
        <AppInput
          label="Email"
          type="email"
          placeholder="contact@company.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <AppInput
          label="Location"
          placeholder="e.g. Karachi, Pakistan"
          error={errors.location?.message}
          {...register("location")}
        />
        <div className="grid grid-cols-2 gap-4">
          <AppInput
            label="Contact Person"
            placeholder="e.g. Ahmed Khan"
            error={errors.contactPerson?.message}
            {...register("contactPerson")}
          />
          <AppInput
            label="Phone"
            placeholder="e.g. +92 300 1234567"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
      </form>
    </AppDialog>
  );
}
