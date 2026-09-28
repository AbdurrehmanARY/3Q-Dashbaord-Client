/**
 * verify-batch-visibility.mjs
 *
 * READ-ONLY gate for the predicates behind "cutting and packaging batches are invisible".
 * It answers, against the LIVE database, the questions the client and the API ask — and prints
 * PASS/FAIL for each, so a regression shows up here instead of on the floor.
 *
 *   1. batch counts per (order, stage)      -> is there anything to see at all?
 *   2. findByLine(<line>, 'weaving')        -> the line-scoped read: first stage only
 *   3. findByOrder(<order>, 'cutting')      -> the order-scoped read (0 BEFORE the S1 fix)
 *   4. attribution of that line's cut output -> the per-label-type share the flow read reports
 *
 * The `findByLine(...,'cutting')` check is FAIL-BY-DESIGN: an order-scoped batch carries no
 * line, so a line-scoped URL must never report one.
 *
 * Usage (from server/):  npm run verify:batch-visibility [orderId]
 * NOTE: this script loads server/.env itself, so node --env-file is NOT needed.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const here = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(here, "..", ".env");

if (!fs.existsSync(envPath)) {
  console.error(`No .env at ${envPath}`);
  process.exit(1);
}

const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((line) => line.includes("=") && !line.trim().startsWith("#"))
    .map((line) => {
      const at = line.indexOf("=");
      return [line.slice(0, at).trim(), line.slice(at + 1).trim().replace(/^['"]|['"]$/g, "")];
    })
);

const url = env.DIRECT_URL || env.DATABASE_URL;
if (!url) {
  console.error("Neither DIRECT_URL nor DATABASE_URL is set in server/.env");
  process.exit(1);
}

/** The order to inspect: whatever the caller passes, defaulting to the reported one. */
const orderId = Number(process.argv[2] ?? 22);
const sql = postgres(url, { prepare: false, max: 1 });

let failures = 0;
const report = (ok, label, value) => {
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}            ${label.padEnd(48)} = ${value}`);
};

try {
  const order = await sql`
    SELECT o.id, w.product_type AS kind
    FROM production_orders o
    JOIN work_orders w ON w.id = o.work_order_id
    WHERE o.id = ${orderId}
  `;
  if (order.length === 0) {
    console.error(`No production order ${orderId}`);
    process.exit(1);
  }
  const kind = order[0].kind === "woven" ? "woven" : "printed";
  const first = kind === "woven" ? "weaving" : "printing";
  const lineTable = kind === "woven" ? "woven_production_lines" : "production_order_lines";
  console.log(`order ${orderId} · ${kind} · first stage ${first}\n`);

  /* --- 1. what exists per stage, and how many rows carry no line --- */
  const perStage = await sql`
    SELECT stage, COUNT(*)::int AS batches,
           COUNT(*) FILTER (
             WHERE production_order_line_id IS NULL AND woven_production_line_id IS NULL
           )::int AS line_less
    FROM production_batches
    WHERE production_order_id = ${orderId}
    GROUP BY stage
    ORDER BY stage
  `;
  console.log("--- batches per stage (line_less must equal the whole stage) ---");
  for (const row of perStage) {
    console.log(`${row.stage.padEnd(10)} ${row.batches} batches, ${row.line_less} with NO line`);
  }
  for (const stage of ["cutting", "packaging"]) {
    const row = perStage.find((r) => r.stage === stage);
    if (!row) continue;
    report(
      row.line_less === row.batches,
      `${stage}: every batch is order-scoped`,
      `${row.line_less}/${row.batches}`
    );
  }

  /* --- 2 + 3. the two read paths, exactly as the repository builds them --- */
  const lineId = (
    await sql`
      SELECT id FROM ${sql(lineTable)}
      WHERE production_order_id = ${orderId}
      ORDER BY id
      LIMIT 1
    `
  )[0]?.id;

  if (lineId === undefined) {
    console.log(`\nNo ${lineTable} row on order ${orderId} — skipping the read-path checks.`);
  } else {
    const column = kind === "woven" ? "woven_production_line_id" : "production_order_line_id";

    const byLine = await sql`
      SELECT COUNT(*)::int AS n FROM production_batches
      WHERE ${sql(column)} = ${lineId} AND stage = ${first}
    `;
    report(byLine[0].n > 0, `findByLine(${lineTable} ${lineId},'${first}')`, byLine[0].n);

    const cuttingByOrder = await sql`
      SELECT COUNT(*)::int AS n FROM production_batches
      WHERE production_order_id = ${orderId} AND stage = 'cutting'
    `;
    report(cuttingByOrder[0].n > 0, `findByOrder(${orderId},'${kind}','cutting')`, cuttingByOrder[0].n);

    // FAIL-BY-DESIGN: cutting is never reachable through a line-scoped read.
    const cuttingByLine = await sql`
      SELECT COUNT(*)::int AS n FROM production_batches
      WHERE ${sql(column)} = ${lineId} AND stage = 'cutting'
    `;
    report(
      cuttingByLine[0].n === 0,
      `findByLine(${lineTable} ${lineId},'cutting') = 0 (by design)`,
      cuttingByLine[0].n
    );

    /* --- 4. the attribution the flow read reports for that label type --- */
    const attributed = await sql`
      WITH l1 AS (
        SELECT e.destination_batch_id AS batch_id,
               COALESCE(s.production_order_line_id, s.woven_production_line_id) AS line_id,
               SUM(e.rolls) AS rolls
        FROM batch_consumptions e
        JOIN production_batches s ON s.id = e.source_batch_id
        WHERE s.stage IN ('printing','weaving')
        GROUP BY 1, 2
      ),
      mix AS (
        SELECT batch_id, line_id, rolls FROM l1
        UNION ALL
        SELECT e.destination_batch_id,
               l1.line_id,
               SUM(e.rolls * l1.rolls / NULLIF(t.total, 0))
        FROM batch_consumptions e
        JOIN production_batches s ON s.id = e.source_batch_id AND s.stage = 'cutting'
        JOIN l1 ON l1.batch_id = s.id
        JOIN (SELECT batch_id, SUM(rolls) AS total FROM l1 GROUP BY 1) t ON t.batch_id = s.id
        GROUP BY 1, 2
      )
      SELECT
        COALESCE(SUM(b.produced_rolls * m.rolls / NULLIF(b.assigned_rolls, 0))
          FILTER (WHERE b.stage = 'cutting'), 0)   AS cut_produced,
        COALESCE(SUM(b.produced_rolls * m.rolls / NULLIF(b.assigned_rolls, 0))
          FILTER (WHERE b.stage = 'packaging'), 0) AS packaged_produced
      FROM production_batches b
      JOIN mix m ON m.batch_id = b.id
      WHERE b.production_order_id = ${orderId}
        AND b.status <> 'CANCELLED'
        AND m.line_id = ${lineId}
    `;
    console.log("\n--- attributed figures for that label type ---");
    console.log(
      `cutProduced      = ${attributed[0].cut_produced}\n` +
        `packagedProduced = ${attributed[0].packaged_produced}`
    );
  }
} finally {
  await sql.end();
}

console.log(`\n${failures === 0 ? "All checks PASS" : `${failures} check(s) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);


