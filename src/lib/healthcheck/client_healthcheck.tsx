import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import {
  CheckCircle2,
  CircleAlert,
  RefreshCw,
  Server,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface HealthprobeResult {
  timestamp: string;
  status: number;
  healthy: boolean;
  latencyMs: number;
  error: string | null;
}

interface HealthcheckProps {
  enabled?: boolean;
  intervalMs?: number;
  className?: string;
  detailed?: boolean;
}

const initial: HealthprobeResult = {
  timestamp: new Date().toISOString(),
  status: 0,
  healthy: false,
  latencyMs: 0,
  error: null,
};

export function ClientHealthcheck({
  enabled = true,
  intervalMs = 15000,
  className,
  detailed = true,
}: HealthcheckProps) {
  const [result, setResult] = useState<HealthprobeResult>(initial);
  const [loading, setLoading] = useState(false);

  const ping = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    const started = performance.now();
    try {
      const body = (await api.get<{ status: string; timestamp: string }>("/health")) as {
        status: string;
        timestamp: string;
      };
      const latency = Math.round(performance.now() - started);
      setResult({
        timestamp: body.timestamp ?? new Date().toISOString(),
        status: 200,
        healthy: body.status === "ok",
        latencyMs: latency,
        error: null,
      });
    } catch (err: any) {
      const latency = Math.round(performance.now() - started);
      setResult({
        ...initial,
        status: 0,
        healthy: false,
        latencyMs: latency,
        error:
          err?.response?.data?.message ??
          err?.message ??
          "Unable to reach the backend",
      });
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    ping();
    const id = setInterval(ping, intervalMs);
    return () => clearInterval(id);
  }, [enabled, intervalMs, ping]);

  const variant = result.status === 0 ? "offline" : result.healthy ? "ok" : "degraded";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <RefreshCw
          className={cn("size-4", loading ? "animate-spin" : "opacity-40")}
        />
        <HealthChip variant={variant} loading={loading} latency={result.latencyMs} />
        <span className="text-[11px] text-muted-foreground font-mono">
          {result.timestamp.slice(11, 19)} UTC
        </span>
      </div>

      {detailed && (
        <HealthDetailCard result={result} loading={loading} onRetry={ping} />
      )}
    </div>
  );
}

/** Standalone probe that returns a promise — useful from event handlers, not React state. */
export async function probeBackend(): Promise<HealthprobeResult> {
  const started = performance.now();
  try {
    const body = (await api.get<{ status: string; timestamp: string }>("/health")) as {
      status: string;
      timestamp: string;
    };
    return {
      timestamp: body.timestamp ?? new Date().toISOString(),
      status: 200,
      healthy: body.status === "ok",
      latencyMs: Math.round(performance.now() - started),
      error: null,
    };
  } catch (err: any) {
    return {
      ...initial,
      status: 0,
      healthy: false,
      latencyMs: Math.round(performance.now() - started),
      error:
        err?.response?.data?.message ??
        err?.message ??
        "Unable to reach the backend",
    };
  }
}

/** Single-line status chip. */
function HealthChip({ variant, loading, latency }: {
  variant: "offline" | "ok" | "degraded";
  loading: boolean;
  latency: number;
}) {
  const icon = variant === "offline" ? WifiOff : variant === "ok" ? CheckCircle2 : CircleAlert;
  const label = variant === "offline" ? "No connection" : variant === "ok" ? "Backend ok" : "Degraded";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        variant === "ok" ? "bg-success/10 text-success ring-success/30" :
        variant === "offline" ? "bg-muted text-muted-foreground ring-border" :
        "bg-warning/10 text-warning ring-warning/30",
      )}
    >
      <span className={cn("size-1.5 rounded-full", variant === "ok" ? "bg-success" : variant === "offline" ? "bg-muted-foreground" : "bg-warning")} />
      {loading ? "Checking…" : label}
      {!loading && variant === "ok" && (
        <span className="text-[10px] text-muted-foreground font-mono">{latency}ms</span>
      )}
    </span>
  );
}

/** Detailed card with retry button. */
function HealthDetailCard({ result, loading, onRetry }: {
  result: HealthprobeResult;
  loading: boolean;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-xl border bg-card p-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Server className="size-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Backend health</span>
        </div>
        <button
          type="button"
          onClick={onRetry}
          disabled={loading}
          className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:text-foreground disabled:opacity-40"
        >
          <RefreshCw className={cn("size-3", loading ? "animate-spin" : "")} />
          Retry
        </button>
      </div>

      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
        <div className="flex flex-col">
          <dt className="text-muted-foreground">Status</dt>
          <dd className="font-medium">
            {result.status === 0 ? " unreachable" : result.healthy ? " healthy" : " unhealthy"}
          </dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-muted-foreground">HTTP</dt>
          <dd className="font-medium font-mono">{result.status || "—"}</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-muted-foreground">Latency</dt>
          <dd className="font-medium font-mono">{result.latencyMs}ms</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-muted-foreground">Server time</dt>
          <dd className="font-medium font-mono text-[10px]">
            {result.timestamp.slice(0, 19).replace("T", " ")}
          </dd>
        </div>
      </dl>

      {result.error && (
        <div className="mt-2 flex items-start gap-2 rounded-md bg-destructive/5 px-2.5 py-1.5 text-[11px] text-destructive">
          <CircleAlert className="mt-0.5 shrink-0 size-3.5" />
          <span>{result.error}</span>
        </div>
      )}
    </div>
  );
}
