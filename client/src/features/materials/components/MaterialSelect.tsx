import { useMemo } from "react";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { useMaterials } from "../hooks/use-materials";
import { useInventoryStock } from "@/features/inventory";
import { formatNumber } from "@/lib/format";

interface MaterialSelectProps {
  value?: string;
  onChange: (materialCode: string) => void;
  label?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

/** Searchable material picker. Value is the material `code`. Shows live stock balance. */
export function MaterialSelect({ value, onChange, label, error, type, disabled, className }: MaterialSelectProps) {
  const { data: materials, isLoading: loadingMaterials } = useMaterials(type);
  const { data: stock, isLoading: loadingStock } = useInventoryStock();

  const stockMap = useMemo(() => {
    const map = new Map<string, number>();
    (stock ?? []).forEach((s) => {
      map.set(s.materialCode, Number(s.balanceRolls || 0));
    });
    return map;
  }, [stock]);

  const options = useMemo(
    () =>
      (materials ?? []).map((m) => {
        const balance = stockMap.get(m.code);
        const stockHint = balance !== undefined
          ? `${formatNumber(balance, 2)} rolls in stock`
          : "No stock record";
        return {
          value: m.code,
          label: m.code,
          hint: `${m.type}${m.description ? ` · ${m.description}` : ""} (${stockHint})`,
        };
      }),
    [materials, stockMap]
  );

  return (
    <AppCombobox
      value={value}
      onChange={(next) => onChange(next ?? "")}
      options={options}
      label={label}
      error={error}
      loading={loadingMaterials || loadingStock}
      disabled={disabled}
      className={className}
      placeholder="Select material…"
      emptyText="No materials found."
    />
  );
}

