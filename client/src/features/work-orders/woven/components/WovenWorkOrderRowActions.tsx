import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  TruckIcon,
  ArrowUpToLineIcon,
  ArrowDownToLineIcon,
  PinOffIcon,
  ScissorsIcon,
  CopyIcon,
  PlusCircleIcon,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteWovenWorkOrder } from "../hooks/use-woven-work-orders";
import { WovenWorkOrderDialog } from "./WovenWorkOrderDialog";
import { WovenDispatchDialog } from "./WovenDispatchDialog";
import type { WorkOrder } from "@/features/work-orders/types";

export interface RowPinControls {
  isPinned: false | "top" | "bottom";
  pinTop: () => void;
  pinBottom: () => void;
  unpin: () => void;
}

/**
 * Per-row actions for the woven workflow table. Owns its own delete mutation rather than
 * taking a callback, so the column definitions stay pure data and the generic table stays
 * feature-agnostic.
 */
export function WovenWorkOrderRowActions({
  workOrder,
  pinControls,
  readOnly,
}: {
  workOrder: WorkOrder;
  pinControls?: RowPinControls;
  /** When true, only the View action is shown — used by read-only dashboard pages. */
  readOnly?: boolean;
}) {
  const navigate = useNavigate();
  const deleteWorkOrder = useDeleteWovenWorkOrder();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [dispatchOpen, setDispatchOpen] = React.useState(false);
  const [childOrderType, setChildOrderType] = React.useState<
    "shortfall" | "recut order" | "additional order" | null
  >(null);

  // Work orders can now be edited and deleted anytime regardless of status
  const isDeletable = true;
  const canDispatch = workOrder.status === "complete" || workOrder.status === "dispatched";
  const isDispatched = workOrder.status === "dispatched" || workOrder.status === "complete";

  if (readOnly) {
    return (
      <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
        <AppButton
          variant="ghost"
          size="icon-sm"
          title={`View ${workOrder.soNumber}`}
          onClick={() => navigate(`/work-orders/${workOrder.id}`)}
        >
          <EyeIcon className="size-4 text-muted-foreground hover:text-foreground" />
        </AppButton>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          aria-label={`Actions for ${workOrder.soNumber}`}
        >
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(`/work-orders/${workOrder.id}`)}>
            <EyeIcon className="text-muted-foreground" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <PencilIcon className="text-muted-foreground" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {isDispatched ? (
            <>
              <DropdownMenuItem onClick={() => setChildOrderType("shortfall")}>
                <ScissorsIcon className="text-muted-foreground" />
                Shortfall Order
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setChildOrderType("recut order")}>
                <CopyIcon className="text-muted-foreground" />
                Recut Order
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={() => setChildOrderType("additional order")}>
              <PlusCircleIcon className="text-muted-foreground" />
              Additional Order
            </DropdownMenuItem>
          )}

          {canDispatch && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDispatchOpen(true)}>
                <TruckIcon className="text-muted-foreground" />
                {workOrder.status === "dispatched" ? "Edit Dispatch" : "Dispatch"}
              </DropdownMenuItem>
            </>
          )}

          {pinControls && (
            <>
              <DropdownMenuSeparator />
              {pinControls.isPinned !== "top" && (
                <DropdownMenuItem onClick={pinControls.pinTop}>
                  <ArrowUpToLineIcon className="text-muted-foreground" />
                  Pin to top
                </DropdownMenuItem>
              )}
              {pinControls.isPinned !== "bottom" && (
                <DropdownMenuItem onClick={pinControls.pinBottom}>
                  <ArrowDownToLineIcon className="text-muted-foreground" />
                  Pin to bottom
                </DropdownMenuItem>
              )}
              {pinControls.isPinned && (
                <DropdownMenuItem onClick={pinControls.unpin}>
                  <PinOffIcon className="text-muted-foreground" />
                  Unpin row
                </DropdownMenuItem>
              )}
            </>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            disabled={!isDeletable}
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete work order?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {workOrder.soNumber}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              render={
                <AppButton
                  variant="destructive"
                  loading={deleteWorkOrder.isPending}
                  onClick={async () => {
                    await deleteWorkOrder.mutateAsync(workOrder.id);
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

      {editOpen && (
        <WovenWorkOrderDialog
          open
          workOrder={workOrder}
          onClose={() => setEditOpen(false)}
        />
      )}

      {childOrderType && (
        <WovenWorkOrderDialog
          open
          workOrder={workOrder}
          childOrderType={childOrderType}
          onClose={() => setChildOrderType(null)}
        />
      )}

      {dispatchOpen && (
        <WovenDispatchDialog
          open
          workOrder={workOrder}
          onClose={() => setDispatchOpen(false)}
        />
      )}
    </div>
  );
}
