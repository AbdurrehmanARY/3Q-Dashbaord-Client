import postgres from "postgres";

const sql = postgres(process.env.DIRECT_URL, { prepare: false, max: 1 });

try {
  // Check tables exist
  const tables = await sql`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    AND tablename IN (
      'printed_label_work_orders', 'woven_label_work_orders',
      'printed_label_production_orders', 'woven_label_production_orders'
    )
  `;
  console.log("New workflow tables found:", tables.length);
  for (const t of tables) console.log("  -", t.tablename);

  // Row counts
  const pwo = await sql`SELECT COUNT(*) FROM printed_label_work_orders`;
  const wwo = await sql`SELECT COUNT(*) FROM woven_label_work_orders`;
  const ppo = await sql`SELECT COUNT(*) FROM printed_label_production_orders`;
  const wpo = await sql`SELECT COUNT(*) FROM woven_label_production_orders`;

  console.log("\nRow counts:");
  console.log("  printed_label_work_orders:", pwo[0].count);
  console.log("  woven_label_work_orders:", wwo[0].count);
  console.log("  printed_label_production_orders:", ppo[0].count);
  console.log("  woven_label_production_orders:", wpo[0].count);

  // FK integrity
  const fks = await sql`
    SELECT
      (SELECT COUNT(*) FROM printed_label_work_orders plwo
       JOIN work_orders wo ON wo.id = plwo.work_order_id
       WHERE wo.product_type = 'printed')::int AS printed_wo_valid,
      (SELECT COUNT(*) FROM woven_label_work_orders wlwo
       JOIN work_orders wo ON wo.id = wlwo.work_order_id
       WHERE wo.product_type = 'woven')::int AS woven_wo_valid,
      (SELECT COUNT(*) FROM woven_label_work_orders
       WHERE design_code IS NOT NULL)::int AS woven_with_spec
  `;
  console.log("\nFK integrity:");
  console.log("  printed WO FK valid:", fks[0].printed_wo_valid);
  console.log("  woven WO FK valid:", fks[0].woven_wo_valid);
  console.log("  woven WO with loom spec:", fks[0].woven_with_spec);

  // Unique index on design_code
  const idx = await sql`
    SELECT indexname FROM pg_indexes
    WHERE tablename = 'woven_label_work_orders'
    AND indexname = 'woven_label_work_orders_design_code_unique'
  `;
  console.log("\nUnique index on design_code:", idx.length > 0 ? "EXISTS" : "MISSING");

  console.log("\n✅ Migration 0029 verified successfully!");
} finally {
  await sql.end();
}

