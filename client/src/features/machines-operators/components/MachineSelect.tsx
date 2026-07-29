import { useMemo } from "react";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { useMachines } from "../hooks/use-entities";

interface MachineSelectProps {
  value?: string;
  onChange: (machineId: string) => void;
  label?: string;
  error?: string;
  /** Filter to a machine type, e.g. "Printing" or "Cutting". */
  type?: string;
  disabled?: boolean;
  className?: string;
}

/** Searchable machine picker, optionally filtered by type. Value is the machine `id` (as string). */
export function MachineSelect({ value, onChange, label, error, type, disabled, className }: MachineSelectProps) {
  const { data: machines, isLoading } = useMachines(type ? { type } : undefined);

  const options = useMemo(
    () =>
      (machines ?? []).map((m) => ({
        value: String(m.id),
        label: m.machineName,
        hint: `${m.machineCode} · ${m.machineType}`,
      })),
    [machines]
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
      placeholder="Select machine…"
      emptyText="No machines found."
    />
  );
}
