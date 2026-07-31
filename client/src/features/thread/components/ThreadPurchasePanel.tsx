import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppInput } from "@/components/forms/AppInput";
import { AppSelect } from "@/components/forms/AppSelect";
import { AppButton } from "@/components/forms/AppButton";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { stickyCellClass } from "@/shared/components/data-table";
import { cn } from "@/lib/utils";
import { formatDate, formatNumber, todayISO } from "@/lib/format";
import { threadPurchaseSchema, type ThreadPurchaseSchemaInput } from "../schemas/thread-schemas";
import { useThreadPurchases, useCreateThreadPurchase, useDeleteThreadPurchase } from "../hooks/use-thread";
import { THREAD_DENIERS, THREAD_BASE_COLORS } from "../types";

const DENIER_OPTIONS = THREAD_DENIERS.map((d) => ({ label: `${d} Denier`, value: d }));
const COLOR_OPTIONS = THREAD_BASE_COLORS.map((c) => ({ label: c, value: c }));

/**
 * Thread receiving. Recording a receipt immediately credits primary (undyed) stock — there
 * is no approval step, matching how material purchases behave on the printed side.
 *
 * Total weight is previewed live but never submitted: the server always recomputes it as
 * `weight per carton × cartons`.
 */
export function ThreadPurchasePanel() {
  const { data: purchases, isLoading } = useThreadPurchases();
  const createPurchase = useCreateThreadPurchase();
  const deletePurchase = useDeleteThreadPurchase();
  const [showForm, setShowForm] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ThreadPurchaseSchemaInput>({
    resolver: zodResolver(threadPurchaseSchema) as any,
    defaultValues: {
      receivedDate: todayISO(),
      denier: "75",
      threadColor: "White",
      vendor: "",
      invoiceNumber: "",
      totalCtns: "" as unknown as number,
      weightPerCtnKg: "" as unknown as number,
      notes: "",
    },
  });

  const [totalCtns, weightPerCtnKg] = useWatch({ control, name: ["totalCtns", "weightPerCtnKg"] });
  const previewTotal = (Number(totalCtns) || 0) * (Number(weightPerCtnKg) || 0);

  const onSubmit = async (data: ThreadPurchaseSchemaInput) => {
    try {
      await createPurchase.mutateAsync({
        receivedDate: String(data.receivedDate),
        denier: data.denier,
        threadColor: data.threadColor,
        vendor: String(data.vendor),
        invoiceNumber: String(data.invoiceNumber),
        totalCtns: Number(data.totalCtns),
        weightPerCtnKg: Number(data.weightPerCtnKg),
        notes: data.notes || undefined,
      });
      reset();
      setShowForm(false);
    } catch {
      // Hook onError already toasts; leave the form open so the entry isn't lost.
    }
  };

  return (
    <div className="space-y-4">
      {showForm && (
        <AppCard
          title="Record Thread Receipt"
          description="Crediting stock is immediate — the received weight goes straight into primary (undyed) stock."
        >
          <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={handleSubmit(onSubmit)}>
            <SubmitOnEnter disabled={createPurchase.isPending} />
            <AppInput
              label="Received Date *"
              type="date"
              error={errors.receivedDate?.message}
              {...register("receivedDate")}
            />
            <AppSelect
              label="Item Code (Denier) *"
              options={DENIER_OPTIONS}
              error={errors.denier?.message}
              {...register("denier")}
            />
            <AppSelect
              label="Thread Colour *"
              options={COLOR_OPTIONS}
              error={errors.threadColor?.message}
              {...register("threadColor")}
            />
            <AppInput label="Vendor *" error={errors.vendor?.message} {...register("vendor")} />
            <AppInput
              label="Invoice Number *"
              error={errors.invoiceNumber?.message}
              {...register("invoiceNumber")}
            />
            <AppInput
              label="Total CTNs *"
              type="number"
              error={errors.totalCtns?.message}
              {...register("totalCtns")}
            />
            <AppInput
              label="Weight / CTN (kg) *"
              type="number"
              step="any"
              error={errors.weightPerCtnKg?.message}
              {...register("weightPerCtnKg")}
            />
            <div className="flex flex-col justify-end">
              <span className="text-xs text-muted-foreground">Total Weight (calculated)</span>
              <span className="text-lg font-semibold tabular-nums text-primary">
                {formatNumber(previewTotal, 3)} kg
              </span>
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <AppInput label="Notes" placeholder="Optional" {...register("notes")} />
            </div>
            <div className="flex gap-2 border-t pt-4 sm:col-span-2 lg:col-span-4">
              <AppButton type="submit" loading={createPurchase.isPending}>
                Record Receipt
              </AppButton>
              <AppButton
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setShowForm(false);
                }}
              >
                Cancel
              </AppButton>
            </div>
          </form>
        </AppCard>
      )}

      <AppCard
        title="Thread Receipts"
        contentClassName="p-0"
        headerActions={
          !showForm && (
            <AppButton size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowForm(true)}>
              New Receipt
            </AppButton>
          )
        }
      >
        {isLoading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : (purchases ?? []).length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            No thread receipts yet. Record one to credit undyed stock.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                {["Date", "Item Code", "Colour", "Vendor", "Invoice", "CTNs", "Wt/CTN", "Total (kg)", ""].map(
                  (h, i, arr) => (
                    <TableHead
                      key={h || `sp-${i}`}
                      className={cn(
                        "h-10 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                        ["CTNs", "Wt/CTN", "Total (kg)"].includes(h) && "text-right",
                        // Date and the actions column stay put while the middle scrolls.
                        stickyCellClass(i === 0 ? "first" : i === arr.length - 1 ? "last" : undefined, {
                          header: true,
                          tint: "muted",
                        })
                      )}
                    >
                      {h}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(purchases ?? []).map((p) => (
                <TableRow key={p.id} className="bg-card">
                  <TableCell className={cn("whitespace-nowrap", stickyCellClass("first"))}>
                    {formatDate(p.receivedDate)}
                  </TableCell>
                  <TableCell>{p.denier}D</TableCell>
                  <TableCell>{p.threadColor}</TableCell>
                  <TableCell>{p.vendor}</TableCell>
                  <TableCell className="font-mono text-xs">{p.invoiceNumber}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNumber(p.totalCtns, 0)}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatNumber(p.weightPerCtnKg, 3)}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {formatNumber(p.totalWeightKg, 3)}
                  </TableCell>
                  <TableCell className={cn("text-right", stickyCellClass("last"))}>
                    <AppButton
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2"
                      aria-label={`Delete receipt ${p.invoiceNumber}`}
                      loading={deletePurchase.isPending}
                      onClick={() => deletePurchase.mutate(p.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </AppButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </AppCard>
    </div>
  );
}
