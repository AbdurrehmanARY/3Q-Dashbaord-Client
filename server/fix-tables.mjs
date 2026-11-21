import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { max: 1 });

(async () => {
  console.log("Dropping printed_label_work_orders and woven_label_work_orders...");
  
  // Drop the extension tables (they only have 0029 data, no real data)
  await sql.unsafe("DROP TABLE IF EXISTS \"printed_label_work_orders\" CASCADE");
  console.log("  Dropped printed_label_work_orders");
  
  await sql.unsafe("DROP TABLE IF EXISTS \"woven_label_work_orders\" CASCADE");
  console.log("  Dropped woven_label_work_orders");

  await sql.end();
  console.log("\nDone. Run 'npm run db:migrate' next to recreate from schema.ts.");
})().catch((e) => { console.error(e); process.exit(1); });