import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { OperatorAvatar } from "@/components/feedback/OperatorAvatar";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { AppButton } from "@/components/forms/AppButton";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import {
  operatorSchema,
  DESIGNATIONS,
  SHIFTS,
  ENTITY_STATUSES,
  type OperatorSchemaInput,
} from "../schemas/entity-schemas";
import { useCreateOperator, useUpdateOperator } from "../hooks/use-entities";
import { OPERATOR_TYPES, OPERATOR_TYPE_META, type Operator } from "../types";

interface OperatorDialogProps {
  open: boolean;
  /** null = create a new operator; an operator = edit it. */
  operator: Operator | null;
  onClose: () => void;
}

const STATUS_OPTIONS = ENTITY_STATUSES.map((s) => ({ label: s, value: s }));
const DESIGNATION_OPTIONS = DESIGNATIONS.map((d) => ({ label: d, value: d }));
const SHIFT_OPTIONS = [{ label: "—", value: "" }, ...SHIFTS.map((s) => ({ label: s, value: s }))];
const OPERATOR_TYPE_OPTIONS = OPERATOR_TYPES.map((t) => ({
  label: `${OPERATOR_TYPE_META[t].label} — ${OPERATOR_TYPE_META[t].description}`,
  value: t,
}));

/**
 * Add/edit an operator. Mount it conditionally (`{open && <OperatorDialog … />}`) so its
 * form is created fresh each time. Split out from the old dual-purpose `EntityDialog`.
 */
export function OperatorDialog({ open, operator, onClose }: OperatorDialogProps) {
  const createOperator = useCreateOperator();
  const updateOperator = useUpdateOperator();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<OperatorSchemaInput>({
    resolver: zodResolver(operatorSchema) as any,
    defaultValues: {
      name: operator?.name ?? "",
      employeeCode: operator?.employeeCode ?? "",
      designation: operator?.designation ?? "Printing",
      operatorType: operator?.operatorType ?? "both",
      avatarUrl: operator?.avatarUrl ?? "",
      shift: operator?.shift ?? "",
      status: operator?.status ?? "Active",
    },
  });

  // Live preview: paste a URL and the avatar updates as you type, so a bad link is obvious
  // before saving (a broken image falls back to initials).
  const [avatarUrl, name] = useWatch({ control, name: ["avatarUrl", "name"] });

  const isLoading = createOperator.isPending || updateOperator.isPending;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: OperatorSchemaInput) => {
    try {
      if (operator) await updateOperator.mutateAsync({ id: operator.id, body: data });
      else await createOperator.mutateAsync(data);
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
      title={operator ? "Edit Operator" : "Add Operator"}
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

        {/* Avatar preview beside its URL field, so a wrong or broken link shows immediately. */}
        <div className="flex items-start gap-3">
          <OperatorAvatar name={String(name || "New operator")} avatarUrl={String(avatarUrl || "")} size="lg" />
          <div className="min-w-0 flex-1">
            <AppInput
              label="Avatar Image URL"
              placeholder="https://…"
              error={errors.avatarUrl?.message}
              {...register("avatarUrl")}
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Paste any image URL. Leave blank to show the operator's initials.
            </p>
          </div>
        </div>

        <AppInput label="Name *" error={errors.name?.message} {...register("name")} />
        <AppInput label="Employee Code" placeholder="e.g. EMP-001" error={errors.employeeCode?.message} {...register("employeeCode")} />
        <AppSelect label="Designation *" error={errors.designation?.message} options={DESIGNATION_OPTIONS} {...register("designation")} />
        <AppSelect
          label="Operator Type *"
          error={errors.operatorType?.message}
          options={OPERATOR_TYPE_OPTIONS}
          {...register("operatorType")}
        />
        <AppSelect label="Shift" options={SHIFT_OPTIONS} {...register("shift")} />
        <AppSelect label="Status" options={STATUS_OPTIONS} {...register("status")} />
      </form>
    </AppDialog>
  );
}
