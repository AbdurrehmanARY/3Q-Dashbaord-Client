import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, PencilIcon, Trash2Icon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppButton } from "@/components/forms/AppButton";
import { AppInput } from "@/components/forms/AppInput";
import { AppDialog } from "@/components/dialogs/AppDialog";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { SubmitOnEnter } from "@/components/forms/SubmitOnEnter";
import { DataTable, DataTableColumnHeader, DataTableEmpty } from "@/shared/components/data-table";
import { formatNumber, formatDate } from "@/lib/format";
import { useReceipts, useCreateReceipt, useUpdateReceipt, useDeleteReceipt } from "../hooks/use-material-receipts";
import type { MaterialReceipt, MaterialReceiptConfig } from "../receipts-types";

/**
 * Generic CRUD page for the three near-identical material-receipt ledgers (sticker rolls,
 * local sheets, label sheets). Each differs only in field labels and which two numeric
 * fields multiply into Total Weight — all captured in `config`.
 */
export function MaterialReceiptPage({ config }: { config: MaterialReceiptConfig }) {
  const { data, isLoading } = useReceipts(config.kind);
  const del = useDeleteReceipt(config.kind);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<MaterialReceipt | null>(null);

  const openCreate = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (row: MaterialReceipt) => { setEditing(row); setDialogOpen(true); };

  const columns = useMemo<ColumnDef<MaterialReceipt>[]>(() => {
    const fieldCols: ColumnDef<MaterialReceipt>[] = config.fields.map((f) => ({
      id: f.name,
      accessorFn: (r) => r[f.name],
      header: ({ column }) => <DataTableColumnHeader column={column} title={f.label} />,
      cell: ({ row }) => {
        const v = row.original[f.name];
        if (f.type === "number") return formatNumber(v as number, 2);
        if (f.type === "date") return formatDate(v as string);
        return (v as string) ?? "—";
      },
      meta: f.type === "number" ? { align: "right" } : undefined,
    }));

    return [
      ...fieldCols,
      {
        id: "totalWeight",
        accessorFn: (r) => r.totalWeight,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Weight" />,
        cell: ({ row }) => (
          <span className="font-semibold tabular-nums">{formatNumber(row.original.totalWeight, 3)}</span>
        ),
        meta: { align: "right" },
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        size: 96,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            <AppButton variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(row.original)} aria-label="Edit">
              <PencilIcon className="h-4 w-4" />
            </AppButton>
            <ConfirmDialog
              trigger={
                <AppButton variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" aria-label="Delete">
                  <Trash2Icon className="h-4 w-4" />
                </AppButton>
              }
              title={`Delete this ${config.entityName.toLowerCase()}?`}
              description="This permanently removes the record."
              confirmLabel="Delete"
              loading={del.isPending}
              onConfirm={async () => { await del.mutateAsync(row.original.id); }}
            />
          </div>
        ),
      },
    ];
  }, [config, del]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
            New {config.entityName}
          </AppButton>
        }
      />

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <DataTable
          columns={columns}
          data={data ?? []}
          loading={isLoading}
          getRowId={(r) => String(r.id)}
          stickyLastColumn
          empty={
            <DataTableEmpty
              title={`No ${config.title.toLowerCase()} yet`}
              description={`Add the first ${config.entityName.toLowerCase()}.`}
            >
              <AppButton size="sm" onClick={openCreate}>
                <Plus className="h-4 w-4" /> New {config.entityName}
              </AppButton>
            </DataTableEmpty>
          }
        />
      </div>

      {dialogOpen && (
        <ReceiptFormDialog config={config} editing={editing} onClose={() => setDialogOpen(false)} />
      )}
    </div>
  );
}

function ReceiptFormDialog({
  config,
  editing,
  onClose,
}: {
  config: MaterialReceiptConfig;
  editing: MaterialReceipt | null;
  onClose: () => void;
}) {
  const create = useCreateReceipt(config.kind);
  const update = useUpdateReceipt(config.kind);
  const saving = create.isPending || update.isPending;

  const { register, handleSubmit, watch } = useForm<Record<string, string | number>>({
    defaultValues: editing
      ? Object.fromEntries(config.fields.map((f) => [f.name, (editing[f.name] as string | number) ?? ""]))
      : Object.fromEntries(config.fields.map((f) => [f.name, f.type === "number" ? 0 : ""])),
  });

  const [a, b] = config.multiplicands;
  const totalPreview = (Number(watch(a)) || 0) * (Number(watch(b)) || 0);

  const submit = handleSubmit(async (values) => {
    const body: Record<string, unknown> = {};
    for (const f of config.fields) {
      body[f.name] = f.type === "number" ? Number(values[f.name]) : values[f.name];
    }
    if (editing) await update.mutateAsync({ id: editing.id, body });
    else await create.mutateAsync(body);
    onClose();
  });

  return (
    <AppDialog
      open
      onOpenChange={(o) => { if (!o) onClose(); }}
      title={editing ? `Edit ${config.entityName}` : `New ${config.entityName}`}
      className="sm:max-w-lg"
      footer={
        <>
          <AppButton variant="outline" onClick={onClose}>Cancel</AppButton>
          <AppButton loading={saving} onClick={submit}>{editing ? "Update" : "Create"}</AppButton>
        </>
      }
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
        <SubmitOnEnter disabled={saving} />
        {config.fields.map((f) => (
          <AppInput
            key={f.name}
            label={f.label}
            type={f.type}
            step={f.type === "number" ? "any" : undefined}
            placeholder={f.placeholder}
            {...register(f.name, f.type === "number" ? { valueAsNumber: true } : {})}
          />
        ))}
        <div className="sm:col-span-2 flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Total Weight (auto)</span>
          <span className="text-lg font-bold tabular-nums">{formatNumber(totalPreview, 3)}</span>
        </div>
      </form>
    </AppDialog>
  );
}
