import * as React from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
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
import { useDeleteLine } from "../hooks/use-production-orders";
import type { ProductionLineOverview } from "../types";

interface PlannedLineRowActionsProps {
  line: ProductionLineOverview;
  /** Once a label type has started, its plan is what progress is measured against —
   *  re-planning or cancelling it would invalidate that. */
  disabled: boolean;
  onEdit: (line: ProductionLineOverview) => void;
}

/** Owns its own cancel confirmation + mutation; editing bubbles up since it selects the line into the page's plan form. */
export function PlannedLineRowActions({ line, disabled, onEdit }: PlannedLineRowActionsProps) {
  const deleteLine = useDeleteLine();
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="flex justify-end gap-1">
      <AppButton
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        disabled={disabled}
        onClick={() => onEdit(line)}
        aria-label={`Re-plan ${line.labelType}`}
      >
        <PencilIcon className="h-4 w-4" />
      </AppButton>
      <AppButton
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:bg-destructive/10"
        disabled={disabled}
        onClick={() => setConfirmOpen(true)}
        aria-label={`Cancel ${line.labelType}`}
      >
        <Trash2Icon className="h-4 w-4" />
      </AppButton>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel {line.labelType}?</AlertDialogTitle>
            <AlertDialogDescription>
              Its assigned rolls go back to inventory and its printing machine and operator are released.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction
              render={
                <AppButton
                  variant="destructive"
                  loading={deleteLine.isPending}
                  onClick={async () => {
                    await deleteLine.mutateAsync(String(line.id));
                    setConfirmOpen(false);
                  }}
                >
                  Cancel Label Type
                </AppButton>
              }
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
