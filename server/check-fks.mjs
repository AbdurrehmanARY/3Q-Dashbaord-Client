import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { max: 1 });

(async () => {
  // Check FKs on production_orders
  const fks = await sql`SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE conrelid = 'production_orders'::regclass`;
  console.log("FKs on production_orders:");
  fks.forEach((f) => console.log("  ", f.conname, "->", f.pg_get_constraintdef));
  
  // Check FKs on production_runs
  const fks2 = await sql`SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE conrelid = 'production_runs'::regclass`;
  console.log("\nFKs on production_runs:");
  fks2.forEach((f) => console.log("  ", f.conname, "->", f.pg_get_constraintdef));
  
  await sql.end();
})().catch((e) => { console.error(e); process.exit(1); });