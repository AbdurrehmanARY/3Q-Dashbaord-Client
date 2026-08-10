import { format, isValid, parseISO } from "date-fns";

export function formatNumber(value: unknown, digits = 2): string {
  const n = typeof value === "string" ? Number(value) : (value as number);
  if (value === null || value === undefined || Number.isNaN(n)) return "-";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

export function formatDate(value?: string | null): string {
  if (!value) return "-";
  // `parseISO` reads a date-only string ("2026-07-27") as LOCAL midnight, not UTC — so it
  // no longer displays as the previous day for users behind UTC. Datetime strings keep
  // their offset. `new Date(dateOnly)` would parse as UTC and shift the day; don't use it.
  const d = parseISO(value);
  if (!isValid(d)) return value;
  return format(d, "dd MMM yyyy");
}

/**
 * Date + time, for timestamps where the hour matters (stage completion, audit trails).
 * Unlike `formatDate` these are true instants, so they're parsed as such and rendered in
 * the viewer's local timezone.
 */
export function formatDateTime(value?: string | Date | null): string {
  if (!value) return "-";
  const d = typeof value === "string" ? parseISO(value) : value;
  if (!isValid(d)) return typeof value === "string" ? value : "-";
  return format(d, "dd MMM yyyy, HH:mm");
}

/** Today's date as `yyyy-MM-dd` in the user's LOCAL timezone (not UTC — avoids the near-midnight off-by-one). */
export function todayISO(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export const DEFAULT_ROLL_LENGTH_M = 200;

/**
 * Rolls required to produce `quantity` labels (fractional).
 *
 *   labelsPerRoll = (rollLength × 39) / (labelSizeMm / 25)
 *   requiredRolls = quantity / labelsPerRoll
 *
 * Mirrors `server/src/api/utils/production-formula.ts` for live form preview only.
 * The server always recalculates and is the value that gets persisted. At the default
 * 200 m roll length this equals the previous `7800 / (labelSizeMm / 25)` form.
 */
export function calculateRequiredRolls(
  quantity: number,
  labelSizeMm: number,
  rollLength: number = DEFAULT_ROLL_LENGTH_M
): number {
  const length = rollLength > 0 ? rollLength : DEFAULT_ROLL_LENGTH_M;
  if (!(quantity > 0) || !(labelSizeMm > 0)) return 0;
  const labelsPerRoll = (length * 39) / (labelSizeMm / 25);
  if (!(labelsPerRoll > 0)) return 0;
  return quantity / labelsPerRoll;
}

/** Total rolls issued = ROUNDUP(requiredRolls + extraRolls). Always a whole number. */
export function calculateTotalRolls(requiredRolls: number, extraRolls: number): number {
  const extra = extraRolls > 0 ? extraRolls : 0;
  return Math.ceil(requiredRolls + extra);
}

/** Total weight = weightPerRoll (from the material) * totalRollsIssued. */
export function calculateTotalWeight(weightPerRoll: number, totalRolls: number): number {
  if (!(weightPerRoll > 0) || !(totalRolls > 0)) return 0;
  return weightPerRoll * totalRolls;
}

/**
 * Total rolls standardized to a 200m roll length. Mirrors
 * `server/src/api/utils/purchase-formula.ts` (`calculateTotalRollPer200m`) for live form
 * preview only — the server always recalculates and is the value that gets persisted.
 */
export function totalRollEquivalent200m(totalRolls: number, rollLength: number): number {
  if (!totalRolls || !rollLength) return 0;
  return (totalRolls * rollLength) / 200;
}

/**
 * Net weight standardized to a 200m roll length. Mirrors `calculateInvoiceWeight` in
 * `server/src/api/utils/purchase-formula.ts` for live form preview only.
 */
export function calculateInvoiceWeight(netWeight: number, totalRoll: number, rollLength: number): number {
  if (!(netWeight > 0) || !(totalRoll > 0) || !(rollLength > 0)) return 0;
  return (netWeight * 200) / (totalRoll * rollLength);
}

export function exportToCsv(filename: string, rows: Record<string, unknown>[]): void {
  if (rows.length === 0) {
    return;
  }
  const headers = Object.keys(rows[0]);
  const escape = (val: unknown) => {
    let s = val === null || val === undefined ? "" : String(val);
    // Neutralise spreadsheet formula injection: a cell starting with = + - @ (or tab/CR) can
    // execute in Excel/Sheets. Prefixing with an apostrophe forces it to be read as text.
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
