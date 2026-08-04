import * as React from "react";
import { EditIcon, HistoryIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime, formatNumber } from "@/lib/format";
import { RollStockDialog } from "./RollStockDialog";
import { useDeleteRollStock, useRollMovements } from "../hooks/use-inventory";
import type { StockLevel } from "../types";

/** Human labels for the movement reasons the ledger records. */
const MOVEMENT_LABELS: Record<string, string> = {
  opening_balance: "Opening balance",
  purchase_receipt: "Purchase received",
  purchase_reversal: "Purchase reversed",
  production_issue: "Issued to production",
  production_release: "Returned from production",
  adjustment: "Manual adjustment",
};

/** The append-only history behind a ledger's balance. */
function HistoryDialog({ stock, onClose }: { stock: StockLevel; onClose: () => void }) {
  const { data: movements, isLoading } = useRollMovements(stock.materialCode);

  return (
    <AppDialog
      open
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
      title={`Stock History — ${stock.materialCode}`}
      description="Every movement that produced the current balance, newest first."
      className="sm:max-w-2xl"
      footer={
        <AppButton variant="outline" onClick={onClose}>
          Close
        </AppButton>
      }
    >
      {isLoading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Loading history…</p>
      ) : (movements ?? []).length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No movements recorded yet for this material.
        </p>
      ) : (
        <div className="max-h-[60vh] divide-y overflow-y-auto">
          {(movements ?? []).map((m) => (
            <div key={m.id} className="flex items-start justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <StatusBadge variant={m.rolls >= 0 ? "completed" : "pending"}>
                  {MOVEMENT_LABELS[m.movementType] ?? m.movementType}
                </StatusBadge>
                {m.note && <p className="mt-1 text-xs text-muted-foreground">{m.note}</p>}
                <p className="text-[11px] text-muted-foreground">{formatDateTime(m.createdAt)}</p>
              </div>
              <div className="shrink-0 text-right text-sm">
                <div className={cn("font-medium tabular-nums", m.rolls >= 0 ? "text-success" : "text-destructive")}>
                  {m.rolls >= 0 ? "+" : ""}
                  {formatNumber(m.rolls, 2)}
                </div>
                <div className="text-[11px] tabular-nums text-muted-foreground">
                  → {formatNumber(m.balanceAfter, 2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppDialog>
  );
}

/** Per-row actions for a roll stock ledger. Mirrors the work-order row-actions pattern. */
export function RollStockRowActions({ stock }: { stock: StockLevel }) {
  const deleteStock = useDeleteRollStock();
  const [editOpen, setEditOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // The server refuses to delete a ledger with issued rolls; don't offer a dead action.
  const canDelete = Number(stock.issuedRolls) === 0;

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          aria-label={`Actions for ${stock.materialCode}`}
        >
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <EditIcon className="text-muted-foreground" />
            Edit Stock
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setHistoryOpen(true)}>
            <HistoryIcon className="text-muted-foreground" />
            View History
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            disabled={!canDelete}
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2Icon />
            Delete Ledger
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs are siblings of the menu, driven by local state: one rendered *inside*
          DropdownMenuContent would unmount the moment the menu closes on click. */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete stock ledger?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the {stock.materialCode} ledger and its movement history. Only possible
              because nothing has been issued from it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              render={
                <AppButton
                  variant="destructive"
                  loading={deleteStock.isPending}
                  onClick={async () => {
                    await deleteStock.mutateAsync(stock.materialCode);
                    setConfirmOpen(false);
                  }}
                >
                  Delete
                </AppButton>
              }
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editOpen && <RollStockDialog open stock={stock} onClose={() => setEditOpen(false)} />}
      {historyOpen && <HistoryDialog stock={stock} onClose={() => setHistoryOpen(false)} />}
    </div>
  );
}
