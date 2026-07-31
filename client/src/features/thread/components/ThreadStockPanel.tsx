import * as React from "react";
import { Palette, Boxes, Droplet } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { StatCard } from "@/components/cards/StatCard";
import { AppButton } from "@/components/forms/AppButton";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { stickyCellClass } from "@/shared/components/data-table";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { useThreadStockSummary } from "../hooks/use-thread";
import { DyeThreadDialog } from "./DyeThreadDialog";
import type { ThreadStock } from "../types";

/** Thread stock is low when under this many kg — mirrors the roll table's low-stock cue. */
const LOW_STOCK_KG = 10;

function StockTable({ rows, showCode }: { rows: ThreadStock[]; showCode: boolean }) {
  if (rows.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-muted-foreground">
        No stock in this pool yet.
      </p>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableHead
            className={cn(
              "h-10 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              stickyCellClass("first", { header: true, tint: "muted" })
            )}
          >
            Colour
          </TableHead>
          {showCode && (
            <TableHead className="h-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Code
            </TableHead>
          )}
          <TableHead className="h-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Denier
          </TableHead>
          <TableHead className="h-10 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Balance (kg)
          </TableHead>
          <TableHead className="h-10 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Received
          </TableHead>
          <TableHead className="h-10 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Consumed
          </TableHead>
          <TableHead
            className={cn(
              "h-10 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              stickyCellClass("last", { header: true, tint: "muted" })
            )}
          >
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} className="bg-card">
            <TableCell className={cn("whitespace-nowrap font-medium", stickyCellClass("first"))}>
              {row.colorName}
            </TableCell>
            {showCode && (
              <TableCell className="font-mono text-xs">{row.colorCode ?? "—"}</TableCell>
            )}
            <TableCell>{row.denier}D</TableCell>
            <TableCell className="text-right font-medium tabular-nums">
              {formatNumber(row.balanceKg, 3)}
            </TableCell>
            <TableCell className="text-right tabular-nums text-muted-foreground">
              {formatNumber(row.receivedKg, 3)}
            </TableCell>
            <TableCell className="text-right tabular-nums text-muted-foreground">
              {formatNumber(row.consumedKg, 3)}
            </TableCell>
            <TableCell className={stickyCellClass("last")}>
              <StatusBadge
                variant={
                  row.balanceKg <= 0
                    ? "out-of-stock"
                    : row.balanceKg < LOW_STOCK_KG
                      ? "low-stock"
                      : "in-stock"
                }
              >
                {row.balanceKg <= 0 ? "Out of stock" : row.balanceKg < LOW_STOCK_KG ? "Low" : "In stock"}
              </StatusBadge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * Thread stock, split into the two pools the floor actually thinks in terms of: undyed
 * thread as purchased (primary) and dyed thread produced by the dyeing process (secondary).
 * Dyeing moves weight from the first to the second.
 */
export function ThreadStockPanel() {
  const { data, isLoading } = useThreadStockSummary();
  const [dyeOpen, setDyeOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const totals = data?.totals;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Primary (Undyed)"
          value={`${formatNumber(totals?.primaryKg ?? 0, 2)} kg`}
          description={`${totals?.primaryCount ?? 0} thread type(s)`}
          icon={Boxes}
        />
        <StatCard
          title="Secondary (Dyed)"
          value={`${formatNumber(totals?.secondaryKg ?? 0, 2)} kg`}
          description={`${totals?.secondaryCount ?? 0} colour(s)`}
          icon={Droplet}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Total Thread"
          value={`${formatNumber((totals?.primaryKg ?? 0) + (totals?.secondaryKg ?? 0), 2)} kg`}
          description="Across both pools"
          icon={Palette}
          iconColor="bg-success/10 text-success"
        />
      </div>

      <AppCard
        title="Primary Stock — Undyed"
        description="Thread as purchased. Dyeing draws from here."
        contentClassName="p-0"
        headerActions={
          <AppButton size="sm" leftIcon={<Palette className="h-4 w-4" />} onClick={() => setDyeOpen(true)}>
            Dye Thread
          </AppButton>
        }
      >
        <StockTable rows={data?.primary ?? []} showCode={false} />
      </AppCard>

      <AppCard
        title="Secondary Stock — Dyed"
        description="Produced by dyeing. Woven planning consumes this first, falling back to primary."
        contentClassName="p-0"
      >
        <StockTable rows={data?.secondary ?? []} showCode />
      </AppCard>

      {dyeOpen && <DyeThreadDialog open onClose={() => setDyeOpen(false)} />}
    </div>
  );
}
