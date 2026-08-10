import { useState, useRef, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
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
const DESIGNATION_OPTIONS = DESIGNATIONS.map((d) => ({ label: `${d} Operator`, value: d }));
const OPERATOR_TYPE_OPTIONS = OPERATOR_TYPES.map((t) => ({
  label: `${OPERATOR_TYPE_META[t].label} — ${OPERATOR_TYPE_META[t].description}`,
  value: t,
}));

/**
 * Add/edit an operator with live avatar upload preview using `URL.createObjectURL()`.
 */
export function OperatorDialog({ open, operator, onClose }: OperatorDialogProps) {
  const createOperator = useCreateOperator();
  const updateOperator = useUpdateOperator();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
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
      status: operator?.status ?? "Active",
    },
  });

  const [avatarUrl, name] = useWatch({ control, name: ["avatarUrl", "name"] });

  // Clean up object URLs created with URL.createObjectURL() on unmount or URL change
  useEffect(() => {
    return () => {
      if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
      }
    };
  }, [previewObjectUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous object URL if any to prevent memory leaks
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
    }

    // Generate local Object URL using URL.createObjectURL()
    const objectUrl = URL.createObjectURL(file);
    setPreviewObjectUrl(objectUrl);
    setValue("avatarUrl", objectUrl, { shouldValidate: true });

    // Also encode to base64 Data URL for persistent storage upon saving
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setFileDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearAvatar = () => {
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      setPreviewObjectUrl(null);
    }
    setFileDataUrl(null);
    setValue("avatarUrl", "", { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isLoading = createOperator.isPending || updateOperator.isPending;

  const handleClose = () => {
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      setPreviewObjectUrl(null);
    }
    setFileDataUrl(null);
    reset();
    onClose();
  };

  const onSubmit = async (data: OperatorSchemaInput) => {
    try {
      // Use persistent data URL if a file was uploaded via object URL, otherwise use avatarUrl
      const finalAvatarUrl = fileDataUrl || data.avatarUrl || "";
      const payload = { ...data, avatarUrl: finalAvatarUrl };

      if (operator) await updateOperator.mutateAsync({ id: operator.id, body: payload });
      else await createOperator.mutateAsync(payload);
      handleClose();
    } catch {
      // Error toasted by mutation hook
    }
  };

  const activeAvatarSrc = previewObjectUrl || avatarUrl || "";

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

        {/* Avatar preview with URL.createObjectURL file upload trigger */}
        <div className="flex items-start gap-4 rounded-lg border bg-muted/20 p-3">
          <OperatorAvatar name={String(name || "New operator")} avatarUrl={activeAvatarSrc} size="lg" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <AppButton
                type="button"
                size="sm"
                variant="outline"
                leftIcon={<Upload className="h-3.5 w-3.5" />}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Photo
              </AppButton>
              {activeAvatarSrc && (
                <AppButton
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 text-destructive px-2"
                  onClick={handleClearAvatar}
                >
                  <X className="h-3.5 w-3.5 mr-1" /> Remove
                </AppButton>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Select an image file (preview generated with <code className="font-mono text-xs">URL.createObjectURL()</code>) or paste a URL below.
            </p>
            <AppInput
              placeholder="https://… (optional image URL)"
              error={errors.avatarUrl?.message}
              {...register("avatarUrl")}
            />
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
        <AppSelect label="Status" options={STATUS_OPTIONS} {...register("status")} />
      </form>
    </AppDialog>
  );
}
