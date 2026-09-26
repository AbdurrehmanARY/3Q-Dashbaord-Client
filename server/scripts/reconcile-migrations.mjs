// One-off maintenance: reconcile drizzle.__drizzle_migrations bookkeeping with the
// migrations that were previously applied outside the tracker (0022/0023 exist in the
// DB but were never recorded), so `drizzle-kit migrate` can then apply 0024.
// Run: node --env-file server/.env server/scripts/reconcile-migrations.mjs [--write]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const serverDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { default: postgres } = await import(
  pathToFileURL(path.join(serverDir, "node_modules", "postgres", "src", "index.js")).href
);
const sql = postgres(process.env.DIRECT_URL, { max: 1 });

const journal = JSON.parse(
  fs.readFileSync(path.join(serverDir, "drizzle", "meta", "_journal.json"), "utf8")
);
const recorded = await sql`select id, hash, created_at from drizzle.__drizzle_migrations order by created_at`;
console.log("recorded in DB:");
for (const r of recorded) console.log("  id=" + r.id, "created_at=" + r.created_at, "hash=" + r.hash.slice(0, 12) + "…");

const recordedWhen = new Set(recorded.map((r) => Number(r.created_at)));
const missing = journal.entries.filter((e) => !recordedWhen.has(Number(e.when)));
console.log("\njournal entries NOT recorded in DB:");
for (const e of missing) console.log("  idx=" + e.idx, "when=" + e.when, e.tag);

if (process.argv.includes("--write") && missing.length > 0) {
  // Hash column is NOT NULL; drizzle compares by `when` (created_at) for ordering,
  // so a placeholder hash for already-applied entries is safe.
  for (const e of missing) {
    if (e.idx === 24) continue; // 0024 not yet applied — let migrate run it for real
    await sql`insert into drizzle.__drizzle_migrations (hash, created_at) values (${"pre-applied:" + e.tag}, ${e.when})`;
    console.log("recorded pre-applied migration:", e.tag);
  }
} else if (missing.length > 0) {
  console.log("\ndry run — pass --write to record the pre-applied ones (skips idx 24)");
}

await sql.end();
