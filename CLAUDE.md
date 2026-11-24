# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **Yarn 4** (Berry, configured via `.yarnrc.yml` and `packageManager` field). Node 20+ required.

```bash
yarn install --immutable   # install (matches Vercel build)
yarn dev                   # next dev (http://localhost:3000)
yarn build                 # next build
yarn start                 # next start (after build)
yarn lint                  # next lint
```

There is no test suite configured.

## Architecture

Single-page portfolio (Next.js 15 App Router, React 19, TypeScript strict, Tailwind 3) for Carlos Mesquita. The site is one route under `app/[locale]/page.tsx` composed of stacked sections, served in **Portuguese (default) and English**.

### i18n — `next-intl` with locale-prefixed routes

- Locales live in `i18n/routing.ts` (`pt`, `en`; default `pt`; `localePrefix: "as-needed"`, so `/` serves PT and `/en` serves EN).
- Server config: `i18n/request.ts` (loaded by the next-intl plugin in `next.config.ts`); navigation helpers (locale-aware `Link`, `useRouter`, `usePathname`): `i18n/navigation.ts`.
- `middleware.ts` handles locale detection/redirects; matcher excludes `api`, `_next`, `_vercel`, and any path with a file extension.
- UI strings are in `messages/{pt,en}.json`. Read them via `getTranslations()` in Server Components and `useTranslations()` in Client Components. Both sides also need `getLocale()` / `useLocale()` to call the data helpers below.
- The root layout (`app/[locale]/layout.tsx`) calls `setRequestLocale(locale)` (required for static rendering with `generateStaticParams`) and wraps children in `<NextIntlClientProvider>` so client components inherit messages without re-passing them. **Pages must call `setRequestLocale(locale)` too.**
- `generateMetadata` produces locale-aware `<title>`, OG tags, and `alternates.languages` for `hreflang`.
- The build pre-renders `/` (PT) and `/en` as static HTML — keep that working: don't introduce dynamic APIs in the layout/page without a deliberate reason.
- Unknown paths hit `app/[locale]/[...rest]/page.tsx`, which calls `notFound()` and renders the localized `not-found.tsx`. Next renders that page on the client, so `ThemeBoot` applies the theme there.
- The middleware matcher skips `/{pt,en}/opengraph-image` and `twitter-image`, so social crawlers get them without a redirect. Update it if a locale is added.
- `LocaleToggle` (`components/locale-toggle.tsx`) is a locale-aware `Link` to the same pathname, so it works without JS.

### Content is data, not markup — but bilingual

`lib/portfolio-data.ts` is the single source of truth for profile, experience, projects, education, and skill groups. Free-text fields (titles, summaries, narratives, highlights, periods, locations, course names, skill group labels) are typed as `Localized<T> = { pt: T; en: T }`; identifiers, brand names, URLs, and the `stack` arrays stay as plain strings.

**Never import the raw `*Source` data.** Section components call the locale-aware helpers, which return objects with all strings already resolved:

- `getProfile(locale)`, `getExperience(locale)`, `getVolunteer(locale)`, `getProjects(locale)`, `getEducation(locale)`, `getSkillGroups(locale)`.
- Experience `highlights` are `{ id, text }` in display order; the first three are visible and the rest sit in a `<details>`, so all of them are in the HTML.
- Periods are stored as `years: { start, end }` (`end: null` means ongoing) and formatted by the helpers.

`lib/systems-map.ts` builds the hero map (`getSystemsMap(locale)`). Its nodes reference highlights by `id`; an unknown id throws and fails the static build. Edges declare which side of a node the connector is drawn from; connectors are pure CSS in the grid gaps (`.map-link`).

When adding new content, add **both `pt` and `en`** to every `Localized` field — TypeScript will enforce it.

### Server vs. client components

All sections are **async Server Components** that call `getLocale()` + `getTranslations()`.

Client components: `SiteHeader`, `SystemsMap` (receives already-localized data as props), `CopyEmail`, `ThemeToggle`, `LocaleToggle`, `ThemeBoot`.

### Zustand store

`store/use-portfolio-store.ts` owns:

- `activeSection` — driven by an `IntersectionObserver` in `components/site-header.tsx` (rootMargin `-45% 0px -45% 0px`); highlights the current nav link.
- `theme` (`"light" | "dark"`, default light) — toggled via `components/theme-toggle.tsx`, persisted to `localStorage` under `c3g-theme` (`THEME_STORAGE_KEY`). `applyTheme` sets both the `html` class and `color-scheme`.

The store does **not** hold the locale — that comes from `next-intl` (URL is the source of truth).

### Theming — class-based with FOUC-prevention boot script

Tailwind is configured with `darkMode: "class"`. There is a single token set in `app/globals.css` (`:root` for light, `html.dark` for dark): `--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent` (text, links, icons), `--fill` + `--on-fill` (solid orange `#f6821f`, always with dark text), `--soft`, `--raised`, `--line-strong`, the `--glow-*` aurora colors and the `--shadow-*` elevations. `tailwind.config.ts` exposes them as colors and also aliases the shadcn names (`background`, `primary`, `border`, ...) to the same tokens.

Text colors are checked for AA contrast, so don't lighten text with opacity.

`app/[locale]/layout.tsx` injects an inline `themeBootScript` in `<head>` that reads `localStorage` and sets `html.light`/`html.dark` **before** React hydrates, preventing a flash. `components/theme-boot.tsx` then syncs the Zustand store to that initial DOM state on mount.

The storage key (`THEME_STORAGE_KEY`) lives in `lib/theme-storage.ts` — a non-`"use client"` module — and is imported by the (server) layout, the (client) store, and the (client) theme-boot. It must stay there: importing a plain string constant from a `"use client"` module into a Server Component yields a client-reference proxy, not the literal value, which silently serialized as `undefined` inside the inline boot script and broke hydration. If you rename the key or change theme class names, update `lib/theme-storage.ts`, the layout boot script, and `theme-boot.tsx` together.

Custom classes live in `@layer components` of `globals.css`: `.wrap`, `.section`, `.eyebrow`, `.section-title`, `.card`/`.card-hover`, `.chip`, `.icon-tile`, `.icon-button`, `.text-link`, `.aurora`, `.dots`, `.map-*`, `.rail`, `.on-deep` (re-scopes the tokens for the dark contact panel). The only font is Schibsted Grotesk (`next/font`).

Motion is CSS only: `.enter` runs on load; `.reveal`, `.rail-fill` and the header edge use scroll-driven animations inside `@supports (animation-timeline: view())`, so unsupported browsers just show the content. Everything is off under `prefers-reduced-motion`. Full-page screenshots show sections below the fold as hidden, because `.reveal` depends on scroll: capture by viewport.

### shadcn/ui

`components.json` is configured (style `new-york`, base color `neutral`, icon library `lucide`). Currently only `button` is installed in `components/ui/`. Add new primitives via `npx shadcn@latest add <component>` rather than hand-writing them. The `cn()` helper lives at `lib/utils.ts`.

### Path alias

`@/*` resolves to the repo root (e.g., `@/components/...`, `@/lib/...`, `@/store/...`, `@/i18n/...`).

### Deployment

Vercel, configured via `vercel.json` (framework `nextjs`, `installCommand: yarn install --immutable`). Deploys flow through Vercel's Git integration (push to `main` → production, PR → preview); GitHub Actions (`.github/workflows/ci.yml`) only validates the build. The canonical host is `https://carlos3g.dev` (`SITE_URL` in `lib/site.ts`, used as `metadataBase`); `www` 308-redirects to it via the Vercel project's domain settings — keep both in agreement.
