import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { AppButton } from "@/components/forms/AppButton";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { useCreateLabelType, useUpdateLabelType } from "../hooks/use-label-types";
import { createLabelTypeSchema, updateLabelTypeSchema } from "../schemas/label-type-schemas";
import type { LabelType } from "../types";
import { toast } from "sonner";

type CreateFormData = { name: string; category: "woven" | "printed" };
type UpdateFormData = { name?: string; category?: "woven" | "printed"; isActive?: boolean };

interface CreateLabelTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: LabelType | null;
  onSuccess?: () => void;
}

export function CreateLabelTypeDialog({
  open,
  onOpenChange,
  editing,
  onSuccess,
}: CreateLabelTypeDialogProps) {
  const isEditing = !!editing;

  const { mutate: createLabelType, isPending: isCreating } = useCreateLabelType();
  const { mutate: updateLabelType, isPending: isUpdating } = useUpdateLabelType();

  const form = useForm<CreateFormData | UpdateFormData>({
    resolver: zodResolver(isEditing ? updateLabelTypeSchema : createLabelTypeSchema) as any,
    defaultValues: isEditing
      ? {
          name: editing.name,
          category: editing.category,
          isActive: editing.isActive,
        }
      : {
          name: "",
          category: "woven",
        },
  });

  const isPending = isCreating || isUpdating;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit((data) => {
      if (isEditing && editing) {
        updateLabelType(
          { id: editing.id, data: data as UpdateFormData },
          {
            onSuccess: () => {
              onSuccess?.();
              onOpenChange(false);
              toast.success("Label type updated");
            },
            onError: () => toast.error("Failed to update label type"),
          }
        );
      } else {
        createLabelType(data as CreateFormData, {
          onSuccess: () => {
            onSuccess?.();
            onOpenChange(false);
            toast.success("Label type created");
          },
          onError: () => toast.error("Failed to create label type"),
        });
      }
    })(e);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? "Edit Label Type" : "Create Label Type"}
      description={
        isEditing
          ? "Update the label type configuration."
          : "Create a new label type configuration."
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AppInput
          label="Name"
          placeholder="Enter label type name"
          error={form.formState.errors.name?.message}
          {...form.register("name")}
        />
        <AppSelect
          label="Category"
          placeholder="Select category"
          error={form.formState.errors.category?.message}
          options={[
            { value: "woven", label: "Woven" },
            { value: "printed", label: "Printed" },
          ]}
                              value={form.watch("category")}
          onChange={(e) => form.setValue("category", e.target.value as "woven" | "printed")}
        />
        {isEditing && (
          <AppSelect
            label="Status"
            placeholder="Select status"
            options={[
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ]}
            value={form.watch("isActive") ? "true" : "false"}
            onChange={(e) => form.setValue("isActive", e.target.value === "true")}
          />
        )}
        <div className="flex justify-end gap-2 pt-2">
          <AppButton
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </AppButton>
          <AppButton type="submit" loading={isPending}>
            {isEditing ? "Update" : "Create"}
          </AppButton>
        </div>
      </form>
    </AppDialog>
  );
}
