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
import { OperatorDialog } from "./OperatorDialog";
import { useDeleteOperator } from "../hooks/use-entities";
import type { Operator } from "../types";

/** Owns its own edit dialog and delete mutation — the column def stays pure data. */
export function OperatorRowActions({ operator }: { operator: Operator }) {
  const deleteOperator = useDeleteOperator();
  const [editOpen, setEditOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          aria-label={`Actions for ${operator.name}`}
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

      {editOpen && <OperatorDialog open operator={operator} onClose={() => setEditOpen(false)} />}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete operator?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{operator.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              render={
                <AppButton
                  variant="destructive"
                  loading={deleteOperator.isPending}
                  onClick={async () => {
                    await deleteOperator.mutateAsync(operator.id);
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
