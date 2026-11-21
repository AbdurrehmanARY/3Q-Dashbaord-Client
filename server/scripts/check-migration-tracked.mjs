import postgres from "postgres";
const sql = postgres(process.env.DIRECT_URL, { prepare: false, max: 1 });

try {
  const migrations = await sql`
    SELECT id, hash, created_at
    FROM drizzle.__drizzle_migrations
    ORDER BY id DESC
    LIMIT 3
  `;
  console.log("Latest migrations in DB:");
  for (const m of migrations) {
    console.log("  id=" + m.id + " hash=" + (m.hash ? m.hash.slice(0, 20) + "..." : "null"));
  }
  const count = await sql`SELECT COUNT(*) as cnt FROM drizzle.__drizzle_migrations`;
  console.log("Total migrations in DB:", count[0].cnt);
} finally {
  await sql.end();
}
