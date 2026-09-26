import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { VisibilityState } from "@tanstack/react-table";

/**
 * Persisted column-visibility for every table that opts into it.
 *
 * The map is keyed by a stable `tableId` (e.g. "work-orders"), so hiding a column
 * in one table can never affect another. An absent entry — or `{}` — means "use the
 * column defaults (all visible)", never "hide everything".
 */
export type TableVisibilityMap = Record<string, VisibilityState>;

export interface TableVisibilityState {
  columnVisibility: TableVisibilityMap;
  setColumnVisibility: (tableId: string, visibility: VisibilityState) => void;
  updateColumnVisibility: (tableId: string, columnId: string, visible: boolean) => void;
  resetColumnVisibility: (tableId: string) => void;
}

/** localStorage key for the persisted map. */
export const TABLE_VISIBILITY_STORAGE_KEY = "table-column-visibility";

/**
 * A single, stable empty object. Returning an inline `{}` from a Zustand selector
 * would hand `useSyncExternalStore` a fresh reference on every notify and re-fire
 * indefinitely; this singleton keeps the identity constant.
 */
export const EMPTY_COLUMN_VISIBILITY: VisibilityState = {};

/**
 * Drops any entry that would hide a protected column.
 *
 * TanStack's `toggleVisibility` already refuses to hide a column whose
 * `getCanHide()` is false, and the toggle UI only lists hideable columns — but
 * `column.getIsVisible()` is just `columnVisibility[id] ?? true`, it does *not*
 * consult `getCanHide()`. So a stale or hand-edited persisted value such as
 * `{ select: false }` would genuinely hide the checkbox column. Sanitising at
 * *write* time keeps `enableHiding: false` columns permanently visible no matter
 * what ends up in storage.
 *
 * `protectedColumnIds` are the ids of columns that declared `enableHiding: false`.
 * Note this is an *exclusion* list, not an allow-list: ids we don't recognise are
 * kept as-is rather than dropped, so a column is never accidentally un-hidden.
 * Returns the same reference when nothing had to change.
 */
export function sanitizeColumnVisibility(
  visibility: VisibilityState,
  protectedColumnIds: readonly string[]
): VisibilityState {
  if (protectedColumnIds.length === 0) return visibility;
  const protectedIds = new Set(protectedColumnIds);
  const entries = Object.entries(visibility);
  const kept = entries.filter(([id]) => !protectedIds.has(id));
  return kept.length === entries.length ? visibility : Object.fromEntries(kept);
}

/**
 * Single Zustand store for *all* tables' column visibility.
 *
 * Persisted via `zustand/middleware` → `localStorage` (sync, so rehydrates before
 * first paint — no flash of wrong visibility). `partialize` persists the data only,
 * never the action functions, satisfying "only persist column visibility".
 */
export const useTableVisibilityStore = create<TableVisibilityState>()(
  persist(
    (set) => ({
      columnVisibility: {},

      setColumnVisibility: (tableId, visibility) =>
        set((state) => ({
          columnVisibility: { ...state.columnVisibility, [tableId]: visibility },
        })),

      updateColumnVisibility: (tableId, columnId, visible) =>
        set((state) => ({
          columnVisibility: {
            ...state.columnVisibility,
            [tableId]: { ...state.columnVisibility[tableId], [columnId]: visible },
          },
        })),

      resetColumnVisibility: (tableId) =>
        set((state) => {
          const { [tableId]: _removed, ...rest } = state.columnVisibility;
          void _removed; // intentionally dropped — back to column defaults
          return { columnVisibility: rest };
        }),
    }),
    {
      name: TABLE_VISIBILITY_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Persist the plain data only — never functions or TanStack internals.
      partialize: (state) => ({ columnVisibility: state.columnVisibility }),
    }
  )
);

/**
 * Per-table column visibility selector. Returns `undefined` when the table has no
 * persisted entry (or when `tableId` is omitted); callers fall back to
 * `EMPTY_COLUMN_VISIBILITY`. Returning `undefined` rather than a fresh `{}` here
 * keeps the selector's return identity stable across store notifications.
 */
export function useTableColumnVisibility(
  tableId?: string
): VisibilityState | undefined {
  return useTableVisibilityStore((state) =>
    tableId ? state.columnVisibility[tableId] : undefined
  );
}
