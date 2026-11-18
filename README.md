# MentorOS landing page

The public landing page for MentorOS: a static, single-page site hosted on GitHub Pages.
The product itself is developed in a separate (private) repository.

- **Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Motion (animations) and Lucide icons. No backend.
- **Content rules:** MentorOS is pre-launch (POC stage). Copy presents features as planned or in development.
  No testimonials, user counts, outcome claims or figures marked *(claim)* in `docs/`. All previews use
  synthetic sample data and are labelled as simulated. Never add real student data or handwriting.
  Figures marked *(claim)* in the product docs are unverified: don't publish them.

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload, served at `/` |
| `npm run build` | Type-check and build to `dist/` (base path from `BASE_PATH`, default `/`) |
| `npm run build:pages` | Build for the GitHub Pages project URL (`/mentoros-website/`) |
| `npm run preview` / `npm run preview:pages` | Serve the built `dist/` locally (at `/` or `/mentoros-website/`) |

## Configure

Everything that changes between deployments lives in [`src/config/site.ts`](src/config/site.ts) and can be
overridden at build time with environment variables (copy [`.env.example`](.env.example) to `.env.local` for
local overrides; never commit real addresses you want to keep private).

| Variable | Purpose | Default |
|---|---|---|
| `VITE_CONTACT_EMAIL` | Address for `mailto:` CTAs and the footer | `mentoros.support@gmail.com` |
| `VITE_PILOT_FORM_URL` | Form for "Become a Pilot Partner" (Google Form, Formspree, Tally…) | empty, falls back to email |
| `VITE_EARLY_ACCESS_FORM_URL` | Form for "Join the Early Access List" | empty, falls back to email |
| `VITE_SITE_URL` | Absolute public URL, used for canonical and Open Graph tags | `https://mentoros-62.github.io/<base>` |
| `BASE_PATH` | Path the site is served from | `/` |

CTAs open the configured form in a new tab, or a pre-filled email draft. The site never shows a fake
"thanks, you're signed up" message. Social links are the `social` array in `site.ts`.

### Base path: repo subpath vs custom domain

- **Project site** (`https://mentoros-62.github.io/mentoros-website/`): `BASE_PATH=/mentoros-website/`. The workflow sets this
  automatically from the repository name.
- **Custom domain** (e.g. `mentoros.ai`, once the team owns it): set the repository variable `SITE_CNAME`. The
  workflow then builds with `BASE_PATH=/` and writes `dist/CNAME`. Also add the domain under
  Settings → Pages and configure DNS. There is deliberately no committed `CNAME` file.

All asset references are relative to the base, so the same code works in both setups.

## Deploy (GitHub Pages)

The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the site
and deploys it on every push to `main` (or manually via *Run workflow*).

One-time setup:

1. Settings → Pages → Build and deployment → **Source: GitHub Actions**.
2. Optional: Settings → Secrets and variables → Actions → **Variables**:
   `SITE_CONTACT_EMAIL`, `SITE_PILOT_FORM_URL`, `SITE_EARLY_ACCESS_FORM_URL`, `SITE_URL`, `SITE_BASE_PATH`,
   `SITE_CNAME`. Repository variables keep the contact address out of the code.

## Structure

```
index.html                 SEO, Open Graph and Twitter meta (__SITE_URL__ is filled in at build time)
public/                    favicon.svg, PNG icons, og-image.png (1200×630 social preview)
scripts/brand-images/      Regenerates the PNG icons and og-image.png in a browser (see below)
src/config/site.ts         Contact, form URLs, social links: the only file to edit for a new deployment
src/components/            Shared UI: Nav, Logo, buttons, Reveal, KnowledgeUniverse (hero visual)
src/sections/              One file per page section, in page order (see App.tsx)
src/data/                  Static sample data for the simulated previews
```

## Motion and accessibility

- Animations use Motion with `MotionConfig reducedMotion="user"`. Scroll-linked parallax, auto-cycling,
  the scripted mentor preview and CSS loops are disabled or shown in their final state when the OS asks for
  reduced motion.
- Every interactive visual has a keyboard path (buttons with `aria-pressed`) and a text description.
- Anchors in the nav and footer jump to section `id`s; `scroll-margin-top` keeps them clear of the sticky header.

## Regenerating brand images

`og-image.png`, `apple-touch-icon.png` and `favicon-32.png` are rendered from canvas code so they use the real
brand fonts:

```bash
node scripts/brand-images/server.mjs   # then open http://localhost:4321/ and wait for "Saved"
```

The files are written to `public/`. Stop the server with Ctrl+C.
