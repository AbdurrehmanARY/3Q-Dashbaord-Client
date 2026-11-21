import postgres from "postgres";
const sql = postgres(process.env.DIRECT_URL, { prepare: false, max: 1 });

try {
  const tables = await sql`
    SELECT tablename FROM pg_tables
    WHERE tablename IN (
      'printed_label_work_orders',
      'woven_label_work_orders',
      'printed_label_production_orders',
      'woven_label_production_orders'
    )
  `;
  console.log("0029 tables present:", tables.map(t => t.tablename));
  console.log("Count:", tables.length);

  const applied = await sql`
    SELECT id, hash, created_at
    FROM drizzle.__drizzle_migrations
    ORDER BY id
  `;
  console.log("\nAll applied migrations:", applied.length);
  for (const m of applied) {
    console.log("  id=" + m.id + " hash=" + (m.hash ? m.hash.slice(0, 16) + "..." : "null"));
  }

  const cols = await sql`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'work_orders'
      AND column_name IN ('product_type', 'status')
    ORDER BY column_name
  `;
  console.log("\nwork_orders key columns:", cols.map(c => c.column_name + ":" + c.data_type).join(", "));
} finally {
  await sql.end();
}
