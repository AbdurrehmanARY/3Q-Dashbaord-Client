import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { AppButton } from "@/components/forms/AppButton";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import {
  machineSchema,
  MACHINE_TYPES,
  ENTITY_STATUSES,
  type MachineSchemaInput,
} from "../schemas/entity-schemas";
import { useCreateMachine, useUpdateMachine } from "../hooks/use-entities";
import type { Machine } from "../types";

interface MachineDialogProps {
  open: boolean;
  /** null = create a new machine; a machine = edit it. */
  machine: Machine | null;
  onClose: () => void;
}

const STATUS_OPTIONS = ENTITY_STATUSES.map((s) => ({ label: s, value: s }));
const TYPE_OPTIONS = MACHINE_TYPES.map((t) => ({ label: t, value: t }));
const PRODUCT_TYPE_OPTIONS = [
  { label: "Printed Labels Only", value: "printed" },
  { label: "Woven Labels Only", value: "woven" },
  { label: "Both Printed & Woven Labels", value: "both" },
];

/**
 * Add/edit a machine. Mount it conditionally (`{open && <MachineDialog … />}`) so its form
 * is created fresh each time — that's why there's no reset-on-`machine` effect. Split out
 * from the old dual-purpose `EntityDialog` so there are no `as Machine` casts and only the
 * one form that's actually shown ever mounts.
 */
export function MachineDialog({ open, machine, onClose }: MachineDialogProps) {
  const createMachine = useCreateMachine();
  const updateMachine = useUpdateMachine();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MachineSchemaInput>({
    resolver: zodResolver(machineSchema) as any,
    defaultValues: {
      name: machine?.name ?? "",
      machineCode: machine?.machineCode ?? "",
      machineName: machine?.machineName ?? "",
      machineType: machine?.machineType ?? "Printing",
      productType: machine?.productType ?? "both",
      capacityPerHour: machine?.capacityPerHour ?? undefined,
      status: machine?.status ?? "Active",
    },
  });

  const isLoading = createMachine.isPending || updateMachine.isPending;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: MachineSchemaInput) => {
    try {
      if (machine) await updateMachine.mutateAsync({ id: machine.id, body: data });
      else await createMachine.mutateAsync(data);
      handleClose();
    } catch {
      // Hook onError already toasts; keep the dialog open for retry, no unhandled rejection.
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose();
      }}
      title={machine ? "Edit Machine" : "Add Machine"}
      footer={
        <>
          <AppButton variant="outline" onClick={handleClose}>
            Cancel
          </AppButton>
          <AppButton loading={isLoading} onClick={handleSubmit(onSubmit)}>
            Save
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={isLoading} />
        <AppInput label="Name *" error={errors.name?.message} {...register("name")} />
        <AppInput label="Machine Code *" placeholder="e.g. PRT-01" error={errors.machineCode?.message} {...register("machineCode")} />
        <AppInput label="Machine Name *" error={errors.machineName?.message} {...register("machineName")} />
        <AppSelect label="Machine Type *" error={errors.machineType?.message} options={TYPE_OPTIONS} {...register("machineType")} />
        <AppSelect
          label="Material / Label Type *"
          error={errors.productType?.message}
          options={PRODUCT_TYPE_OPTIONS}
          {...register("productType")}
        />
        <AppInput label="Capacity / Hour" type="number" placeholder="Optional" error={errors.capacityPerHour?.message} {...register("capacityPerHour", { valueAsNumber: true })} />
        <AppSelect label="Status" options={STATUS_OPTIONS} {...register("status")} />
      </form>
    </AppDialog>
  );
}
