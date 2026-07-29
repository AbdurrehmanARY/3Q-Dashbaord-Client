import { useMemo } from "react";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { useOperators } from "../hooks/use-entities";

interface OperatorSelectProps {
  value?: string;
  onChange: (operatorId: string) => void;
  label?: string;
  error?: string;
  /** Filter to a designation, e.g. "Printing", "Cutting", "Packaging". */
  designation?: string;
  disabled?: boolean;
  className?: string;
}

/** Searchable operator picker, optionally filtered by designation. Value is the operator `id` (as string). */
export function OperatorSelect({ value, onChange, label, error, designation, disabled, className }: OperatorSelectProps) {
  const { data: operators, isLoading } = useOperators(designation ? { designation } : undefined);

  const options = useMemo(
    () =>
      (operators ?? []).map((o) => ({
        value: String(o.id),
        label: o.name,
        hint: `${o.designation}${o.shift ? ` · ${o.shift}` : ""}`,
      })),
    [operators]
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
      placeholder="Select operator…"
      emptyText="No operators found."
    />
  );
}
