import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
(async () => {
  const rows = await sql`SELECT id, hash, created_at FROM drizzle.__drizzle_migrations ORDER BY id`;
  console.log("Current migrations:");
  rows.forEach((r) => console.log("  id=", r.id, "hash=", String(r.hash).slice(0, 40), "created_at=", r.created_at));

  await sql`DELETE FROM drizzle.__drizzle_migrations WHERE created_at = 1792000000000`;
  console.log("Deleted migration 0030 entry from tracker (created_at=1792000000000)");

  const rows2 = await sql`SELECT id, hash FROM drizzle.__drizzle_migrations ORDER BY id`;
  console.log("\nRemaining migrations:", rows2.length);
  rows2.forEach((r) => console.log("  id=", r.id, "hash=", String(r.hash).slice(0, 40)));

  await sql.end();
})().catch((e) => { console.error(e); process.exit(1); });