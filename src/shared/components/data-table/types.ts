import type { RowData } from "@tanstack/react-table";

/**
 * Module augmentation of TanStack's `TableMeta`.
 *
 * This is the whole contract between the generic table and an editable feature: the
 * table forwards `meta` to `useReactTable` and cells read `updateData` off it. The table
 * never learns what "editing" means — it has no idea whether the callback hits an API,
 * a store, or nothing at all.
 */
declare module "@tanstack/react-table" {
  // `TData` is required by the base interface signature even though this augmentation
  // does not narrow on it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    /**
     * Commit a single cell edit. `rowIndex` is the index within the *current* row model,
     * so features must resolve it back to a stable record id themselves.
     */
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;

    /**
     * Optional per-cell validation. Return an error message to block the commit and
     * surface it inline, or `null`/`undefined` when the value is acceptable.
     */
    validateCell?: (rowIndex: number, columnId: string, value: unknown) => string | null | undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Header + cell text alignment. Left (the HTML default) needs no entry. */
    align?: "left" | "center" | "right";
  }
}

export {};
