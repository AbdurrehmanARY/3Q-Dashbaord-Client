import * as React from "react";
import { Palette, Boxes, Droplet, Plus, Pencil, Trash2 } from "lucide-react";
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
import { ThreadStockDialog } from "./ThreadStockDialog";
import { useDeleteThreadStock } from "../hooks/use-thread";
import type { ThreadStock } from "../types";

/** Thread stock is low when under this many kg — mirrors the roll table's low-stock cue. */
const LOW_STOCK_KG = 10;

function StockTable({
  rows,
  showCode,
  onEdit,
  onDelete,
  deleting,
}: {
  rows: ThreadStock[];
  showCode: boolean;
  onEdit: (row: ThreadStock) => void;
  onDelete: (row: ThreadStock) => void;
  deleting: boolean;
}) {
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
          <TableHead className="h-10 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Status
          </TableHead>
          <TableHead
            className={cn(
              "h-10 whitespace-nowrap text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              stickyCellClass("last", { header: true, tint: "muted" })
            )}
          >
            Actions
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
            <TableCell>
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
            <TableCell className={cn("text-right", stickyCellClass("last"))}>
              <div className="flex justify-end gap-1">
                <AppButton
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2"
                  aria-label={`Edit ${row.colorName}`}
                  onClick={() => onEdit(row)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </AppButton>
                <AppButton
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-destructive"
                  aria-label={`Delete ${row.colorName}`}
                  // The server refuses once any of it has been consumed — don't offer a dead action.
                  disabled={row.consumedKg > 0}
                  loading={deleting}
                  onClick={() => onDelete(row)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </AppButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function UndyedThreadStockPanel() {
  const { data, isLoading } = useThreadStockSummary();
  const deleteStock = useDeleteThreadStock();
  const [dyeOpen, setDyeOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<ThreadStock | null>(null);

  const tableProps = {
    onEdit: (row: ThreadStock) => setEditing(row),
    onDelete: (row: ThreadStock) => deleteStock.mutate(row.id),
    deleting: deleteStock.isPending,
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
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
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          title="Primary (Undyed) Stock"
          value={`${formatNumber(totals?.primaryKg ?? 0, 2)} kg`}
          description={`${totals?.primaryCount ?? 0} raw thread type(s)`}
          icon={Boxes}
          iconColor="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          title="Raw Stock Status"
          value={`${totals?.primaryCount ?? 0} Items`}
          description="Available for dyeing & direct production"
          icon={Palette}
          iconColor="bg-emerald-500/10 text-emerald-500"
        />
      </div>

      <AppCard
        title="Primary Stock — Undyed Thread"
        description="Raw thread as received. Dyeing draws weight from this ledger."
        contentClassName="p-0"
        headerActions={
          <div className="flex gap-2">
            <AppButton
              size="sm"
              variant="outline"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setCreateOpen(true)}
            >
              New Ledger
            </AppButton>
            <AppButton size="sm" leftIcon={<Palette className="h-4 w-4" />} onClick={() => setDyeOpen(true)}>
              Dye Thread
            </AppButton>
          </div>
        }
      >
        <StockTable rows={data?.primary ?? []} showCode={false} {...tableProps} />
      </AppCard>

      {dyeOpen && <DyeThreadDialog open onClose={() => setDyeOpen(false)} />}
      {createOpen && <ThreadStockDialog open stock={null} onClose={() => setCreateOpen(false)} />}
      {editing && <ThreadStockDialog open stock={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

export function DyedThreadStockPanel() {
  const { data, isLoading } = useThreadStockSummary();
  const deleteStock = useDeleteThreadStock();
  const [editing, setEditing] = React.useState<ThreadStock | null>(null);

  const tableProps = {
    onEdit: (row: ThreadStock) => setEditing(row),
    onDelete: (row: ThreadStock) => deleteStock.mutate(row.id),
    deleting: deleteStock.isPending,
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
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
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          title="Secondary (Dyed) Stock"
          value={`${formatNumber(totals?.secondaryKg ?? 0, 2)} kg`}
          description={`${totals?.secondaryCount ?? 0} color shade(s)`}
          icon={Droplet}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Dyed Stock Status"
          value={`${totals?.secondaryCount ?? 0} Colors`}
          description="Processed thread ready for woven production"
          icon={Palette}
          iconColor="bg-violet-500/10 text-violet-500"
        />
      </div>

      <AppCard
        title="Secondary Stock — Dyed Thread"
        description="Produced by the dyeing process. Woven label planning consumes this pool first."
        contentClassName="p-0"
      >
        <StockTable rows={data?.secondary ?? []} showCode {...tableProps} />
      </AppCard>

      {editing && <ThreadStockDialog open stock={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

/**
 * Combined thread stock panel (retained for legacy combined views).
 */
export function ThreadStockPanel() {
  const { data, isLoading } = useThreadStockSummary();
  const deleteStock = useDeleteThreadStock();
  const [dyeOpen, setDyeOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<ThreadStock | null>(null);

  const tableProps = {
    onEdit: (row: ThreadStock) => setEditing(row),
    onDelete: (row: ThreadStock) => deleteStock.mutate(row.id),
    deleting: deleteStock.isPending,
  };

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
          <div className="flex gap-2">
            <AppButton
              size="sm"
              variant="outline"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setCreateOpen(true)}
            >
              New Ledger
            </AppButton>
            <AppButton size="sm" leftIcon={<Palette className="h-4 w-4" />} onClick={() => setDyeOpen(true)}>
              Dye Thread
            </AppButton>
          </div>
        }
      >
        <StockTable rows={data?.primary ?? []} showCode={false} {...tableProps} />
      </AppCard>

      <AppCard
        title="Secondary Stock — Dyed"
        description="Produced by dyeing. Woven planning consumes this first, falling back to primary."
        contentClassName="p-0"
      >
        <StockTable rows={data?.secondary ?? []} showCode {...tableProps} />
      </AppCard>

      {dyeOpen && <DyeThreadDialog open onClose={() => setDyeOpen(false)} />}
      {createOpen && <ThreadStockDialog open stock={null} onClose={() => setCreateOpen(false)} />}
      {editing && <ThreadStockDialog open stock={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}
