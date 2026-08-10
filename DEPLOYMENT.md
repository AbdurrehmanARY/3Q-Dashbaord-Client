# 3Q Facility Dashboard — Deployment

This repo is a monorepo: `client/` (Vite SPA) + `server/` (Express API). Both are prepared
for Vercel, and the database has been migrated to Supabase.

## Supabase — already done

- All **21 tables** created in Supabase (`npm run db:migrate` against the session pooler).
- **Local data copied** into Supabase (`npm run db:copy:from-local`) — verified against local.
- Connections (in `server/.env`, gitignored):
  - `DATABASE_URL` → transaction pooler (port 6543) — app runtime, `prepare: false`.
  - `DIRECT_URL` → session pooler (port 5432) — migrations / DDL only.
  - The DB password contains `@`, encoded as `%40` in the URLs (required).

To re-sync data from local later: `cd server && npm run db:copy:from-local`.

---

## Deploying to Vercel

You need **two Vercel projects** — one for the client, one for the server. There are two ways
to source them.

### Option A — keep this monorepo, two projects (recommended, no repo surgery)

Push this repo once, then create two Vercel projects from it with different **Root Directory**:

- Project 1 (server): Root Directory = `server` — see [server/DEPLOY.md](server/DEPLOY.md)
- Project 2 (client): Root Directory = `client` — see [client/DEPLOY.md](client/DEPLOY.md)

Vercel builds only the selected subfolder for each project.

### Option B — two separate repos (what you asked for)

Each of `client/` and `server/` already has its own `.gitignore`, `vercel.json`, `.env.example`,
and `DEPLOY.md`, so each stands alone. Split them into fresh repos:

```bash
# ── CLIENT ──
cd client
git init && git add . && git commit -m "Initial commit: 3Q client"
git branch -M main
git remote add origin https://github.com/<you>/3q-client.git
git push -u origin main

# ── SERVER ──
cd ../server
git init && git add . && git commit -m "Initial commit: 3Q server"
git branch -M main
git remote add origin https://github.com/<you>/3q-server.git
git push -u origin main
```

(Create the two empty GitHub repos first. For each Vercel project, Root Directory = `./`.)
Prefer to preserve history instead of a fresh `git init`? Use `git subtree split -P client -b client-only`
(and `-P server`), then push those branches to the new repos.

---

## Deploy order (important — avoids a CORS/URL chicken-and-egg)

1. **Deploy the server first.** Set its env vars (`DATABASE_URL`, `NODE_ENV=production`,
   `JWT_SECRET`, and a temporary `CORS_ORIGIN=*`). Note its URL, e.g. `https://3q-server.vercel.app`.
2. **Deploy the client.** Set `VITE_API_URL=https://3q-server.vercel.app/api`. Note its URL.
3. **Lock down CORS.** Set the server's `CORS_ORIGIN` to the client URL
   (`https://3q-client.vercel.app`) and redeploy the server.

## Environment variables at a glance

**Server** (Vercel → server project):

| Name | Value |
|---|---|
| `DATABASE_URL` | Supabase transaction pooler URI (6543), `@`→`%40` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | client URL (comma-separated list allowed) |
| `JWT_SECRET` | strong random string |

**Client** (Vercel → client project):

| Name | Value |
|---|---|
| `VITE_API_URL` | `https://<server>.vercel.app/api` |

## Local development is unchanged

```bash
# terminal 1
cd server && npm run development    # tsx watch, NODE_ENV=development, reads .env

# terminal 2
cd client && npm run dev            # Vite on :3000, proxies /api → :5000
```
