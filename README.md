# Bistro Mali Raj — Website

Production-ready marketing website for **Bistro Mali Raj**, a family restaurant in
Vukovar, Croatia. Built with Next.js 15 (App Router), React 19, TypeScript,
Tailwind CSS and Framer Motion.

> **⚠️ Security note (read before deploying):** Since December 2025, Next.js's
> App Router / React Server Components have had a fast-moving series of
> disclosed vulnerabilities (starting with CVE-2025-66478 / CVE-2025-55182, a
> critical unauthenticated RCE, followed by several DoS/source-exposure
> follow-ups into early 2026). This project's `package.json` is pinned to
> `next@^15.5.13` / `react@^19.2.4`, the most recent patched line confirmed at
> the time this was written — but given how frequently new patches have shipped,
> **run `npm audit` and check https://nextjs.org/blog for anything newer before
> every deploy**, not just once. There's no config workaround for these — only
> upgrading fixes them.

---

## 1. Getting started

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase values — see section 9
npm run dev
```

Open http://localhost:3000. The public site works even without Supabase configured (it falls back to the bundled seed data), but the `/admin` panel requires it.

Other scripts:

```bash
npm run build       # production build
npm run start        # run the production build locally
npm run lint         # ESLint
npm run typecheck    # TypeScript, no emit
```

> **Note on this delivery:** this project was assembled in a sandboxed
> environment without access to the npm registry, so `npm install` has not
> been run here and the build has not been executed end-to-end. Every file
> was hand-reviewed and the whole `src/` tree was independently type-checked
> with a standalone `tsc` pass to catch logic errors ahead of time — but
> please run `npm install && npm run build` yourself as a final check before
> deploying.

---

## 2. Editing content

Most restaurant content lives in `src/lib/data/` as plain TypeScript objects —
edit these files and the whole site updates:

| File | Controls |
|---|---|
| `restaurant.ts` | Name, address, phone, hours, social links, homepage stats, nav labels |
| `testimonials.ts` | Google/Facebook/TripAdvisor style reviews shown on the homepage |
| `gallery.ts` | Gallery images, categories, alt text |
| `misc.ts` | Catering packages and FAQ content |

**`menu.ts` and `weekly.ts` are different** — they're now only the *fallback*
seed data, used if Supabase isn't configured yet (see section 9) or if the
database call fails for some reason. Once Supabase is set up, the live menu
and weekly specials are edited through **`/admin`** (see sections 9–12)
instead of by editing code, since those change far more often than the rest
of the site and shouldn't require a redeploy.

Prices are plain numbers (EUR) and are formatted automatically via
`formatPrice()` in `src/lib/utils.ts`.

---

## 3. Images

Every image currently points to **Unsplash placeholder photography** (via
`images.unsplash.com`, already whitelisted in `next.config.js`) so the site
is fully browsable today. Before launch, replace these with real photos of
the restaurant, food, and staff:

- Put real photos in `public/images/...`
- Swap the `image` field in `menu.ts` / `gallery.ts`, and the hardcoded
  `src` props in `Hero.tsx`, `PageHero` calls, and `AboutPreview.tsx`
- If you host images anywhere other than `/public` or Unsplash, add that
  domain to `images.remotePatterns` in `next.config.js`

`favicon.ico`, `apple-touch-icon.png` and `og-image.jpg` in `/public` are
placeholder brand marks generated for this delivery — swap them for the
real logo before launch.

---

## 4. Contact & catering forms

`src/components/shared/ContactForm.tsx` is fully validated and interactive
client-side, but the actual submission is currently **simulated** (no
backend is wired up). To make it send real messages, either:

1. Add a Next.js API route (e.g. `src/app/api/contact/route.ts`) that emails
   the submission via a provider like Resend or SendGrid, and call it with
   `fetch("/api/contact", { method: "POST", body: ... })` inside
   `handleSubmit`, or
2. Point the form at a hosted form backend (e.g. Formspree, Basin) and post
   directly to their endpoint.

The relevant spot is marked with a `NOTE for integration` comment in the file.

---

## 5. Map

`src/components/shared/Map.tsx` uses a plain Google Maps `iframe` embed — no
API key required. Update the address in `restaurant.ts` and the embedded pin
moves automatically. If you'd prefer a styled/interactive JS map (e.g. for
custom markers), swap this component for `@react-google-maps/api` or
Mapbox GL and supply an API key via an environment variable.

---

## 6. SEO

- Per-page `<title>` / meta description via each `page.tsx`'s `metadata` export
- Open Graph + Twitter card metadata in `src/app/layout.tsx`
- `Restaurant` JSON-LD (address, hours, rating) in `src/components/shared/JsonLd.tsx`
- Auto-generated `sitemap.xml` and `robots.txt` (`src/app/sitemap.ts`, `src/app/robots.ts`)

Update `siteUrl` in `layout.tsx`, `sitemap.ts` and `robots.ts` once the real
production domain is known.

---

## 7. Deployment (Vercel)

1. Push this repo to GitHub/GitLab/Bitbucket
2. Import it in Vercel — framework preset "Next.js" is auto-detected
3. No environment variables are required for the current feature set
4. Set the production domain, then update `siteUrl` as above and redeploy

---

## 8. Project structure

```
src/
  app/                 Route segments (App Router) — one folder per page
    admin/              Staff-only panel (see sections 9-12) — protected by middleware.ts
  components/
    layout/            Navbar, Footer
    ui/                Generic building blocks (Button, Modal, SectionHeading, AnimatedCounter)
    home/               Homepage-only sections (Hero, Testimonials, CTASection...)
    menu/               Menu + weekly menu components
    catering/           Catering-specific components
    gallery/            Masonry gallery + lightbox
    about/              Timeline
    shared/             Cross-page components (Map, FAQ, ContactForm, floating buttons...)
    admin/              Admin-only components (menu form, weekly-day editor, delete button)
  actions/              Server Actions — the only way menu/weekly-menu data gets written
  lib/
    data/               Seed content + fallback data if Supabase isn't configured (see section 2)
    supabase/           Supabase client helpers (browser + server)
    utils.ts            cn(), formatPrice(), isOpenNow()
  middleware.ts          Refreshes the login session; redirects signed-out visitors away from /admin
  types/                Shared TypeScript interfaces
supabase/
  schema.sql            Run once in the Supabase SQL editor — see section 9
```

---

## 9. Admin panel — setting up Supabase

Menu items and the weekly menu are stored in [Supabase](https://supabase.com) (a free, hosted Postgres database with built-in authentication). One-time setup:

1. Create a free account at supabase.com and click **New project**. Pick any name/region/password (the DB password isn't used by the app — just save it somewhere).
2. Once the project finishes provisioning, open **SQL Editor** in the left sidebar → **New query**.
3. Open `supabase/schema.sql` from this project, paste its entire contents in, and click **Run**. This creates all the tables, security rules, and loads the current menu as starting data.
4. Open **Project Settings → API**. Copy the **Project URL** and the **anon public** key.
5. Paste them into `.env.local` (create it from `.env.example` if you haven't):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
6. Add the same two variables in your hosting provider's dashboard too (e.g. Vercel → Project → Settings → Environment Variables), so the live site can reach the database.

## 10. Creating staff logins

There's no public sign-up page on purpose — only people the owner explicitly creates can log in.

1. In the Supabase dashboard, go to **Authentication → Users → Add user**. Enter their email and a temporary password (tell them to change it later, or send a reset link from that same screen).
2. Go back to **SQL Editor** and run one line to actually grant them access to `/admin` (replace the email):
   ```sql
   insert into public.admin_users (id, display_name)
   select id, 'Ana' from auth.users where email = 'ana@malirajvukovar.hr';
   ```
   Without this second step, that person can log in but will immediately be bounced back out — having a login and being an admin are deliberately separate, so a staff departure just means deleting their `admin_users` row (**Table Editor → admin_users**) without touching their login.
3. They can now sign in at `yoursite.com/admin/login`.

To remove someone's access later: delete their row from **Table Editor → admin_users** (keeps their login but locks them out of `/admin`), or delete the user entirely from **Authentication → Users** to revoke both.

## 11. Adding 2FA later

You asked to start with password-only and add authenticator-app 2FA later — Supabase supports this natively (TOTP, works with Google Authenticator/Authy/1Password etc.) without changing the database. When you're ready:
1. In the Supabase dashboard: **Authentication → Providers → Enable MFA (TOTP)**.
2. Add an enrollment screen in the app using `supabase.auth.mfa.enroll()` / `.challenge()` / `.verify()` (client-side, via `src/lib/supabase/client.ts` which is already wired up and ready for this).
3. Update `src/middleware.ts` to also check `supabase.auth.mfa.getAuthenticatorAssuranceLevel()` and require the higher level before allowing `/admin` access.

Happy to build this out when you're ready — it's a contained addition, not a rearchitecture.

## 12. Using the admin panel

Once logged in at `/admin`:

- **Jelovnik** (`/admin/menu`) — every menu item grouped by category. Add new dishes, edit existing ones (price, description, photo URL, "preporuka/ljuto/vegetarijansko" tags), or delete. Changes appear on the public site within about a minute (or instantly on next page load).
- **Tjedni meni** (`/admin/weekly-menu`) — edit each day's soup and its main dishes inline, add a new dish to a day, or remove one.

Everything else on the site (About, Catering, Gallery, Contact info, hours) is still edited the same way as before — directly in the files listed in section 2 — since those change far less often than prices and daily specials.

**One gotcha on photos:** the "URL slike" field expects a direct image URL from `images.unsplash.com` — Next.js is locked to that one image host for performance/security reasons (see `next.config.js` → `images.remotePatterns`). Pasting a URL from a different site will error on the public page until that host is added there too.

## 13. Accessibility & performance notes

- Keyboard focus is visible everywhere (`:focus-visible` styled in
  `globals.css`) and both the gallery lightbox and the order/contact modals
  trap focus and close on `Escape`.
- `prefers-reduced-motion` disables all animation/scroll-smoothing.
- All images go through `next/image` for automatic AVIF/WebP + lazy loading.
- Fonts (Poppins/Inter) load via `next/font`, self-hosted with no
  render-blocking external requests.
