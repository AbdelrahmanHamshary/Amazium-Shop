# Running this week locally (register / login / orders)

## How data flows

1. **Browser** → HTTPS requests to the **Node API** (`/api/auth/register`, `/api/orders`, …).
2. **API on the VPS** → **MySQL** (`db.scorpion.codes` / `amazium_shop`).

Your laptop does **not** open a MySQL connection from the React app. If registration “does nothing” or fails, the UI is usually calling the **wrong host** (see below).

## Fix: set `VITE_API_BASE_URL`

1. Copy `.env.example` to **`.env`** in this folder (same level as `package.json`).
2. Set:

   ```env
   VITE_PUBLISHED_WEEK=10
   VITE_API_BASE_URL=https://amazium.shop
   ```

3. Stop and restart **`npm run dev`** (Vite reads env only at startup).

If `.env` is missing (some unzip tools hide dotfiles), the app uses an empty base URL and tries `http://localhost:5173/api/...`. That path has **no API** unless you use the dev proxy below.

## Dev server proxy (fallback)

`vite.config.ts` proxies **`/api`** → **`https://amazium.shop`** by default when you use a **relative** API path (`VITE_API_BASE_URL` empty). Override with:

```env
VITE_API_PROXY_TARGET=https://amazium.shop
```

## CORS

The live API allows cross-origin requests, so `localhost` → `https://amazium.shop` is OK.

## Running the API on your machine instead

Advanced: run `apps/api` locally with the same `DB_*` vars as production, then:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Your MySQL user must allow connections from your IP if the DB is remote.
