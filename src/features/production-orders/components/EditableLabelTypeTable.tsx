import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell, TableFooter } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";
import { formatNumber } from "@/lib/format";
import { useUpdateLineFull, useAvailableResources } from "../hooks/use-production-orders";
import { LabelTypeRow } from "./LabelTypeRow";
import { lineToDraft, diffLineDraft, validateLineDraft, cascadeDraft, type LineDraft } from "../utils/line-draft";
import { PROGRESS_COLUMNS, alignClass, stickyCellClass } from "./progress-table-styles";
import { cn } from "@/lib/utils";
import type { ProductionLineOverview } from "../types";

interface EditableLabelTypeTableProps {
  orderId: string;
  lines: ProductionLineOverview[];
  loading?: boolean;
  onEditPlan?: (line: ProductionLineOverview) => void;
}

/**
 * The Production Progress table with row-level inline editing, column visibility toggling,
 * and a bottom Totals summary row.
 */
export function EditableLabelTypeTable({ orderId, lines, loading, onEditPlan }: EditableLabelTypeTableProps) {
  const updateLine = useUpdateLineFull(orderId);

  const [editingLine, setEditingLine] = useState<ProductionLineOverview | null>(null);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PROGRESS_COLUMNS.forEach((col) => {
      initial[col.id] = true;
    });
    return initial;
  });

  const isVisible = useCallback((id: string) => visibleColumns[id] !== false, [visibleColumns]);

  const { data: resources } = useAvailableResources(
    editingLine ? { lineId: editingLine.id, productType: "printed" } : undefined
  );
  const machinesOfType = (type: string) =>
    (resources?.machines ?? [])
      .filter((m) => m.machineType === type)
      .map((m) => ({ id: m.id, machineName: m.name }));
  const operatorsOf = (designation: string) =>
    (resources?.operators ?? [])
      .filter((o) => o.designation === designation)
      .map((o) => ({ id: o.id, name: o.name }));

  const [draft, setDraft] = useState<LineDraft | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof LineDraft, string>>>({});

  const draftRef = useRef<LineDraft | null>(draft);
  draftRef.current = draft;

  useEffect(() => {
    if (!draft || !editingLine) {
      setErrors({});
      return;
    }
    setErrors(validateLineDraft(draft, editingLine.planning));
  }, [draft, editingLine]);

  const onEdit = useCallback((line: ProductionLineOverview) => {
    setEditingLine(line);
    setDraft(lineToDraft(line));
  }, []);

  const onCancel = useCallback(() => {
    setEditingLine(null);
    setDraft(null);
    setErrors({});
  }, []);

  const onDraftChange = useCallback((field: keyof LineDraft, value: number | null) => {
    setDraft((prev) => (prev ? cascadeDraft({ ...prev, [field]: value }, field) : prev));
  }, []);

  const onSave = useCallback(
    async (line: ProductionLineOverview) => {
      const currentDraft = draftRef.current;
      if (!currentDraft) return;

      const validationErrors = validateLineDraft(currentDraft, line.planning);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const body = diffLineDraft(lineToDraft(line), currentDraft);
      if (Object.keys(body).length === 0) {
        setEditingLine(null);
        setDraft(null);
        setErrors({});
        return;
      }

      try {
        await updateLine.mutateAsync({ lineId: String(line.id), body });
        setEditingLine(null);
        setDraft(null);
        setErrors({});
      } catch {
        // Error toast already shown by hook
      }
    },
    [updateLine]
  );

  // Compute column totals for table footer
  const totals = useMemo(() => {
    return lines.reduce(
      (acc, line) => {
        const totalRolls = Number(line.planning.totalRolls || 0);
        const quantity = Number(line.planning.quantity || 0);
        const printed = Number(line.printing.printedRolls || 0);
        const sentCutting = Number(line.cutting.sentToCuttingRolls || 0);
        const cut = Number(line.cutting.cutRolls || 0);
        const sentPkg = Number(line.packaging.sentToPackagingRolls || 0);
        const packaged = Number(line.packaging.packagedRolls || 0);
        const packagedQty = Number(line.packaging.packagedQty || 0);

        const unprinted = Math.max(totalRolls - printed, 0);
        const netPrinted = Math.max(printed - sentCutting, 0);
        const netCutting = Math.max(sentCutting - cut, 0);
        const netCut = Math.max(cut - sentPkg, 0);
        const netPkg = Math.max(sentPkg - packaged, 0);

        return {
          totalRolls: acc.totalRolls + totalRolls,
          quantity: acc.quantity + quantity,
          unprinted: acc.unprinted + unprinted,
          printed: acc.printed + printed,
          netPrinted: acc.netPrinted + netPrinted,
          sentCutting: acc.sentCutting + sentCutting,
          netCutting: acc.netCutting + netCutting,
          cut: acc.cut + cut,
          netCut: acc.netCut + netCut,
          sentPkg: acc.sentPkg + sentPkg,
          netPkg: acc.netPkg + netPkg,
          packaged: acc.packaged + packaged,
          packagedQty: acc.packagedQty + packagedQty,
        };
      },
      {
        totalRolls: 0,
        quantity: 0,
        unprinted: 0,
        printed: 0,
        netPrinted: 0,
        sentCutting: 0,
        netCutting: 0,
        cut: 0,
        netCut: 0,
        sentPkg: 0,
        netPkg: 0,
        packaged: 0,
        packagedQty: 0,
      }
    );
  }, [lines]);

  const overallCompletionPct =
    totals.totalRolls > 0
      ? Math.round((totals.packaged / totals.totalRolls) * 10000) / 100
      : 0;

  const visibleColumnCount = PROGRESS_COLUMNS.filter((c) => isVisible(c.id)).length;

  return (
    <div className="space-y-0">
      {/* Top Toolbar: Columns toggle */}
      <div className="flex items-center justify-between border-b bg-card px-3 py-2">
        <span className="text-xs font-semibold text-muted-foreground">
          Label Types Progress ({lines.length})
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 gap-1.5 text-xs")}>
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-72 w-52 overflow-y-auto">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Toggle Columns
            </div>
            <DropdownMenuSeparator />
            {PROGRESS_COLUMNS.filter((c) => c.toggleable).map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={isVisible(col.id)}
                onCheckedChange={(checked) =>
                  setVisibleColumns((prev) => ({ ...prev, [col.id]: checked }))
                }
                className="text-xs"
              >
                {col.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            {PROGRESS_COLUMNS.filter((col) => isVisible(col.id)).map((col) => (
              <TableHead
                key={col.id}
                className={cn(
                  "h-10 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                  alignClass(col.align),
                  stickyCellClass(col.sticky, { header: true })
                )}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`} className="bg-card">
                {PROGRESS_COLUMNS.filter((col) => isVisible(col.id)).map((col) => (
                  <TableCell key={col.id} className={stickyCellClass(col.sticky)}>
                    <Skeleton className="h-4 w-full max-w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {!loading && lines.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={visibleColumnCount}
                className="h-32 text-center text-sm text-muted-foreground"
              >
                No label types planned yet.
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            lines.map((line) => {
              const isEditing = editingLine?.id === line.id;
              return (
                <LabelTypeRow
                  key={line.id}
                  line={line}
                  isEditing={isEditing}
                  draft={isEditing ? (draft ?? undefined) : undefined}
                  errors={isEditing ? errors : EMPTY_ERRORS}
                  isSaving={updateLine.isPending}
                  printingMachines={isEditing ? machinesOfType("Printing") : EMPTY_OPTIONS}
                  cuttingMachines={isEditing ? machinesOfType("Cutting") : EMPTY_OPTIONS}
                  printingOperators={isEditing ? operatorsOf("Printing") : EMPTY_OPTIONS}
                  cuttingOperators={isEditing ? operatorsOf("Cutting") : EMPTY_OPTIONS}
                  packagingOperators={isEditing ? operatorsOf("Packaging") : EMPTY_OPTIONS}
                  visibleColumns={visibleColumns}
                  onEdit={onEdit}
                  onEditPlan={onEditPlan}
                  onCancel={onCancel}
                  onSave={onSave}
                  onDraftChange={onDraftChange}
                />
              );
            })}
        </TableBody>

        {/* Bottom Totals Footer */}
        {!loading && lines.length > 0 && (
          <TableFooter className="border-t-2 border-slate-900/80 dark:border-slate-100/80 bg-slate-100 dark:bg-slate-900 font-bold text-sm shadow-md">
            <TableRow className="hover:bg-slate-100 dark:hover:bg-slate-900">
              {/* Label Type */}
              <TableCell className={cn("min-w-[160px] font-extrabold text-black dark:text-white text-sm bg-slate-200 dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700", stickyCellClass("first"))}>
                TOTALS ({lines.length})
              </TableCell>

              {/* Planned Rolls */}
              {isVisible("plannedRolls") && (
                <TableCell className="text-right tabular-nums font-extrabold text-black dark:text-white text-sm">
                  {formatNumber(totals.totalRolls, 2)}
                </TableCell>
              )}

              {/* Printing (Unprinted) */}
              {isVisible("unprinted") && (
                <TableCell className="text-right tabular-nums font-extrabold text-blue-950 dark:text-blue-100 text-sm bg-blue-100/80 dark:bg-blue-950/60 border-x border-blue-200 dark:border-blue-900">
                  {formatNumber(totals.unprinted, 2)}
                </TableCell>
              )}

              {/* Printed */}
              {isVisible("printed") && (
                <TableCell className="text-right text-xs">
                  <span className="tabular-nums font-extrabold text-emerald-950 dark:text-emerald-300 text-sm block">
                    {formatNumber(totals.netPrinted, 2)}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 block">
                    Total Printed: {formatNumber(totals.printed, 2)}
                  </span>
                </TableCell>
              )}

              {/* Printing Machine */}
              {isVisible("printingMachine") && <TableCell className="text-slate-600 dark:text-slate-400 font-medium">—</TableCell>}

              {/* Printed By */}
              {isVisible("printingOperator") && <TableCell className="text-slate-600 dark:text-slate-400 font-medium">—</TableCell>}

              {/* Sent to Cutting */}
              {isVisible("sentToCutting") && (
                <TableCell className="text-right text-xs">
                  <span className="tabular-nums font-extrabold text-amber-950 dark:text-amber-300 text-sm block">
                    {formatNumber(totals.netCutting, 2)}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 block">
                    Total Sent: {formatNumber(totals.sentCutting, 2)}
                  </span>
                </TableCell>
              )}

              {/* Cut */}
              {isVisible("cut") && (
                <TableCell className="text-right text-xs">
                  <span className="tabular-nums font-extrabold text-indigo-950 dark:text-indigo-300 text-sm block">
                    {formatNumber(totals.netCut, 2)}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 block">
                    Total Cut: {formatNumber(totals.cut, 2)}
                  </span>
                </TableCell>
              )}

              {/* Cutting Machine */}
              {isVisible("cuttingMachine") && <TableCell className="text-slate-600 dark:text-slate-400 font-medium">—</TableCell>}

              {/* Cut By */}
              {isVisible("cuttingOperator") && <TableCell className="text-slate-600 dark:text-slate-400 font-medium">—</TableCell>}

              {/* Sent to Packaging */}
              {isVisible("sentToPackaging") && (
                <TableCell className="text-right text-xs">
                  <span className="tabular-nums font-extrabold text-purple-950 dark:text-purple-300 text-sm block">
                    {formatNumber(totals.netPkg, 2)}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 block">
                    Total Sent: {formatNumber(totals.sentPkg, 2)}
                  </span>
                </TableCell>
              )}

              {/* Packaged */}
              {isVisible("packaged") && (
                <TableCell className="text-right tabular-nums font-extrabold text-black dark:text-white text-sm">
                  {formatNumber(totals.packaged, 2)}
                </TableCell>
              )}

              {/* Packaged Qty */}
              {isVisible("packagedQty") && (
                <TableCell className="text-right text-xs">
                  <span className="tabular-nums font-extrabold text-black dark:text-white text-sm block">
                    {formatNumber(totals.packagedQty, 0)}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 block">
                    of {formatNumber(totals.quantity, 0)}
                  </span>
                </TableCell>
              )}

              {/* Packaged By */}
              {isVisible("packagingOperator") && <TableCell className="text-slate-600 dark:text-slate-400 font-medium">—</TableCell>}

              {/* Completion */}
              {isVisible("completion") && (
                <TableCell className="text-sm font-extrabold text-black dark:text-white">
                  {overallCompletionPct}%
                </TableCell>
              )}

              {/* Actions */}
              <TableCell className={cn("bg-slate-200 dark:bg-slate-800", stickyCellClass("last", { header: true }))} />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}

const EMPTY_ERRORS: Partial<Record<keyof LineDraft, string>> = {};
const EMPTY_OPTIONS: never[] = [];
