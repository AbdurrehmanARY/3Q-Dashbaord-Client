import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, { max: 1 });

(async () => {
  const data = await sql`
    SELECT po.id, po.work_order_id, po.printed_work_order_id, po.woven_work_order_id, wo.product_type
    FROM production_orders po
    JOIN work_orders wo ON wo.id = po.work_order_id
  `;
  console.log('production_orders with product_type:');
  for (const row of data) {
    console.log('  ', row);
  }

  const ext = await sql`
    SELECT * FROM printed_label_production_orders
  `;
  console.log('printed_label_production_orders:', ext);

  await sql.end();
})().catch(e => { console.error(e); process.exit(1); });