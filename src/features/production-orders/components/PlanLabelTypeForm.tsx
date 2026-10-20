import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ChevronDown, Plus, Trash2 } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { MaterialSelect, useMaterials } from "@/features/materials";
import { useInventoryStock } from "@/features/inventory";
import { useThreadStocks } from "@/features/thread";
import {
  formatNumber,
  calculateRequiredRolls,
  calculateTotalRolls,
  calculateTotalWeight,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import { printedPlanFormSchema, wovenPlanFormSchema } from "../schemas/production-order-schemas";
import type { PlanLineInput, ProductType, ProductionLineOverview } from "../types";
import type { PlanWovenInput, WovenLineOverview } from "../woven-types";
import { SizePlanEditor } from "./SizePlanEditor";
import { LABEL_TYPES, isSizeLabel, type SizePlan } from "../label-types";
import {
  allocateSharedThreads,
  cumulativeStockIssues,
  duplicateRowIndexes,
  labelTypeTaken,
  sizePlanTotal,
  toNumber,
  totalPlannedQuantity,
} from "../utils/planning-rows";
import {
  SharedThreadAllocation,
  emptyThreadAllocationRow,
  threadAllocationRowErrors,
  threadAllocationToThreads,
  threadsToAllocationRows,
  type ThreadAllocationRow,
  type ThreadStockLike,
} from "./SharedThreadAllocation";

/**
 * The single planning payload every caller receives: printed rows are ready-made
 * `PlanLineInput`s; woven rows are `PlanWovenInput`s whose `threads` already carry that
 * row's share of the ONE shared allocation (see `allocateSharedThreads`).
 */
export type PlanFormSubmitPayload =
  | { type: "printed"; rows: PlanLineInput[] }
  | { type: "woven"; rows: PlanWovenInput[] };

/** One row of the form. The woven workflow reads only `labelType`, `quantity` and `sizes`. */
interface PlanRowValues {
  labelType: string;
  quantity: number;
  sizes: SizePlan[];
  labelSize: number;
  rollLength: number;
  extraRolls: number;
  assignedRolls: number;
  materialCode: string;
  printingMachineId: number | null;
  printingOperatorId: number | null;
}

interface PlanFormValues {
  rows: PlanRowValues[];
}

interface PlanLabelTypeFormProps {
  /** Which workflow is being planned — the only thing that decides the fields shown. */
  type: ProductType;
  /** Quantity still unplanned across the order; the ceiling for the WHOLE plan. */
  remainingQty: number;
  /** Set when re-planning an existing record; null when planning new rows. */
  editing: ProductionLineOverview | WovenLineOverview | null;
  /** Opening quantity for a new woven row (the printed form opens blank, as before). */
  defaultQuantity?: number;
  saving: boolean;
  onSubmit: (payload: PlanFormSubmitPayload) => Promise<void>;
  onCancel: () => void;
  isDialogContent?: boolean;
}

const ROLL_LENGTH_OPTIONS = [
  { value: 100, label: "100 m" },
  { value: 200, label: "200 m" },
  { value: 400, label: "400 m" },
];

const EMPTY_ROW: PlanRowValues = {
  labelType: "",
  quantity: 0,
  sizes: [],
  labelSize: 0,
  rollLength: 200,
  extraRolls: 0,
  assignedRolls: 0,
  materialCode: "",
  printingMachineId: null,
  printingOperatorId: null,
};

/** The row a form opens with: the edited record's values, or a blank/new woven row. */
function initialRow(
  type: ProductType,
  editing: ProductionLineOverview | WovenLineOverview | null,
  defaultQuantity = 0
): PlanRowValues {
  if (!editing) {
    return type === "woven" ? { ...EMPTY_ROW, quantity: defaultQuantity } : { ...EMPTY_ROW };
  }
  if (type === "woven") {
    const line = editing as WovenLineOverview;
    return {
      ...EMPTY_ROW,
      labelType: line.labelType,
      quantity: toNumber(line.quantity),
      sizes: line.sizes ?? [],
    };
  }
  const line = editing as ProductionLineOverview;
  return {
    ...EMPTY_ROW,
    labelType: line.labelType,
    quantity: toNumber(line.planning.quantity),
    sizes: line.planning.sizes ?? [],
    labelSize: toNumber(line.planning.labelSize),
    rollLength: toNumber(line.planning.rollLength) || 200,
    extraRolls: toNumber(line.planning.extraRolls),
    materialCode: line.material.materialCode ?? "",
    assignedRolls: toNumber(line.material.assignedRolls),
    printingMachineId: line.printing.machineId,
    printingOperatorId: line.printing.operatorId,
  };
}

/** Rolls a row will draw — the manual figure when given, else ROUNDUP(required + extra). */
function rowTotalRolls(row: PlanRowValues): number {
  const assigned = toNumber(row.assignedRolls);
  if (assigned > 0) return assigned;
  const required = calculateRequiredRolls(
    toNumber(row.quantity),
    toNumber(row.labelSize),
    toNumber(row.rollLength) || 200
  );
  return calculateTotalRolls(required, toNumber(row.extraRolls));
}

function Stat({
  label,
  value,
  emphasis,
  status,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  status?: "good" | "bad";
}) {
  const statusColor =
    status === "good"
      ? "text-emerald-600 dark:text-emerald-400"
      : status === "bad"
      ? "text-destructive font-bold"
      : emphasis
      ? "text-primary font-bold"
      : "text-foreground font-semibold";

  return (
    <span className="text-muted-foreground">
      {label}: <span className={cn("tabular-nums", statusColor)}>{value}</span>
    </span>
  );
}

function Warning({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
      {children}
    </p>
  );
}

/**
 * Plans one or MORE label types in a single operation, for either workflow.
 *
 * The workflow is decided by `type` alone — never by the shape of `editing`:
 *   printed — label type, quantity, sizes, label size, roll length, material, assigned rolls
 *   woven   — label type, quantity, sizes, plus ONE shared thread allocation for the plan
 */
export function PlanLabelTypeForm({
  type,
  remainingQty,
  editing,
  defaultQuantity,
  saving,
  onSubmit,
  onCancel,
  isDialogContent,
}: PlanLabelTypeFormProps) {
  const isWoven = type === "woven";
  const isEditing = !!editing;

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormValues>({
    // One resolver, swapped by workflow — each schema is the existing single-line rules plus
    // the plan-level uniqueness check, so no validation is weakened or duplicated.
    resolver: zodResolver(isWoven ? wovenPlanFormSchema : printedPlanFormSchema) as any,
    defaultValues: { rows: [initialRow(type, editing, defaultQuantity)] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "rows" });

  /** The ONE shared allocation — woven only, held outside RHF exactly like the woven form did. */
  const [allocation, setAllocation] = useState<ThreadAllocationRow[]>(() =>
    isWoven && editing
      ? threadsToAllocationRows((editing as WovenLineOverview).planning.threads)
      : [emptyThreadAllocationRow(0)]
  );

  /** Which row's details are open. Row 1 opens by default so fields are never hidden. */
  const [openRow, setOpenRow] = useState<number | null>(0);

  const { data: materials } = useMaterials();
  const { data: stock } = useInventoryStock();
  const { data: threadStocks } = useThreadStocks();

  useEffect(() => {
    reset({ rows: [initialRow(type, editing, defaultQuantity)] });
    setAllocation(
      isWoven && editing
        ? threadsToAllocationRows((editing as WovenLineOverview).planning.threads)
        : [emptyThreadAllocationRow(0)]
    );
    setOpenRow(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, editing, defaultQuantity, reset]);

  const watched = useWatch({ control, name: "rows" }) as PlanRowValues[] | undefined;
  const rowValues = useMemo(() => watched ?? [], [watched]);

  /* ---- Printed lookups: material metadata + stock balances, keyed by material code ---- */
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

  /**
   * Re-planning frees whatever the edited record still holds of its material, so its own
   * reservation counts as available again (printed only — woven draws thread, not rolls).
   */
  const availableByCode = useMemo(() => {
    const map = new Map(balanceByCode);
    if (!isWoven && editing) {
      const line = editing as ProductionLineOverview;
      const code = line.material.materialCode;
      if (code) map.set(code, (map.get(code) ?? 0) + toNumber(line.material.assignedRolls));
    }
    return map;
  }, [balanceByCode, editing, isWoven]);

  /* ---- Plan-level gates ---- */
  const plannedTotal = totalPlannedQuantity(rowValues);
  const ceiling =
    remainingQty +
    (editing
      ? isWoven
        ? toNumber((editing as WovenLineOverview).quantity)
        : toNumber((editing as ProductionLineOverview).planning.quantity)
      : 0);
  const overAllocated = plannedTotal > ceiling;

  const duplicateIndexes = duplicateRowIndexes(rowValues);
  const hasDuplicate = duplicateIndexes.length > 0;

  // Woven: a Size Label's sizes must add up to its quantity (the server's rule, previewed).
  const sizeIssues = isWoven
    ? rowValues
        .map((row, i) => {
          if (!isSizeLabel(row.labelType)) return null;
          const sizes = row.sizes ?? [];
          if (sizes.length === 0) return i;
          return sizePlanTotal(sizes) === toNumber(row.quantity) ? null : i;
        })
        .filter((i): i is number => i !== null)
    : [];

  // Printed: rows drawing the same material are checked against the CUMULATIVE requirement,
  // because inventory is drawn row by row on submit.
  const stockIssues = isWoven
    ? []
    : cumulativeStockIssues(
        rowValues.map((row) => ({ ...row, totalRolls: rowTotalRolls(row) })),
        availableByCode
      );

  const allocationErrors = isWoven
    ? threadAllocationRowErrors(allocation, (threadStocks ?? []) as ThreadStockLike[])
    : [];
  const allocationIncomplete = allocationErrors.some(Boolean);
  const threadsForSubmit = isWoven ? threadAllocationToThreads(allocation) : [];
  // Several label types share ONE allocation, so it is split by quantity; a single line
  // (including every re-plan) keeps the allocation whole.
  const split =
    isWoven && !isEditing && rowValues.length > 1
      ? allocateSharedThreads(threadsForSubmit, rowValues)
      : null;
  const splitImpossible = isWoven && !isEditing && rowValues.length > 1 && split === null;

  const busy = saving || isSubmitting;
  const blocked =
    overAllocated ||
    hasDuplicate ||
    stockIssues.length > 0 ||
    sizeIssues.length > 0 ||
    (isWoven && (allocationIncomplete || splitImpossible));

  const submit = handleSubmit(async (values) => {
    const planRows = values.rows ?? [];

    if (isWoven) {
      const rowsWithoutThreads = planRows.map((row) => ({
        labelType: row.labelType.trim(),
        quantity: toNumber(row.quantity),
        sizes: isSizeLabel(row.labelType) ? row.sizes ?? [] : [],
      }));
      const threads = threadAllocationToThreads(allocation);
      const shares =
        !isEditing && rowsWithoutThreads.length > 1
          ? allocateSharedThreads(threads, rowsWithoutThreads)
          : null;
      const wovenRows: PlanWovenInput[] = shares
        ? rowsWithoutThreads.map((row, i) => ({ ...row, threads: shares[i] }))
        : rowsWithoutThreads.map((row) => ({ ...row, threads }));
      await onSubmit({ type: "woven", rows: wovenRows });
      return;
    }

    const printedRows: PlanLineInput[] = planRows.map((row) => ({
      labelType: row.labelType.trim(),
      quantity: toNumber(row.quantity),
      sizes: isSizeLabel(row.labelType) ? row.sizes ?? [] : [],
      labelSize: toNumber(row.labelSize),
      rollLength: toNumber(row.rollLength) || 200,
      extraRolls: toNumber(row.extraRolls),
      materialCode: row.materialCode,
      assignedRolls: rowTotalRolls(row),
      printingMachineId: row.printingMachineId ?? null,
      printingOperatorId: row.printingOperatorId ?? null,
    }));
    await onSubmit({ type: "printed", rows: printedRows });
  });

  /* ---- Auto-fill each printed row's assigned rolls from its own calculated total ---- */
  useEffect(() => {
    if (isWoven) return;
    rowValues.forEach((row, i) => {
      const calculated = calculateTotalRolls(
        calculateRequiredRolls(
          toNumber(row.quantity),
          toNumber(row.labelSize),
          toNumber(row.rollLength) || 200
        ),
        toNumber(row.extraRolls)
      );
      if (calculated > 0 && !(toNumber(row.assignedRolls) > 0)) {
        setValue(`rows.${i}.assignedRolls` as const, calculated);
      }
    });
  }, [rowValues, isWoven, setValue]);

  const formContent = (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">Label Types</p>
            <p className="text-xs text-muted-foreground">
              {isWoven
                ? "Plan every woven label type for this order — the thread allocation below is shared by all of them."
                : "Plan every printed label type in one go. Each row reserves its own material and rolls."}
            </p>
          </div>
          {!isEditing && (
            <AppButton
              type="button"
              size="sm"
              variant="outline"
              leftIcon={<Plus className="h-4 w-4" />}
              disabled={busy || fields.length >= LABEL_TYPES.length}
              onClick={() => {
                append({ ...EMPTY_ROW });
                setOpenRow(fields.length);
              }}
            >
              Add Label Type
            </AppButton>
          )}
        </div>

        {fields.map((field, index) => {
          const row = rowValues[index] ?? EMPTY_ROW;
          const rowErrors = errors.rows?.[index];
          const isOpen = openRow === index;
          const isDuplicate = duplicateIndexes.includes(index);
          const hasSizeIssue = sizeIssues.includes(index);
          const rolls = isWoven ? 0 : rowTotalRolls(row);
          const otherRows = rowValues.filter((_, i) => i !== index);

          return (
            <div
              key={field.id}
              className={cn(
                "rounded-lg border bg-background p-3",
                (isDuplicate || hasSizeIssue) && "border-destructive/50"
              )}
            >
              <div className="grid items-end gap-3 sm:grid-cols-[1.6fr_1fr_auto_auto]">
                <Controller
                  control={control}
                  name={`rows.${index}.labelType` as const}
                  render={({ field: { value, onChange } }) => (
                    <AppSelect
                      label={index === 0 ? "Label Type *" : undefined}
                      placeholder="Select…"
                      disabled={busy}
                      error={rowErrors?.labelType?.message}
                      options={[
                        { value: "", label: "Select a label type…", disabled: true },
                        // A label type already claimed by another row is filtered out of this
                        // row's select, so a duplicate cannot be entered in the first place.
                        ...LABEL_TYPES.filter((t) => !labelTypeTaken(t, otherRows)).map((t) => ({
                          value: t,
                          label: t,
                        })),
                      ]}
                      value={value ?? ""}
                      onChange={(e) => {
                        onChange(e);
                        if (!isSizeLabel(e.target.value)) {
                          setValue(`rows.${index}.sizes` as const, []);
                        }
                      }}
                      aria-label={`Label type for row ${index + 1}`}
                    />
                  )}
                />

                <AppInput
                  label={index === 0 ? `Qty * (max ${formatNumber(ceiling, 0)})` : undefined}
                  type="number"
                  step="1"
                  disabled={busy}
                  error={rowErrors?.quantity?.message}
                  {...register(`rows.${index}.quantity` as const, { valueAsNumber: true })}
                />

                <div className="flex items-end gap-1 pb-0.5">
                  <AppButton
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-9 px-2"
                    aria-label={`${isOpen ? "Hide" : "Show"} details for row ${index + 1}`}
                    onClick={() => setOpenRow(isOpen ? null : index)}
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                  </AppButton>
                  <AppButton
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-9 px-2 text-destructive"
                    aria-label={`Remove label type ${index + 1}`}
                    disabled={busy || fields.length === 1}
                    onClick={() => {
                      remove(index);
                      setOpenRow(0);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </AppButton>
                </div>
              </div>

              {!isOpen && !isWoven && (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {row.materialCode ? `${row.materialCode} · ` : "Material not set · "}
                  {formatNumber(rolls, 2)} rolls to reserve
                </p>
              )}

              {isOpen && (
                <div className="mt-3 space-y-3 border-t pt-3">
                  {isWoven ? (
                    isSizeLabel(row.labelType) && (
                      <SizePlanEditor
                        value={row.sizes ?? []}
                        onChange={(next) => setValue(`rows.${index}.sizes` as const, next)}
                        totalQuantity={toNumber(row.quantity)}
                        disabled={busy}
                        error={
                          hasSizeIssue
                            ? `Sizes must sum to ${formatNumber(toNumber(row.quantity), 0)} pcs`
                            : undefined
                        }
                      />
                    )
                  ) : (
                    (() => {
                      const material = materialByCode.get(row.materialCode || "");
                      const required = calculateRequiredRolls(
                        toNumber(row.quantity),
                        toNumber(row.labelSize),
                        toNumber(row.rollLength) || 200
                      );
                      const calculatedTotal = calculateTotalRolls(required, toNumber(row.extraRolls));
                      const totalRolls = rowTotalRolls(row);
                      const totalWeight = calculateTotalWeight(material?.weightPerRoll ?? 0, totalRolls);
                      const available = row.materialCode ? availableByCode.get(row.materialCode) : undefined;
                      const projectedRemaining = (available ?? 0) - totalRolls;
                      const insufficient =
                        !!row.materialCode && totalRolls > 0 && (available ?? 0) < totalRolls;

                      return (
                        <>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {isSizeLabel(row.labelType) && (
                              <div className="sm:col-span-2 lg:col-span-4">
                                <SizePlanEditor
                                  value={row.sizes ?? []}
                                  onChange={(next) => setValue(`rows.${index}.sizes` as const, next)}
                                  totalQuantity={toNumber(row.quantity)}
                                  disabled={busy}
                                />
                              </div>
                            )}

                            <AppInput
                              label="Label Size (mm) *"
                              type="number"
                              step="any"
                              disabled={busy}
                              error={errors.rows?.[index]?.labelSize?.message}
                              {...register(`rows.${index}.labelSize` as const, { valueAsNumber: true })}
                            />

                            <Controller
                              control={control}
                              name={`rows.${index}.rollLength` as const}
                              render={({ field: { value, onChange } }) => (
                                <AppCombobox
                                  label="Roll Length (m) *"
                                  value={value ? Number(value) : 200}
                                  onChange={(v) => onChange(v ? Number(v) : 200)}
                                  options={ROLL_LENGTH_OPTIONS}
                                  placeholder="Select roll length…"
                                  disabled={busy}
                                  error={errors.rows?.[index]?.rollLength?.message}
                                />
                              )}
                            />
                          </div>
                          <div className="grid gap-4 sm:grid-cols-3">
                            <Controller
                              control={control}
                              name={`rows.${index}.materialCode` as const}
                              render={({ field: { value, onChange } }) => (
                                <MaterialSelect
                                  label="Material Code *"
                                  value={value || undefined}
                                  onChange={onChange}
                                  disabled={busy}
                                  error={errors.rows?.[index]?.materialCode?.message}
                                />
                              )}
                            />

                            <AppInput
                              label="Assigned Rolls *"
                              type="number"
                              step="any"
                              disabled={busy}
                              error={errors.rows?.[index]?.assignedRolls?.message}
                              {...register(`rows.${index}.assignedRolls` as const, { valueAsNumber: true })}
                            />

                            <AppInput
                              label="Assigned Weight (kg)"
                              type="number"
                              step="any"
                              disabled={busy}
                              onChange={(e) => {
                                const weight = Number(e.target.value) || 0;
                                const perRoll = material?.weightPerRoll || 0;
                                if (perRoll > 0) {
                                  setValue(
                                    `rows.${index}.assignedRolls` as const,
                                    Number((weight / perRoll).toFixed(2))
                                  );
                                }
                              }}
                              value={
                                material?.weightPerRoll
                                  ? Number((totalRolls * material.weightPerRoll).toFixed(3))
                                  : 0
                              }
                            />
                          </div>

                          {material && (
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 rounded-lg border border-border bg-muted/30 px-3.5 py-2.5 text-xs">
                              <Stat label="Material Description" value={material.description ?? "—"} />
                              <Stat label="Material Type" value={material.type} />
                              <Stat label="Roll Weight" value={`${formatNumber(material.weightPerRoll, 4)} kg/roll`} />
                              <Stat
                                label="Available Stock"
                                value={`${formatNumber(available ?? 0, 2)} rolls`}
                                emphasis
                              />
                              <Stat
                                label="Projected Stock After Plan"
                                value={`${formatNumber(projectedRemaining, 2)} rolls`}
                                status={projectedRemaining >= 0 ? "good" : "bad"}
                              />
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border/50 pt-3 text-xs">
                            <Stat label="Required Rolls" value={formatNumber(required, 4)} />
                            <Stat label="Total Rolls to Reserve" value={`${formatNumber(totalRolls, 2)} rolls`} emphasis />
                            <Stat label="Total Weight" value={`${formatNumber(totalWeight, 3)} kg`} />
                          </div>

                          {insufficient && (
                            <Warning>
                              Inventory stock balance has only {formatNumber(available ?? 0, 2)} rolls of{" "}
                              {row.materialCode} — cannot reserve {formatNumber(totalRolls, 2)} rolls for this label
                              type. Reduce assigned rolls or receive more stock.
                            </Warning>
                          )}
                          {toNumber(row.quantity) > ceiling && (
                            <Warning>
                              Only {formatNumber(ceiling, 0)} of the order quantity can still be planned in total.
                            </Warning>
                          )}
                        </>
                      );
                    })()
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isWoven && (
        <SharedThreadAllocation
          rows={allocation}
          onChange={setAllocation}
          labelRows={rowValues.map((r) => ({ labelType: r.labelType, quantity: r.quantity }))}
          disabled={busy}
        />
      )}
      <div className="space-y-2 border-t pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            {rowValues.length} label type{rowValues.length === 1 ? "" : "s"} · Total planned:{" "}
            <strong className="tabular-nums text-foreground">{formatNumber(plannedTotal, 0)}</strong> of{" "}
            <strong className="tabular-nums text-foreground">{formatNumber(ceiling, 0)}</strong> pcs
          </span>
          {isWoven && (
            <span className="text-muted-foreground">
              Shared allocation:{" "}
              <strong className="tabular-nums text-foreground">
                {formatNumber(
                  threadsForSubmit.reduce((n, t) => n + Number(t.weightKg), 0),
                  3
                )}{" "}
                kg
              </strong>
              {rowValues.length > 1 ? " split across every label type" : ""}
            </span>
          )}
        </div>

        {overAllocated && (
          <Warning>
            Only {formatNumber(ceiling, 0)} of the order quantity is still unplanned in total.
          </Warning>
        )}
        {hasDuplicate && <Warning>A label type is planned more than once — remove the duplicate row.</Warning>}
        {stockIssues.map((issue) => (
          <Warning key={`stock-${issue.index}-${issue.materialCode}`}>
            {issue.materialCode} needs {formatNumber(issue.required, 2)} rolls across this plan but only{" "}
            {formatNumber(issue.available, 2)} are in stock.
          </Warning>
        ))}
        {sizeIssues.length > 0 && (
          <Warning>A Size Label's planned sizes must add up to that label type's quantity.</Warning>
        )}
        {isWoven && splitImpossible && (
          <Warning>
            The shared thread allocation cannot be split across these label types — check every colour weight and
            quantity.
          </Warning>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <AppButton type="submit" loading={busy} disabled={blocked}>
            {isEditing ? (isWoven ? "Save Plan" : "Save Changes") : isWoven ? "Plan & Reserve Thread" : "Plan & Reserve"}
          </AppButton>
          <AppButton type="button" variant="outline" disabled={busy} onClick={onCancel}>
            Cancel
          </AppButton>
        </div>
      </div>
    </form>
  );

  if (isDialogContent) {
    return formContent;
  }

  return (
    <AppCard
      title={
        isEditing
          ? `Re-plan ${editing?.labelType ?? "Label Type"}`
          : isWoven
          ? "Woven Production Plan"
          : "Printed Production Plan"
      }
      description={
        isWoven
          ? "Name every label type and allocate thread ONCE for the whole plan. Submitting reserves the thread from stock."
          : "Submitting reserves the material stock from inventory for each label type in the plan."
      }
    >
      {formContent}
    </AppCard>
  );
}
