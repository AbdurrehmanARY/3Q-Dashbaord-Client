import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { useCreateBrand, useUpdateBrand } from "../hooks/use-companies";
import type { Brand, Company } from "../types";

const brandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
});
type BrandInput = z.infer<typeof brandSchema>;

interface BrandDialogProps {
  open: boolean;
  company: Company;
  brand: Brand | null;
  onClose: () => void;
}

export function BrandDialog({ open, company, brand, onClose }: BrandDialogProps) {
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BrandInput>({
    resolver: zodResolver(brandSchema),
    defaultValues: { name: brand?.name ?? "" },
  });

  const isLoading = createBrand.isPending || updateBrand.isPending;

  const onSubmit = async (data: BrandInput) => {
    if (brand) {
      await updateBrand.mutateAsync({
        id: brand.id,
        body: { companyId: Number(company.id), name: data.name },
      });
    } else {
      await createBrand.mutateAsync({
        companyId: Number(company.id),
        name: data.name,
      });
    }
    reset();
    onClose();
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) { reset(); onClose(); } }}
      title={brand ? "Edit Brand" : `Create Brand — ${company.name}`}
      footer={
        <>
          <AppButton variant="outline" onClick={() => { reset(); onClose(); }}>
            Cancel
          </AppButton>
          <AppButton loading={isLoading} onClick={handleSubmit(onSubmit)}>
            {brand ? "Update" : "Create"}
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={isLoading} />
        <AppInput
          label="Brand Name *"
          placeholder="e.g. Premium"
          error={errors.name?.message}
          {...register("name")}
        />
      </form>
    </AppDialog>
  );
}
