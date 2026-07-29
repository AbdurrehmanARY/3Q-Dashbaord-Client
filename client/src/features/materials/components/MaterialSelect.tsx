import { useMemo } from "react";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { useMaterials } from "../hooks/use-materials";

interface MaterialSelectProps {
  value?: string;
  onChange: (materialCode: string) => void;
  label?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

/** Searchable material picker. Value is the material `code`. */
export function MaterialSelect({ value, onChange, label, error, type, disabled, className }: MaterialSelectProps) {
  const { data: materials, isLoading } = useMaterials(type);

  const options = useMemo(
    () =>
      (materials ?? []).map((m) => ({
        value: m.code,
        label: m.code,
        hint: `${m.type}${m.description ? ` · ${m.description}` : ""}`,
      })),
    [materials]
  );

  return (
    <AppCombobox
      value={value}
      onChange={(next) => onChange(next ?? "")}
      options={options}
      label={label}
      error={error}
      loading={isLoading}
      disabled={disabled}
      className={className}
      placeholder="Select material…"
      emptyText="No materials found."
    />
  );
}
