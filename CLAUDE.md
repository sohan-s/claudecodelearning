# Project: Learning Web App

A sample web application project used to learn Claude Code primitives across the SDLC.

## Tech stack (intended)
- Frontend: React + TypeScript
- Backend: Node.js (Express) + TypeScript
- Database: Postgres (Neon)
- Tests: Vitest/Jest, coverage target 80%

## Conventions
- Use the repository pattern for all DB access (no raw SQL in route handlers).
- Every feature gets a branch: `feature/<TICKET-ID>-<short-desc>`. Never commit directly to `main`.
- Every code change ships with tests.
- Run `/code-review` and `/security-review` before opening a PR.

## Commands (fill in as the project grows)
- Install: `npm install`
- Test: `npm test`
- Lint: `npm run lint`

## How this repo is set up for learning
- `.claude/commands/story.md`  — custom slash command (`/story`)
- `.claude/skills/write-tests/` — a Skill (model auto-invokes)
- `.claude/agents/code-auditor.md` — a subagent
- `.claude/settings.json` — a hook that blocks commits to `main`
- See `LEARN-CLAUDE-CODE.md` for the full explanation of each.
