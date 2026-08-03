import * as React from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
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
import { useDeleteProductionOrder } from "../hooks/use-production-orders";
import type { ProductionOrder } from "../types";

export function ProductionOrderRowActions({ order }: { order: ProductionOrder }) {
  const navigate = useNavigate();
  const deleteOrder = useDeleteProductionOrder();
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          aria-label={`Actions for ${order.productionNumber}`}
        >
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(`/production-orders/${order.id}`)}>
            <EyeIcon className="text-muted-foreground" />
            View
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
