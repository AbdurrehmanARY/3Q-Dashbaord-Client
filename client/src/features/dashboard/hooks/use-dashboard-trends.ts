import { useMemo } from "react";
import { isValid, parseISO, subDays } from "date-fns";
import { useWorkOrders } from "@/features/work-orders";

/**
 * Real period-over-period trends, derived client-side from already-fetched records.
 *
 * There is no historical-snapshot endpoint to diff against, so "trend" here means
 * exactly one honest thing: how many records were created in the last N days versus the
 * N days before that. Anything that isn't a plain count-of-timestamps comparison (e.g. a
 * trend on a current *state* like "active production orders") is deliberately left
 * without a badge rather than computing something that would misdescribe what changed.
 */
export function useWorkOrderTrend(periodDays = 30) {
  const { data: workOrders } = useWorkOrders();

  return useMemo(() => {
    if (!workOrders) return null;

    const now = new Date();
    const periodStart = subDays(now, periodDays);
    const priorStart = subDays(now, periodDays * 2);

    let current = 0;
    let prior = 0;
    for (const wo of workOrders) {
      const created = parseISO(wo.createdAt);
      if (!isValid(created)) continue;
      if (created >= periodStart) current += 1;
      else if (created >= priorStart) prior += 1;
    }

    // A zero-sized prior period has no meaningful percentage change — showing one would
    // read as data, not as "we don't actually know."
    if (prior === 0) return null;

    const pct = Math.round(((current - prior) / prior) * 100);
    return { pct, current, prior, periodDays };
  }, [workOrders, periodDays]);
}
