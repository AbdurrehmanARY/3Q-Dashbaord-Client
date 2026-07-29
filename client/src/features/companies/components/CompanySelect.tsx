import { useMemo } from "react";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { useCompanies } from "../hooks/use-companies";

interface CompanySelectProps {
  value?: string;
  onChange: (companyId: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

/** Searchable company picker. Value is the company `id` (as string). */
export function CompanySelect({ value, onChange, label, error, disabled, className }: CompanySelectProps) {
  const { data: companies, isLoading } = useCompanies();

  const options = useMemo(
    () =>
      (companies ?? []).map((c) => ({
        value: String(c.id),
        label: c.name,
        hint: c.location ?? undefined,
      })),
    [companies]
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
      placeholder="Select company…"
      emptyText="No companies found."
    />
  );
}
