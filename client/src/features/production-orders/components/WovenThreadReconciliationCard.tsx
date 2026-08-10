import React, { useState } from "react";
import { Scale, RotateCcw, CheckCircle2 } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { formatNumber } from "@/lib/format";
import { useReconcileWovenThreadStock } from "../hooks/use-woven-production";
import type { WovenThread } from "../woven-types";

interface WovenThreadReconciliationCardProps {
  orderId: string;
  lineId: number;
  threads: WovenThread[];
  isLocked?: boolean;
}

export function WovenThreadReconciliationCard({
  orderId,
  lineId,
  threads,
  isLocked = false,
}: WovenThreadReconciliationCardProps) {
  const reconcile = useReconcileWovenThreadStock(orderId);

  // Initialize remaining weights state map for each thread color
  const [weights, setWeights] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    threads.forEach((t) => {
      initial[t.id] = String(t.remainingWeightKg ?? 0);
    });
    return initial;
  });

  const handleInputChange = (threadId: number, value: string) => {
    setWeights((prev) => ({ ...prev, [threadId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const payload = threads.map((t) => {
      const inputVal = Number(weights[t.id] ?? 0);
      if (isNaN(inputVal) || inputVal < 0) {
        throw new Error(`Remaining weight for ${t.colorName} cannot be negative`);
      }
      if (inputVal > t.weightKg) {
        throw new Error(
          `Remaining weight for ${t.colorName} (${inputVal} kg) cannot exceed planned weight (${t.weightKg} kg)`
        );
      }
      return { id: t.id, remainingWeightKg: inputVal };
    });

    await reconcile.mutateAsync({ lineId, threads: payload });
  };

  if (threads.length === 0) return null;

  return (
    <AppCard
      title="Post-Completion Thread Inventory Reconciliation"
      description="Enter the remaining (unused) thread weight for each color to return it back to dyed stock and recalculate actual consumed weight."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="p-3">Color Code</th>
                <th className="p-3">Color Name</th>
                <th className="p-3">Denier</th>
                <th className="p-3 text-right">Planned Weight</th>
                <th className="p-3 text-right w-44">Remaining Weight (kg)</th>
                <th className="p-3 text-right font-semibold text-foreground">Actual Consumed</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {threads.map((t) => {
                const remNum = Math.max(0, Number(weights[t.id] ?? 0));
                const actualConsumed = Math.max(0, t.weightKg - remNum);
                const isReconciled = (t.remainingWeightKg ?? 0) > 0;

                return (
                  <tr key={t.id} className="hover:bg-muted/20">
                    <td className="p-3 font-mono font-semibold text-primary">{t.colorCode}</td>
                    <td className="p-3 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full border bg-primary/20" />
                        <span>{t.colorName}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <StatusBadge variant="neutral">{t.denier}D</StatusBadge>
                    </td>
                    <td className="p-3 text-right font-medium tabular-nums">
                      {formatNumber(t.weightKg, 3)} kg
                    </td>
                    <td className="p-3 text-right">
                      <AppInput
                        type="number"
                        step="0.001"
                        min="0"
                        max={t.weightKg}
                        value={weights[t.id] ?? "0"}
                        onChange={(e) => handleInputChange(t.id, e.target.value)}
                        className="h-8 text-right font-mono text-xs tabular-nums"
                        placeholder="0.000"
                      />
                    </td>
                    <td className="p-3 text-right font-bold tabular-nums text-emerald-600">
                      {formatNumber(actualConsumed, 3)} kg
                      {isReconciled && (
                        <div className="text-[10px] font-medium text-muted-foreground">
                          ({formatNumber(t.remainingWeightKg, 3)} kg returned)
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Submitting credits unused weight back to dyed inventory in a database transaction.
          </p>
          <AppButton
            type="submit"
            loading={reconcile.isPending}
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Reconcile Remaining Thread
          </AppButton>
        </div>
      </form>
    </AppCard>
  );
}
