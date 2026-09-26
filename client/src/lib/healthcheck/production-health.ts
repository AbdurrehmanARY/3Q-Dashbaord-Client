import { api } from "@/lib/api";
import type { HealthprobeResult } from "./client_healthcheck";
import { probeBackend } from "./client_healthcheck";

/**
 * Production module health probe.
 *
 * Checks that the production-orders endpoint is reachable. Returns a
 * `HealthprobeResult` with module-specific metadata.
 */

export interface ProductionHealthResult extends HealthprobeResult {
  /** Number of production orders returned, or 0 on failure. */
  orderCount: number;
  /** Whether the production orders list is non-empty. */
  hasOrders: boolean;
}

export async function probeProductionHealth(): Promise<ProductionHealthResult> {
  const started = performance.now();
  try {
    const body = (await api.get<{ data: unknown[] }>("/production-orders")) as {
      data: unknown[];
    };
    const count = Array.isArray(body.data) ? body.data.length : 0;
    return {
      timestamp: new Date().toISOString(),
      status: 200,
      healthy: count >= 0,
      latencyMs: Math.round(performance.now() - started),
      error: null,
      orderCount: count,
      hasOrders: count > 0,
    };
  } catch (err: any) {
    return {
      ...await probeBackend(),
      orderCount: 0,
      hasOrders: false,
    };
  }
}
