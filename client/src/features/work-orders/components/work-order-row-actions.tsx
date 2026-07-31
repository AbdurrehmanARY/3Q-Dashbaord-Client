import * as React from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon, TruckIcon } from "lucide-react";
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
import { useDeleteWorkOrder } from "../hooks/use-work-orders";
import { WorkOrderDialog } from "./WorkOrderDialog";
import { DispatchDialog } from "./DispatchDialog";
import type { WorkOrder } from "../types";

/**
 * Per-row actions. Owns its own delete mutation rather than taking a callback, so the
 * column definitions stay pure data and the generic table stays feature-agnostic.
 *
 * The confirm dialog is a sibling of the menu, driven by local state: a dialog rendered
 * *inside* `DropdownMenuContent` would unmount the moment the menu closes on click.
 */
export function WorkOrderRowActions({ workOrder }: { workOrder: WorkOrder }) {
  const navigate = useNavigate();
  const deleteWorkOrder = useDeleteWorkOrder();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [dispatchOpen, setDispatchOpen] = React.useState(false);

  // Only an untouched sales order can be edited or deleted; once production owns it the
  // server rejects both, so the menu does not offer dead actions.
  const isEditable = workOrder.status === "initiate_production";
  // Dispatch is the final step, available once production has completed the order. It stays
  // available afterwards so a typo'd DC/LC/FBR number can be corrected.
  const canDispatch = workOrder.status === "complete" || workOrder.status === "dispatched";

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        {/* className rather than `render={<Button/>}` — see data-table-column-header. */}
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
          <DropdownMenuItem
            disabled={!isEditable}
            onClick={() => setEditOpen(true)}
          >
            <PencilIcon className="text-muted-foreground" />
            Edit
          </DropdownMenuItem>

          {canDispatch && (
            <DropdownMenuItem onClick={() => setDispatchOpen(true)}>
              <TruckIcon className="text-muted-foreground" />
              {workOrder.status === "dispatched" ? "Edit Dispatch" : "Dispatch"}
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            disabled={!isEditable}
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
        <WorkOrderDialog open workOrder={workOrder} onClose={() => setEditOpen(false)} />
      )}

      {dispatchOpen && (
        <DispatchDialog open workOrder={workOrder} onClose={() => setDispatchOpen(false)} />
      )}
    </div>
  );
}
