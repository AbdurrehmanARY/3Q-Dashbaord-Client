import postgres from "postgres";
const sql = postgres(process.env.DIRECT_URL, { prepare: false, max: 1 });

try {
  // List ALL tables in public schema
  const allTables = await sql`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `;
  console.log("All public tables (" + allTables.length + "):");
  console.log(allTables.map(t => t.tablename).join(", "));

  // Check if new tables exist
  const newTables = allTables.filter(t =>
    t.tablename.startsWith("printed_label_") ||
    t.tablename.startsWith("woven_label_")
  );
  console.log("\nNew workflow tables:", newTables.length > 0
    ? newTables.map(t => t.tablename).join(", ")
    : "NONE FOUND");

  // Check latest migration hashes
  const migrations = await sql`
    SELECT id, hash, created_at
    FROM drizzle.__drizzle_migrations
    ORDER BY id DESC
    LIMIT 5
  `;
  console.log("\nLast 5 migrations:");
  for (const m of migrations) {
    console.log("  id=" + m.id + " hash=" + (m.hash ? m.hash.slice(0, 20) : "null"));
  }
} finally {
  await sql.end();
}
