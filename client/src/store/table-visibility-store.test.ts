import { afterEach, beforeEach, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { VisibilityState } from "@tanstack/react-table";

// Importing the store also starts its (async) persistence rehydration. Tests below
// reset everything explicitly so ordering never matters.
import {
  EMPTY_COLUMN_VISIBILITY,
  sanitizeColumnVisibility,
  TABLE_VISIBILITY_STORAGE_KEY,
  useTableVisibilityStore,
  useTableColumnVisibility,
} from "./table-visibility-store";

const PERSIST_KEY = TABLE_VISIBILITY_STORAGE_KEY;

/** Reset in-memory state + storage between tests. */
function resetStore() {
  useTableVisibilityStore.setState({ columnVisibility: {} });
}

beforeEach(() => {
  localStorage.clear();
  resetStore();
});

afterEach(() => {
  localStorage.clear();
  resetStore();
});

test("starts empty — no persisted entry means all columns visible", () => {
  expect(useTableVisibilityStore.getState().columnVisibility).toEqual({});
  // A table with no saved state selects to undefined (caller falls back to EMPTY), and
  // importantly *not* to a fresh `{}` — a new object each render would loop the subscriber.
  const { result, rerender } = renderHook(() => useTableColumnVisibility("work-orders"));
  expect(result.current).toBeUndefined();
  const first = result.current;
  rerender();
  expect(result.current).toBe(first);
  expect(EMPTY_COLUMN_VISIBILITY).toEqual({});
});

test("setColumnVisibility stores a full visibility map per table", () => {
  useTableVisibilityStore.getState().setColumnVisibility("work-orders", {
    poNumber: false,
    soNumber: true,
  });

  expect(useTableVisibilityStore.getState().columnVisibility).toEqual({
    "work-orders": { poNumber: false, soNumber: true },
  });
});

test("updateColumnVisibility sets a single column without clobbering others", () => {
  useTableVisibilityStore.getState().setColumnVisibility("work-orders", {
    poNumber: false,
    designCode: true,
  });

  useTableVisibilityStore.getState().updateColumnVisibility("work-orders", "companyName", false);

  expect(useTableVisibilityStore.getState().columnVisibility["work-orders"]).toEqual({
    poNumber: false,
    designCode: true,
    companyName: false,
  });

  // A different table is untouched.
  expect(useTableVisibilityStore.getState().columnVisibility["inventory"]).toBeUndefined();
});

test("tables are isolated — hiding in one never affects another", () => {
  useTableVisibilityStore.getState().setColumnVisibility("work-orders", { poNumber: false });
  useTableVisibilityStore.getState().setColumnVisibility("inventory", { status: false });

  const map = useTableVisibilityStore.getState().columnVisibility;
  expect(map["work-orders"]).toEqual({ poNumber: false });
  expect(map["inventory"]).toEqual({ status: false });

  // Updating one table does not bleed into the other's object identity unexpectedly.
  const workBefore = useTableVisibilityStore.getState().columnVisibility["work-orders"];
  useTableVisibilityStore
    .getState()
    .updateColumnVisibility("inventory", "vendor", true);
  expect(useTableVisibilityStore.getState().columnVisibility["work-orders"]).toBe(workBefore);
  expect(useTableVisibilityStore.getState().columnVisibility["inventory"]).toEqual({
    status: false,
    vendor: true,
  });
});

test("resetColumnVisibility restores defaults without touching other tables", () => {
  useTableVisibilityStore.getState().setColumnVisibility("work-orders", { poNumber: false });
  useTableVisibilityStore.getState().setColumnVisibility("inventory", { status: false });

  // The hook surfaces the persisted override before the reset...
  const { result } = renderHook(() => useTableColumnVisibility("work-orders"));
  expect(result.current).toEqual({ poNumber: false });

  act(() => useTableVisibilityStore.getState().resetColumnVisibility("work-orders"));

  // ...and reactively resolves to undefined after it (caller uses EMPTY = all visible).
  expect(result.current).toBeUndefined();

  const map = useTableVisibilityStore.getState().columnVisibility;
  expect(map["work-orders"]).toBeUndefined();
  expect(map["inventory"]).toEqual({ status: false });
});

test("only the visibility data is persisted — never action functions", () => {
  useTableVisibilityStore.getState().setColumnVisibility("work-orders", { poNumber: false });

  const raw = localStorage.getItem(PERSIST_KEY);
  expect(raw).not.toBeNull();

  const parsed = JSON.parse(raw!) as { state: unknown; version: number };
  // Must be the { state, version } envelope Zustand persist writes.
  expect(Object.keys(parsed).sort()).toEqual(["state", "version"]);
  expect(parsed.version).toBe(1);

  // Only `columnVisibility` survives — no setters leak into localStorage.
  expect(parsed.state).toEqual({ columnVisibility: { "work-orders": { poNumber: false } } });
  const stringified = JSON.stringify(parsed.state);
  expect(stringified).not.toContain("setColumnVisibility");
  expect(stringified).not.toContain("updateColumnVisibility");
  expect(stringified).not.toContain("resetColumnVisibility");
});

test("rehydrates from persisted localStorage on a fresh load", async () => {
  // Seed storage with a previously persisted state (simulates a refresh).
  localStorage.setItem(
    PERSIST_KEY,
    JSON.stringify({
      state: { columnVisibility: { "work-orders": { poNumber: false } } },
      version: 1,
    })
  );
  // `beforeEach` already cleared the in-memory state, and we deliberately do *not* call
  // `resetStore()` here: `setState` goes through the persist middleware, which would write
  // the empty state straight back over the seed we just planted.
  expect(useTableVisibilityStore.getState().columnVisibility["work-orders"]).toBeUndefined();

  await useTableVisibilityStore.persist.rehydrate();

  expect(useTableVisibilityStore.getState().columnVisibility["work-orders"]).toEqual({
    poNumber: false,
  });
});

test("sanitizeColumnVisibility strips protected (enableHiding:false) columns", () => {
  // `select`/`actions` declare `enableHiding: false`; a persisted "select: false"
  // must never be honoured, while real hideable state survives untouched.
  const input: VisibilityState = { poNumber: false, designCode: true, select: false };
  const result = sanitizeColumnVisibility(input, ["select", "actions"]);
  expect(result).toEqual({ poNumber: false, designCode: true });
  // The function must not mutate its argument.
  expect(input).toEqual({ poNumber: false, designCode: true, select: false });
});

test("sanitizeColumnVisibility keeps unknown ids and shortcut-outs cleanly", () => {
  const input: VisibilityState = { poNumber: false, someRemovedColumn: false };
  // Unknown ids are preserved (exclusion list, not allow-list) — never un-hides a column.
  expect(sanitizeColumnVisibility(input, ["select"])).toEqual(input);
  // Same reference when nothing had to change → no needless store identity churn.
  expect(sanitizeColumnVisibility(input, ["select"])).toBe(input);
  expect(sanitizeColumnVisibility(input, [])).toBe(input);
});
