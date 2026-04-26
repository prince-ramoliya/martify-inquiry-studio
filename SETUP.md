# MARTIFY — Self-Host Guide

This guide shows how to run the site locally, point it at **your own** Supabase/Postgres database, and publish it on your own domain.

---

## 1. Run locally

```bash
git clone <your-repo-url>
cd <repo>
bun install        # or: npm install
cp .env.example .env   # see "Environment variables" below
bun run dev        # http://localhost:8080
```

You need **Node 18+** and **bun** (or npm/pnpm).

---

## 2. Environment variables

Create a `.env` in the project root:

```env
VITE_SUPABASE_URL="https://YOUR-PROJECT.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<your-anon-key>"
VITE_SUPABASE_PROJECT_ID="YOUR-PROJECT"
```

> The "publishable" / anon key is **safe** to ship in the frontend — Row-Level Security (RLS) protects your data.

---

## 3. Use your own database (Supabase or self-hosted Postgres)

### Option A — Your own Supabase project (easiest)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run **every migration** found under `supabase/migrations/` in this repo, in chronological order.
3. Copy your project's URL + anon key into `.env`.
4. Storage → create a bucket named **`media`** (Public). The migrations also do this automatically if not present.
5. Auth → make sure **Email** provider is enabled. For the simplest one-time admin signup, **disable "Confirm email"** (Auth → Providers → Email) — you can re-enable it after the first admin is created.

### Option B — Fully self-hosted Postgres + Supabase OSS

Follow Supabase's [self-hosting guide](https://supabase.com/docs/guides/self-hosting). After your stack is up:

- Apply the same migrations in `supabase/migrations/` to your Postgres.
- Set `VITE_SUPABASE_URL` to your self-hosted Kong gateway URL.
- Set `VITE_SUPABASE_PUBLISHABLE_KEY` to your self-hosted anon JWT.

The application code does **not** need changes — only the env vars.

---

## 4. Create the first admin

1. Visit `https://yoursite.com/admin/setup`
2. Enter an email + password.
3. The page disables itself permanently after one successful admin is created.
4. Future admins can be added by an existing admin (insert a row in `user_roles` with role `'admin'`).

> You can also reach `/admin/login` by **triple-clicking the logo** anywhere on the site.

---

## 5. What the admin panel manages

- **Hero Banners** — full carousel images + copy + CTA
- **Categories** — with images, slug, ordering
- **Products** — full CRUD with images, price, MRP, features, specs, badges, featured flag
- **Site Settings** — logo, brand name, contact phone/email/WhatsApp number, address, promo banner

All changes appear on the public site **in real-time** (Supabase Realtime channel).

---

## 6. Build for production

```bash
bun run build       # outputs to /dist
```

Deploy `/dist` to any static host: Vercel, Netlify, Cloudflare Pages, S3, Nginx, etc.

---

## 7. Connect a custom domain

### On Lovable
- Project → Settings → Domains → Connect domain → follow DNS instructions.

### On Vercel / Netlify
- Add the domain in the dashboard → add the provided CNAME / A records to your DNS provider.

### On your own Nginx
```nginx
server {
  listen 443 ssl http2;
  server_name yourdomain.com;
  root /var/www/martify/dist;
  index index.html;
  location / { try_files $uri /index.html; }
  ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
}
```

Use Let's Encrypt (`certbot`) for the SSL cert.

---

## 8. Backup / migrate data

Export from Supabase: **Cloud → Database → Backups** or `pg_dump`:
```bash
pg_dump "postgres://postgres:[PASSWORD]@db.YOUR-REF.supabase.co:5432/postgres" > backup.sql
```

Restore into your own Postgres:
```bash
psql "postgres://user:pass@your-host/db" < backup.sql
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `/admin/setup` says "An admin already exists" but you have no access | Manually delete from `user_roles` table, then revisit `/admin/setup`. |
| Images don't display | The `media` storage bucket must be **public**. |
| "Signed-up user but can't log in" | Email confirmation is on — disable it or check inbox for the confirmation link. |
| Realtime not updating | Confirm the tables are added to the `supabase_realtime` publication (the migrations do this). |

---

Built with React + Vite + Tailwind + Supabase. MIT-style license — free to fork.
