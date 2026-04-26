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
- `LocaleToggle` (`components/locale-toggle.tsx`) uses next-intl's `useRouter().replace(pathname, { locale })` to swap idioms while preserving the path.

### Content is data, not markup — but bilingual

`lib/portfolio-data.ts` is the single source of truth for profile, experience, projects, education, and skill groups. Free-text fields (titles, summaries, narratives, highlights, periods, locations, course names, skill group labels) are typed as `Localized<T> = { pt: T; en: T }`; identifiers, brand names, URLs, and the `stack` arrays stay as plain strings.

**Never import the raw `*Source` data.** Section components call the locale-aware helpers, which return objects with all strings already resolved:

- `getProfile(locale)`, `getExperience(locale)`, `getVolunteer(locale)`, `getProjects(locale)`, `getEducation(locale)`, `getSkillGroups(locale)`.
- `experienceCount` and `projectsCount` are exported as plain numbers for places that just need a count without the data.

When adding new content, add **both `pt` and `en`** to every `Localized` field — TypeScript will enforce it.

### Server vs. client components

Sections that don't need browser state are **async Server Components** that call `getLocale()` + `getTranslations()`: `Hero`, `About`, `Skills`, `Education`, `Contact`, `Footer`.

Sections with Zustand-driven dialogs are Client Components and use `useLocale()` + `useTranslations()`: `Experience`, `Projects`. They wrap data lookups in `useMemo(() => getX(locale), [locale])` so the list re-localizes on language switch without a remount.

`Nav`, `ThemeToggle`, `LocaleToggle`, `ThemeBoot`, and `components/ui/dialog.tsx` are also client components.

### Zustand store

`store/use-portfolio-store.ts` owns:

- `activeSection` — driven by an `IntersectionObserver` in `components/nav.tsx` (rootMargin `-45% 0px -45% 0px`); used to highlight the current nav link.
- `selectedProjectId` / `selectedExperienceId` — modal-style detail views.
- `theme` (`"dark" | "light"`) — toggled via `components/theme-toggle.tsx`, persisted to `localStorage` under key `c3g-theme` (exported as `THEME_STORAGE_KEY`).

The store does **not** hold the locale — that comes from `next-intl` (URL is the source of truth).

### Theming — class-based with FOUC-prevention boot script

Tailwind is configured with `darkMode: "class"`. Two parallel token systems live in `app/globals.css` under `:root, html.dark` and `html.light`:

1. **Brand tokens** (`--c-magnus`, `--c-obsidian`, `--c-ivory`, etc., as raw `R G B` triplets) — exposed via `tailwind.config.ts` as named colors (`magnus`, `obsidian`, `ivory`, `silver`, `frost`, `crimson`, `steel`, `charcoal`).
2. **shadcn-compatible HSL tokens** (`--background`, `--foreground`, `--primary`, etc.) — used by the shadcn UI primitives in `components/ui/`.

`app/[locale]/layout.tsx` injects an inline `themeBootScript` in `<head>` that reads `localStorage` and sets `html.light`/`html.dark` **before** React hydrates, preventing a flash. `components/theme-boot.tsx` then syncs the Zustand store to that initial DOM state on mount.

The storage key (`THEME_STORAGE_KEY`) lives in `lib/theme-storage.ts` — a non-`"use client"` module — and is imported by the (server) layout, the (client) store, and the (client) theme-boot. It must stay there: importing a plain string constant from a `"use client"` module into a Server Component yields a client-reference proxy, not the literal value, which silently serialized as `undefined` inside the inline boot script and broke hydration. If you rename the key or change theme class names, update `lib/theme-storage.ts`, the layout boot script, and `theme-boot.tsx` together.

Custom utility classes worth knowing live in the `@layer components` block of `globals.css`: `.gold-text`, `.eyebrow`, `.section-label`, `.imperial-card` (the standard card with hover-revealed gold gradient border), `.hero-grid`, `.noise-overlay`.

### shadcn/ui

`components.json` is configured (style `new-york`, base color `neutral`, icon library `lucide`). Currently only `button`, `badge`, and `dialog` are installed in `components/ui/`. Add new primitives via `npx shadcn@latest add <component>` rather than hand-writing them. The `cn()` helper lives at `lib/utils.ts`. Note: `dialog.tsx` was modified to translate the close button's screen-reader label via `useTranslations("dialog")` — re-applying that change is needed if the primitive is regenerated.

### Path alias

`@/*` resolves to the repo root (e.g., `@/components/...`, `@/lib/...`, `@/store/...`, `@/i18n/...`).

### Deployment

Vercel, configured via `vercel.json` (framework `nextjs`, `installCommand: yarn install --immutable`). `metadataBase` in `app/[locale]/layout.tsx` is `https://carlos3g.dev`.
