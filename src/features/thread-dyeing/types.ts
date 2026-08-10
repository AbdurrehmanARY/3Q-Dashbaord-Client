export type Denier = "45" | "75" | "100" | "150";
export type BaseColor = "White" | "Black";
export type DyeingStatus = "sent" | "partially_received" | "received";

export const DENIERS: Denier[] = ["45", "75", "100", "150"];
export const BASE_COLORS: BaseColor[] = ["White", "Black"];

export const DYEING_STATUS_LABELS: Record<DyeingStatus, string> = {
  sent: "Sent",
  partially_received: "Partially Received",
  received: "Received",
};

export interface ServiceProvider {
  id: number;
  name: string;
  contact: string | null;
  address: string | null;
  notes: string | null;
}

export interface DyeingAllocation {
  id: number;
  threadDyeingSendId: number;
  colorName: string;
  pantone: string | null;
  colorCode: string | null;
  /** Weight sent for this colour (the "before" weight). */
  allocatedWeight: number;
  /** Actual dyed weight received back (the "after" weight). Null until received. */
  receivedWeight: number | null;
}

export interface DyeingReceive {
  id: number;
  threadDyeingSendId: number;
  receivingDate: string;
  receiverTrackingNumber: string | null;
  invoiceNumber: string | null;
}

export interface DyeingSend {
  id: number;
  serviceProviderId: number;
  serviceProviderName: string | null;
  sendingDate: string;
  senderTrackingNumber: string | null;
  denier: Denier;
  baseThreadColor: BaseColor;
  totalWeightSent: number;
  status: DyeingStatus;
  createdAt: string;
  allocations: DyeingAllocation[];
  receives: DyeingReceive[];
}

export interface AllocationInput {
  colorName: string;
  pantone?: string;
  colorCode?: string;
  allocatedWeight: number;
}

export interface SendDyeingInput {
  serviceProviderId: number;
  sendingDate: string;
  senderTrackingNumber?: string;
  denier: Denier;
  baseThreadColor: BaseColor;
  totalWeightSent: number;
  allocations: AllocationInput[];
}

export interface ReceiveDyeingInput {
  receivingDate: string;
  receiverTrackingNumber?: string;
  invoiceNumber?: string;
  allocations: { id: number; colorCode?: string; receivedWeight: number }[];
}

export interface ServiceProviderInput {
  name: string;
  contact?: string;
  address?: string;
  notes?: string;
}
