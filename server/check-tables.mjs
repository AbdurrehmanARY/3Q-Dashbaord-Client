import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { max: 1 });

(async () => {
  const tables = await sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`;
  console.log("Tables in database:");
  tables.forEach((t) => console.log("  ", t.tablename));
  
  await sql.end();
})().catch((e) => { console.error(e); process.exit(1); });