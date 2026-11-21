import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, { max: 1 });

(async () => {
  const tables = ['printed_label_production_orders', 'woven_label_production_orders', 'printed_label_work_orders', 'woven_label_work_orders', 'production_orders'];
  for (const t of tables) {
    try {
      const count = await sql\SELECT COUNT(*) as c FROM \;
      const rows = count[0].c;
      console.log(t + ': ' + rows + ' rows');
      if (rows > 0) {
        const data = await sql\SELECT * FROM \ LIMIT 5\;
        for (const row of data) {
          console.log('  ' + JSON.stringify(row));
        }
      }
    } catch (e) {
      console.log(t + ': ERROR - ' + e.message);
    }
  }
  await sql.end();
})().catch(e => { console.error(e); process.exit(1); });
