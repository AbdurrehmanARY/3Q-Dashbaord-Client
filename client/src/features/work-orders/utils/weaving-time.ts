/**
 * Client mirror of `server/src/modules/work-orders/work-order.helpers.ts` — used only
 * for the live preview in the dialog and as a fallback for rows not yet backfilled by
 * migration 0024. The persisted value is always the server-computed one.
 *
 *   hours = round2( (totalQty / repeat) * pick / (speed * 60) )
 */
export function estimateWeavingHours(input: {
  totalQty: number;
  repeat: number | string;
  pick: number | string;
  speed?: number | string | null;
}): number {
  const qty = Number(input.totalQty) || 0;
  const repeatVal = Number(input.repeat) || 0;
  const pickVal = Number(input.pick) || 0;
  const speedRaw = Number(input.speed ?? 0);
  const speedVal = speedRaw > 0 ? speedRaw : 600;

  if (qty <= 0 || repeatVal <= 0 || pickVal <= 0) return 0;

  return Math.round(((qty / repeatVal) * pickVal) / (speedVal * 60) * 100) / 100;
}

