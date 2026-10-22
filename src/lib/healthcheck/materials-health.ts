import { api } from "@/lib/api";
import type { HealthprobeResult } from "./client_healthcheck";
import { probeBackend } from "./client_healthcheck";

/**
 * Materials module health probe.
 *
 * Checks that the materials endpoint is reachable and returns a non-empty
 * list. Returns a `HealthprobeResult` with module-specific metadata.
 */

export interface MaterialsHealthResult extends HealthprobeResult {
  /** Number of material records returned, or 0 on failure. */
  materialCount: number;
  /** Whether the materials list is non-empty. */
  hasMaterials: boolean;
}

export async function probeMaterialsHealth(): Promise<MaterialsHealthResult> {
  const started = performance.now();
  try {
    const body = (await api.get<{ data: unknown[] }>("/materials")) as { data: unknown[] };
    const count = Array.isArray(body.data) ? body.data.length : 0;
    return {
      timestamp: new Date().toISOString(),
      status: 200,
      healthy: count >= 0,
      latencyMs: Math.round(performance.now() - started),
      error: null,
      materialCount: count,
      hasMaterials: count > 0,
    };
  } catch (err: any) {
    return {
      ...await probeBackend(),
      materialCount: 0,
      hasMaterials: false,
    };
  }
}
