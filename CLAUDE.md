# TWPreschool — Project Context

## Project Identity
- **Project:** Taiwan Preschool Exchange All-in-One System
- **GitHub:** github.com/hongdrives/TWPreschool
- **Owner:** Hong (PM)
- **Type:** System requirements & planning

## What this project is
An all-in-one system for Taiwan Preschool Exchange programme management. This workspace is used for defining, documenting, and managing system requirements.

## Client / Stakeholders
- **Client:** [fill in]
- **Key contacts:** [fill in]
- **Language:** Traditional Chinese / English

## Scope
- [fill in — e.g. enrolment, scheduling, reporting, parent portal, etc.]

## Working directory
`~/Library/Mobile Documents/com~apple~CloudDocs/Development/GitHub/TWPreschool`

## When assisting with this project
- Focus on system requirements, documentation, and planning
- Keep requirements structured and traceable
- Language: [English / Traditional Chinese / bilingual — fill in]

## Codebase structure & framework reference
Follow the same structure and conventions as the FirstLeap project. Reference files are in `_reference-firstleap/`:

- `_reference-firstleap/CLAUDE-firstleap.md` — stack, quality gates, design tokens, session protocol
- `_reference-firstleap/CONTRIBUTING-firstleap.md` — branch model, commit style, PR process, folder structure

**Key conventions to follow:**
- Framework: Next.js (App Router) + TypeScript (strict) + Tailwind CSS
- Folder structure: `src/app/`, `src/components/ui/`, `src/lib/`
- Discipline tracks: `requirements/`, `sprint-log/`, `testing-log/`, `docs/`
- Commit style: `feat(scope):`, `fix(scope):`, `docs:`, `chore:`
- Tests: Vitest (unit) + Playwright (E2E)
- Direct-to-main branch model for solo development
