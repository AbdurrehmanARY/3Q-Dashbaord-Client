# Client — Vercel deployment

Vite + React single-page app, deployed as a static site on Vercel.

## How it's wired

- `vercel.json` rewrites all non-file routes to `/index.html` so React Router deep links
  (e.g. `/production-orders/1`) resolve on refresh.
- `src/lib/api.ts` reads `import.meta.env.VITE_API_URL`. In dev it's unset and Vite proxies
  `/api` → `http://localhost:5000` (see `vite.config.ts`). In production it points at the
  deployed backend.

## Deploy

1. Push this folder to its own GitHub repo (see the root `DEPLOYMENT.md` for split commands).
2. In Vercel → **Add New Project** → import the repo.
   - Framework preset: **Vite** (auto-detected)
   - Build command: `npm run build` · Output directory: `dist`
   - Root directory: `./`
3. Add **Environment Variable**:

   | Name           | Value                                          |
   |----------------|------------------------------------------------|
   | `VITE_API_URL` | `https://your-server.vercel.app/api`           |

   > `VITE_*` vars are baked in at **build time** — after changing it, redeploy.

4. Deploy. Open the site; the dashboard should load data from the Supabase-backed API.

## Order of operations

Deploy the **server first** to get its URL, set `VITE_API_URL` here, then deploy the client.
Finally set the server's `CORS_ORIGIN` to this client's URL and redeploy the server.
