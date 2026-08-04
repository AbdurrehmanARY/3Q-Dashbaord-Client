import { useCallback, useEffect, useRef, useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
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
}

/**
 * The Production Progress table with row-level inline editing. Only one row edits at a
 * time; every other row keeps referentially-stable props (see `LabelTypeRow`) so editing
 * never re-renders the rest of the table.
 *
 * It is far too wide for one screen, so the Label Type and Actions columns are frozen at
 * the edges while the fifteen stage columns scroll between them — you always know which
 * row you're reading and can always reach Save/Cancel. Column definitions (labels,
 * alignment, which edges freeze) live in `progress-table-styles` and are shared with
 * `LabelTypeRow` so header and body cannot fall out of alignment.
 */
export function EditableLabelTypeTable({ orderId, lines, loading }: EditableLabelTypeTableProps) {
  const updateLine = useUpdateLineFull(orderId);

  const [editingLine, setEditingLine] = useState<ProductionLineOverview | null>(null);

  // Only resources free of other active jobs are offered, scoped to the row being edited
  // so its own current machine/operator stays selectable. Each stage then shows just its
  // own kind — machines by type, operators by designation.
  // `productType: "printed"` keeps woven-only operators out of this picker — the server
  // returns printed + both, which is exactly who can work a printed job.
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

  // The current draft, read inside `onSave` without making `onSave` change identity on
  // every keystroke — otherwise the new callback would re-render every (memoized) row,
  // defeating the whole point of `LabelTypeRow` being `React.memo`.
  const draftRef = useRef<LineDraft | null>(draft);
  draftRef.current = draft;

  // Re-validate live as the user types, mirroring the server's chain check.
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

  // Editing a stage immediately pulls the stages after it down to their new ceiling, so
  // the row the user is looking at already reflects what the server will store.
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
        // Error toast already shown by the hook — keep the row open so the fix-and-retry is quick.
      }
    },
    [updateLine]
  );

  // `Table` supplies its own `overflow-x-auto` container — the frozen columns stick
  // against that, so no second scroll wrapper is needed (or wanted) here.
  return (
    <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            {PROGRESS_COLUMNS.map((col) => (
              <TableHead
                key={col.label}
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
                {PROGRESS_COLUMNS.map((col) => (
                  <TableCell key={col.label} className={stickyCellClass(col.sticky)}>
                    <Skeleton className="h-4 w-full max-w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {!loading && lines.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={PROGRESS_COLUMNS.length}
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
                  onEdit={onEdit}
                  onCancel={onCancel}
                  onSave={onSave}
                  onDraftChange={onDraftChange}
                />
              );
            })}
        </TableBody>
    </Table>
  );
}

const EMPTY_ERRORS: Partial<Record<keyof LineDraft, string>> = {};
/** Stable empty array so non-editing rows keep referentially-identical props (see LabelTypeRow). */
const EMPTY_OPTIONS: never[] = [];
