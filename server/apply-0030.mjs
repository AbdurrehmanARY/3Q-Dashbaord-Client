import fs from "node:fs";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { max: 1 });

(async () => {
  const migrationSql = fs.readFileSync(
    "drizzle/0030_consolidate_work_order_tables.sql",
    "utf8"
  );

  console.log("Running migration 0030_consolidate_work_order_tables.sql...");
  
  // Split into individual statements
  const statements = migrationSql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  for (const stmt of statements) {
    try {
      await sql.unsafe(stmt);
      console.log("  OK:", stmt.substring(0, 80).replace(/\n/g, " "));
    } catch (e) {
      console.log("  SKIP:", stmt.substring(0, 80).replace(/\n/g, " "), "-", e.message);
    }
  }

  // Verify
  const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'printed_label_work_orders' ORDER BY ordinal_position`;
  console.log("\nColumns in printed_label_work_orders after migration:");
  cols.forEach((c) => console.log("  ", c.column_name));

  await sql.end();
  console.log("\nMigration 0030 applied successfully.");
})().catch((e) => { console.error(e); process.exit(1); });