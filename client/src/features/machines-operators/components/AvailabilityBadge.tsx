import { StatusBadge } from "@/components/feedback/StatusBadge";
import type { MachineAvailability, OperatorAvailability } from "../types";

/**
 * Live availability of a machine or operator. The variant carries the signal at a glance:
 * warning = committed to a job, active = actually running it, success/neutral = free.
 */
const VARIANTS: Record<
  MachineAvailability | OperatorAvailability,
  "completed" | "active" | "pending" | "neutral"
> = {
  Available: "completed",
  Completed: "completed",
  Reserved: "pending",
  Assigned: "pending",
  "In Production": "active",
  Working: "active",
  Maintenance: "neutral",
};

interface AvailabilityBadgeProps {
  availability: MachineAvailability | OperatorAvailability;
  /** Where the resource is committed — shown as a tooltip-ish caption when occupied. */
  heldBy?: string | null;
}

export function AvailabilityBadge({ availability, heldBy }: AvailabilityBadgeProps) {
  return (
    <div className="space-y-0.5">
      <StatusBadge variant={VARIANTS[availability]}>{availability}</StatusBadge>
      {heldBy && <p className="text-[10px] leading-tight text-muted-foreground">{heldBy}</p>}
    </div>
  );
}
