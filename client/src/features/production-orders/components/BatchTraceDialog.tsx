import { ArrowDown, ArrowUp } from "lucide-react";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { formatNumber } from "@/lib/format";
import { useBatchTrace } from "../hooks/use-batches";
import { STAGE_LABEL, type BatchTraceRow, type ProductionBatch } from "../batch-types";

interface BatchTraceDialogProps {
  open: boolean;
  onClose: () => void;
  batch: ProductionBatch;
}

/**
 * Full lineage for one batch: every batch that fed it, and everything its output went on
 * to feed. Depth 1 is the immediate neighbour, depth 2 the stage before or after that.
 */
export function BatchTraceDialog({ open, onClose, batch }: BatchTraceDialogProps) {
  const trace = useBatchTrace(batch.stage, batch.id);

  return (
    <AppDialog
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={`${batch.batchCode} — Traceability`}
      description={`${STAGE_LABEL[batch.stage]} · ${formatNumber(Number(batch.producedRolls), 0)} rolls produced`}
      className="sm:max-w-[520px]"
      footer={<AppButton onClick={onClose}>Close</AppButton>}
    >
      {trace.isLoading ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Loading lineage…</p>
      ) : (
        <div className="space-y-5">
          <TraceList
            icon={ArrowUp}
            title="Consumed from"
            emptyText="This batch draws from the production plan, not from another batch."
            rows={trace.data?.upstream ?? []}
            amountOf={(r) => r.rolls_from_source}
          />
          <TraceList
            icon={ArrowDown}
            title="Fed into"
            emptyText="Nothing downstream has taken this batch's output yet."
            rows={trace.data?.downstream ?? []}
            amountOf={(r) => r.rolls_to_destination}
          />
        </div>
      )}
    </AppDialog>
  );
}

function TraceList({
  icon: Icon,
  title,
  emptyText,
  rows,
  amountOf,
}: {
  icon: React.ElementType;
  title: string;
  emptyText: string;
  rows: BatchTraceRow[];
  amountOf: (row: BatchTraceRow) => string | null | undefined;
}) {
  return (
    <section>
      <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </h4>
      {rows.length === 0 ? (
        <p className="text-xs text-muted-foreground">{emptyText}</p>
      ) : (
        <ol className="space-y-1">
          {rows.map((row) => (
            <li
              key={`${row.id}-${row.depth}`}
              className="flex items-center justify-between rounded-md border px-3 py-1.5"
              style={{ marginLeft: `${(row.depth - 1) * 14}px` }}
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold">{row.batch_code}</span>
                <span className="text-[11px] text-muted-foreground">
                  {STAGE_LABEL[row.stage]}
                </span>
              </span>
              <span className="font-mono text-xs tabular-nums">
                {formatNumber(Number(amountOf(row) ?? 0), 0)} rolls
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
