-- 0031_auth_rbac.sql
--
-- Adds JWT authentication and RBAC support:
-- 1. Extends user_role enum with 'ceo' and 'accountant' roles
-- 2. Adds password_hash column to users table (NOT NULL, backfilled with default hash)
--

-- Step 1: Extend user_role enum with new roles
ALTER TYPE "user_role" ADD VALUE IF NOT EXISTS 'ceo';
ALTER TYPE "user_role" ADD VALUE IF NOT EXISTS 'accountant';

-- Step 2: Add password_hash column to users table
-- Backfill existing rows with a placeholder hash, then enforce NOT NULL
ALTER TABLE "users" ADD COLUMN "password_hash" varchar(255) DEFAULT '$2a$12$invalid.placeholder.hash.for.existing.users';

UPDATE "users" SET "password_hash" = '$2a$12$invalid.placeholder.hash.for.existing.users' WHERE "password_hash" IS NULL;

ALTER TABLE "users" ALTER COLUMN "password_hash" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "password_hash" DROP DEFAULT;

-- Step 3: Create index on role for faster lookups
CREATE INDEX IF NOT EXISTS "users_role_idx" ON "users" ("role");