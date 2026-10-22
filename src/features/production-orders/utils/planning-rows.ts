import type { ThreadPlanInput } from "../woven-types";

/** Row shape shared by both workflows — the printed fields are simply unused for woven. */
export interface PlanRowLike {
  labelType?: string | null;
  quantity?: number | string | null;
  materialCode?: string | null;
  totalRolls?: number;
}

/** Normalises the string `""` an empty number input yields before any arithmetic. */
export function toNumber(value: unknown): number {
  const n = typeof value === "string" ? Number(value) : (value as number);
  return Number.isFinite(n) ? n : 0;
}

/** Total planned across every row — the figure the order's ceiling is checked against. */
export function totalPlannedQuantity(rows: PlanRowLike[]): number {
  return rows.reduce((sum, r) => sum + toNumber(r.quantity), 0);
}

/** Case-insensitive label-type key, mirroring the server's duplicate rule. */
function labelKey(labelType?: string | null): string {
  return (labelType ?? "").trim().toLowerCase();
}

/**
 * Indexes of rows whose label type duplicates an earlier row in the SAME plan — the
 * client-side twin of the server's "already planned on this order" guard.
 */
export function duplicateRowIndexes(rows: PlanRowLike[]): number[] {
  const seen = new Set<string>();
  const dupes: number[] = [];
  rows.forEach((r, i) => {
    const key = labelKey(r.labelType);
    if (!key) return;
    if (seen.has(key)) dupes.push(i);
    else seen.add(key);
  });
  return dupes;
}

/**
 * Whether a label type is already claimed by another row — used to filter it out of the
 * other rows' selects so a duplicate cannot be entered in the first place.
 */
export function labelTypeTaken(
  labelType: string,
  rows: PlanRowLike[] | undefined
): boolean {
  const key = labelKey(labelType);
  if (!key) return false;
  return (rows ?? []).some((r) => labelKey(r.labelType) === key);
}

/**
 * Per-material over-draw check for a multi-row printed plan.
 *
 * Inventory is drawn row by row, so a material used by two rows must satisfy the CUMULATIVE
 * requirement, not each row in isolation — exactly what the server does when the rows are
 * submitted one after the other.
 */
export function cumulativeStockIssues(
  rows: (PlanRowLike & { totalRolls: number })[],
  availableByCode: Map<string, number>
): { index: number; materialCode: string; required: number; available: number }[] {
  const used = new Map<string, number>();
  const issues: { index: number; materialCode: string; required: number; available: number }[] = [];
  rows.forEach((row, index) => {
    const code = (row.materialCode ?? "").trim();
    if (!code) return;
    const cumulative = (used.get(code) ?? 0) + toNumber(row.totalRolls);
    used.set(code, cumulative);
    const available = availableByCode.get(code);
    if (available !== undefined && cumulative > available) {
      issues.push({ index, materialCode: code, required: cumulative, available });
    }
  });
  return issues;
}

/** Σ of a Size Label's planned sizes — must equal that row's quantity. */
export function sizePlanTotal(sizes: { size?: string; quantity: number | string }[] | undefined): number {
  return (sizes ?? []).reduce((n, s) => n + toNumber(s.quantity), 0);
}

const round3 = (n: number) => Math.round(n * 1000) / 1000;

/**
 * The woven rule: ONE shared thread allocation covers the whole plan.
 *
 * The allocation is split across the label-type rows in proportion to their quantities,
 * rounded to 3dp (the column's scale) with the LAST row absorbing the remainder — so the
 * shares always sum to exactly the allocated weight and thread stock is reserved once,
 * never once per label type.
 *
 * Returns `null` when the allocation cannot be split into strictly-positive shares (e.g.
 * 0.001 kg across three label types). Callers treat that as a validation failure rather
 * than submitting a plan the server would reject.
 */
export function allocateSharedThreads(
  threads: ThreadPlanInput[],
  rows: PlanRowLike[]
): ThreadPlanInput[][] | null {
  if (threads.length === 0 || rows.length === 0) return null;

  const quantities = rows.map((r) => toNumber(r.quantity));
  const total = quantities.reduce((a, b) => a + b, 0);
  if (!(total > 0)) return null;
  if (quantities.some((q) => !(q > 0))) return null;

  const perRow: ThreadPlanInput[][] = rows.map(() => []);

  for (const thread of threads) {
    const weight = toNumber(thread.weightKg);
    if (!(weight > 0)) return null;

    const shares: number[] = [];
    let assigned = 0;
    for (let i = 0; i < quantities.length; i++) {
      const isLast = i === quantities.length - 1;
      const share = isLast ? round3(weight - assigned) : round3((weight * quantities[i]) / total);
      shares.push(share);
      assigned = round3(assigned + share);
    }
    if (shares.some((s) => !(s > 0))) return null;

    shares.forEach((share, i) => perRow[i].push({ ...thread, weightKg: share }));
  }

  return perRow;
}
