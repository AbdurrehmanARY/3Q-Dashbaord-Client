import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, PencilIcon, Trash2Icon, PackageCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppButton } from "@/components/forms/AppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { DataTable, DataTableColumnHeader, DataTableEmpty } from "@/shared/components/data-table";
import { formatNumber, formatDate } from "@/lib/format";
import { useSends, useProviders, useDeleteProvider } from "../hooks/use-thread-dyeing";
import { SendDyeingDialog } from "../components/SendDyeingDialog";
import { ReceiveDyeingDialog } from "../components/ReceiveDyeingDialog";
import { ServiceProviderDialog } from "../components/ServiceProviderDialog";
import { DYEING_STATUS_LABELS, type DyeingSend, type DyeingStatus, type ServiceProvider } from "../types";

const STATUS_VARIANT: Record<DyeingStatus, "pending" | "active" | "completed"> = {
  sent: "pending",
  partially_received: "active",
  received: "completed",
};

export function ThreadDyeingPage() {
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveTarget, setReceiveTarget] = useState<DyeingSend | null>(null);
  const [providerDialog, setProviderDialog] = useState<{ open: boolean; editing: ServiceProvider | null }>({
    open: false,
    editing: null,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Thread Dyeing"
        description="Send undyed thread out for dyeing and receive it back into dyed stock."
      />

      <Tabs defaultValue="sends">
        <TabsList>
          <TabsTrigger value="sends">Dyeing Sends</TabsTrigger>
          <TabsTrigger value="providers">Service Providers</TabsTrigger>
        </TabsList>

        <TabsContent value="sends" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setSendOpen(true)}>
              Send for Dyeing
            </AppButton>
          </div>
          <SendsTable onReceive={setReceiveTarget} />
        </TabsContent>

        <TabsContent value="providers" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <AppButton
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setProviderDialog({ open: true, editing: null })}
            >
              Add Provider
            </AppButton>
          </div>
          <ProvidersTable onEdit={(p) => setProviderDialog({ open: true, editing: p })} />
        </TabsContent>
      </Tabs>

      {sendOpen && <SendDyeingDialog open onClose={() => setSendOpen(false)} />}
      {receiveTarget && (
        <ReceiveDyeingDialog send={receiveTarget} open onClose={() => setReceiveTarget(null)} />
      )}
      {providerDialog.open && (
        <ServiceProviderDialog
          provider={providerDialog.editing}
          open
          onClose={() => setProviderDialog({ open: false, editing: null })}
        />
      )}
    </div>
  );
}

function SendsTable({ onReceive }: { onReceive: (send: DyeingSend) => void }) {
  const { data, isLoading } = useSends();

  const columns: ColumnDef<DyeingSend>[] = [
    {
      accessorKey: "sendingDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Sent" />,
      cell: ({ row }) => formatDate(row.original.sendingDate),
    },
    { accessorKey: "serviceProviderName", header: "Provider", cell: ({ row }) => row.original.serviceProviderName ?? "—" },
    { id: "denier", header: "Denier", cell: ({ row }) => `${row.original.denier}D` },
    { accessorKey: "baseThreadColor", header: "Base" },
    {
      id: "totalWeightSent",
      accessorFn: (r) => r.totalWeightSent,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Sent (kg)" />,
      cell: ({ row }) => formatNumber(row.original.totalWeightSent, 3),
      meta: { align: "right" },
    },
    {
      id: "colours",
      header: "Colours",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original.allocations.map((a) => a.colorName).join(", ") || "—"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge variant={STATUS_VARIANT[row.original.status]}>
          {DYEING_STATUS_LABELS[row.original.status]}
        </StatusBadge>
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.status !== "received" ? (
          <div className="flex justify-end">
            <AppButton size="sm" variant="outline" leftIcon={<PackageCheck className="h-3.5 w-3.5" />}
              onClick={() => onReceive(row.original)}>
              Receive
            </AppButton>
          </div>
        ) : null,
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={columns}
        data={data ?? []}
        loading={isLoading}
        getRowId={(r) => String(r.id)}
        empty={<DataTableEmpty title="No dyeing sends yet" description="Send undyed thread for dyeing to get started." />}
      />
    </div>
  );
}

function ProvidersTable({ onEdit }: { onEdit: (p: ServiceProvider) => void }) {
  const { data, isLoading } = useProviders();
  const del = useDeleteProvider();

  const columns: ColumnDef<ServiceProvider>[] = [
    { accessorKey: "name", header: ({ column }) => <DataTableColumnHeader column={column} title="Name" /> },
    { accessorKey: "contact", header: "Contact", cell: ({ row }) => row.original.contact ?? "—" },
    { accessorKey: "address", header: "Address", cell: ({ row }) => row.original.address ?? "—" },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      size: 96,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <AppButton variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(row.original)} aria-label="Edit">
            <PencilIcon className="h-4 w-4" />
          </AppButton>
          <ConfirmDialog
            trigger={
              <AppButton variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" aria-label="Delete">
                <Trash2Icon className="h-4 w-4" />
              </AppButton>
            }
            title={`Delete ${row.original.name}?`}
            description="This permanently removes the service provider."
            confirmLabel="Delete"
            loading={del.isPending}
            onConfirm={async () => { await del.mutateAsync(row.original.id); }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={columns}
        data={data ?? []}
        loading={isLoading}
        getRowId={(r) => String(r.id)}
        empty={<DataTableEmpty title="No service providers yet" description="Add a dyeing service provider." />}
      />
    </div>
  );
}
