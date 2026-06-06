# Claims Portal — CLAUDE.md

> **Wave 19 scope adjustment (2026-05-04):** EY role fully removed from system; **Compliance User** is the sole admin reviewer. Vendor stack locked — see "Vendor stack" section below. Full context: `../requirements/scope-adjustments-2026-05-04/`.
>
> **Scope reshape (2026-05-21):** M9/DocuSign/quotation/pricing/signed-storage bundle moved to the Fund Administrator (external, not built in-house). Claimant onboarding is now invite-only (HubSpot screening → R-131 server-side account creation). Two new R-IDs: R-131 (HubSpot→CRS account-creation API) and R-132 (CRS→Fund Administrator API push at Reconciled). Full context: `../requirements/scope-adjustments-2026-05-21/`.

## What this is

Venezuela Sovereign Debt & Claims Reconciliation Portal. Claimants submit Electronic Proof of Debt (EPOD); the Compliance User validates; at Reconciled status, qualifying claimants receive an email link to the Fund Administrator where contracts are signed and investor relationships managed. The operating entity's responsibility ends at Reconciled status.

**Claims administration and technology platform handling high-value claims.** Audit trail, immutability, and chain-of-custody are not optional.

## Roles (post-Wave-19)

- **Claimant** — submits EPOD, manages own claims, certificates
- **Compliance User** — sole admin reviewer; validates submitted EPODs, annotates, approves/rejects, issues certificates. Replaces the prior EY validator role (removed 2026-05-04).
- **PDVSA / MoF** — sovereign counterparty; co-signs / acknowledges legally-binding digital certificates.

## Stack

- **Framework:** Next.js 16.2.6 (App Router, `src/` directory; Turbopack default)
- **Language:** TypeScript 5 (strict, no `any`)
- **UI:** React 18.3.1 + Tailwind 4.3.0 + CSS variable tokens + 36 components in `src/components/ui/` (Radix primitives used selectively: Dialog + Popover only). T4 shipped 2026-05-17 EOD on the second attempt — first attempt was reverted same day due to visual drift; retry succeeded with `@theme inline` block + default-border directive + `tw-animate-css` + deleted unlayered `* { padding:0; margin:0 }` reset. 39 visual baselines committed under `e2e/__screenshots__/` to gate future CSS regressions.
- **Animations:** CSS keyframes (page transitions in `src/components/ui/PageTransition.tsx` + staggered entrances in `globals.css`). Framer Motion is NOT installed.
- **Charts:** Recharts
- **Search:** cmdk (Cmd+K command palette)
- **Backend:** Supabase (Auth + Postgres + Storage), see `../requirements/README.md` (Domain reference appendix)
- **Error monitoring:** Sentry (SDK integrated, wired to error boundaries + API routes)
- **Rate limiting:** Upstash Redis + @upstash/ratelimit (distributed, serverless-safe)

## Admin RBAC

Admin access is **DB-only** via `claimants.role='admin'`. The `ADMIN_EMAILS` env-var fallback was removed 2026-05-08 (PR #31, Wave 22 Batch 2). `isAdmin()` in `src/lib/supabase/auth-guard.ts` returns `true` only when the DB row carries `role='admin'`; no env-var path exists. To grant admin: set `claimants.role = 'admin'` in the DB (see migration `20260509000001_backfill_admin_role.sql`).

## Key commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (runs `dev-check` preflight first) |
| `npm run dev:clean` | Wipe `.next` + `node_modules/.cache` then dev. Use after big refactors. |
| `npm run build` | Production build (runs `dev-check` first) |
| `npm test` | Vitest suite (2,188 tests across 185 files, ~45s) |
| `npm run lint` | ESLint (includes Edge-Runtime import ban on `src/proxy.ts` — renamed from `middleware.ts` in Next 16) |
| `npm run check` | `dev-check.mjs` — 5 preflight checks |
| `npm run check:integration` | 21-check HTTP matrix (needs dev running) |
| `npm run sanitize -- <file>` | Strip AI/framework mentions from a file (client-facing) |

## Quality gates (every session, non-negotiable)

1. `npm test` passes before AND after changes
2. `npm run check:integration` passes on any middleware / auth / route change
3. TypeScript strict — no `any`, no `@ts-ignore`
4. No hardcoded colors — CSS variable tokens only
5. Every component works in light AND dark mode
6. Claim IDs, currency amounts: `font-mono` (JetBrains Mono)
7. Currency: right-aligned, comma thousands separator
8. No AI / Claude / framework mentions in user-facing text — run `npm run sanitize` on client-facing docs before sending
9. Rate limiting is active (Upstash Redis) — do not disable or bypass `src/lib/rate-limit.ts` on auth/claims/KYC routes
10. a11y: no `axe-core` `serious`/`critical` violations on protected E2E surface (login, dashboard, claim form, kyc-queue)
11. visual regression: no unintended layout drift on protected E2E surface (login, dashboard, claim form, kyc-queue) — baselines committed under `e2e/__screenshots__/`. To re-seed: `npx playwright test --update-snapshots --project=visual-regression` (operator one-shot).
12. R-123 ACL boundary: NO vendor SDK imports outside `src/lib/crm/`. Enforced by ESLint (`no-restricted-imports`). Application code consumes via `getCrmAdapter()` from `@/lib/crm` — never `new HubSpotAdapter()` directly. The ACL is a **library boundary** (`src/lib/crm/`); the **admin shell** (R-126, `src/components/layout/AdminShell.tsx` + `/admin/*` pages) is a *consumer* of the ACL, NOT the ACL itself. See `docs/adr/0001-crm-acl-boundary.md` for the disambiguation.

## Design tokens (always relevant)

- **Navy:** `#0A1628` / `#1B2A4A` / `#243656`
- **Gold:** `#C9A84C` / `#D4B96A` / `#8B7A3E`
- **Success:** `#34C759`  **Warning:** `#FF9500`  **Error:** `#FF3B30`
- Public routes: light mode default | Admin routes: light mode default (user toggle available)
- All numbers in JetBrains Mono, right-aligned when numeric

## Data model summary

- `ClaimStatus`: `draft | submitted | under_review | requires_info | approved | certificate_issued | ineligible | transferred` — `approved` is the "Reconciled" state per R-132 reshape (2026-05-21); triggers CRS→Fund Administrator API push
- **11 claim types** — see `../requirements/README.md` (Domain reference appendix)
- 8-module EPOD wizard — after M8 affidavit, submission is IMMUTABLE
- Auth: 58 API routes, 48 gated by `requireAuth(request)` (scoped via `user_id` FK, not email). 10 intentionally public — see `src/lib/supabase/auth-guard.ts` for the gate.

## Extended context (read BEFORE relevant work)

### Spec + history (under `../requirements/`, `../sprint-log/`, `../testing-log/`)

| Context | File |
|---------|------|
| Fintech domain / claim types / business rules / Supabase schema | `../requirements/README.md` (Domain reference appendix) |
| Current sprint state / waiting-on / blocked items | `../requirements/SESSION_COMPACT.md` |
| Product requirements (R-IDs source of truth) | `../requirements/REQUIREMENTS.md` |
| Requirements traceability matrix (R-XX → sprint → code → test → backlog) | `../requirements/TRACEABILITY.md` |
| Master backlog — gaps to production, 3 tiers (MVP / Pilot / Prod) | `../requirements/MASTER_BACKLOG.md` |
| Scope reshape (2026-05-21 — invite-only + Fund Administrator handoff) | `../requirements/scope-adjustments-2026-05-21/` |
| AWS Enterprise Checklist (item-by-item, dev/prod columns) | `../requirements/AWS_Enterprise_Checklist.xlsx` |
| Test artifacts (per-page test passes with date-prefixed folders) | `../testing-log/` |
| Per-sprint summaries (date-prefixed folders) | `../sprint-log/` |

### App docs (under `./docs/`)

| Context | Folder |
|---------|--------|
| **Doc map for this folder** | [`./docs/README.md`](./docs/README.md) |
| Architectural Decision Records | [`./docs/adr/`](./docs/adr/) |
| App architecture (data flow, talking points, vendor portability) | [`./docs/architecture/`](./docs/architecture/) |
| **Admin tooling reference** (Compliance User workflows, admin shell, KYC queue) | [`./docs/admin/`](./docs/admin/) |
| **Database reference** (schema, RLS, migrations) | [`./docs/database/`](./docs/database/) |
| GDPR/NYDFS/SOC 2 evidence | [`./docs/governance/`](./docs/governance/) |
| **Integrations** (HubSpot, Fund Administrator, SES, Supabase, Upstash) | [`./docs/integrations/`](./docs/integrations/) |
| Operational runbooks (AWS setup, workspace bootstrap, framework migration) | [`./docs/runbooks/`](./docs/runbooks/) |

### Infra (under `./infra/`)

| Context | Path |
|---------|------|
| AWS CDK (TypeScript) — Stage 1 personal-AWS validation; Stage 2 Client-owned prod | [`./infra/`](./infra/) |
| AWS Enterprise Setup runbook (5-day phased Day 0 → cutover) | [`./docs/runbooks/aws-enterprise-setup.md`](./docs/runbooks/aws-enterprise-setup.md) |

### Repo-wide

| Context | File |
|---------|------|
| Methodology + lifecycle + automation hooks (the bible) | `../docs/SHIPPING_SUITE.md` (§5.5 test infra, §5.6 automation hooks) |
| Per-script docs | header comment at top of each `scripts/*` file |

## Vendor stack (Wave 19+, current state 2026-05-21)

| Vendor | Purpose | License / Hosting |
|---|---|---|
| **HubSpot** | CRM (claimant + counterparty relationship management); also drives R-131 invite-only onboarding trigger | Vendor SaaS — sub-processor (DPA required); SOC 2 II + ISO 27001 + GDPR + HIPAA certified; finalized 2026-05-12 |
| **the Fund Administrator** | Investor onboarding at Reconciled state (LP/SPA contracts, e-sign) — receives R-132 API data push from CRS | External counterparty, not an in-house-built integration; becomes sub-processor per R-132; DPA pending counter-sign; Fund Administrator API spec awaiting the Controller PM |
| **vendor TBD (transcription) — R-108 DEFERRED 2026-05-15** | Transcription (call recordings, voice-note evidence) | **R-108 DEFERRED 2026-05-15 EVENING — not pilot-blocking.** Vendor pick post-pilot once operator call workflow is observed. HubSpot Conversation Intelligence (Enterprise tier) is a credible Option B. |
| **WhatsApp Business API** | Per-language claimant outreach + status notifications | Vendor TBD — Twilio vs Meta Direct (decision pending); **R-121 DEFERRED 2026-05-13** (not pilot-blocking) |

Two same-day reversals on 2026-05-04 (Twenty CRM AM → HubSpot PM; Whisper AM → Otter PM) signalled vendor indecision; CRM and Transcription were neutralised to "vendor TBD" 2026-05-07. Once selected, sub-processor / DPA implications must be reflected in `../docs/governance/sub-processors.md`. The chosen WhatsApp Business API vendor IS a sub-processor. See `../docs/_archive/scope-adjustments-2026-05-04/CROSSCHECK_V2_2026-05-07.md`. **HubSpot finalized 2026-05-12** — supersedes the conditional CapsuleCRM recommendation; no counsel review needed since HubSpot's compliance posture (SOC 2 II + ISO 27001) is already certified.

> **2026-05-21 retirement note:** DocuSign (R-115) was selected 2026-05-13 as the e-sign vendor for Assignment Agreements. R-115 was never implemented (NOT STARTED). Per 2026-05-21 scope reshape, e-sign and contract management moves entirely to the Fund Administrator (external, not built in-house). R-115 is OUT-OF-SCOPE. ADR-0002 is superseded — see status banner in that file. Sub-processor obligations for DocuSign are withdrawn; the Fund Administrator DPA chain replaces them. See `../requirements/scope-adjustments-2026-05-21/`.

## Session protocol

1. Read `../requirements/SESSION_COMPACT.md` — current state, recent work, what's blocked
2. `npm test` — verify baseline
3. Do the work
4. `npm test` — verify nothing broke
5. Update `SESSION_COMPACT.md`. If R-XX status changed, update `TRACEABILITY.md` in same commit. If new test pass, create `../testing-log/<YYYY-MM-DD>_<page-slug>/` with 4 standard files (README, scenarios, plan, log) + `evidence/`.
6. `git commit` + `git push` — hooks enforce quality gates automatically
