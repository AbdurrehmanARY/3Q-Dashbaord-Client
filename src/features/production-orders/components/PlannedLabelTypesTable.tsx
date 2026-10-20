import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { formatNumber } from "@/lib/format";
import { PlayCircle, Sliders, Plus } from "lucide-react";
import { ProductionLineStatusBadge } from "./ProductionStatusBadge";
import type { ProductionLineOverview } from "../types";

interface PlannedLabelTypesTableProps {
  lines: ProductionLineOverview[];
  onOpenPlanDialog: () => void;
  onEditPlan: (line: ProductionLineOverview) => void;
}

export function PlannedLabelTypesTable({
  lines,
  onOpenPlanDialog,
  onEditPlan,
}: PlannedLabelTypesTableProps) {
  return (
    <AppCard
      title={`Planned Label Types (${lines.length})`}
      headerActions={
        <div className="flex items-center gap-2">
          <AppButton
            size="sm"
            variant="outline"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={onOpenPlanDialog}
          >
            Add Label Type
          </AppButton>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b bg-muted/30 font-semibold text-muted-foreground">
              <th className="py-2.5 px-3">Label Type</th>
              <th className="py-2.5 px-3 text-right">Planned Qty (pcs)</th>
              <th className="py-2.5 px-3 text-right">Label Size (mm)</th>
              <th className="py-2.5 px-3 text-right">Roll Length</th>
              <th className="py-2.5 px-3 text-right">Planned Rolls</th>
              <th className="py-2.5 px-3">Material Reserved</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {lines.map((line) => (
              <tr key={line.id} className="hover:bg-muted/20 transition-colors">
                <td className="py-2.5 px-3 font-semibold text-foreground">
                  {line.labelType}
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-semibold">
                  {formatNumber(line.planning.quantity, 0)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">
                  {formatNumber(line.planning.labelSize, 0)} mm
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">
                  {formatNumber(line.planning.rollLength, 0)} m
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-extrabold text-primary">
                  {formatNumber(line.planning.totalRolls, 2)}
                </td>
                <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                  {line.material.materialCode || "—"} ({formatNumber(line.material.assignedRolls, 0)} rolls)
                </td>
                <td className="py-2.5 px-3">
                  <ProductionLineStatusBadge status={line.status} />
                </td>
                <td className="py-2.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <AppButton
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs"
                      leftIcon={<Sliders className="h-3.5 w-3.5 text-primary" />}
                      onClick={() => onEditPlan(line)}
                    >
                      Edit Plan
                    </AppButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppCard>
  );
}
