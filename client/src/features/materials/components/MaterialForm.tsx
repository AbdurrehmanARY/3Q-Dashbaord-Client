import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import {
  materialSchema,
  MATERIAL_TYPES,
  MATERIAL_DESCRIPTIONS,
  type MaterialSchemaInput,
} from "../schemas/material-schemas";
import { useCreateMaterial, useUpdateMaterial } from "../hooks/use-materials";
import type { Material } from "../types";

interface MaterialFormProps {
  open: boolean;
  material: Material | null;
  onClose: () => void;
}

const typeOptions = MATERIAL_TYPES.map((t) => ({ value: t, label: t }));
const descriptionOptions = MATERIAL_DESCRIPTIONS.map((d) => ({ value: d, label: d }));

export function MaterialForm({ open, material, onClose }: MaterialFormProps) {
  const createMaterial = useCreateMaterial();
  const updateMaterial = useUpdateMaterial();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<MaterialSchemaInput>({
    resolver: zodResolver(materialSchema) as any,
    defaultValues: {
      code: material?.code ?? "",
      type: material?.type ?? "",
      description: material?.description ?? "",
      weightPerRoll: material ? Number(material.weightPerRoll) : 0,
    },
  });

  const isLoading = createMaterial.isPending || updateMaterial.isPending;

  const onSubmit = async (data: MaterialSchemaInput) => {
    if (material) {
      await updateMaterial.mutateAsync({ id: material.id, body: data });
    } else {
      await createMaterial.mutateAsync(data);
    }
    reset();
    onClose();
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) { reset(); onClose(); } }}
      title={material ? "Edit Material" : "Create Material"}
      footer={
        <>
          <AppButton variant="outline" onClick={() => { reset(); onClose(); }}>
            Cancel
          </AppButton>
          <AppButton loading={isLoading} onClick={handleSubmit(onSubmit)}>
            {material ? "Update" : "Create"}
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={isLoading} />
        <AppInput
          label="Material Code *"
          placeholder="e.g. PPR-001"
          error={errors.code?.message}
          disabled={!!material}
          {...register("code")}
        />
        {material && (
          <p className="text-xs text-muted-foreground -mt-2">
            Material code is immutable after creation.
          </p>
        )}

        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <AppCombobox
              label="Material Type *"
              value={value || undefined}
              onChange={(v) => onChange(v ?? "")}
              options={typeOptions}
              error={errors.type?.message}
              placeholder="Select type…"
              emptyText="No types found."
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <AppCombobox
              label="Material Description"
              value={value || undefined}
              onChange={(v) => onChange(v ?? "")}
              options={descriptionOptions}
              error={errors.description?.message}
              placeholder="Select description…"
              emptyText="No descriptions found."
            />
          )}
        />

        <AppInput
          label="Weight / Roll (kg) *"
          type="number"
          step="any"
          error={errors.weightPerRoll?.message}
          {...register("weightPerRoll", { valueAsNumber: true })}
        />
      </form>
    </AppDialog>
  );
}
