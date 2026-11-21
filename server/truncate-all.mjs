import postgres from "postgres";

const sql = postgres(process.env.DIRECT_URL, { prepare: false, max: 1 });

(async () => {
  // Get all tables in public schema
  const tables = await sql`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  `;

  for (const { tablename } of tables) {
    try {
      await sql.unsafe(`TRUNCATE TABLE "${tablename}" CASCADE`);
      console.log(`Truncated ${tablename}`);
    } catch (e) {
      console.log(`SKIP ${tablename}: ${e.message}`);
    }
  }

  console.log("\nAll tables truncated.");
  await sql.end();
})().catch((e) => { console.error(e); process.exit(1); });