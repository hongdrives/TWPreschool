# Contributing — Claims Portal

> **Status: ACTIVE**
> Last updated: 2026-05-29
> Owner: Chu Ling (operating entity)
> Audience: solo developer; contractor reviewers; future team members

This is a claims administration platform (NYDFS 23 NYCRR 500 / GDPR). Every contribution
must clear the quality gates in §5. Audit trail, immutability, and chain-of-custody are
not optional; they are baked into the CI gates below.

---

## 0. First 10 minutes (clean clone → running app)

```bash
# 1. Clone and enter the project
git clone <repo-url>
cd claims-portal

# 2. Install dependencies (Node ≥ 20.19.0 required — enforced in package.json)
npm install

# 3. Copy env template and fill in Supabase credentials
cp .env.local.example .env.local
# Edit .env.local — minimum required keys:
#   NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
#   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=<anon-key>
#   SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# 4. Start the dev server (preflight checks run automatically)
npm run dev
# → preflight runs dev-check.mjs (proxy file, env keys, stale .next artifacts)
# → app opens at http://localhost:3000

# 5. Verify the baseline test suite passes
npm test
# → Vitest: 2,080+ tests, ~45 s on first run
```

**Troubleshooting:**

| Symptom | Fix |
|---|---|
| Blank white page after build | `npm run dev:clean` — clears stale `.next` artifacts |
| `proxy.ts not found` preflight error | `src/proxy.ts` must exist; check it was not accidentally deleted |
| Rate limiting not working | Set `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` in `.env.local`; app fails-open (no 429s) when these are blank |
| Admin pages show empty data | Set `claimants.role = 'admin'` in the DB for your dev user (see `CLAUDE.md` Admin RBAC section) |
| Want to attach a debugger | Use `npm run dev:debug` — starts Next.js with Node `--inspect` on port 9229 |

For the full env-var reference, see `.env.local.example`. Each variable is annotated with its purpose, default value, and security notes.

---

## 1. Branch model

`main` is the deployable trunk. It is always in a shippable state.

- **Direct-to-main** is the standard workflow for solo development.
- No long-lived feature branches. Ship small, ship often.
- If a contractor or teammate is involved, create a short-lived branch and open a PR
  (see §6).
- Hotfixes land directly on `main` with a `fix:` or `fix(scope):` commit prefix.

Emergency rollback does not use branches — it uses `git revert` (see
`docs/runbooks/pilot-go-live-checklist.md §5.4`).

---

## 2. Pre-commit gates

Husky (`husky` ^9 + `lint-staged` ^16) is declared in `devDependencies`.
The hooks directory is `.husky/` at the repo root (create via `npx husky init` if absent).

### `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

# 1. Lint + auto-fix staged TS/TSX files only (fast — runs on changed files)
npx lint-staged

# 2. Project-wide type check — fails the commit if any type error exists
npx tsc --noEmit
```

`lint-staged` config lives in `package.json`:

```json
"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix"]
}
```

The ESLint config (`eslint.config.mjs`) enforces:
- TypeScript strict (`no-any`, `no-explicit-any`)
- `no-restricted-imports` ban on vendor SDK imports outside `src/lib/crm/` (R-123 ACL
  boundary, ADR-0001)
- Edge-Runtime import ban on `src/proxy.ts` (the renamed middleware file)

---

## 3. Pre-push gates

### `.husky/pre-push`

```bash
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

# Run the full Vitest suite before pushing to main.
# Exit code 1 aborts the push.
npx vitest run
```

The full suite currently covers 2,080+ tests across 178 files (~45 s). It runs only when
`claims-portal/` files are changed — if you are working in an adjacent repo, the push
hook will still complete but the suite is the canonical gate for this directory.

To run the suite manually at any time:

```bash
npm test
```

To run in watch mode during development:

```bash
npm run test:watch
```

---

## 4. Review process — solo development + automated review substitute

This is a solo-developer project. The human-review equivalent is the gstack toolchain:

| Review type | Tool | When |
|---|---|---|
| Per-commit code review | `/review` (gstack) | Before any non-trivial push |
| Architecture + scope decisions | `/autoplan` (gstack) | Before multi-file changes or new R-IDs |
| Adversarial security review | `/cso` (gstack) | Before pilot go-live or any auth/RLS change |
| Pre-milestone 5-track audit | Run Doc / Plan-gap / Unit / E2E / CSO agents in parallel | Before MVP / cutover / audit observation |

Decision methodology follows the **decision-bundle** skill
(`~/.claude/skills/decision-bundle/`) for any vendor or architecture choice.

Multi-lens parallel agent audits (8 agents × 4 lenses) have caught production-blocking
issues that single-pass reviews missed — see project memory
`feedback_audit_lens_methodology` for the methodology.

---

## 5. Quality gates (non-negotiable, every session)

These gates are cited verbatim from `CLAUDE.md` and are the acceptance criteria for
every commit:

1. `npm test` passes before AND after changes
2. `npm run check:integration` passes on any middleware / auth / route change
3. TypeScript strict — no `any`, no `@ts-ignore`
4. No hardcoded colors — CSS variable tokens only
5. Every component works in light AND dark mode
6. Claim IDs, currency amounts: `font-mono` (JetBrains Mono)
7. Currency: right-aligned, comma thousands separator
8. No AI / Claude / framework mentions in user-facing text — run `npm run sanitize`
   on client-facing docs before sending
9. Rate limiting is active (Upstash Redis) — do not disable or bypass
   `src/lib/rate-limit.ts` on auth/claims/KYC routes
10. a11y: no `axe-core` `serious`/`critical` violations on protected E2E surface
    (login, dashboard, claim form, kyc-queue)
11. Visual regression: no unintended layout drift on protected E2E surface — baselines
    committed under `e2e/__screenshots__/`. To re-seed:
    ```bash
    npx playwright test --update-snapshots --project=visual-regression
    ```
12. R-123 ACL boundary: NO vendor SDK imports outside `src/lib/crm/`. Enforced by ESLint
    (`no-restricted-imports`). Application code consumes via `getCrmAdapter()` from
    `@/lib/crm` — never `new HubSpotAdapter()` directly.

---

## 6. Pull requests vs direct push

| Scenario | Workflow |
|---|---|
| Solo work (default) | Direct push to `main`. Pre-commit + pre-push hooks are the gate. |
| Contractor or external reviewer involved | `gh pr create --base main`. PR description must include test evidence. Merge only after the reviewer approves and all checks pass. |
| Hotfix under time pressure | Direct push to `main` with `fix:` prefix. Log the deviation in `requirements/SESSION_COMPACT.md`. |

```bash
# Open a PR (contractor / review flow):
gh pr create --base main --title "feat(R-XXX): short description" \
  --body "## Summary
- What changed and why (R-ID cross-reference mandatory)

## Test evidence
- npm test: PASS
- Relevant Vitest test file: <path>
- Integration check: PASS / N/A"
```

---

## 7. Commit message style

Conventional commit format, based on the actual commit history:

```
<type>(<scope>): <short imperative description>
```

Common types used in this repo:

| Prefix | Meaning |
|---|---|
| `feat(scope):` | New capability or R-ID implementation |
| `fix(scope):` | Bug fix or regression correction |
| `fix+docs:` | Paired fix + documentation update |
| `fix+docs+infra:` | Fix spanning code, docs, and infra |
| `docs:` | Documentation only |
| `perf:` | Performance improvement |
| `test:` | Test additions with no production code change |
| `chore:` | Dependency bump, config change |

Scope examples from recent commits: `api`, `crm`, `dashboard`, `R-133`.

Rules:
- Description is imperative present tense ("add", "fix", "remove" — not "added" or "fixes")
- 72-character subject line limit
- Body is optional; use it for "why", not "what" (the diff is the "what")
- Reference R-IDs in body when the commit implements or closes a requirement:
  `Closes R-131. See requirements/REQUIREMENTS.md.`

---

## 8. Branch protection

`main` is force-push blocked at the GitHub repository ruleset level.

> **TODO (2026-05-29):** Verify the ruleset is active in GitHub →
> Repository Settings → Rules → Rulesets. The rule should show:
> - Restrict force pushes: enabled
> - Require status checks before merging: TODO (add `vitest` and `tsc` as
>   required checks once GitHub Actions CI is wired up)
>
> Until CI is wired, the pre-push hook is the effective gate for solo pushes.
> Force-push protection is the backstop for contractor / multi-author scenarios.

---

## 9. Pre-deploy checklist

Before any production deployment, run through:
`docs/runbooks/pilot-go-live-checklist.md`

Key callouts:
- All pending Supabase migrations dry-run confirmed (`npx supabase db diff --linked`)
  before `npx supabase db push --linked`
- `TRUSTED_PROXY_HOPS` env var set to the correct Amplify+CloudFront hop count
- `demo@claims.gov.ve` seed account purged from production DB
- Boot-OK log line confirmed in CloudWatch after deploy

For migration rollback procedures, see:
`docs/runbooks/supabase-migration-rollback.md`

---

## 10. Where things live

| What | Where |
|---|---|
| Product requirements (R-IDs) | `../requirements/REQUIREMENTS.md` |
| Current sprint state / blockers | `../requirements/SESSION_COMPACT.md` |
| Traceability matrix (R-XX → code → test) | `../requirements/TRACEABILITY.md` |
| Architecture Decision Records | `docs/adr/` |
| Operational runbooks | `docs/runbooks/` |
| Test plans + execution logs | `../testing-log/` |
| Sprint summaries | `../sprint-log/` |

---

*Maintained by Chu Ling (operating entity). Update this doc when gates or tooling change.*
