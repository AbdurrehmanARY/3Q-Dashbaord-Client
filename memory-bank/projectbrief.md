# Project Brief — 3Q Facility Label ERP

## Purpose
Internal label-manufacturing ERP for a single facility. A customer **Sales Order**
(called a "Work Order" in the schema) is broken into one or more **label types**,
each with an ordered quantity, and produced through sequential stages that consume
raw material tracked as **rolls** (printed side) or **thread** (woven side).

The system has an *order side* (customer-facing header) and a *production side*
(what the floor makes), joined through the sales order and deliberately not
duplicated. Production planning is one label type at a time, against a production
order keyed by production-order id.

## The two workflows
One order runs exactly **one** of two pipelines, selected by
`productType: "printed" | "woven"` (see `work-orders/types.ts`).

| Stage | PRINTED | WOVEN | Unit |
|---|---|---|---|
| 1 | Planning | Planning | rolls / pieces |
| 2 | **Printing** | **Weaving** | rolls / pieces |
| 3 | **Cutting** | **Cutting** | rolls / pieces |
| 4 | **Packaging** | **Packaging** | labels / pieces (output) |
| 5 | Dispatch | Dispatch | — |

Cutting and packaging are **LINE-SCOPED** (settled 2026-09-29): like the first stage, such a
batch belongs to exactly one label type / production line, so it always carries **one** non-NULL
line column and its numbers restart per (line, stage). Enforced by the CHECK
`production_batches_one_line` (`num_nonnulls(...) = 1` at every stage) plus the partial indexes
`production_batches_printed_no_uq` / `production_batches_woven_no_uq`. Migration
`0025_line_scoped_cutting_packaging.sql` performs the switch — it drops the former live CHECK
`production_batches_first_stage_one_line` (which demanded BOTH line columns NULL for cutting and
packaging), backfills the line-less rows, then adds the line-scoped CHECK — and was validated
end-to-end on a scratch database. It is journalled but **not yet applied to live Supabase**;
`0023_revert_cutting_packaging_line_scope.sql` remains the never-executed earlier attempt at the
same thing. See `memory-bank/migration-reconciliation.md`.
`production_stage_tx_type` is append-only and ordered:
`print_credit → cut_consume_print/cut_credit → package_consume_cut/package_credit`;
only `COMPLETED` batches count toward stage totals.

## Roles (real state — no auth, no RBAC)
The codebase has **NO authentication and NO RBAC**. `JWT_SECRET` is commented out
in `server/src/config/env.ts`; grepping `src` for `jsonwebtoken|passport|req.user`
returns nothing. The `user_role` enum is descriptive only and `actorUserId` is an
optional attribution field, **not** an authorization signal.

| Role | Responsibility |
|---|---|
| `ceo` | Executive overview; full read access to all dashboards and analytics |
| `office_staff` | Office staff; work-order master data |
| `production_manager` | Production planning; assign machines + operators; reserve material |
| `accountant` | Financial oversight; work-order dispatch; analytics read access |

`apiRateLimiter` (express-rate-limit) is active at 1000 req/IP/min on `/api`;
`authRateLimiter` is pre-wired for when auth arrives (unused today).

## Technical constraints (verified)
- **Two independent packages**, no root `package.json`, no npm workspaces. Every
  command runs per-package.
  - `client/`: React 18.3.1, Vite 5.4.21, TS 5.9.3, shadcn/ui (base-nova, Radix +
    @base-ui/react), TanStack Query 5.101.2, TanStack Table 8.21.3, React Hook
    Form 7.81, Zod **4.4.3**, Zustand 5.0.14, axios, date-fns 4.4, recharts 3.8,
    sonner, Vitest 4.1.10 + jsdom + Testing Library. Alias `@/*`.
  - `server/`: Node `engines: 24.x` (**CI pins Node 20 — drift to resolve**),
    Express 4.22.2, Drizzle ORM 0.36.4 + kit 0.30, Supabase Postgres via the
    `postgres` driver, Zod **3.25.76**, tsup, tsx, Vitest 4.1.10. Aliases
    `@api/* | @db/* | @config/*`.
- **Zod v3 (server) vs v4 (client)**: runtime schema objects are *not* portable
  between packages; share TS types only, never schemas.
- **Decimals are strings over the wire**: always `Number(...)` before arithmetic.
- **Vercel two-project deployment** (`client/vercel.json` SPA fallback,
  `server/vercel.json` rewrites `/`→`/api`, `functions["api/index.js"]`
  maxDuration 30, `regions: ["bom1"]`). The built bundle `server/api/index.js` is
  committed and must be rebuilt (`npm run build`) before pushing.
- **DB at runtime** = Supabase transaction pooler (`:6543`, `prepare:false`);
  `DIRECT_URL` session pooler (`:5432`) is for dev-machine migrations/DDL only.
- **CI** (`.github/workflows/ci.yml`): typecheck → lint → test → build, both
  packages independently on Node 20.
- **Current gate state**: both packages typecheck clean (`tsc --noEmit`); client
  4 files / 39 tests green; server 6 test files.

## Data model (high level)
- **Master data**: `companies`, `brands` (linked via FK to companies), `materials`,
  `machines` (typed: Printing/Cutting), `operators` (designation:
  Printing/Cutting/Packaging), `users` (the descriptive role enum), thread types.
- **Order side**: `work_orders` (sales order; `totalQty` only — no line items),
  `work_order_details` (line-item rows the order decomposes into).
- **Production side**: `production_orders` (1:1 to `work_orders`),
  `production_order_lines` (one per label type), `woven_production_lines`,
  `woven_thread_plan_items`.
- **Batch flow** (the live production pipeline): `production_batches`
  (stage × machine × operator, per line), `production_stage_transactions`
  (append-only ledger), `batch_consumptions`, `production_roll_issuances`
  (append-only material draws), `production_runs` (audit), `production_stage_events`.
- **Inventory ledgers** (all append-only with balances): `inventory_rolls`,
  `inventory_roll_movements`, `thread_stocks`/`thread_stock_movements`,
  `ink_purchases`/`ink_consumptions`, plus sticker/local/label sheets.

## Business invariants to preserve
- A work order has **no line items**; `production_order_lines` is the breakdown.
- Work-order status is **derived** (`initiate_production | production | complete`),
  never set by the client; `updateWorkOrderSchema` has no `status` field.
- `totalQty` on a work order is frozen once a production order exists.
- **Issuance debits stock and is the only thing that does so**; purchases credit
  `inventory_rolls`. Two write paths: `issueRollsTransaction` and the planning
  "Assigned Rolls" path.
- Availability is read from `inventory_rolls` only, never recomputed from
  purchases (`drawStockTx` takes `SELECT … FOR UPDATE` on the ledger row).
- `issuedRolls` on a line is a transactionally-maintained cache; the issuance
  table is the source of truth.
- Purchase derived fields (`totalRoll`, `totalRollPer200m`, `invoiceWeight`,
  `localWeight`) are always server-calculated via
  `server/src/api/utils/purchase-formula.ts`.
- Completion lock (`status === "complete"`) rejects mutating attempts with
  `ApiError(400)` — apply this same pattern, not a client `readOnly` flag.
- A `complete` work order still accepts `dcNumber`/`dispatchedDate` but rejects
  commercial-header edits.
