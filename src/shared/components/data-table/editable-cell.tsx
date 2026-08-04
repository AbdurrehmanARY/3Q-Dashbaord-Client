import * as React from "react";
import type { CellContext, RowData } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Shared behaviour for both editable cell variants.
 *
 * The value is held in local state and committed on **blur** (or Enter), never on
 * keystroke — a per-keystroke commit would fire a mutation for every character typed.
 * Escape reverts to the last committed value.
 *
 * `validate` runs before commit; returning a message blocks the write and surfaces the
 * error inline instead of letting it fail silently or only server-side.
 */
export function useEditableCell<T>({
  initial,
  parse,
  format,
  validate,
  commit,
}: {
  initial: T;
  parse: (raw: string) => T;
  format: (value: T) => string;
  validate?: (value: T) => string | null | undefined;
  commit: (value: T) => void;
}) {
  const [draft, setDraft] = React.useState(() => format(initial));
  const [error, setError] = React.useState<string | null>(null);

  // Re-sync when the row's value changes underneath us — a refetch landing, or an
  // optimistic update rolling back after a failed mutation.
  React.useEffect(() => {
    setDraft(format(initial));
    setError(null);
    // `format` is stable per column definition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const onCommit = React.useCallback(() => {
    const parsed = parse(draft);

    const message = validate?.(parsed);
    if (message) {
      setError(message);
      return;
    }

    setError(null);
    if (format(parsed) !== format(initial)) commit(parsed);
    // Normalise the display ("007" -> "7") once the value is accepted.
    setDraft(format(parsed));
  }, [draft, initial, parse, format, validate, commit]);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.currentTarget.blur();
      } else if (event.key === "Escape") {
        event.preventDefault();
        setDraft(format(initial));
        setError(null);
        event.currentTarget.blur();
      }
    },
    [initial, format]
  );

  return { draft, setDraft, error, onCommit, onKeyDown };
}

/**
 * Styled as plain text at rest so a mixed table reads as a table, not a form. The input
 * border appears only on hover/focus, which is what signals the cell is editable.
 */
export const editableCellClass = cn(
  "h-8 w-full min-w-0 rounded-md border border-transparent bg-transparent px-2 py-1 text-sm",
  "transition-colors outline-none",
  "hover:border-input focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

interface EditableCellInputProps {
  value: string;
  error: string | null;
  disabled?: boolean;
  align?: "left" | "right";
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (value: string) => void;
  onCommit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

/** The input itself, wrapped in a tooltip that only materialises when invalid. */
export function EditableCellInput({
  value,
  error,
  disabled,
  align = "left",
  inputMode,
  onChange,
  onCommit,
  onKeyDown,
}: EditableCellInputProps) {
  const input = (
    <input
      value={value}
      disabled={disabled}
      inputMode={inputMode}
      aria-invalid={!!error}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onCommit}
      onKeyDown={onKeyDown}
      className={cn(
        editableCellClass,
        align === "right" && "text-right tabular-nums",
        error && "border-destructive ring-3 ring-destructive/20 focus-visible:border-destructive"
      )}
    />
  );

  if (!error) return input;

  return (
    <Tooltip open>
      <TooltipTrigger render={<div className="w-full" />}>{input}</TooltipTrigger>
      <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
        {error}
      </TooltipContent>
    </Tooltip>
  );
}

/**
 * Text variant. Drop it straight onto a column as `cell: EditableCell` — editability is
 * a property of the column, not of the table, so one table mixes editable and read-only
 * columns freely.
 */
export function EditableCell<TData extends RowData>({
  getValue,
  row,
  column,
  table,
}: CellContext<TData, unknown>) {
  const initial = String(getValue() ?? "");
  const meta = table.options.meta;

  const cell = useEditableCell<string>({
    initial,
    parse: (raw) => raw.trim(),
    format: (value) => value,
    validate: (value) => meta?.validateCell?.(row.index, column.id, value),
    commit: (value) => meta?.updateData?.(row.index, column.id, value),
  });

  return (
    <EditableCellInput
      value={cell.draft}
      error={cell.error}
      disabled={!meta?.updateData}
      onChange={cell.setDraft}
      onCommit={cell.onCommit}
      onKeyDown={cell.onKeyDown}
    />
  );
}
