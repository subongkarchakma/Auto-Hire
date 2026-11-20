<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Auto-Hire

Car-rental marketplace UI in progress. `app/(marketing)/` holds the public site: a landing page whose sections are still being built, plus placeholder routes for `/vehicles`, `/how-it-works`, `/for-owners`, `/sign-in`, `/sign-up`. Auth wiring exists but has no UI. All app code lives at the repo root: `app/`, `components/`, `hooks/`, `lib/` — there is no `src/`.

## Next.js 16 specifics

- Docs ship with the installed package: read `node_modules/next/dist/docs/01-app/...` before using a Next API; do not trust pre-16 memory (e.g. `middleware.ts` is deprecated and renamed to `proxy.ts`; caching/`cacheComponents` semantics differ).

## Commands

```bash
npm run dev        # next dev (Turbopack)
npm run build
npm run lint       # eslint flat config, no args
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write on **/*.{ts,tsx}
```

- There is no test runner, no CI, and no codegen/migrations. Don't invent `npm test`; verify with `npm run typecheck`, `npm run lint`, and manual dev-server checks.
- Prettier enforces: no semicolons, double quotes, LF, width 80, Tailwind class sorting (`cn`, `cva`). Run `npm run format` after editing `.ts`/`.tsx`.
- Formatting in the existing files is not yet Prettier-normalized (some files have semicolons); config wins over local style.

## Conventions

- `@/*` maps to the repo root (`./*`), per `tsconfig.json` paths.
- `cn` is re-exported from the `cn` npm package in `lib/utils.ts`. Import it from `@/lib/utils`; do not add `clsx`/`tailwind-merge`.
- Tailwind v4: no `tailwind.config.*`; design tokens are CSS variables (`:root` / `.dark`, oklch) in `app/globals.css`, which also imports `shadcn/tailwind.css`. Edit tokens there.
- UI components: shadcn `base-nova` style built on **Base UI (`@base-ui/react`)**, not Radix. Add new ones with `npx shadcn@latest add <name>`; copy-pasted Radix-based shadcn snippets will not compile.
- Navigation CTAs use `components/shared/button-link.tsx` (Next `Link` + `buttonVariants`). Do not use `<Button render={<Link />} />`: Base UI renders an `<a role="button">` and logs a dev warning.
- Dark mode is class-based via `next-themes` in `components/theme-provider.tsx`; pressing `d` outside inputs toggles it.
- Marketing routes live in `app/(marketing)/` with a shared header/footer layout. Landing anchors are `/#how-it-works`, `/#why-auto-hire`, `/#contact`; every target needs `scroll-mt-24`, and `<html data-scroll-behavior="smooth">` must stay or Next 16 warns about smooth scrolling.

## Auth & database

- Server config: `lib/auth.ts` (better-auth: email+password, Google, MongoDB adapter). Client: `lib/auth-client.ts`. Handler: `app/api/auth/[...all]/route.ts` serves `/api/auth/*`.
- MongoDB URI is hardcoded in `lib/auth.ts` (`mongodb://localhost:27017`, db `Auto-Hire`) and the client is created at module load — a local `mongod` must be running or any route importing `auth` breaks.
- `.env` is gitignored. Required keys: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. The Google keys are currently absent, so Google sign-in fails at runtime; only email/password works.
- Known bug in `lib/auth-client.ts`: `signIn`/`signUp`/`useSession` come from a second `createAuthClient()` call, so the configured `baseURL` is ignored. Use `authClient` for those calls (or fix the exports).

## Meta

- `CLAUDE.md` only contains `@AGENTS.md`; keep instructions here.
- Leave the `nextjs-agent-rules` block above untouched; `next dev` rewrites it.
