import { useState } from "react";
import { Scale, RefreshCw, CheckCircle, Package } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { formatNumber, formatDateTime } from "@/lib/format";
import { useReconcileLine } from "../hooks/use-production-orders";
import type { ProductionLineOverview } from "../types";

interface StockReconciliationCardProps {
  orderId: string;
  lines: ProductionLineOverview[];
}

export function StockReconciliationCard({ orderId, lines }: StockReconciliationCardProps) {
  const isReadyForReconciliation =
    lines.length > 0 &&
    lines.every((line) => {
      const plannedRolls = line.planning.totalRolls ?? 0;
      const packagedRolls = line.packaging.packagedRolls ?? 0;
      return (plannedRolls > 0 && packagedRolls === plannedRolls) || !!line.reconciliation?.reconciledAt;
    });

  if (!isReadyForReconciliation) return null;

  return (
    <AppCard
      title="Stock Reconciliation & Return"
      description="Record actual rolls/weight used in production and return extra leftover rolls & weight back to the main roll stock."
    >
      <div className="divide-y">
        {lines.map((line) => (
          <LineReconciliationRow key={line.id} orderId={orderId} line={line} />
        ))}
      </div>
    </AppCard>
  );
}

function LineReconciliationRow({
  orderId,
  line,
}: {
  orderId: string;
  line: ProductionLineOverview;
}) {
  const reconcileMutation = useReconcileLine(orderId);

  const initialUsedRolls = line.reconciliation?.usedRolls ?? line.packaging.packagedRolls ?? line.material.issuedRolls;
  const initialExtraRolls = line.reconciliation?.extraRollsReturned ?? Math.max(0, line.material.issuedRolls - initialUsedRolls);
  const initialUsedWeight = line.reconciliation?.usedWeight ?? line.planning.totalWeight ?? 0;
  const initialExtraWeight = line.reconciliation?.extraWeight ?? 0;

  const [usedRolls, setUsedRolls] = useState<number | string>(initialUsedRolls);
  const [extraRollsReturned, setExtraRollsReturned] = useState<number | string>(initialExtraRolls);
  const [usedWeight, setUsedWeight] = useState<number | string>(initialUsedWeight);
  const [extraWeight, setExtraWeight] = useState<number | string>(initialExtraWeight);

  const isReconciled = !!line.reconciliation?.reconciledAt;

  // Standard roll weight in kg (from material master or calculated from planned totals)
  const assignedRoll = line.material.assignedRolls || line.material.issuedRolls || line.planning.totalRolls || 0;
  const requireRoll = line.planning.requiredRolls || 0;
  const extraRollsUsed = Math.max(0, Number((assignedRoll - requireRoll).toFixed(2)));

  const weightPerRoll = line.material.weightPerRoll || (line.planning.totalWeight > 0 && assignedRoll > 0 ? line.planning.totalWeight / assignedRoll : 0);

  const handleUsedRollsChange = (val: string) => {
    setUsedRolls(val);
    const numUsedRolls = Number(val) || 0;
    if (weightPerRoll > 0) {
      setUsedWeight(Number((numUsedRolls * weightPerRoll).toFixed(3)));
    }
    const leftoverRolls = Math.max(0, Number((assignedRoll - numUsedRolls).toFixed(2)));
    setExtraRollsReturned(leftoverRolls);
    if (weightPerRoll > 0) {
      setExtraWeight(Number((leftoverRolls * weightPerRoll).toFixed(3)));
    }
  };

  const handleUsedWeightChange = (val: string) => {
    setUsedWeight(val);
    const numUsedWeight = Number(val) || 0;
    if (weightPerRoll > 0) {
      const calcUsedRolls = Number((numUsedWeight / weightPerRoll).toFixed(2));
      setUsedRolls(calcUsedRolls);
      const leftoverRolls = Math.max(0, Number((assignedRoll - calcUsedRolls).toFixed(2)));
      setExtraRollsReturned(leftoverRolls);
      setExtraWeight(Number((leftoverRolls * weightPerRoll).toFixed(3)));
    }
  };

  const handleExtraWeightChange = (val: string) => {
    setExtraWeight(val);
    const numExtraWeight = Number(val) || 0;
    if (weightPerRoll > 0) {
      const calcExtraRolls = Number((numExtraWeight / weightPerRoll).toFixed(2));
      setExtraRollsReturned(calcExtraRolls);
      const calcUsedRolls = Math.max(0, Number((assignedRoll - calcExtraRolls).toFixed(2)));
      setUsedRolls(calcUsedRolls);
      setUsedWeight(Number((calcUsedRolls * weightPerRoll).toFixed(3)));
    }
  };

  const handleExtraRollsChange = (val: string) => {
    setExtraRollsReturned(val);
    const numExtraRolls = Number(val) || 0;
    if (weightPerRoll > 0) {
      const calcExtraWeight = Number((numExtraRolls * weightPerRoll).toFixed(3));
      setExtraWeight(calcExtraWeight);
    }
    const calcUsedRolls = Math.max(0, Number((assignedRoll - numExtraRolls).toFixed(2)));
    setUsedRolls(calcUsedRolls);
    if (weightPerRoll > 0) {
      setUsedWeight(Number((calcUsedRolls * weightPerRoll).toFixed(3)));
    }
  };

  const handleReconcile = async () => {
    await reconcileMutation.mutateAsync({
      lineId: String(line.id),
      body: {
        usedRolls: Number(usedRolls) || 0,
        usedWeight: Number(usedWeight) || 0,
        extraRollsReturned: Number(extraRollsReturned) || 0,
        extraWeight: Number(extraWeight) || 0,
      },
    });
  };

  return (
    <div className="py-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{line.labelType}</span>
            {line.material.materialCode && (
              <span className="font-mono text-xs rounded bg-muted px-2 py-0.5 font-medium">
                {line.material.materialCode}
              </span>
            )}
            {isReconciled ? (
              <StatusBadge variant="completed">
                <CheckCircle className="mr-1 size-3 inline" /> Reconciled
              </StatusBadge>
            ) : (
              <StatusBadge variant="pending">Pending Reconciliation</StatusBadge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
            <span>Assigned: <strong>{formatNumber(assignedRoll, 2)}</strong> rolls</span>
            <span>·</span>
            <span>Required: <strong>{formatNumber(requireRoll, 2)}</strong> rolls</span>
            <span>·</span>
            <span className="text-primary font-medium">Extra Rolls Used (Assigned - Required): <strong>{formatNumber(extraRollsUsed, 2)}</strong> rolls</span>
            {weightPerRoll > 0 && (
              <>
                <span>·</span>
                <span>Roll Weight: {formatNumber(weightPerRoll, 3)} kg/roll</span>
              </>
            )}
            {line.reconciliation?.reconciledAt && (
              <span>· Reconciled at {formatDateTime(line.reconciliation.reconciledAt)}</span>
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4 items-end bg-muted/20 p-3 rounded-lg border">
        <AppInput
          label="Used Rolls"
          type="number"
          step="0.01"
          value={usedRolls}
          onChange={(e) => handleUsedRollsChange(e.target.value)}
        />

        <AppInput
          label="Used Weight (kg)"
          type="number"
          step="0.001"
          value={usedWeight}
          onChange={(e) => handleUsedWeightChange(e.target.value)}
        />

        <AppInput
          label="Remaining Roll Weight (kg)"
          type="number"
          step="0.001"
          placeholder="e.g. 0.65 or 0.20"
          value={extraWeight}
          onChange={(e) => handleExtraWeightChange(e.target.value)}
        />

        <AppInput
          label="Remaining Rolls (Auto)"
          type="number"
          step="0.01"
          placeholder="e.g. 0.65 or 0.20"
          value={extraRollsReturned}
          onChange={(e) => handleExtraRollsChange(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Package className="size-3.5" />
          <span>
            Returning <strong>{formatNumber(Number(extraRollsReturned), 2)} rolls</strong> ({formatNumber(Number(extraWeight), 3)} kg) back to main stock ledger.
          </span>
        </p>

        <AppButton
          size="sm"
          variant={isReconciled ? "outline" : "default"}
          loading={reconcileMutation.isPending}
          leftIcon={<RefreshCw className="size-3.5" />}
          onClick={handleReconcile}
        >
          {isReconciled ? "Update Reconciliation" : "Reconcile & Return Stock"}
        </AppButton>
      </div>
    </div>
  );
}
