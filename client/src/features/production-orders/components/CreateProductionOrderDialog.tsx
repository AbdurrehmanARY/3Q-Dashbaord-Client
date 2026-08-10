import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { AppButton } from "@/components/forms/AppButton";
import { AppCombobox } from "@/components/forms/AppCombobox";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber, formatDate } from "@/lib/format";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { cn } from "@/lib/utils";
import { useCreateProductionOrder, useEligibleSalesOrders } from "../hooks/use-production-orders";

interface CreateProductionOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (productionOrderId: number) => void;
}

interface NotesForm {
  notes: string;
}

/**
 * Phase 1 — Office Staff. The production order is raised from a work order that is still
 * `initiate_production`. Features searchable SO and PO combobox pickers built on `AppCombobox`.
 */
export function CreateProductionOrderDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateProductionOrderDialogProps) {
  const { data: salesOrders, isLoading } = useEligibleSalesOrders(open);
  const createOrder = useCreateProductionOrder();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<NotesForm>({ defaultValues: { notes: "" } });

  useEffect(() => {
    if (open) {
      setSelectedId(null);
      reset({ notes: "" });
    }
  }, [open, reset]);

  const soOptions = useMemo(() => {
    return (salesOrders ?? []).map((so) => ({
      value: so.id,
      label: `${so.soNumber} ${so.poNumber ? `(PO: ${so.poNumber})` : ""}`,
      hint: `${so.companyName ?? "—"} · ${so.brandName ?? "—"} · ${formatNumber(so.totalQty, 0)} units`,
    }));
  }, [salesOrders]);

  const poOptions = useMemo(() => {
    return (salesOrders ?? [])
      .filter((so) => !!so.poNumber)
      .map((so) => ({
        value: so.id,
        label: `PO: ${so.poNumber} (${so.soNumber})`,
        hint: `${so.companyName ?? "—"} · ${so.brandName ?? "—"}`,
      }));
  }, [salesOrders]);

  const selectedSO = useMemo(() => {
    if (selectedId == null) return null;
    return (salesOrders ?? []).find((so) => so.id === selectedId) ?? null;
  }, [salesOrders, selectedId]);

  const onSubmit = async (data: NotesForm) => {
    if (selectedId == null) return;
    const created = await createOrder.mutateAsync({
      workOrderId: selectedId,
      notes: data.notes || undefined,
    });
    onOpenChange(false);
    onCreated?.(created.data.id);
  };

  const isEmpty = !isLoading && (salesOrders ?? []).length === 0;

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Production Order"
      description="Search and pick an eligible work order by SO number or PO number below."
      className="sm:max-w-3xl"
      footer={
        <>
          <AppButton variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </AppButton>
          <AppButton
            loading={createOrder.isPending}
            disabled={selectedId == null}
            onClick={handleSubmit(onSubmit)}
          >
            Create Production Order
          </AppButton>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <SubmitOnEnter disabled={createOrder.isPending || selectedId == null} />

        {isEmpty ? (
          <p className="rounded-lg border border-warning/20 bg-warning/5 px-3 py-2 text-xs text-warning">
            No work orders are available. A work order must still be at <b>Initiate Production</b>{" "}
            and must not already have a production order raised against it.
          </p>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <AppCombobox
                label="Search Sales Order (SO) *"
                placeholder="Search SO Number…"
                value={selectedId}
                onChange={setSelectedId}
                options={soOptions}
                loading={isLoading}
                emptyText="No matching sales orders."
              />
              <AppCombobox
                label="Search Purchase Order (PO)"
                placeholder="Search PO Number…"
                value={selectedId}
                onChange={setSelectedId}
                options={poOptions}
                loading={isLoading}
                emptyText="No matching purchase orders."
              />
            </div>

            {selectedSO && (
              <div className="rounded-lg border bg-primary/5 p-3 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">Selected Work Order: {selectedSO.soNumber}</span>
                  <StatusBadge variant={selectedSO.productType === "woven" ? "active" : "pending"}>
                    {selectedSO.productType === "woven" ? "Woven" : "Printed"}
                  </StatusBadge>
                </div>
                <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                  <span>PO: <strong>{selectedSO.poNumber ?? "—"}</strong></span>
                  <span>Company: <strong>{selectedSO.companyName ?? "—"}</strong></span>
                  <span>Brand: <strong>{selectedSO.brandName ?? "—"}</strong></span>
                  <span>Total Qty: <strong>{formatNumber(selectedSO.totalQty, 0)}</strong></span>
                </div>
              </div>
            )}

            <div className="max-h-[35vh] overflow-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-8" />
                    <TableHead>Order Date</TableHead>
                    <TableHead>SO / PO</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-right">Total Qty</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-8 text-center text-sm text-muted-foreground">
                        Loading eligible work orders…
                      </TableCell>
                    </TableRow>
                  ) : (salesOrders ?? []).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-8 text-center text-sm text-muted-foreground">
                        No work orders available.
                      </TableCell>
                    </TableRow>
                  ) : (
                    (salesOrders ?? []).map((so) => {
                      const selected = selectedId === so.id;
                      return (
                        <TableRow
                          key={so.id}
                          data-state={selected ? "selected" : undefined}
                          className={cn("cursor-pointer hover:bg-muted/50", selected && "bg-primary/5")}
                          onClick={() => setSelectedId(so.id)}
                        >
                          <TableCell>
                            <input
                              type="radio"
                              name="eligible-wo"
                              checked={selected}
                              onChange={() => setSelectedId(so.id)}
                              aria-label={`Select ${so.soNumber}`}
                            />
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-sm">{formatDate(so.orderDate)}</TableCell>
                          <TableCell className="text-sm">
                            <div className="font-mono font-medium">{so.soNumber}</div>
                            {so.poNumber && <div className="font-mono text-xs text-muted-foreground">PO {so.poNumber}</div>}
                          </TableCell>
                          <TableCell className="text-sm">{so.companyName ?? "—"}</TableCell>
                          <TableCell className="text-sm">{so.brandName ?? "—"}</TableCell>
                          <TableCell className="text-right text-sm font-semibold tabular-nums">
                            {formatNumber(so.totalQty, 0)}
                          </TableCell>
                          <TableCell>
                            <StatusBadge variant={so.productType === "woven" ? "active" : "pending"}>
                              {so.productType === "woven" ? "Woven" : "Printed"}
                            </StatusBadge>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="po-notes" className="text-xs font-semibold">
                Notes
              </Label>
              <Textarea id="po-notes" rows={2} placeholder="Optional notes…" {...register("notes")} />
            </div>
          </>
        )}
      </form>
    </AppDialog>
  );
}
