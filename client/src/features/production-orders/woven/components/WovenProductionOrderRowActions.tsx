import * as React from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
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
import { useDeleteWovenProductionOrder } from "../hooks/use-woven-production-orders";
import type { ProductionOrder } from "@/features/production-orders/types";

export function WovenProductionOrderRowActions({
  order,
  readOnly,
}: {
  order: ProductionOrder;
  /** When true, only the View action is shown — used by read-only dashboard pages. */
  readOnly?: boolean;
}) {
  const navigate = useNavigate();
  const deleteOrder = useDeleteWovenProductionOrder();
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  if (readOnly) {
    return (
      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
        <AppButton
          variant="ghost"
          size="icon-sm"
          title={`View ${order.productionNumber}`}
          onClick={() => navigate(`/production-orders/woven/${order.id}`)}
        >
          <EyeIcon className="size-4 text-muted-foreground hover:text-foreground" />
        </AppButton>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
      <AppButton
        variant="ghost"
        size="icon-sm"
        title={`View ${order.productionNumber}`}
        onClick={() => navigate(`/production-orders/woven/${order.id}`)}
      >
        <EyeIcon className="size-4 text-muted-foreground hover:text-foreground" />
      </AppButton>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          aria-label={`Actions for ${order.productionNumber}`}
        >
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(`/production-orders/woven/${order.id}`)}>
            <EyeIcon className="text-muted-foreground" />
            View Order
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/production-orders/woven/${order.id}/plan`)}
            disabled={order.status === "complete"}
          >
            <PencilIcon className="text-muted-foreground" />
            Edit Plan
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete production order?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete production order {order.productionNumber} and release any reserved material stock.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              render={
                <AppButton
                  variant="destructive"
                  loading={deleteOrder.isPending}
                  onClick={async () => {
                    await deleteOrder.mutateAsync(String(order.id));
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
    </div>
  );
}
