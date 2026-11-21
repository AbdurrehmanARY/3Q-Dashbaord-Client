import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
(async () => {
  const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'printed_label_work_orders' ORDER BY ordinal_position`;
  console.log("Current columns in printed_label_work_orders:");
  cols.forEach((c) => console.log("  ", c.column_name));
  
  const woCols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'work_orders' ORDER BY ordinal_position`;
  console.log("\nCurrent columns in work_orders:");
  woCols.forEach((c) => console.log("  ", c.column_name));
  
  await sql.end();
})().catch((e) => { console.error(e); process.exit(1); });