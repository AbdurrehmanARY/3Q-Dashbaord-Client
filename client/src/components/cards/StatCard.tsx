import * as React from "react";
import { type LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type TrendDirection = "up" | "down" | "neutral";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: number;
  trendLabel?: string;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
  trend,
  trendLabel,
  loading = false,
  className,
  onClick,
}: StatCardProps) {
  const trendDir: TrendDirection =
    trend === undefined ? "neutral"
    : trend > 0 ? "up"
    : trend < 0 ? "down"
    : "neutral";

  const TrendIcon =
    trendDir === "up" ? TrendingUp
    : trendDir === "down" ? TrendingDown
    : Minus;

  const trendColorClass =
    trendDir === "up"   ? "text-success"
    : trendDir === "down" ? "text-destructive"
    : "text-muted-foreground";

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
      onClick={onClick}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      <CardContent className="p-5">
        {loading ? (
          <StatCardSkeleton />
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">
                  {title}
                </p>
                <p className="mt-1.5 text-3xl font-bold tracking-tight text-foreground tabular-nums">
                  {typeof value === "number" ? value.toLocaleString() : value}
                </p>
                {description && (
                  <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                )}
              </div>
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", iconColor)}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            {trend !== undefined && (
              <div className="mt-3 flex items-center gap-1.5">
                <span className={cn("flex items-center gap-0.5 text-xs font-medium", trendColorClass)}>
                  <TrendIcon className="h-3 w-3" />
                  {Math.abs(trend)}%
                </span>
                {trendLabel && (
                  <span className="text-xs text-muted-foreground">{trendLabel}</span>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-10 w-10 rounded-lg" />
    </div>
  );
}
