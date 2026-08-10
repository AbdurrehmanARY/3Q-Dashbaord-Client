import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { WorkOrderSchemaInput } from "../schemas/work-order-schemas";

export function ArtworkAndComment({ isLocked }: { isLocked: boolean }) {
  const { register } = useFormContext<WorkOrderSchemaInput>();

  return (
    <div className="grid gap-1.5 sm:col-span-2">
      <Label htmlFor="wo-comment" className="text-xs font-semibold">
        Comment
      </Label>
      <Textarea
        id="wo-comment"
        disabled={isLocked}
        placeholder="Optional comments about this order..."
        rows={3}
        {...register("comment")}
      />
    </div>
  );
}
