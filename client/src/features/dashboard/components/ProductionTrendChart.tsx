import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { eachDayOfInterval, format, isValid, parseISO, startOfDay, subDays } from "date-fns";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductionOrders } from "@/features/production-orders";

const RANGE_OPTIONS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 3 months" },
] as const;

const chartConfig = {
  created: { label: "New Orders", color: "var(--chart-1)" },
  completed: { label: "Completed", color: "var(--chart-2)" },
} satisfies ChartConfig;

/** `yyyy-MM-dd` bucket key for a possibly-null ISO timestamp. */
function dayKey(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const parsed = parseISO(iso);
  return isValid(parsed) ? format(parsed, "yyyy-MM-dd") : null;
}

/**
 * Production Trend — real production-order activity, not a demo dataset.
 *
 * Each day's two counts are literal, unambiguous facts already sitting on the fetched
 * `ProductionOrder` records: how many orders were **created** that day and how many were
 * **completed** that day. Deliberately not "active vs completed" (the prior mock chart's
 * framing) — "active" has no single honest definition from a snapshot list, whereas
 * created/completed are exact counts of real timestamps.
 */
export function ProductionTrendChart() {
  const [range, setRange] = useState<(typeof RANGE_OPTIONS)[number]["value"]>("30");
  const { data: orders, isLoading } = useProductionOrders();

  const chartData = useMemo(() => {
    const days = Number(range);
    const today = startOfDay(new Date());
    const start = subDays(today, days - 1);

    const createdByDay = new Map<string, number>();
    const completedByDay = new Map<string, number>();
    for (const order of orders ?? []) {
      const created = dayKey(order.createdAt);
      if (created) createdByDay.set(created, (createdByDay.get(created) ?? 0) + 1);
      const completed = dayKey(order.completedAt);
      if (completed) completedByDay.set(completed, (completedByDay.get(completed) ?? 0) + 1);
    }

    return eachDayOfInterval({ start, end: today }).map((day) => {
      const key = format(day, "yyyy-MM-dd");
      return {
        date: key,
        created: createdByDay.get(key) ?? 0,
        completed: completedByDay.get(key) ?? 0,
      };
    });
  }, [orders, range]);

  const hasActivity = chartData.some((d) => d.created > 0 || d.completed > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Production Trend</CardTitle>
        <CardDescription className="text-xs">
          New vs. completed production orders
        </CardDescription>
        <CardAction>
          <ToggleGroup
            multiple={false}
            value={[range]}
            onValueChange={(value) => {
              if (value[0]) setRange(value[0] as typeof range);
            }}
            variant="outline"
            className="*:data-[slot=toggle-group-item]:px-3! *:data-[slot=toggle-group-item]:text-xs"
          >
            {RANGE_OPTIONS.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-2 sm:px-6">
        {isLoading ? (
          <Skeleton className="h-[220px] w-full" />
        ) : !hasActivity ? (
          <div className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">
            No production activity in this range yet.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
            <AreaChart data={chartData} margin={{ left: -20, right: 4 }}>
              <defs>
                <linearGradient id="fillCreated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-created)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-created)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-completed)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-completed)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeOpacity={0.5} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={28}
                tick={{ fontSize: 11 }}
                tickFormatter={(value: string) => format(parseISO(value), "MMM d")}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) =>
                      typeof label === "string" ? format(parseISO(label), "MMM d, yyyy") : label
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="created"
                type="monotone"
                fill="url(#fillCreated)"
                stroke="var(--color-created)"
                strokeWidth={2}
              />
              <Area
                dataKey="completed"
                type="monotone"
                fill="url(#fillCompleted)"
                stroke="var(--color-completed)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
