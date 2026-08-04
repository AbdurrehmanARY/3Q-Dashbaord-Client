import React from "react";
import { AlertTriangle, Check, Pencil, X } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { AppButton } from "@/components/forms/AppButton";
import { Progress } from "@/components/ui/progress";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ProductionLineStatusBadge } from "./ProductionStatusBadge";
import { stickyCellClass } from "./progress-table-styles";
import type { LineDraft } from "../utils/line-draft";
import type { ProductionLineOverview } from "../types";

/** Only what the dropdowns render — the row never needs a full Machine/Operator record. */
export interface MachineOption {
  id: number;
  machineName: string;
}
export interface OperatorOption {
  id: number;
  name: string;
}

interface LabelTypeRowProps {
  line: ProductionLineOverview;
  isEditing: boolean;
  draft?: LineDraft;
  errors: Partial<Record<keyof LineDraft, string>>;
  isSaving: boolean;
  printingMachines: MachineOption[];
  cuttingMachines: MachineOption[];
  printingOperators: OperatorOption[];
  cuttingOperators: OperatorOption[];
  packagingOperators: OperatorOption[];
  onEdit: (line: ProductionLineOverview) => void;
  onCancel: () => void;
  onSave: (line: ProductionLineOverview) => void;
  onDraftChange: (field: keyof LineDraft, value: number | null) => void;
}

const EMPTY_ERRORS: Partial<Record<keyof LineDraft, string>> = {};

function NumberCell({
  value,
  error,
  onChange,
  max,
  disabled,
  disabledHint,
  ariaLabel,
}: {
  value: number;
  error?: string;
  onChange: (value: number) => void;
  max?: number;
  disabled?: boolean;
  disabledHint?: string;
  ariaLabel?: string;
}) {
  return (
    <div className="min-w-[84px]">
      <input
        type="number"
        step="any"
        min={0}
        max={max}
        disabled={disabled}
        aria-label={ariaLabel}
        title={disabled ? disabledHint : undefined}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2 py-1 text-right text-sm tabular-nums transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
          disabled && "cursor-not-allowed bg-muted/50 text-muted-foreground",
          error && "border-destructive focus-visible:ring-destructive/40"
        )}
      />
      {error && <p className="mt-0.5 text-[10px] font-medium leading-tight text-destructive">{error}</p>}
    </div>
  );
}

function SelectCell({
  value,
  options,
  onChange,
  placeholder = "Unassigned",
  ariaLabel,
}: {
  value: number | null;
  options: { id: number; label: string }[];
  onChange: (value: number | null) => void;
  placeholder?: string;
  ariaLabel?: string;
}) {
  return (
    <select
      value={value ?? ""}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      className="h-8 w-full min-w-[130px] rounded-lg border border-input bg-background px-2 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/**
 * One row of the Production Progress table. Memoized so that editing one row never
 * re-renders its siblings — `draft`/`errors` are only ever non-empty for the row
 * currently being edited, so every other row's props stay referentially stable.
 */
export const LabelTypeRow = React.memo(function LabelTypeRow({
  line,
  isEditing,
  draft,
  errors,
  isSaving,
  printingMachines,
  cuttingMachines,
  printingOperators,
  cuttingOperators,
  packagingOperators,
  onEdit,
  onCancel,
  onSave,
  onDraftChange,
}: LabelTypeRowProps) {
  const machineOptions = (machines: MachineOption[]) =>
    machines.map((m) => ({ id: Number(m.id), label: m.machineName }));
  const operatorOptions = (operators: OperatorOption[]) =>
    operators.map((o) => ({ id: Number(o.id), label: o.name }));

  const hasErrors = Object.keys(errors).length > 0;

  // Step 3 of the workflow: no production quantity can be entered until the printing
  // machine and operator are assigned. Editing the assignment itself stays enabled —
  // that is how the row gets unblocked.
  const assigned = draft
    ? draft.printingMachineId != null && draft.printingOperatorId != null
    : line.readiness.canStart;
  const quantityLock = {
    disabled: !assigned,
    disabledHint: "Assign a printing machine and operator first",
  };

  return (
    <TableRow className={cn("bg-card", isEditing && "bg-primary/5")}>
      {/* Frozen identity column — stays visible while the stage columns scroll. */}
      <TableCell className={cn("min-w-[160px] align-top", stickyCellClass("first", { editing: isEditing }))}>
        <p className="font-medium leading-tight">{line.labelType}</p>
        <div className="mt-1">
          <ProductionLineStatusBadge status={line.status} />
        </div>
        {/* Workflow steps 3-5 gate step 6 — surfaced here so the block is visible before
            the operator types a count and gets rejected. */}
        {!line.readiness.canStart && (
          <p className="mt-1 flex items-start gap-1 text-[10px] font-medium leading-tight text-warning">
            <AlertTriangle className="mt-px h-3 w-3 shrink-0" />
            Needs {line.readiness.missing.join(", ")}
          </p>
        )}
      </TableCell>

      {/* Planned rolls = totalRolls, the ceiling set during planning — read-only here. */}
      <TableCell className="whitespace-nowrap text-right tabular-nums text-muted-foreground">
        {formatNumber(line.planning.totalRolls, 2)}
      </TableCell>

      <TableCell className="text-right">
        {isEditing && draft ? (
          <NumberCell
            value={draft.printedRolls}
            ariaLabel={`Printed rolls for ${line.labelType}`}
            error={errors.printedRolls}
            onChange={(v) => onDraftChange("printedRolls", v)}
            {...quantityLock}
            max={line.planning.totalRolls}
          />
        ) : (
          <span className="tabular-nums">{formatNumber(line.printing.printedRolls, 2)}</span>
        )}
      </TableCell>

      <TableCell>
        {isEditing && draft ? (
          <SelectCell
            value={draft.printingMachineId}
            ariaLabel={`Printing machine for ${line.labelType}`}
            options={machineOptions(printingMachines)}
            onChange={(v) => onDraftChange("printingMachineId", v)}
          />
        ) : (
          <span className="text-muted-foreground">{line.printing.machineName ?? "Unassigned"}</span>
        )}
      </TableCell>

      <TableCell>
        {isEditing && draft ? (
          <SelectCell
            value={draft.printingOperatorId}
            ariaLabel={`Printing operator for ${line.labelType}`}
            options={operatorOptions(printingOperators)}
            onChange={(v) => onDraftChange("printingOperatorId", v)}
          />
        ) : (
          <span className="text-muted-foreground">{line.printing.operatorName ?? "Unassigned"}</span>
        )}
      </TableCell>

      <TableCell className="text-right">
        {isEditing && draft ? (
          <NumberCell
            value={draft.sentToCuttingRolls}
            ariaLabel={`Rolls sent to cutting for ${line.labelType}`}
            error={errors.sentToCuttingRolls}
            onChange={(v) => onDraftChange("sentToCuttingRolls", v)}
            {...quantityLock}
            max={draft.printedRolls}
          />
        ) : (
          <span className="tabular-nums">{formatNumber(line.cutting.sentToCuttingRolls, 2)}</span>
        )}
      </TableCell>

      <TableCell className="text-right">
        {isEditing && draft ? (
          <NumberCell
            value={draft.cutRolls}
            ariaLabel={`Cut rolls for ${line.labelType}`}
            error={errors.cutRolls}
            onChange={(v) => onDraftChange("cutRolls", v)}
            {...quantityLock}
            max={draft.sentToCuttingRolls}
          />
        ) : (
          <span className="tabular-nums">{formatNumber(line.cutting.cutRolls, 2)}</span>
        )}
      </TableCell>

      <TableCell>
        {isEditing && draft ? (
          <SelectCell
            value={draft.cuttingMachineId}
            ariaLabel={`Cutting machine for ${line.labelType}`}
            options={machineOptions(cuttingMachines)}
            onChange={(v) => onDraftChange("cuttingMachineId", v)}
          />
        ) : (
          <span className="text-muted-foreground">{line.cutting.machineName ?? "Unassigned"}</span>
        )}
      </TableCell>

      <TableCell>
        {isEditing && draft ? (
          <SelectCell
            value={draft.cuttingOperatorId}
            ariaLabel={`Cutting operator for ${line.labelType}`}
            options={operatorOptions(cuttingOperators)}
            onChange={(v) => onDraftChange("cuttingOperatorId", v)}
          />
        ) : (
          <span className="text-muted-foreground">{line.cutting.operatorName ?? "Unassigned"}</span>
        )}
      </TableCell>

      <TableCell className="text-right">
        {isEditing && draft ? (
          <NumberCell
            value={draft.sentToPackagingRolls}
            ariaLabel={`Rolls sent to packaging for ${line.labelType}`}
            error={errors.sentToPackagingRolls}
            onChange={(v) => onDraftChange("sentToPackagingRolls", v)}
            {...quantityLock}
            max={draft.cutRolls}
          />
        ) : (
          <span className="tabular-nums">{formatNumber(line.packaging.sentToPackagingRolls, 2)}</span>
        )}
      </TableCell>

      <TableCell className="text-right">
        {isEditing && draft ? (
          <NumberCell
            value={draft.packagedRolls}
            ariaLabel={`Packaged rolls for ${line.labelType}`}
            error={errors.packagedRolls}
            onChange={(v) => onDraftChange("packagedRolls", v)}
            {...quantityLock}
            max={draft.sentToPackagingRolls}
          />
        ) : (
          <span className="tabular-nums">{formatNumber(line.packaging.packagedRolls, 2)}</span>
        )}
      </TableCell>

      <TableCell className="text-right">
        {isEditing && draft ? (
          <NumberCell
            value={draft.packagedQty}
            ariaLabel={`Packaged quantity for ${line.labelType}`}
            error={errors.packagedQty}
            onChange={(v) => onDraftChange("packagedQty", v)}
            {...quantityLock}
            max={line.planning.quantity}
          />
        ) : (
          <span className="tabular-nums">{formatNumber(line.packaging.packagedQty, 0)}</span>
        )}
      </TableCell>

      <TableCell>
        {isEditing && draft ? (
          <SelectCell
            value={draft.packagingOperatorId}
            ariaLabel={`Packaging operator for ${line.labelType}`}
            options={operatorOptions(packagingOperators)}
            onChange={(v) => onDraftChange("packagingOperatorId", v)}
          />
        ) : (
          <span className="text-muted-foreground">{line.packaging.operatorName ?? "Unassigned"}</span>
        )}
      </TableCell>

      <TableCell className="min-w-[110px]">
        <div className="space-y-1">
          <Progress value={line.liveProgress.completionPct} />
          <span className="text-xs tabular-nums text-muted-foreground">
            {line.liveProgress.completionPct}%
          </span>
        </div>
      </TableCell>

      {/* Frozen actions column — Save/Cancel stay reachable without scrolling back. */}
      <TableCell className={cn("min-w-[104px]", stickyCellClass("last", { editing: isEditing }))}>
        {isEditing ? (
          <div className="flex items-center justify-end gap-1.5">
            <AppButton
              size="sm"
              className="h-7 px-2"
              loading={isSaving}
              disabled={hasErrors}
              onClick={() => onSave(line)}
              aria-label={`Save ${line.labelType}`}
            >
              <Check className="h-3.5 w-3.5" />
            </AppButton>
            <AppButton
              size="sm"
              variant="outline"
              className="h-7 px-2"
              disabled={isSaving}
              onClick={onCancel}
              aria-label={`Cancel editing ${line.labelType}`}
            >
              <X className="h-3.5 w-3.5" />
            </AppButton>
          </div>
        ) : (
          <div className="flex justify-end">
            <AppButton
              size="sm"
              variant="ghost"
              className="h-7 px-2"
              onClick={() => onEdit(line)}
              aria-label={`Edit ${line.labelType}`}
            >
              <Pencil className="h-3.5 w-3.5" />
            </AppButton>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
});
