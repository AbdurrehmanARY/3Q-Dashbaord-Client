# 3Q Facility Dashboard — Project Context

This file is the canonical context document for AI coding agents working in this repository. Read it before making changes. It reflects the state of the codebase after the July 2026 refactor that introduced the Production Information dashboard, roll allocation, and fixed several schema/data-integrity bugs.

## Project Overview

**Purpose.** A label manufacturing ERP system for a facility that prints, cuts, and packages printed labels (barcode labels, QR labels, etc.) against customer sales orders.

**Business domain.** Label/packaging manufacturing. The facility receives a **Sales Order** (called a "Work Order" in the schema — the two terms are used interchangeably in this codebase) from a **Company**'s **Brand**, breaks it down into one or more **Label Types** each with a required quantity, and produces that quantity through three sequential stages: **Printing → Cutting → Packaging**. Production consumes raw material **Rolls** tracked in inventory.

**Primary users.** Internal facility staff: production planners (create/manage work orders), floor supervisors (update stage progress, issue rolls), inventory/purchasing staff (record material purchases, maintain stock), and management (dashboard).

**Two sides, linked by the sales order.** The system has an **order side** (what the customer ordered) and a **production side** (what the floor is making). They are joined through the sales order and must not be conflated:

| | Order side | Production side |
|---|---|---|
| Header | `work_orders` (Sales Order) | `production_orders` |
| Lines | *(none — header only)* | `production_order_lines` (one per label type) |
| Owner | Office staff | Production manager / operators |
| Units | Labels (`totalQty`) | **Rolls** (plus `packagedQty` in labels for output) |

`production_orders.workOrderId` is a **unique** FK — one sales order produces exactly one production order.

**A work order has no line items.** Label type, quantity and label size are *production planning* and exist only on `production_order_lines`. Don't reintroduce a breakdown on `work_orders` — that was removed deliberately so the same figures aren't captured twice by two different roles.

**Overall workflow.**
1. A **Company** and its **Brand**(s) are set up as master data.
2. A **Work Order** (`work_orders`) is created for a brand with a single `totalQty` — no label-type breakdown. It starts at status `initiate_production` and stays freely editable. **Status is derived from the production order from then on and is never set by hand.**
3. Raw material is purchased (`purchase_records`), which **immediately** credits `inventory_rolls` stock — there is no approval step.
4. **Office staff** raise a **Production Order** against a work order that is still `initiate_production`. It starts empty, carrying only the work order link and its total quantity.
5. The **production manager** plans it **one label type at a time**. Each submitted record sets label size / extra rolls / material / **assigned rolls** / **printing machine + operator**, and immediately reserves all three. Required rolls, total rolls issued and total weight are calculated server-side.
6. Assigning material is what debits `inventory_rolls`, recorded as `production_roll_issuances`.
7. Machines/operators are assigned and cumulative roll progress is recorded — all of it inline on the **Production Progress table** (row-level edit) on the production order dashboard.
8. Once dispatched, the work order is set to `complete` with a **DC Number** and **Dispatched Date**, which locks it permanently.

## Technology Stack

**Frontend** (`client/`): React 18, TypeScript, Vite, shadcn/ui (style `base-nova`, mixes Radix UI and `@base-ui/react` primitives depending on which component was scaffolded when — both are installed, don't worry about which one a given `components/ui/*` file uses), TanStack Query v5 (server state), React Hook Form + Zod (forms/validation), Zustand (minimal — currently only UI theme state), Tailwind CSS, `sonner` (toasts), `recharts` (charts), `axios` (HTTP client), `react-router-dom` v6.

**Backend** (`server/`): Node.js, Express 4, TypeScript, Drizzle ORM (`postgres` / postgres-js driver), PostgreSQL, Zod (request validation). `tsx` for dev/runtime, `drizzle-kit` for migrations.

## Folder Structure

### Frontend — feature-based architecture

```
client/src/
├── App.tsx                 # composition only — providers + routes + toast outlet
├── app/                    # application shell
│   ├── AppProviders.tsx     # composes every cross-cutting provider, in dependency order
│   ├── AppRoutes.tsx        # renders the route table behind Suspense
│   ├── routes.tsx           # the route table AS DATA — add a page by adding an entry
│   └── providers/           # QueryProvider, ThemeProvider, LayoutProvider, ToastProvider
├── lib/
│   ├── api.ts               # axios instance + typed get/post/put/patch/delete wrapper, ApiError class
│   └── query-client.ts      # shared TanStack QueryClient
├── store/                   # Zustand stores (currently: ui-store.ts for theme)
├── shared/                  # app-wide layout, nav config, sidebar/header/breadcrumb, theming
├── components/              # generic reusable UI
│   ├── ui/                  # shadcn primitives (button, dialog, table, tabs, alert-dialog, ...)
│   ├── forms/                # AppButton, AppInput, AppSelect — thin wrappers over shadcn primitives
│                              #   with built-in label/error/loading handling. USE THESE in feature
│                              #   forms instead of raw shadcn <Button>/<Input>/<Select>.
│                              #   Also SubmitOnEnter — drop it inside any <form> whose action
│                              #   button lives outside the form (dialog footer / page header),
│                              #   otherwise the browser will not submit on Enter.
│   ├── cards/                # AppCard, StatCard
│   ├── dialogs/              # AppDialog (wraps shadcn Dialog with title/description/footer props)
│   ├── feedback/             # StatusBadge (color-coded status pill, variant per domain status)
│   ├── layout/                # PageHeader
│   └── data-table/           # DataTable + pagination/toolbar — generic typed table renderer
                              #   `stickyFirstColumn` / `stickyLastColumn` freeze the identity
                              #   and Actions columns during horizontal scroll.
└── features/<feature>/
    ├── pages/                # route-level components
    ├── components/            # feature-local components (forms, dialogs, tables)
    ├── hooks/                 # TanStack Query hooks — query-key factory + useX/useCreateX/useUpdateX/useDeleteX
    ├── services/               # thin wrapper over lib/api.ts, one function per endpoint
    ├── schemas/                # Zod schemas for RHF resolvers
    └── types.ts                # TS interfaces matching backend response/request shapes
```

Features: `dashboard`, `work-orders`, `production-orders` (the production workflow + manager dashboard — keyed by **production order id**), `companies` (companies + brands), `materials`, `machines-operators`, `purchases`, `inventory`. (The `reports` feature was removed — do not reintroduce it. The dashboard keeps `GET /api/analytics/kpis`, the only analytics endpoint left.)

`production-orders` additionally has a `context/` folder holding `ActorContext` (the acting-user selector). `/production` and `/production/:id` are legacy redirects to `/production-orders`; the old work-order-keyed `features/production/` was removed when production orders superseded it.

**Convention**: every fully-migrated feature follows the `pages/hooks/services/schemas/types.ts` shape above and uses TanStack Query exclusively. If you find a feature still using the legacy hand-rolled fetch pattern, migrate it to this shape rather than extending the legacy pattern.

### Backend — layered architecture

```
server/src/
├── index.ts                 # entry point (creates HTTP server)
├── app.ts                   # express app: cors, json, /health, /api router, error middleware
├── api/
│   ├── routes/               # one file per resource, mounted in routes/index.ts
│   ├── controllers/           # thin HTTP layer: asyncHandler-wrapped, extracts req.validatedBody/
│   │                          #   Params/Query ?? req.body/params/query, calls service, shapes response
│   ├── services/               # business logic: existence checks, cross-entity validation,
│   │                          #   number→string conversion for Drizzle decimal columns
│   ├── repositories/           # raw Drizzle query builder calls only — no business logic
│   ├── validations/            # Zod schemas per resource, wrapped as {body, params} or flat for query
│   ├── middleware/              # validateRequest/validateQuery/validateParams, rateLimiter (currently
│   │                          #   a no-op passthrough — not real rate limiting)
│   ├── utils/                  # ApiError hierarchy, asyncHandler, errorHandler, notFound
│   └── constants/messages.ts    # Messages.notFound/created/updated/deleted/alreadyExists + Entity enum
├── db/
│   ├── tables/                 # one Drizzle pgTable per file
│   ├── relations/index.ts       # Drizzle relations() — the only relations file that's wired up
│   ├── schema.ts                # barrel: re-exports all tables + relations + inferred Select/Insert types
│   ├── drizzle.ts / index.ts    # DB client singleton
│   └── seed.ts                  # dev seed script
└── config/                     # env.ts (zod-validated process.env), database.ts, logger.ts
```

Path aliases (see `tsconfig.json`): `@api/*`, `@db/*`, `@config/*`.

**Convention**: controllers are instantiated once and exported as a singleton (`export const xController = new XController()`), same for services and repositories. Keep this pattern — don't introduce DI containers or class-per-request patterns.

## Business Rules

**Work Orders (`work_orders`)**
- A work order has a unique `soNumber`, belongs to one `Brand` (and transitively one `Company` via `brands.companyId`), and has a single `totalQty`. **It has no line items** — see the note at the top of this file.
- **Status is a three-value enum** `work_order_status`: `initiate_production | production | complete`, and it is **always derived from the production order, never accepted from the client**:

  | production order | work order |
  |---|---|
  | none | `initiate_production` (freely editable) |
  | `planned` or `production` | `production` |
  | `complete` | `complete` |

  Propagation happens inside the same transaction as the production write (`syncWorkOrderStatusTx` in `production-order.repository.ts`), so the two can never be observed disagreeing. `updateWorkOrderSchema` deliberately has **no `status` field** — a client that sends one has it silently dropped. Deleting a production order returns its work order to `initiate_production`.
- `dcNumber` / `dispatchedDate` are **dispatch paperwork recorded after** production completes the order — they no longer gate the transition (they can't: it is automatic). A `complete` work order rejects commercial-header edits but still accepts those two fields.
- Delete is allowed only while `initiate_production`.
- **`totalQty` is frozen once a production order exists** — the production order copied that figure at creation, so changing it would desync the plan. Other header fields stay editable.
- Only work orders that are `initiate_production` **and** have no production order are eligible for a new one (`findEligibleWorkOrders`). Raising the production order immediately flips the work order to `production`.
- The list endpoint filters on `status` and searches `soNumber` / `poNumber` **partially and case-insensitively** (ILIKE) — they are search boxes, not exact lookups.
- A work order that already has a production order cannot be deleted (`production_orders.workOrderId` is `ON DELETE RESTRICT`, surfaced as a 400 in `work-order.service.ts` rather than a raw FK error).

**Material issuance (`production_roll_issuances`)**
- Issuance is **append-only history**, not an overwrite: `{productionOrderLineId, materialCode, rolls, note, actorUserId, createdAt}`.
- **Issuance is the only thing that debits `inventory_rolls`.** Purchases credit stock; issuance consumes it. There are exactly two write paths into it, and no others should be added:
  - `issueRollsTransaction` — the incremental single-line issue (`POST /lines/:lineId/issuances`).
  - `createLinePlanTransaction` / `updateLinePlanTransaction` — production planning's **Assigned Rolls**, per label type. The update path credits that line's previous draw back before debiting the new one.

  `deleteLineTransaction` (cancel one label type) and `releaseOrderInventoryTransaction` (delete the order) credit the draw back.
- **Availability is read from `inventory_rolls` only — never recomputed from `purchase_records`.** Purchases credit that ledger; the ledger is the stock. `drawStockTx` takes `SELECT … FOR UPDATE` on the material's ledger row before writing, so two planners reserving the same material serialise rather than both passing the same balance check; the post-write `balanceRolls < 0` assertion is the backstop.
- `production_order_lines.issuedRolls` is a **denormalized running sum** kept in sync transactionally — a fast-read cache; the issuance table is the source of truth.
- Issuing is a single DB transaction that (1) inserts the issuance row, (2) increments `production_order_lines.issuedRolls`, (3) increments `inventory_rolls.issuedRolls` and decrements `balanceRolls`. All three must stay atomic — keep it inside `productionOrderRepository.issueRollsTransaction`.
- Two guards: (a) cannot issue more than the material's current `balanceRolls` (not physically in stock), (b) cumulative `issuedRolls` cannot exceed the line's `totalRolls` (more than the line was planned to consume). Both throw `ApiError 400`.

**Inventory (`inventory_rolls`, `purchase_records`)**
- A `purchase_records` creation transactionally auto-credits `inventory_rolls.receivedRolls` and `balanceRolls` by `cartonQty * rollsPerCarton`. There is no separate approval step in the UI. Updating or deleting a purchase record reconciles stock changes transactionally.
- Inventory roll ledgers include `rollPerKg` (editable in UI) and derived `perSkuBalance = balanceRolls × rollPerKg`.

**Production Orders (`production_orders`, `production_order_lines`, `production_stage_events`)**
- A production order can only be raised against a work order that is still `initiate_production`, and only once (`workOrderId` is unique). `totalQty` is copied from the work order at creation.
- **Status is a three-value enum** `production_order_status`: `planned | production | complete`, and it is **always derived, never set by hand** (`deriveOrderPatch`): no progress → `planned` (including an order with no lines yet), any stage progress → `production`, every line fully packaged → `complete`. `pending_planning`, `in_production`, `completed` and `cancelled` were removed — don't reintroduce them.
- The production order stores **no** company/brand/customer of its own — all of it is derived via `work_orders.brandId → brands.companyId → companies`. The "customer" *is* the company; there is no separate customer entity.
- **Three planning figures are calculated server-side** in `api/utils/production-formula.ts` and are never trusted from the client:
  - `requiredRolls = quantity / ((rollLength_m × 39) / (labelSize_mm / 25))` — fractional, stored at `numeric(12,4)`. **Roll length is now a per-line factor** (collected on the planning form, default 200 m, persisted to `production_order_lines.rollLength`). At the default 200 m this equals the earlier `quantity / (7800 / (labelSize_mm / 25))` form (since 200 × 39 = 7800), so pre-existing lines are unaffected; older rows with a null `rollLength` fall back to 200 m.
  - `totalRolls` (Total Rolls Issued) `= ceil(requiredRolls + extraRolls)` — always a whole number.
  - `totalWeight = materials.weightPerRoll × totalRolls`, captured at plan time (null when the line has no material).
  `client/src/lib/format.ts` mirrors all three for live form preview only. **These are the canonical formulas; do not add another.**
- **Planning is per label type, not per order.** There is no bulk-plan endpoint; each label type is its own record:
  - `POST /production-orders/:id/lines` — plan one label type.
  - `PUT /production-orders/lines/:lineId/plan` — re-plan one.
  - `DELETE /production-orders/lines/:lineId` — cancel one.

  **Submitting one reserves its material, printing machine and printing operator immediately**, so the next label type cannot claim them. All three are therefore *required* on the request. The reservation lasts until the line completes or is cancelled — there is no separate release step.
- Because planning is incremental it cannot demand an exact total on every submit, so the rule is **never over-allocate**: cumulative planned quantity may not exceed `totalQty`, and the order is fully planned once they are equal. Re-planning or cancelling is **rejected** once a line has recorded progress.
- Each line settles **its own** inventory draw: `updateLinePlan` credits back what that line was holding before debiting the new figure, so changing a line's material or lowering its rolls never double-counts. `deleteLine` credits its draw back in full.
- **Machines and operators lock to one active job.** A resource is held while its line is not `completed` and its order is not `complete`. Enforced in `planLine`/`updateLinePlan`, `assignLineResources` and `updateLineFull`. Note the exclusion scope: re-planning excludes **only that line**, never the whole order — sibling label types on the same order hold their own resources and must contend with each other. `GET /production-orders/available-resources?lineId=` returns the free set.
- **Availability is derived, never stored** (`resource-availability.service.ts`), and decorates every `GET /machines` and `GET /operators` row:

  | | states |
  |---|---|
  | machine | `Available` · `Reserved` (held, not started) · `In Production` (held, started) · `Maintenance` (from `machines.status`) |
  | operator | `Available` · `Assigned` (held, not started) · `Working` (held, started) · `Completed` (only finished jobs — free again) |

  Each row also carries `isOccupied` and `heldBy` (`"PRD-00006 · Care Label"`).
- **Production cannot start until material + printing machine + printing operator are all assigned** (`missingStartRequirements`). Any write touching a progress counter is rejected until then; assignment-only edits are how you clear it. The overview exposes this as `line.readiness`.
- **Progress is cumulative roll counts, not per-roll tracking.** A roll is not an entity; there is no roll lifecycle. The chain is
  `packaged ≤ sentToPackaging ≤ cut ≤ sentToCutting ≤ printed ≤ totalRolls`.
- **Lowering a stage cascades downstream** (`cascadeChain` in the service, mirrored by `cascadeDraft` on the client): setting Printing to 8 pulls Cutting, Packaging and everything between down to at most 8, in the same transaction. This replaced the old "printed can't drop below sentToCutting" lower-bound rejection.
  **The cascade only ever clamps down, never up** — raising Printing back to 10 does *not* raise Cutting, because inflating a downstream counter would record work that never happened. An *explicitly supplied* value exceeding its own upstream is still a hard 400; only counters the caller didn't send get clamped.
  Stages still run concurrently — never make a downstream stage wait for an upstream one to finish everything.
- **Stage progress endpoints take absolute cumulative values; transfer endpoints take deltas.** Don't mix the two conventions.
- **Packaging has an operator but no machine** — assigning a machine to packaging throws `ApiError 400`. There is no packaging-operator role; packaging is done by a `production_operator`.
- A line is `completed` only when `packagedRolls >= totalRolls`; the order is `complete` only when **every** line is. Line status is derived to `pending | active | completed` only — `paused`/`cancelled` remain in the `production_status` enum but the workflow never sets them.
- Every counter change writes a `production_stage_events` row in the **same transaction** as the update, and the parent order's status is re-derived from its lines in that same transaction (`applyLineChangeTransaction`). Keep all three atomic.
- **`PATCH /production-orders/lines/:lineId`** (`updateLineFull` in the service) is a separate, additive endpoint powering the inline row-edit table on the dashboard (`client/.../EditableLabelTypeTable.tsx`). It accepts any subset of the five roll counters, `packagedQty`, and all five machine/operator assignments in **one** atomic save (absolute values, like stage-progress, not deltas like transfers). Because it updates the whole chain together, it only needs upper-bound checks (`printed<=total`, `sentToCutting<=printed`, … `packaged<=sentToPackaging`) — unlike `updateStageProgress`, it doesn't also need the lower-bound "can't drop below what's already downstream" checks, since there's no other stage left temporarily stale mid-edit. Writes one `row_update` audit event. **This is now the only progress-editing UI** — the per-stage dialogs (`LineDetailPanel`, transfer/assign/issue/stage dialogs), the Activity tab and the "Acting As" selector were all removed. The single-stage/transfer/assign/issuance endpoints still exist server-side and are still valid, they just have no UI.
- Each stage shows **only its own resources**: machines filtered by `machineType` (`Printing`/`Cutting`), operators filtered by `designation` (`Printing`/`Cutting`/`Packaging`). Don't show an unfiltered operator or machine list on a stage.

**Users / roles (`users`)**
- Three roles: `office_staff | production_manager | production_operator`. **There is no authentication and no RBAC** — the roles are descriptive. `actorUserId` is still accepted (optional) by the mutating endpoints for attribution, but with the "Acting As" selector removed there is no client UI that sets it, so it currently arrives `undefined`. Don't treat `actorUserId` as an authorization signal.
- `operators.userId` optionally links a floor operator to a user record.

**Companies / Brands**
- `brands.companyId` is a real FK to `companies.id` (this was previously a broken free-text `company` varchar column with no FK — fixed in the July 2026 refactor). Always join through this FK for company info; never re-add a denormalized company name/text field on `brands` or `work_orders`.
- A sales order's "customer" (company) is derived via `work_orders.brandId → brands.companyId → companies`. `work_orders` does **not** have its own `companyId` column — don't add one; extend the join instead.

**Purchase Records (`purchase_records`)**
- Four fields are **always server-calculated, never user-entered**: `totalRoll`, `totalRollPer200m`, `invoiceWeight`, `localWeight`. Validation schemas deliberately have no fields for them — if a client sends one anyway, it's silently dropped and the server's own computation wins. `client/src/lib/format.ts` mirrors the formulas for live form preview only.
  - `totalRoll = cartonQty * rollsPerCarton` (fixed a latent bug: the old code accepted a client-computed `totalRolls` and never actually persisted it — the DB column is singular `totalRoll` and was silently left `null` on every create; records approved before this fix still have `totalRoll`/`totalRollPer200m` as `null`).
  - `totalRollPer200m = totalRoll * (rollLength / 200)` — `api/utils/purchase-formula.ts`.
  - `invoiceWeight = (netWeight * 200) / (totalRoll * rollLength)` — same file.
  - `localWeight` is copied from the purchased material's `materials.weightPerRoll` — not computed from purchase inputs at all.
- On `updatePurchase`, changing *any* of `cartonQty`/`rollsPerCarton`/`rollLength`/`netWeight`/`materialCode` recomputes **all four** derived fields from the merged (existing + patch) values — never patch one without re-deriving the rest.
- **There is no approval workflow and no `status` column** — purchase records are plain CRUD. Creating one credits `cartonQty × rollsPerCarton` into `inventory_rolls` (received + balance), updating reconciles the delta (and moves the full amount between materials if `materialCode` changes), and deleting reverses it. All of this is transactional via `createPurchaseWithStock` / `updatePurchaseWithStock` / `deletePurchaseWithStock`.
- `materials.weightPerRoll` is `decimal(10, 2)` — only 2 decimal places. A material weight like `0.1605` silently rounds to `0.16` on save. If you need finer precision here, widen the column's `scale`, don't work around it in application code.

## Database Summary

Tables (see `server/src/db/tables/*.ts` for exact columns):

| Table | Purpose | Key relationships |
|---|---|---|
| `companies` | Customer companies | 1→N `brands` |
| `brands` | Brand under a company | N→1 `companies` (FK `companyId`); 1→N `work_orders` |
| `work_orders` | Sales orders — commercial header only, **no line items** | N→1 `brands` (FK `brandId`, nullable); 1→1 `production_orders` (restrict) |
| `users` | Staff directory + role enum. No auth — attribution only | 1→N `operators`, `production_orders`, `production_stage_events`, `production_roll_issuances` |
| `production_orders` | Production run raised against an in-production work order | N→1 `work_orders` (FK `workOrderId`, **unique**, `onDelete: restrict`); 1→N `production_order_lines` (cascade) |
| `production_order_lines` | One row per planned label type; cumulative **roll** counters | N→1 `production_orders` (cascade); N→1 `materials` (FK `materialCode`); N→1 `machines`/`operators` per stage (packaging: operator only); 1→N `production_stage_events`, `production_roll_issuances` (cascade) |
| `production_stage_events` | Append-only audit of every counter movement | N→1 `production_order_lines` (cascade); N→1 `users` (`actorUserId`) |
| `production_roll_issuances` | Append-only material issuance; the only debit of `inventory_rolls` | N→1 `production_order_lines` (cascade); N→1 `materials` (FK `materialCode`); N→1 `users` |
| `materials` | Raw material master data | 1→N `purchase_records`, `inventory_rolls`, `production_order_lines`, `production_roll_issuances` |
| `purchase_records` | Material purchase/receipt log | N→1 `materials` (FK `materialCode` → `materials.code`, not `materials.id`) |
| `inventory_rolls` | Per-material stock ledger (opening/received/issued/balance) | N→1 `materials` (FK `materialCode` → `materials.code`, unique — one ledger row per material) |
| `machines` | Production machines | N→1 `operators` (FK `machineOperatorId`) |
| `operators` | Floor operators | N→1 `users` (FK `userId`, optional) |

That is the complete list — 13 tables. `production_progress`, `roll_allocations` and `production_info` were **dropped** (migration `0003`) once sales orders lost their line items; don't resurrect them.

Notable constraints:
- `work_orders.soNumber` unique; `production_orders.productionNumber` unique; `production_orders.workOrderId` unique; `brands` unique on `(companyId, name)`; `materials.code` unique; `inventory_rolls.materialCode` unique (one ledger per material); `companies.name` unique.
- `production_order_lines.status` uses the `production_status` Postgres enum (`pending | active | paused | completed | cancelled`), declared in `db/tables/production-status.enum.ts` — only `pending | active | completed` are ever set.
- `production_orders.status` uses `production_order_status` (`planned | production | complete`).
- `work_orders.status` uses `work_order_status` (`initiate_production | production | complete`) — derived, never client-set.
- All decimal columns (`quantity`, `requiredRolls`/`extraRolls`/`totalRolls`, the five roll counters, `issuedRolls`, `packagedQty`) are Drizzle `decimal` — **Postgres returns these as strings over the wire**, not numbers. Always `Number(...)` them before arithmetic on both server and client. This has bitten the codebase before; don't assume `typeof x === "number"` for any of these fields.

Migrations live in `server/drizzle/`. Use `npm run db:generate` then `npm run db:migrate` for schema changes — don't hand-edit `drizzle/meta/*.json`. Note that `drizzle-kit generate` prompts interactively when a migration both creates and drops tables (it can't tell a rename from a create) and it reads the TTY directly, so piping input won't work — split such changes into two generate runs.

## API Conventions

**Response format.**
- Success: `res.json({ data })` (200) or `res.status(201).json({ data })` (created). Deletes: `res.status(204).send()` (no body).
- Error: `res.status(code).json({ status: "error", message })`, produced by the `errorHandler` middleware (registered last in `app.ts`) from a thrown `ApiError` subclass.
- List endpoints return `{ data: T[] }`; single-resource endpoints return `{ data: T }`. There is no envelope wrapper beyond this (no `meta`, no pagination envelope currently — pagination is not implemented on any list endpoint).

**Error format / error classes** (`server/src/api/utils/ApiError.ts`): `ApiError` (base, custom status), `BadRequestError` (400), `NotFoundError` (404), `ConflictError` (409), `InternalServerError` (500). Throw these directly from services — the `asyncHandler` wrapper on every controller method catches and forwards to `errorHandler`.

**Validation strategy.** Zod schemas in `api/validations/<resource>.validation.ts`. Body/param schemas are wrapped `z.object({ body: ..., params: ... })` and applied via `validateRequest(schema)` middleware, which stashes parsed values on `req.validatedBody`/`req.validatedParams` (never mutates `req.body` directly). Query-only schemas are flat (not wrapped) and applied via `validateQuery(schema)`, stashing onto `req.validatedQuery`. Controllers always read via `(req.validatedX ?? req.X)` fallback — keep this pattern for new endpoints even though validation is normally applied.

**Naming conventions.**
- Routes: kebab-case plural resource paths (`/api/work-orders`, `/api/production-orders`), nested sub-resources under their parent (`/api/inventory/rolls`, `/api/production-orders/lines/:lineId/issuances`).
- Route params: `:id` for the resource's own primary key; a differently-named param (`:workOrderId`) when the path crosses to a different resource's key, e.g. `GET /api/production/overview/:workOrderId`.
- DTO types: `Create<Resource>DTO`, `Update<Resource>DTO`, inferred via `z.infer<typeof schema>['body']`.
- Client-side service methods: `list/get/create/update/remove` (not `delete` — reserved word) as the standard verb set per `services/<resource>-service.ts`.

## Coding Standards

**Components (client).** Feature pages live in `features/<feature>/pages/`. Prefer the `Component/AppComponent` wrapper set (`AppButton`, `AppInput`, `AppSelect`, `AppCard`, `AppDialog`) over raw shadcn primitives inside feature code — they encode this project's label/error/loading conventions consistently. Reach for a raw shadcn primitive directly only when no `App*` wrapper exists for it (e.g. `Table`, `Progress`, `Tabs`, `Badge`).

**Hooks (client).** One `hooks/use-<resource>.ts` per feature exporting: a `<RESOURCE>_KEYS` query-key factory object, `use<Resource>()`/`use<Resource>Detail(id)` read hooks with `select: (res) => res.data` to unwrap the `{data}` envelope, and `useCreate<Resource>()`/`useUpdate<Resource>()`/`useDelete<Resource>()` mutation hooks that `invalidateQueries` on success and `toast.success/error` via `sonner`. Copy this shape exactly for new resources — see `features/companies/hooks/use-companies.ts` or `features/machines-operators/hooks/use-entities.ts` as the cleanest reference.

**Services (client).** `services/<resource>-service.ts` — a plain object of arrow functions wrapping `lib/api.ts`'s typed `api.get/post/put/patch/delete`. No business logic here, just endpoint + type mapping.

**Repositories (server).** Raw Drizzle calls only (`db.select()/.insert()/.update()/.delete()`), return raw rows. No `NotFoundError` throwing here — that belongs in the service layer, which calls the repository then checks the result.

**Controllers (server).** Thin: extract validated input, call exactly one service method, shape the HTTP response. No business logic, no direct DB access.

**DTOs / Validation (server).** Every mutating endpoint has a Zod schema in `validations/`. Numeric fields from query strings or form-encoded bodies use `z.coerce.number()`. Decimal fields destined for Drizzle `decimal` columns get `String(...)`-converted in the **service** layer (not the repository) before being passed down.

**Imports.** Server uses path aliases (`@api/*`, `@db/*`, `@config/*`) — prefer these over relative `../../` chains for cross-directory imports within `src/api` and `src/db`. Client uses `@/*` → `src/*`.

**Naming.** camelCase for variables/functions/methods, PascalCase for components/classes/types, kebab-case for file names except React component files which are PascalCase (`WorkOrderListPage.tsx`) and hook/service/schema files which are kebab-case (`use-work-orders.ts`, `work-order-service.ts`).

**TypeScript.** Strict mode is on in both packages. Both currently typecheck with zero errors (`npx tsc --noEmit`) — keep it that way; don't introduce `any` casts to silence errors except where already established as a workaround for a known third-party typing limitation (e.g. `resolver: zodResolver(schema) as any` is an existing, accepted workaround for a `react-hook-form` + `@hookform/resolvers` v5 generic-inference issue — match that pattern rather than inventing a new one if you hit the same class of error).

## Development Guidelines

For any future AI agent (or human) working in this repo:

1. **Always analyze the repository before coding.** Read the relevant feature's existing files (`types.ts`, `services/`, `hooks/`, and one comparable `pages/` file) before writing new code in that feature. Read the equivalent layer in a sibling, already-complete resource (companies, materials, machines-operators are the most complete reference implementations on the client; work-orders and production-progress are the most complete on the server) before inventing a new pattern.
2. **Never duplicate existing functionality.** Before adding a hook, service method, or component, grep for whether something close already exists. This codebase has had duplicate-file drift before (e.g. `api.ts` and `services/*-service.ts` coexisting for the same resource, or root-level page shims — these have mostly been cleaned up, don't reintroduce the pattern).
3. **Reuse existing utilities and components.** `lib/format.ts` (formatNumber/formatDate/todayISO), `lib/api.ts`, the `App*` component set, `StatusBadge`, `DataTable` — use these rather than writing ad hoc equivalents.
4. **Preserve architecture.** Feature-based on the client, layered (controller/service/repository) on the server. Don't collapse layers "for simplicity" — the separation is intentional and consistently applied.
5. **Follow feature-based frontend architecture / layered backend architecture** as documented above for any new resource.
6. **Official shadcn/ui components are mandatory — never hand-write one that exists.** Before building *any* UI component, check the official registry first:

   ```bash
   curl -s https://ui.shadcn.com/r/index.json   # the authoritative list — check it, don't recall it
   npx shadcn@latest add <name>                 # install; never reimplement
   ```

   The registry changes over time and contains components that predate no agent's training (`empty`, `field`, `spinner`, `item`, `kbd`, `button-group`, and a first-class `combobox`). **Verify against the live index rather than from memory.**

   A custom component is only justified when the registry has no equivalent — and it must then be *composed from* official primitives, not replace them. Things genuinely absent from the registry (so fair to build): `data-table`, `date-picker`, `progress-bar`, and the data-table sub-parts (toolbar, column header, editable cell) — note these are shadcn *documentation recipes*, not shippable registry entries. Things present and therefore never to be hand-written: `pagination`, `combobox`, `badge`, `select`, `table`, `empty`, `skeleton`, `progress`, `calendar`, `command`, `form`, and everything else in the index.

   Wrappers like `AppButton`/`AppCard`/`AppDialog` are fine because they *wrap* `ui/button`, `ui/card`, `ui/dialog`. A wrapper that imports no `ui/*` primitive is the smell that something was reimplemented.

   Caveat when installing: this project is **React 18**, while the `base-nova` registry style targets React 19's ref-as-prop. Registry components used in a base-ui `render={<Component/>}` slot will warn "Function components cannot be given refs". In project code, apply `buttonVariants({...})` as a `className` on the primitive trigger instead of `render={<Button/>}`.
7. **Use TanStack Query for all server state** — never introduce a new hand-rolled fetch hook; if you find legacy `useState`/`useEffect` data-fetching code, prefer migrating it to TanStack Query over extending it.
8. **Use React Hook Form + Zod for all forms.**
9. **Prefer composition over duplication** — extend an existing generic component (`DataTable`, `AppDialog`, `AppCard`) with a prop rather than forking it.
10. **Keep changes production-ready and maintainable.** Run `npx tsc --noEmit` in whichever package(s) you touched before considering a task done; run `npm run build` in `client/` for anything touching routing, lazy imports, or build-sensitive code.
11. **Decimal columns are strings over the wire** (see Database Summary) — always convert with `Number(...)` before doing arithmetic or comparisons, on both server and client.
12. **Work order completion lock** (`status === "complete"`) follows the "throw ApiError 400 on mutation attempt" pattern — apply it consistently to any new locking business rule rather than inventing a different mechanism (e.g. silently ignoring the update, or a boolean `readOnly` flag returned to the client for it to self-enforce). Purchase records are deliberately **not** locked: they are plain CRUD.
