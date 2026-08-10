import { useForm } from "react-hook-form";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { useCreateProvider, useUpdateProvider } from "../hooks/use-thread-dyeing";
import type { ServiceProvider } from "../types";

interface ProviderForm {
  name: string;
  contact?: string;
  address?: string;
  notes?: string;
}

export function ServiceProviderDialog({
  provider,
  open,
  onClose,
}: {
  provider: ServiceProvider | null;
  open: boolean;
  onClose: () => void;
}) {
  const create = useCreateProvider();
  const update = useUpdateProvider();
  const saving = create.isPending || update.isPending;

  const { register, handleSubmit, formState: { errors } } = useForm<ProviderForm>({
    defaultValues: {
      name: provider?.name ?? "",
      contact: provider?.contact ?? "",
      address: provider?.address ?? "",
      notes: provider?.notes ?? "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      name: data.name,
      contact: data.contact?.trim() || undefined,
      address: data.address?.trim() || undefined,
      notes: data.notes?.trim() || undefined,
    };
    if (provider) await update.mutateAsync({ id: provider.id, body });
    else await create.mutateAsync(body);
    onClose();
  });

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title={provider ? "Edit Service Provider" : "Add Service Provider"}
      footer={
        <>
          <AppButton variant="outline" onClick={onClose}>Cancel</AppButton>
          <AppButton loading={saving} onClick={onSubmit}>{provider ? "Update" : "Create"}</AppButton>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={onSubmit}>
        <SubmitOnEnter disabled={saving} />
        <AppInput label="Name *" error={errors.name?.message} {...register("name", { required: "Name is required" })} />
        <AppInput label="Contact" placeholder="Phone or email" {...register("contact")} />
        <div className="grid gap-1.5">
          <Label htmlFor="provider-address" className="text-xs font-semibold">Address</Label>
          <Textarea id="provider-address" rows={2} {...register("address")} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="provider-notes" className="text-xs font-semibold">Notes</Label>
          <Textarea id="provider-notes" rows={2} {...register("notes")} />
        </div>
      </form>
    </AppDialog>
  );
}
