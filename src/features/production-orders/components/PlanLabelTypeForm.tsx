import { useEffect, useMemo } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { MaterialSelect, useMaterials } from "@/features/materials";
import { useInventoryStock } from "@/features/inventory";
import { formatNumber, calculateRequiredRolls, calculateTotalRolls, calculateTotalWeight } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useAvailableResources } from "../hooks/use-production-orders";
import { planLineSchema, type PlanLineSchemaInput } from "../schemas/production-order-schemas";
import type { PlanLineInput, ProductionLineOverview } from "../types";

interface PlanLabelTypeFormProps {
  /** Quantity still unallocated across the order — the ceiling for this record. */
  remainingQty: number;
  /** Set when re-planning an existing record; null when adding a new one. */
  editing: ProductionLineOverview | null;
  saving: boolean;
  onSubmit: (body: PlanLineInput) => Promise<void>;
  onCancel: () => void;
  isDialogContent?: boolean;
}

const EMPTY: PlanLineSchemaInput = {
  labelType: "",
  quantity: 0,
  labelSize: 0,
  rollLength: 200,
  extraRolls: 0,
  materialCode: "",
  assignedRolls: 0,
  printingMachineId: null,
  printingOperatorId: null,
};

const ROLL_LENGTH_OPTIONS = [
  { value: 100, label: "100 m" },
  { value: 200, label: "200 m" },
  { value: 400, label: "400 m" },
];

/**
 * Plans ONE label type. Submitting reserves its material, printing machine and printing
 * operator immediately, so the next label type cannot claim them — which is why the
 * resource lists here are scoped to what is still free.
 */
export function PlanLabelTypeForm({
  remainingQty,
  editing,
  saving,
  onSubmit,
  onCancel,
  isDialogContent,
}: PlanLabelTypeFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PlanLineSchemaInput>({
    resolver: zodResolver(planLineSchema) as any,
    defaultValues: EMPTY,
  });

  const { data: materials } = useMaterials();
  const { data: stock } = useInventoryStock();
  // Editing scopes to the line so its own reservation stays selectable. Adding scopes to
  // nothing: sibling label types on this order hold their resources too, so they must be
  // excluded from the picker exactly like any other order's would be.
  // Printed job → printed + both operators only.
  const { data: resources } = useAvailableResources(
    editing ? { lineId: editing.id, productType: "printed" } : { productType: "printed" }
  );

  useEffect(() => {
    reset(
      editing
        ? {
          labelType: editing.labelType,
          quantity: editing.planning.quantity,
          labelSize: editing.planning.labelSize,
          rollLength: editing.planning.rollLength || 200,
          extraRolls: editing.planning.extraRolls,
          materialCode: editing.material.materialCode ?? "",
          assignedRolls: editing.material.assignedRolls,
          printingMachineId: editing.printing.machineId,
          printingOperatorId: editing.printing.operatorId,
        }
        : EMPTY
    );
  }, [editing, reset]);

  const materialByCode = useMemo(() => {
    const map = new Map<string, { description: string | null; type: string; weightPerRoll: number }>();
    (materials ?? []).forEach((m) =>
      map.set(m.code, {
        description: m.description ?? null,
        type: m.type,
        weightPerRoll: Number(m.weightPerRoll),
      })
    );
    return map;
  }, [materials]);

  const balanceByCode = useMemo(() => {
    const map = new Map<string, number>();
    (stock ?? []).forEach((row) => map.set(row.materialCode, Number(row.balanceRolls)));
    return map;
  }, [stock]);

  const printingMachines = (resources?.machines ?? []).filter((m) => m.machineType === "Printing");
  const printingOperators = (resources?.operators ?? []).filter((o) => o.designation === "Printing");

  // Subscribe to only the fields the live preview needs, rather than the whole form.
  const [quantity, labelSize, rollLength, extraRolls, materialCode, assignedRolls] = useWatch({
    control,
    name: ["quantity", "labelSize", "rollLength", "extraRolls", "materialCode", "assignedRolls"],
  });

  const material = materialByCode.get(materialCode || "");
  const required = calculateRequiredRolls(Number(quantity) || 0, Number(labelSize) || 0, Number(rollLength) || 200);
  const assignedInput = Number(assignedRolls) || 0;
  const calculatedTotal = calculateTotalRolls(required, Number(extraRolls) || 0);
  const totalRolls = assignedInput > 0 ? assignedInput : calculatedTotal;
  const totalWeight = calculateTotalWeight(material?.weightPerRoll ?? 0, totalRolls);
  const rollsToCheck = totalRolls;

  // Re-planning frees whatever this record currently holds of the same material.
  const releasing =
    editing && editing.material.materialCode === materialCode ? editing.material.assignedRolls : 0;
  const balance = materialCode ? balanceByCode.get(materialCode) : undefined;
  const available = balance !== undefined ? balance + releasing : 0;
  const insufficient = !!materialCode && rollsToCheck > 0 && rollsToCheck > available;

  const ceiling = remainingQty + (editing ? editing.planning.quantity : 0);
  const overAllocated = Number(quantity) > ceiling;

  const busy = saving || isSubmitting;

  const submit = handleSubmit(async (data) => {
    await onSubmit({
      labelType: data.labelType,
      quantity: Number(data.quantity),
      labelSize: Number(data.labelSize),
      rollLength: Number(data.rollLength) || 200,
      extraRolls: Number(data.extraRolls) || 0,
      materialCode: data.materialCode,
      assignedRolls: Number(data.assignedRolls) || 0,
      printingMachineId: data.printingMachineId as number,
      printingOperatorId: data.printingOperatorId as number,
    });
  });

  const formContent = (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AppInput
          label="Label Type *"
          placeholder="e.g. Care Label"
          autoFocus
          disabled={busy}
          error={errors.labelType?.message}
          {...register("labelType")}
        />
        <AppInput
          label={`Quantity * (max ${formatNumber(ceiling, 0)})`}
          type="number"
          disabled={busy}
          error={errors.quantity?.message}
          {...register("quantity", { valueAsNumber: true })}
        />
        <AppInput
          label="Label Size (mm) *"
          type="number"
          step="any"
          disabled={busy}
          error={errors.labelSize?.message}
          {...register("labelSize", { valueAsNumber: true })}
        />
        <Controller
          control={control}
          name="rollLength"
          render={({ field: { value, onChange } }) => (
            <AppCombobox
              label="Roll Length (m) *"
              value={value ? Number(value) : 200}
              onChange={(v) => onChange(v ? Number(v) : 200)}
              options={ROLL_LENGTH_OPTIONS}
              placeholder="Select roll length…"
              disabled={busy}
              error={errors.rollLength?.message}
            />
          )}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Controller
          control={control}
          name="materialCode"
          render={({ field: { value, onChange } }) => (
            <MaterialSelect
              label="Material Code *"
              value={value || undefined}
              onChange={onChange}
              disabled={busy}
              error={errors.materialCode?.message}
            />
          )}
        />
        <AppInput
          label="Assigned Rolls"
          type="number"
          step="any"
          disabled={busy}
          error={errors.assignedRolls?.message}
          {...register("assignedRolls", { valueAsNumber: true })}
        />

        <AppInput
          label="Assigned Weight (kg)"
          type="number"
          step="any"
          disabled={busy}
          onChange={(e) => {
            const w = Number(e.target.value) || 0;
            const wPerRoll = material?.weightPerRoll || 0;
            if (wPerRoll > 0) {
              setValue("assignedRolls", Number((w / wPerRoll).toFixed(2)));
            }
          }}
          value={material?.weightPerRoll ? Number(((Number(assignedRolls) || 0) * material.weightPerRoll).toFixed(3)) : 0}
        />

        <Controller
          control={control}
          name="printingMachineId"
          render={({ field: { value, onChange } }) => (
            <AppCombobox
              label="Printing Machine *"
              value={value != null ? String(value) : undefined}
              onChange={(v) => onChange(v ? Number(v) : null)}
              options={printingMachines.map((m) => ({ value: String(m.id), label: m.name }))}
              placeholder="Select machine…"
              emptyText="No free printing machine."
              disabled={busy}
              error={errors.printingMachineId?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="printingOperatorId"
          render={({ field: { value, onChange } }) => (
            <AppCombobox
              label="Printing Operator *"
              value={value != null ? String(value) : undefined}
              onChange={(v) => onChange(v ? Number(v) : null)}
              options={printingOperators.map((o) => ({ value: String(o.id), label: o.name }))}
              placeholder="Select operator…"
              emptyText="No free printing operator."
              disabled={busy}
              error={errors.printingOperatorId?.message}
            />
          )}
        />
      </div>

      {material && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 rounded-md bg-muted/30 px-3 py-2 text-xs">
          <Stat label="Material Description" value={material.description ?? "—"} />
          <Stat label="Material Type" value={material.type} />
          <Stat label="Roll Weight (kg)" value={formatNumber(material.weightPerRoll, 4)} />
          <Stat
            label="Available in Inventory"
            value={available !== undefined ? `${formatNumber(available, 2)} rolls` : "No ledger"}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border/50 pt-3 text-xs">
        <Stat label="Required Rolls" value={formatNumber(required, 4)} />
        <Stat label="Total Weight (kg)" value={`${formatNumber(totalWeight, 3)} kg`} />
      </div>

      {insufficient && (
        <Warning>
          Inventory stock has only {formatNumber(available ?? 0, 0)} rolls of {materialCode} — cannot reserve{" "}
          {formatNumber(rollsToCheck, 0)} rolls required.
        </Warning>
      )}
      {overAllocated && (
        <Warning>
          Only {formatNumber(ceiling, 0)} of the order quantity is still unplanned.
        </Warning>
      )}

      <div className="flex justify-end gap-2 border-t pt-4">
        <AppButton type="button" variant="outline" disabled={busy} onClick={onCancel}>
          Cancel
        </AppButton>
        <AppButton type="submit" loading={busy} disabled={insufficient || overAllocated}>
          {editing ? "Save Changes" : "Plan & Reserve"}
        </AppButton>
      </div>
    </form>
  );

  if (isDialogContent) {
    return formContent;
  }

  return (
    <AppCard
      title={editing ? `Re-plan ${editing.labelType}` : "Plan a Label Type"}
      description="Submitting reserves the material, printing machine and printing operator for this label type until it completes or is cancelled."
    >
      {formContent}
    </AppCard>
  );
}

function Stat({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <span className="text-muted-foreground">
      {label}:{" "}
      <span className={cn("font-semibold tabular-nums", emphasis ? "text-primary" : "text-foreground")}>
        {value}
      </span>
    </span>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
      {children}
    </p>
  );
}
