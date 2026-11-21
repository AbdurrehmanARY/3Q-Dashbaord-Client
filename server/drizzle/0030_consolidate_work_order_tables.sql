-- 0030_consolidate_work_order_tables.sql
--
-- Eliminates the generic `work_orders` table by moving ALL of its columns
-- into the type-scoped `printed_label_work_orders` and `woven_label_work_orders`
-- tables (created as extensions in 0029). `production_orders` and
-- `production_runs` FK columns are split into printed/woven pairs with a
-- `num_nonnulls = 1` CHECK, mirroring the pattern already used on
-- `production_batches`.
--
-- PostgreSQL DDL is transactional, so the old `work_orders` table is only
-- dropped after every backfill + constraint is in place.

-- ================================================================
-- Step 1: printed_label_work_orders — become standalone
-- ================================================================

ALTER TABLE "printed_label_work_orders"
    DROP CONSTRAINT IF EXISTS "printed_label_work_orders_work_order_id_fkey";

ALTER TABLE "printed_label_work_orders"
    RENAME COLUMN "work_order_id" TO "id";

CREATE SEQUENCE IF NOT EXISTS "printed_label_work_orders_id_seq";
ALTER TABLE "printed_label_work_orders"
    ALTER COLUMN "id" SET DEFAULT nextval('"printed_label_work_orders_id_seq"');
SELECT setval(
    '"printed_label_work_orders_id_seq"',
    COALESCE((SELECT MAX("id") FROM "printed_label_work_orders"), 1)
);

DROP INDEX IF EXISTS "printed_label_work_orders_work_order_id_idx";

ALTER TABLE "printed_label_work_orders"
    ADD COLUMN "so_number"          varchar(100)           NOT NULL,
    ADD COLUMN "po_number"          varchar(100),
    ADD COLUMN "order_date"         date                   NOT NULL,
    ADD COLUMN "due_date"           date,
    ADD COLUMN "total_qty"          integer                NOT NULL,
    ADD COLUMN "brand_id"           integer,
    ADD COLUMN "comment"            text,
    ADD COLUMN "image_url"          text,
    ADD COLUMN "dc_image_url"       text,
    ADD COLUMN "status"             "work_order_status"     DEFAULT 'initiate_production' NOT NULL,
    ADD COLUMN "priority"           varchar(20)             DEFAULT 'normal' NOT NULL,
    ADD COLUMN "order_type"         varchar(30)             DEFAULT 'normal order' NOT NULL,
    ADD COLUMN "dc_number"          varchar(100),
    ADD COLUMN "lc_number"          varchar(100),
    ADD COLUMN "fbr_invoice_number" varchar(100),
    ADD COLUMN "dispatched_date"    date,
    ADD COLUMN "dispatched_qty"     integer;

UPDATE "printed_label_work_orders" AS plwo
SET
    "so_number"          = wo."so_number",
    "po_number"          = wo."po_number",
    "order_date"         = wo."order_date",
    "due_date"           = wo."due_date",
    "total_qty"          = wo."total_qty",
    "brand_id"           = wo."brand_id",
    "comment"            = wo."comment",
    "image_url"          = wo."image_url",
    "dc_image_url"       = wo."dc_image_url",
    "status"             = wo."status",
    "priority"           = wo."priority",
    "order_type"         = wo."order_type",
    "dc_number"          = wo."dc_number",
    "lc_number"          = wo."lc_number",
    "fbr_invoice_number" = wo."fbr_invoice_number",
    "dispatched_date"    = wo."dispatched_date",
    "dispatched_qty"     = wo."dispatched_qty",
    "created_at"         = wo."created_at",
    "updated_at"         = wo."updated_at"
FROM "work_orders" wo
WHERE wo."id" = plwo."id"
  AND wo."product_type" = 'printed';

CREATE UNIQUE INDEX IF NOT EXISTS "printed_label_work_orders_so_number_idx"
    ON "printed_label_work_orders" ("so_number");
CREATE INDEX IF NOT EXISTS "printed_label_work_orders_brand_idx"
    ON "printed_label_work_orders" ("brand_id");
CREATE INDEX IF NOT EXISTS "printed_label_work_orders_status_idx"
    ON "printed_label_work_orders" ("status");
CREATE INDEX IF NOT EXISTS "printed_label_work_orders_dc_number_idx"
    ON "printed_label_work_orders" ("dc_number");
CREATE INDEX IF NOT EXISTS "printed_label_work_orders_lc_number_idx"
    ON "printed_label_work_orders" ("lc_number");
CREATE INDEX IF NOT EXISTS "printed_label_work_orders_fbr_invoice_idx"
    ON "printed_label_work_orders" ("fbr_invoice_number");

ALTER TABLE "printed_label_work_orders"
    ADD CONSTRAINT "printed_label_work_orders_brand_id_fkey"
        FOREIGN KEY ("brand_id") REFERENCES "brands" ("id");

DO $$
DECLARE
    _missing int;
BEGIN
    SELECT count(*) INTO _missing
    FROM "printed_label_work_orders" plwo
    WHERE plwo."so_number" IS NULL;
    IF _missing > 0 THEN
        RAISE EXCEPTION '0030: % printed_label_work_orders rows missing data after backfill', _missing;
    END IF;
END $$;

-- ================================================================
-- Step 2: woven_label_work_orders — same treatment (loom spec already present)
-- ================================================================

ALTER TABLE "woven_label_work_orders"
    DROP CONSTRAINT IF EXISTS "woven_label_work_orders_work_order_id_fkey";

ALTER TABLE "woven_label_work_orders"
    RENAME COLUMN "work_order_id" TO "id";

CREATE SEQUENCE IF NOT EXISTS "woven_label_work_orders_id_seq";
ALTER TABLE "woven_label_work_orders"
    ALTER COLUMN "id" SET DEFAULT nextval('"woven_label_work_orders_id_seq"');
SELECT setval(
    '"woven_label_work_orders_id_seq"',
    COALESCE((SELECT MAX("id") FROM "woven_label_work_orders"), 1)
);

DROP INDEX IF EXISTS "woven_label_work_orders_work_order_id_idx";

ALTER TABLE "woven_label_work_orders"
    ADD COLUMN "so_number"          varchar(100)           NOT NULL,
    ADD COLUMN "po_number"          varchar(100),
    ADD COLUMN "order_date"         date                   NOT NULL,
    ADD COLUMN "due_date"           date,
    ADD COLUMN "total_qty"          integer                NOT NULL,
    ADD COLUMN "brand_id"           integer,
    ADD COLUMN "comment"            text,
    ADD COLUMN "image_url"          text,
    ADD COLUMN "dc_image_url"       text,
    ADD COLUMN "status"             "work_order_status"     DEFAULT 'initiate_production' NOT NULL,
    ADD COLUMN "priority"           varchar(20)             DEFAULT 'normal' NOT NULL,
    ADD COLUMN "order_type"         varchar(30)             DEFAULT 'normal order' NOT NULL,
    ADD COLUMN "dc_number"          varchar(100),
    ADD COLUMN "lc_number"          varchar(100),
    ADD COLUMN "fbr_invoice_number" varchar(100),
    ADD COLUMN "dispatched_date"    date,
    ADD COLUMN "dispatched_qty"     integer;

UPDATE "woven_label_work_orders" AS wlwo
SET
    "so_number"          = wo."so_number",
    "po_number"          = wo."po_number",
    "order_date"         = wo."order_date",
    "due_date"           = wo."due_date",
    "total_qty"          = wo."total_qty",
    "brand_id"           = wo."brand_id",
    "comment"            = wo."comment",
    "image_url"          = wo."image_url",
    "dc_image_url"       = wo."dc_image_url",
    "status"             = wo."status",
    "priority"           = wo."priority",
    "order_type"         = wo."order_type",
    "dc_number"          = wo."dc_number",
    "lc_number"          = wo."lc_number",
    "fbr_invoice_number" = wo."fbr_invoice_number",
    "dispatched_date"    = wo."dispatched_date",
    "dispatched_qty"     = wo."dispatched_qty",
    "created_at"         = wo."created_at",
    "updated_at"         = wo."updated_at"
FROM "work_orders" wo
WHERE wo."id" = wlwo."id"
  AND wo."product_type" = 'woven';

CREATE UNIQUE INDEX IF NOT EXISTS "woven_label_work_orders_so_number_idx"
    ON "woven_label_work_orders" ("so_number");
CREATE INDEX IF NOT EXISTS "woven_label_work_orders_brand_idx"
    ON "woven_label_work_orders" ("brand_id");
CREATE INDEX IF NOT EXISTS "woven_label_work_orders_status_idx"
    ON "woven_label_work_orders" ("status");
CREATE INDEX IF NOT EXISTS "woven_label_work_orders_dc_number_idx"
    ON "woven_label_work_orders" ("dc_number");
CREATE INDEX IF NOT EXISTS "woven_label_work_orders_lc_number_idx"
    ON "woven_label_work_orders" ("lc_number");
CREATE INDEX IF NOT EXISTS "woven_label_work_orders_fbr_invoice_idx"
    ON "woven_label_work_orders" ("fbr_invoice_number");

ALTER TABLE "woven_label_work_orders"
    ADD CONSTRAINT "woven_label_work_orders_brand_id_fkey"
        FOREIGN KEY ("brand_id") REFERENCES "brands" ("id");

DO $$
DECLARE
    _missing int;
BEGIN
    SELECT count(*) INTO _missing
    FROM "woven_label_work_orders" wlwo
    WHERE wlwo."so_number" IS NULL;
    IF _missing > 0 THEN
        RAISE EXCEPTION '0030: % woven_label_work_orders rows missing data after backfill', _missing;
    END IF;
END $$;

-- ================================================================
-- Step 3: production_orders — split work_order_id into two nullable FKs
-- ================================================================

ALTER TABLE "production_orders"
    ADD COLUMN "printed_work_order_id" integer,
    ADD COLUMN "woven_work_order_id"   integer;

UPDATE "production_orders" po
SET
    "printed_work_order_id" = CASE WHEN wo."product_type" = 'printed' THEN po."work_order_id" END,
    "woven_work_order_id"   = CASE WHEN wo."product_type" = 'woven'   THEN po."work_order_id" END
FROM "work_orders" wo
WHERE wo."id" = po."work_order_id";

ALTER TABLE "production_orders"
    ADD CONSTRAINT "production_orders_printed_work_order_id_fkey"
        FOREIGN KEY ("printed_work_order_id")
        REFERENCES "printed_label_work_orders" ("id")
        ON DELETE RESTRICT,
    ADD CONSTRAINT "production_orders_woven_work_order_id_fkey"
        FOREIGN KEY ("woven_work_order_id")
        REFERENCES "woven_label_work_orders" ("id")
        ON DELETE RESTRICT;

ALTER TABLE "production_orders"
    ADD CONSTRAINT "production_orders_one_work_order"
    CHECK (num_nonnulls("printed_work_order_id", "woven_work_order_id") = 1);

ALTER TABLE "production_orders"
    DROP CONSTRAINT IF EXISTS "production_orders_work_order_id_fkey",
    DROP CONSTRAINT IF EXISTS "production_orders_work_order_id_unique",
    DROP COLUMN IF EXISTS "work_order_id";

DROP INDEX IF EXISTS "production_orders_work_order_idx";
CREATE INDEX IF NOT EXISTS "production_orders_printed_work_order_idx"
    ON "production_orders" ("printed_work_order_id");
CREATE INDEX IF NOT EXISTS "production_orders_woven_work_order_idx"
    ON "production_orders" ("woven_work_order_id");

-- ================================================================
-- Step 4: production_runs — split sale_order_id into two nullable FKs
-- ================================================================

ALTER TABLE "production_runs"
    ADD COLUMN "printed_sale_order_id" integer,
    ADD COLUMN "woven_sale_order_id"   integer;

UPDATE "production_runs" pr
SET
    "printed_sale_order_id" = CASE WHEN wo."product_type" = 'printed' THEN pr."sale_order_id" END,
    "woven_sale_order_id"   = CASE WHEN wo."product_type" = 'woven'   THEN pr."sale_order_id" END
FROM "work_orders" wo
WHERE wo."id" = pr."sale_order_id";

ALTER TABLE "production_runs"
    ADD CONSTRAINT "production_runs_printed_sale_order_id_fkey"
        FOREIGN KEY ("printed_sale_order_id")
        REFERENCES "printed_label_work_orders" ("id")
        ON DELETE RESTRICT,
    ADD CONSTRAINT "production_runs_woven_sale_order_id_fkey"
        FOREIGN KEY ("woven_sale_order_id")
        REFERENCES "woven_label_work_orders" ("id")
        ON DELETE RESTRICT,
    ADD CONSTRAINT "production_runs_one_sale_order"
    CHECK (num_nonnulls("printed_sale_order_id", "woven_sale_order_id") = 1);

ALTER TABLE "production_runs"
    DROP CONSTRAINT IF EXISTS "production_runs_sale_order_id_fkey",
    DROP COLUMN IF EXISTS "sale_order_id";

DROP INDEX IF EXISTS "production_runs_sale_order_idx";
CREATE INDEX IF NOT EXISTS "production_runs_printed_sale_order_idx"
    ON "production_runs" ("printed_sale_order_id");
CREATE INDEX IF NOT EXISTS "production_runs_woven_sale_order_idx"
    ON "production_runs" ("woven_sale_order_id");

-- ================================================================
-- Step 5: Drop obsolete tables
-- ================================================================

DROP TABLE IF EXISTS "woven_work_order_details" CASCADE;
DROP TABLE IF EXISTS "work_orders" CASCADE;
