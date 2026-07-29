import * as React from "react";
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
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
import { useMaterials } from "@/features/materials";
import { PurchaseForm } from "./PurchaseForm";
import { useDeletePurchase } from "../hooks/use-purchases";
import type { PurchaseRecord } from "../types";

/** Owns its own edit dialog and delete mutation — the column def stays pure data. */
export function PurchaseRowActions({ purchase }: { purchase: PurchaseRecord }) {
  const deletePurchase = useDeletePurchase();
  const { data: materials } = useMaterials();
  const [editOpen, setEditOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          aria-label={`Actions for purchase from ${purchase.vendor}`}
        >
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <EditIcon className="text-muted-foreground" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setConfirmOpen(true)}>
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {editOpen && materials && (
        <PurchaseForm open materials={materials} purchase={purchase} onClose={() => setEditOpen(false)} />
      )}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete purchase record?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the purchase record for {purchase.materialCode} from{" "}
              {purchase.vendor}, and reverse its stock credit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              render={
                <AppButton
                  variant="destructive"
                  loading={deletePurchase.isPending}
                  onClick={async () => {
                    await deletePurchase.mutateAsync(purchase.id);
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
