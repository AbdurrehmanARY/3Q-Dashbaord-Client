import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
(async () => {
  const qo = await sql`SELECT * FROM production_orders`;
  console.log("production_orders:");
  for (const row of qo) {
    console.log("  " + JSON.stringify(row));
  }

  const po = await sql`SELECT * FROM printed_label_production_orders`;
  console.log("printed_label_production_orders:");
  for (const row of po) {
    console.log("  " + JSON.stringify(row));
  }

  const wo = await sql`SELECT * FROM woven_label_production_orders`;
  console.log("woven_label_production_orders:");
  for (const row of wo) {
    console.log("  " + JSON.stringify(row));
  }

  const ww = await sql`SELECT * FROM woven_label_work_orders`;
  console.log("woven_label_work_orders:");
  for (const row of ww) {
    console.log("  " + JSON.stringify(row));
  }

  const pw = await sql`SELECT * FROM printed_label_work_orders`;
  console.log("printed_label_work_orders:");
  for (const row of pw) {
    console.log("  " + JSON.stringify(row));
  }

  await sql.end();
})().catch(e => { console.error(e); process.exit(1); });