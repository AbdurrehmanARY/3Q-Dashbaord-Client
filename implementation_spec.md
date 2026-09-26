# Implementation Spec — Server Vertical-Slice Refactor (Condensed)

**Package:** `server/`
**Status:** Approved for execution (scope locked: directory refactor only)
**Prepared against:** `chore/ci` @ `9b99ce1` + Phase A (`modules/shared`) + Wave 1 (`modules/users`)

## 1. Goal
Reorganize `server/src` from layer-based (`controllers/ routes/ services/ repositories/`) into
`src/modules/<domain>/` (flat per-resource files) + `src/shared/` — HTTP surface provably identical.

### 1.1 Acceptance criteria
| # | Criterion | Proof |
|---|---|---|
| AC1 | Zero change to endpoints/status/payload | Route-table diff empty (§10.1) |
| AC2 | Zero change to DB queries | No `src/db` content edits — pure relocation |
| AC3 | `tsc --noEmit` → 0 errors | `npm run typecheck` |
| AC4 | `vitest run` → 92/92 | `npm test` |
| AC5 | Build succeeds | `npm run build` |
| AC6 | No file-level import cycles | guard test |
| AC7 | No repository→service imports | guard test |
| AC8 | No stale removed-path imports | stale-scan = 0 in src/ |

### 1.2 OUT of scope
- ❌ `vercel.json` untouched (existing `/(.*) -> /api` rewrite)
- ❌ No `api/index.ts` Vercel entry (keep `src/api-entry.ts`; committed bundle untouched)
- ❌ No `/api/v1` prefix
- ❌ No `src/index.ts` → `src/server.ts` rename
- ❌ No status/payload/query changes
- ❌ No `auth` module (no auth code exists; CLAUDE.md is stale)

## 2. Locked decisions
- D1: Directory refactor only; HTTP surface frozen
- D2: `work-orders`, `production`, `inventory` as separate top-level modules (stakeholder)
- D3: Full cross-module import freedom permitted (graph verified acyclic)
- D4: Cycles handled by safety techniques (guard test), not merging
- D5: Flat module folders (`modules/<m>/<resource>.<layer>.ts`)
- D6: `modules/shared/*` → `src/shared/*`
- D7: Keep 4 aliases (`@modules`, `@shared`, `@db`, `@config`)
- D8: Keep singleton pattern (`export const x = new X()`)

## 3. Current state (audited)
- 98 files in `src/api/` to relocate
- 16 files in `src/modules/shared` (Phase A) + 5 in `modules/users` (Wave 1)
- No `auth` code; no `models/` layer (Drizzle owns schema in `db/tables/`)
- Entry points: `src/index.ts` (dev), `src/app.ts` (Express), `src/api-entry.ts` (Vercel), `server/api/index.js` (committed)
- Cross-module call audit (see full spec §3.3 for line refs)
- `production-run` lives under `work-orders` URL (`/work-orders/:id/production-runs`)

## 5. Module assignment (summary — full tables in main doc)
- work-orders/: work-order.{routes,controller,service,repository,schema}.ts
- production/: production-order, woven-production, batch-flow, production-run (each 4-5 files)
- inventory/: material, inventory, inventory-roll, material-receipts (+ sub-routers)
- companies/: company (exports brandService/brandRepository), brand
- users/: users.{routes,controller,service,repository,schema}.ts (Wave 1)
- machines/, operators/, ink/, analytics/, health/, thread/ (single-resource)

## 6. Import & alias changes
- tsconfig.json + vitest.config.ts: `@shared/* -> ./src/shared/*`, `@db/* -> ./src/shared/db/*`, `@config/* -> ./src/shared/config/*`
- `@api/*` → `@modules/<domain>/*`; `../services/` → module-relative `./`
- package.json db scripts: `src/db/seed.ts` → `src/shared/db/seed.ts` etc. (5 paths)
- drizzle.config.ts: schema → `src/shared/db/schema.ts`
- vi.mock paths in batch-flow.service.test.ts (6 sites — checklist §6.4)

## 7. Migration order (waves) & gates
W0 baseline → W1 shared+config+db → W2 flatten users → W3 companies → W4 machines+operators
→ W5 analytics+health → W6 ink → W7 thread → W8 inventory → W9 production → W10 work-orders
→ W11 app.ts transplant + delete @api/* → W12 guard test + route diff + stale scan
Gate after every wave: typecheck 0 · tests 92 · stale-scan 0

## 8. Cycle analysis (no cycles exist today)
- Repositories are true leaves (import only @db/* + drizzle)
- Services cross-module only into repositories or leaf services
- batch-flow.repository → @api/services/batch-flow.helpers (layering inversion — fixed by flat layout)
- db/drizzle.ts already lazy; no top-level queries; one eager connection in db/index.ts (safe)

## 9. Guard test: src/shared/__tests__/architecture.test.ts
- R2: walk src/**/*.ts, build import graph (alias+relative resolved), DFS for back-edges, assert none
- R1: for each *.repository.ts, assert no *.service.ts import and no out-of-module repo import
- Pre-existing exemptions: none required (currently acyclic)

## 10. Verification protocol
### 10.1 Route-table diff (primary AC1 proof)
Script: scripts/dump-routes.mjs (temporary, not committed):
import app from "../src/app.js";
const rows=[]; const walk=(s,p="")=>{for(const l of s){if(l.route){const pp=p+(l.route.path==="/"? "":l.route.path);
for(const m of Object.keys(l.route.methods))rows.push(m.toUpperCase()+" "+pp)}else if(l.name==="router"&&l.handle?.stack){
const seg=l.regexp?.source?.replace("^\\/","").replace("\\/?(?=\\/|$)","").replace(/\\\//g,"/").replace(/\$$/",);
walk(l.handle.stack,p+(seg||""))}}};walk(app._router.stack);console.log(JSON.stringify(rows.sort(),null,2));
Procedure: W0 → route-table-baseline.json; W12 → route-table-after.json; git diff --no-index must be empty.
CAVEAT: Express 4 layer.regexp shape is version-sensitive — eyeball baseline at W0.

### 10.2 Package gates
cd server && npm run typecheck · npm test · npm run build

### 10.3 Stale scan (expect 0 in src/)
@api/ · ../services/ · ../repositories/ · ../validations/ · ../controllers/

### 10.4 Git sanity
git status: renames (R) + import-only mods (M); src/api + src/utils deleted

## 11. Risks & resolutions
| ID | Risk | Severity | Resolution |
|---|---|---|---|
| R-1 | /api/v1 would 404 client (api.ts:14 = "/api") | 🔴 | NOT done (scope §1.2) |
| R-2 | Rewrite /api/(.*) → /api/index.ts drops /health | 🔴 | vercel.json untouched |
| R-3 | api/index.ts alias unverifiable locally | 🟠 | deferred (separate PR) |
| R-4 | vi.mock paths silently stop matching | 🟠 | §6.4 checklist |
| R-5 | vitest.config aliases drift from tsconfig | 🟠 | change both in lockstep |
| R-6 | Repo→service edge introduced later = real cycle | 🟡 | guard test (CI fail) |
| R-7 | Get-ChildItem -Include false negatives | 🟡 | always -Recurse |
| R-8 | production module ~25 flat files | 🟡 | resource-prefixed filenames |
| R-9 | Route dump regex misreads Express 4 | 🟡 | eyeball baseline first |
| R-10 | Stale graphify JSON misleads audit | 🟡 | exclude .graphify/ |

## 12. Rollback
Each wave = discrete commit; `git checkout -- server/src` for full reset. No DB or deploy action needed (no content edits).

## 13. Deferred backlog
1. api/index.ts Vercel entry + committed bundle (preview-deploy verified)
2. src/index.ts → src/server.ts rename
3. /api/v1 dual-mount (if wanted)
4. sql.raw parameterization in batch-flow.repository.ts#assertResourcesFreeTx
5. Relocate repository-level ApiError throws to services (CLAUDE.md §2)
6. .graphify/GRAPH_REPORT.md refresh (graphify update . — CLI unavailable here)
7. Housekeeping: root tsc*.txt, typecheck.txt, insp.txt, _fix_table.mjs, fix_journal.py, etc.
