import React from "react";
import { AlertTriangle, Check, Pencil, Sliders, X } from "lucide-react";
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
  visibleColumns?: Record<string, boolean>;
  onEdit: (line: ProductionLineOverview) => void;
  onEditPlan?: (line: ProductionLineOverview) => void;
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
  error,
}: {
  value: number | null;
  options: { id: number; label: string }[];
  onChange: (value: number | null) => void;
  placeholder?: string;
  ariaLabel?: string;
  error?: string;
}) {
  return (
    <div>
      <select
        value={value ?? ""}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        className={cn(
          "h-8 w-full min-w-[130px] rounded-lg border bg-background px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          error
            ? "border-destructive focus-visible:border-destructive text-destructive"
            : "border-input focus-visible:border-ring"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-0.5 text-[10px] font-medium text-destructive">{error}</p>}
    </div>
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
  visibleColumns,
  onEdit,
  onEditPlan,
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

  // Real-time stage deduction & buffer calculations
  const printedVal = isEditing && draft ? draft.printedRolls : line.printing.printedRolls;
  const sentCutVal = isEditing && draft ? draft.sentToCuttingRolls : line.cutting.sentToCuttingRolls;
  const cutVal = isEditing && draft ? draft.cutRolls : line.cutting.cutRolls;
  const sentPkgVal = isEditing && draft ? draft.sentToPackagingRolls : line.packaging.sentToPackagingRolls;
  const pkgVal = isEditing && draft ? draft.packagedRolls : line.packaging.packagedRolls;

  const unprintedBal = Math.max(line.planning.totalRolls - printedVal, 0);
  const waitingForCut = Math.max(printedVal - sentCutVal, 0);
  const inCutting = Math.max(sentCutVal - cutVal, 0);
  const waitingForPkg = Math.max(cutVal - sentPkgVal, 0);
  const inPkg = Math.max(sentPkgVal - pkgVal, 0);
  const isVisible = (id: string) => visibleColumns?.[id] !== false;

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
      {isVisible("plannedRolls") && (
        <TableCell className="whitespace-nowrap text-right tabular-nums text-muted-foreground align-top pt-3">
          {formatNumber(line.planning.totalRolls, 2)}
        </TableCell>
      )}

      {/* Printing (Unprinted) = totalRolls - printedRolls. Starts at totalRolls (e.g. 38) when planned/assigned! */}
      {isVisible("unprinted") && (
        <TableCell className="whitespace-nowrap text-right tabular-nums align-top pt-3 font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/20">
          {formatNumber(unprintedBal, 2)}
        </TableCell>
      )}

      {/* Printed: displays Net Printed Balance (printedRolls - sentToCuttingRolls). Deducts to 0 when sent to cutting! */}
      {isVisible("printed") && (
        <TableCell className="text-right align-top pt-3">
          {isEditing && draft ? (
            <div>
              <NumberCell
                value={draft.printedRolls}
                ariaLabel={`Printed rolls for ${line.labelType}`}
                error={errors.printedRolls}
                onChange={(v) => onDraftChange("printedRolls", v)}
                {...quantityLock}
                max={line.planning.totalRolls}
              />
              <div className="mt-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                Net Printed: {formatNumber(waitingForCut, 2)}
              </div>
            </div>
          ) : (
            <div>
              <span className="tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                {formatNumber(waitingForCut, 2)}
              </span>
              <div className="text-[10px] text-muted-foreground">
                Total Printed: {formatNumber(line.printing.printedRolls, 2)}
              </div>
            </div>
          )}
        </TableCell>
      )}

      {isVisible("printingMachine") && (
        <TableCell className="align-top pt-3">
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
      )}

      {isVisible("printingOperator") && (
        <TableCell className="align-top pt-3">
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
      )}

      {/* Sent to Cutting: displays Net Cutting balance (sentToCuttingRolls - cutRolls). Deducts to 0 when cut! */}
      {isVisible("sentToCutting") && (
        <TableCell className="text-right align-top pt-3">
          {isEditing && draft ? (
            <div>
              <NumberCell
                value={draft.sentToCuttingRolls}
                ariaLabel={`Rolls sent to cutting for ${line.labelType}`}
                error={errors.sentToCuttingRolls}
                onChange={(v) => onDraftChange("sentToCuttingRolls", v)}
                {...quantityLock}
                max={draft.printedRolls}
              />
              <div className="mt-1 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                Net Cutting: {formatNumber(inCutting, 2)}
              </div>
            </div>
          ) : (
            <div>
              <span className="tabular-nums font-semibold text-amber-600 dark:text-amber-400">
                {formatNumber(inCutting, 2)}
              </span>
              <div className="text-[10px] text-muted-foreground">
                Total Sent: {formatNumber(line.cutting.sentToCuttingRolls, 2)}
              </div>
            </div>
          )}
        </TableCell>
      )}

      {/* Cut: displays Net Cutted Balance (cutRolls - sentToPackagingRolls). Deducts to 0 when sent to packaging! */}
      {isVisible("cut") && (
        <TableCell className="text-right align-top pt-3">
          {isEditing && draft ? (
            <div>
              <NumberCell
                value={draft.cutRolls}
                ariaLabel={`Cut rolls for ${line.labelType}`}
                error={errors.cutRolls}
                onChange={(v) => onDraftChange("cutRolls", v)}
                {...quantityLock}
                max={draft.sentToCuttingRolls}
              />
              <div className="mt-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                Net Cutted: {formatNumber(waitingForPkg, 2)}
              </div>
            </div>
          ) : (
            <div>
              <span className="tabular-nums font-semibold text-indigo-600 dark:text-indigo-400">
                {formatNumber(waitingForPkg, 2)}
              </span>
              <div className="text-[10px] text-muted-foreground">
                Total Cut: {formatNumber(line.cutting.cutRolls, 2)}
              </div>
            </div>
          )}
        </TableCell>
      )}

      {isVisible("cuttingMachine") && (
        <TableCell className="align-top pt-3">
          {isEditing && draft ? (
            <SelectCell
              value={draft.cuttingMachineId}
              ariaLabel={`Cutting machine for ${line.labelType}`}
              options={machineOptions(cuttingMachines)}
              onChange={(v) => onDraftChange("cuttingMachineId", v)}
              error={errors.cuttingMachineId}
            />
          ) : (
            <span className="text-muted-foreground">{line.cutting.machineName ?? "Unassigned"}</span>
          )}
        </TableCell>
      )}

      {isVisible("cuttingOperator") && (
        <TableCell className="align-top pt-3">
          {isEditing && draft ? (
            <SelectCell
              value={draft.cuttingOperatorId}
              ariaLabel={`Cutting operator for ${line.labelType}`}
              options={operatorOptions(cuttingOperators)}
              onChange={(v) => onDraftChange("cuttingOperatorId", v)}
              error={errors.cuttingOperatorId}
            />
          ) : (
            <span className="text-muted-foreground">{line.cutting.operatorName ?? "Unassigned"}</span>
          )}
        </TableCell>
      )}

      {/* Sent to Packaging: displays Net Packaging balance (sentToPackagingRolls - packagedRolls). Deducts to 0 when packaged! */}
      {isVisible("sentToPackaging") && (
        <TableCell className="text-right align-top pt-3">
          {isEditing && draft ? (
            <div>
              <NumberCell
                value={draft.sentToPackagingRolls}
                ariaLabel={`Rolls sent to packaging for ${line.labelType}`}
                error={errors.sentToPackagingRolls}
                onChange={(v) => onDraftChange("sentToPackagingRolls", v)}
                {...quantityLock}
                max={draft.cutRolls}
              />
              <div className="mt-1 text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                Net Packaging: {formatNumber(inPkg, 2)}
              </div>
            </div>
          ) : (
            <div>
              <span className="tabular-nums font-semibold text-purple-600 dark:text-purple-400">
                {formatNumber(inPkg, 2)}
              </span>
              <div className="text-[10px] text-muted-foreground">
                Total Sent: {formatNumber(line.packaging.sentToPackagingRolls, 2)}
              </div>
            </div>
          )}
        </TableCell>
      )}

      {isVisible("packaged") && (
        <TableCell className="text-right align-top pt-3">
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
      )}

      {isVisible("packagedQty") && (
        <TableCell className="text-right align-top pt-3">
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
      )}

      {isVisible("packagingOperator") && (
        <TableCell className="align-top pt-3">
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
      )}

      {isVisible("completion") && (
        <TableCell className="align-top pt-3">
          <div className="space-y-1">
            <Progress value={line.liveProgress.completionPct} />
            <span className="text-xs tabular-nums text-muted-foreground">
              {line.liveProgress.completionPct}%
            </span>
          </div>
        </TableCell>
      )}

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
          <div className="flex items-center justify-end gap-1">
            <AppButton
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              onClick={() => onEdit(line)}
              aria-label={`Edit progress for ${line.labelType}`}
              title="Edit Progress (Printed, Cut, Packaged, Machines, Operators)"
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </AppButton>
            {onEditPlan && (
              <AppButton
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={() => onEditPlan(line)}
                aria-label={`Edit plan & assigned rolls for ${line.labelType}`}
                title="Edit Plan & Assigned Rolls"
              >
                <Sliders className="h-3.5 w-3.5 text-primary hover:text-primary/80" />
              </AppButton>
            )}
          </div>
        )}
      </TableCell>
    </TableRow>
  );
});
