-- 0029_separate_workflow_tables.sql
--
-- Creates 1:1 extension tables for the printed and woven workflows.
--
-- `work_orders` and `production_orders` remain the canonical parent tables — all
-- existing foreign keys (production_batches, production_order_lines, etc.) keep
-- pointing at them. These new tables add a type-scoped read surface:
--
--   printed_label_work_orders       — extension of work_orders
--   woven_label_work_orders         — extension of work_orders + absorbed loom spec
--   printed_label_production_orders — extension of production_orders
--   woven_label_production_orders   — extension of production_orders
--
-- Data is backfilled for every existing order by productType. Future writes go
-- through the new workflow-specific repositories, which insert into both the
-- canonical parent and its extension in a single transaction.
--
-- The woven loom specification (previously on `woven_work_order_details`) is
-- copied into `woven_label_work_orders`, eliminating the separate 1:1 detail join.

/* ================================================================ work-orders */

CREATE TABLE "printed_label_work_orders" (
    "work_order_id" integer PRIMARY KEY,
    "created_at"    timestamp DEFAULT now() NOT NULL,
    "updated_at"    timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "printed_label_work_orders_work_order_id_fkey"
        FOREIGN KEY ("work_order_id") REFERENCES "work_orders" ("id") ON DELETE CASCADE
);

CREATE INDEX "printed_label_work_orders_work_order_id_idx"
    ON "printed_label_work_orders" ("work_order_id");

CREATE TABLE "woven_label_work_orders" (
    "work_order_id"            integer PRIMARY KEY,
    "design_code"              varchar(100) NOT NULL,
    "pick"                     integer NOT NULL,
    "repeat"                   numeric(12, 2) NOT NULL,
    "density"                  integer NOT NULL,
    "speed"                    numeric(12, 2) DEFAULT '0' NOT NULL,
    "extra"                    numeric(12, 2) DEFAULT '0' NOT NULL,
    "estimated_weaving_hours"  numeric(12, 2) DEFAULT '0' NOT NULL,
    "size_labels"              jsonb DEFAULT '[]'::jsonb NOT NULL,
    "created_at"               timestamp DEFAULT now() NOT NULL,
    "updated_at"               timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "woven_label_work_orders_work_order_id_fkey"
        FOREIGN KEY ("work_order_id") REFERENCES "work_orders" ("id") ON DELETE CASCADE
);

CREATE INDEX "woven_label_work_orders_work_order_id_idx"
    ON "woven_label_work_orders" ("work_order_id");
CREATE UNIQUE INDEX "woven_label_work_orders_design_code_idx"
    ON "woven_label_work_orders" ("design_code");

-- backfill: every printed work order gets an extension row
INSERT INTO "printed_label_work_orders" ("work_order_id")
SELECT id FROM "work_orders" WHERE product_type = 'printed';

-- backfill: every woven work order gets an extension row WITH its loom spec
-- absorbed from woven_work_order_details (if present).
INSERT INTO "woven_label_work_orders" (
    "work_order_id", "design_code", "pick", "repeat", "density",
    "speed", "extra", "estimated_weaving_hours", "size_labels"
)
SELECT
    wo.id,
    wd.design_code,
    wd.pick,
    wd.repeat,
    wd.density,
    wd.speed,
    wd.extra,
    wd.estimated_weaving_hours,
    wd.size_labels
FROM "work_orders" wo
LEFT JOIN "woven_work_order_details" wd ON wd.work_order_id = wo.id
WHERE wo.product_type = 'woven'
  AND wd.work_order_id IS NOT NULL;

/* ================================================================ production-orders */

CREATE TABLE "printed_label_production_orders" (
    "production_order_id" integer PRIMARY KEY,
    "created_at"           timestamp DEFAULT now() NOT NULL,
    "updated_at"           timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "printed_label_production_orders_production_order_id_fkey"
        FOREIGN KEY ("production_order_id") REFERENCES "production_orders" ("id") ON DELETE CASCADE
);

CREATE INDEX "printed_label_production_orders_production_order_id_idx"
    ON "printed_label_production_orders" ("production_order_id");

CREATE TABLE "woven_label_production_orders" (
    "production_order_id" integer PRIMARY KEY,
    "created_at"           timestamp DEFAULT now() NOT NULL,
    "updated_at"           timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "woven_label_production_orders_production_order_id_fkey"
        FOREIGN KEY ("production_order_id") REFERENCES "production_orders" ("id") ON DELETE CASCADE
);

CREATE INDEX "woven_label_production_orders_production_order_id_idx"
    ON "woven_label_production_orders" ("production_order_id");

-- backfill: every production order gets an extension row in the right table
INSERT INTO "printed_label_production_orders" ("production_order_id")
SELECT po.id
FROM "production_orders" po
JOIN "work_orders" wo ON wo.id = po.work_order_id
WHERE wo.product_type = 'printed';

INSERT INTO "woven_label_production_orders" ("production_order_id")
SELECT po.id
FROM "production_orders" po
JOIN "work_orders" wo ON wo.id = po.work_order_id
WHERE wo.product_type = 'woven';