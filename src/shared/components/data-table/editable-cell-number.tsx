import type { CellContext, RowData } from "@tanstack/react-table";
import { EditableCellInput, useEditableCell } from "./editable-cell";

/** Digits with at most one decimal point — no sign, no exponent, no letters. */
const NUMERIC = /^\d*\.?\d*$/;

/**
 * Numeric variant. Negatives and non-numeric characters are blocked **at the field
 * level** (the keystroke is dropped, so the value can never become invalid), which
 * leaves `validateCell` free to express business bounds like "cannot exceed total rolls"
 * rather than re-checking the character set.
 */
export function EditableCellNumber<TData extends RowData>({
  getValue,
  row,
  column,
  table,
}: CellContext<TData, unknown>) {
  const initial = Number(getValue() ?? 0);
  const meta = table.options.meta;

  const cell = useEditableCell<number>({
    initial,
    // An empty field reads as 0 rather than NaN, so clearing a cell is a valid edit.
    parse: (raw) => (raw === "" ? 0 : Number(raw)),
    format: (value) => (Number.isFinite(value) ? String(value) : ""),
    validate: (value) => {
      if (!Number.isFinite(value)) return "Enter a number";
      if (value < 0) return "Cannot be negative";
      return meta?.validateCell?.(row.index, column.id, value);
    },
    commit: (value) => meta?.updateData?.(row.index, column.id, value),
  });

  return (
    <EditableCellInput
      value={cell.draft}
      error={cell.error}
      disabled={!meta?.updateData}
      align="right"
      inputMode="decimal"
      // Reject the keystroke outright instead of accepting then complaining about it.
      onChange={(next) => {
        if (NUMERIC.test(next)) cell.setDraft(next);
      }}
      onCommit={cell.onCommit}
      onKeyDown={cell.onKeyDown}
    />
  );
}
