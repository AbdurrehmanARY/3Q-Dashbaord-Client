import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { max: 1 });

(async () => {
  console.log("Creating printed_label_work_orders...");
  await sql.unsafe(`
    CREATE TABLE "printed_label_work_orders" (
      "id" serial PRIMARY KEY,
      "so_number" varchar(100) NOT NULL UNIQUE,
      "po_number" varchar(100),
      "order_date" date NOT NULL,
      "due_date" date,
      "total_qty" integer NOT NULL,
      "brand_id" integer REFERENCES "brands"("id"),
      "comment" text,
      "image_url" text,
      "dc_image_url" text,
      "status" "work_order_status" DEFAULT 'initiate_production' NOT NULL,
      "priority" varchar(20) DEFAULT 'normal' NOT NULL,
      "order_type" varchar(30) DEFAULT 'normal order' NOT NULL,
      "dc_number" varchar(100),
      "lc_number" varchar(100),
      "fbr_invoice_number" varchar(100),
      "dispatched_date" date,
      "dispatched_qty" integer,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
    CREATE INDEX "printed_label_work_orders_brand_idx" ON "printed_label_work_orders" ("brand_id");
    CREATE INDEX "printed_label_work_orders_status_idx" ON "printed_label_work_orders" ("status");
    CREATE INDEX "printed_label_work_orders_dc_number_idx" ON "printed_label_work_orders" ("dc_number");
    CREATE INDEX "printed_label_work_orders_lc_number_idx" ON "printed_label_work_orders" ("lc_number");
    CREATE INDEX "printed_label_work_orders_fbr_invoice_idx" ON "printed_label_work_orders" ("fbr_invoice_number");
  `);

  console.log("Creating woven_label_work_orders...");
  await sql.unsafe(`
    CREATE TABLE "woven_label_work_orders" (
      "id" serial PRIMARY KEY,
      "so_number" varchar(100) NOT NULL UNIQUE,
      "po_number" varchar(100),
      "order_date" date NOT NULL,
      "due_date" date,
      "total_qty" integer NOT NULL,
      "brand_id" integer REFERENCES "brands"("id"),
      "comment" text,
      "image_url" text,
      "dc_image_url" text,
      "status" "work_order_status" DEFAULT 'initiate_production' NOT NULL,
      "priority" varchar(20) DEFAULT 'normal' NOT NULL,
      "order_type" varchar(30) DEFAULT 'normal order' NOT NULL,
      "dc_number" varchar(100),
      "lc_number" varchar(100),
      "fbr_invoice_number" varchar(100),
      "dispatched_date" date,
      "dispatched_qty" integer,
      "design_code" varchar(100) NOT NULL UNIQUE,
      "pick" integer NOT NULL,
      "repeat" numeric(12, 2) NOT NULL,
      "density" integer NOT NULL,
      "speed" numeric(12, 2) DEFAULT '0' NOT NULL,
      "extra" numeric(12, 2) DEFAULT '0' NOT NULL,
      "estimated_weaving_hours" numeric(12, 2) DEFAULT '0' NOT NULL,
      "size_labels" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
    CREATE INDEX "woven_label_work_orders_brand_idx" ON "woven_label_work_orders" ("brand_id");
    CREATE INDEX "woven_label_work_orders_status_idx" ON "woven_label_work_orders" ("status");
    CREATE INDEX "woven_label_work_orders_design_code_idx" ON "woven_label_work_orders" ("design_code");
    CREATE INDEX "woven_label_work_orders_dc_number_idx" ON "woven_label_work_orders" ("dc_number");
    CREATE INDEX "woven_label_work_orders_lc_number_idx" ON "woven_label_work_orders" ("lc_number");
    CREATE INDEX "woven_label_work_orders_fbr_invoice_idx" ON "woven_label_work_orders" ("fbr_invoice_number");
  `);

  console.log("Both tables created successfully.");

  await sql.end();
})().catch((e) => { console.error(e); process.exit(1); });