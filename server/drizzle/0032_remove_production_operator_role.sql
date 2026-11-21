-- 0032_remove_production_operator_role.sql
--
-- Removes the 'production_operator' role from the user_role enum.
-- Since PostgreSQL doesn't support DROP VALUE from enum, we:
-- 1. Create new enum type with 4 values
-- 2. Update users table to use new enum
-- 3. Drop old enum
-- 4. Rename new enum to user_role

-- Step 1: Create new enum type with 4 values (ceo, office_staff, production_manager, accountant)
CREATE TYPE "user_role_new" AS ENUM('ceo', 'office_staff', 'production_manager', 'accountant');

-- Step 2: Update users table to use new enum
-- First, ensure no users have 'production_operator' role (should be handled by seed data)
-- If any exist, they need to be updated or deleted before this migration runs
-- For safety, we'll update any production_operator users to production_manager
UPDATE "users" SET "role" = 'production_manager' WHERE "role" = 'production_operator';

-- Step 3: Alter column to use new enum type
ALTER TABLE "users" ALTER COLUMN "role" TYPE "user_role_new" USING "role"::text::"user_role_new";

-- Step 4: Drop old enum
DROP TYPE "user_role";

-- Step 5: Rename new enum to user_role
ALTER TYPE "user_role_new" RENAME TO "user_role";

-- Step 6: Recreate index on role for faster lookups
CREATE INDEX IF NOT EXISTS "users_role_idx" ON "users" ("role");