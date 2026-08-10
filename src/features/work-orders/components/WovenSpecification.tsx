import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { AppInput } from "@/components/forms/AppInput";
import { AppButton } from "@/components/forms/AppButton";
import { Label } from "@/components/ui/label";
import type { WorkOrderSchemaInput } from "../schemas/work-order-schemas";

export function WovenSpecification({
  isLocked,
  sizeLabels,
  setSizeLabels,
}: {
  isLocked: boolean;
  sizeLabels: string[];
  setSizeLabels: (labels: string[]) => void;
}) {
  const { register, formState: { errors } } = useFormContext<WorkOrderSchemaInput>();

  return (
    <div className="grid gap-4 rounded-lg border border-dashed bg-muted/20 p-3 sm:col-span-2 sm:grid-cols-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-4">
        Woven Design Specification
      </p>
      <div className="sm:col-span-2">
        <AppInput
          label="Design Code *"
          placeholder="e.g. Guess 13R"
          disabled={isLocked}
          error={errors.designCode?.message}
          {...register("designCode")}
        />
      </div>
      <AppInput
        label="Pick *"
        type="number"
        placeholder="e.g. 853"
        disabled={isLocked}
        error={errors.pick?.message}
        {...register("pick")}
      />
      <AppInput
        label="Repeat *"
        type="number"
        step="any"
        placeholder="e.g. 60"
        disabled={isLocked}
        error={errors.repeat?.message}
        {...register("repeat")}
      />
      <AppInput
        label="Density *"
        type="number"
        placeholder="e.g. 560"
        disabled={isLocked}
        error={errors.density?.message}
        {...register("density")}
      />
      <AppInput
        label="Extra"
        type="number"
        step="any"
        placeholder="e.g. 150"
        disabled={isLocked}
        error={errors.extra?.message}
        {...register("extra")}
      />
      <SizeLabelsInput
        disabled={isLocked}
        value={sizeLabels}
        onChange={setSizeLabels}
      />
    </div>
  );
}

function SizeLabelsInput({
  disabled,
  value,
  onChange,
}: {
  disabled?: boolean;
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const [inputVal, setInputVal] = useState("");

  const addTag = () => {
    const trimmed = inputVal.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputVal("");
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="sm:col-span-4 space-y-2">
      <Label className="text-xs font-semibold">Size Labels (e.g. 10, 12, 13, 32/32, XL, XXL)</Label>
      <div className="flex gap-2">
        <AppInput
          placeholder="Add size label (press Add)"
          disabled={disabled}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <AppButton
          type="button"
          variant="outline"
          disabled={disabled || !inputVal.trim()}
          onClick={addTag}
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Add
        </AppButton>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground border"
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => removeTag(tag)}
                  aria-label={`Remove size label ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
