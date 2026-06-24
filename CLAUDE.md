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

## GitHub + Jira workflow
- One ticket = one feature branch = one PR. Branch: `feature/<JIRA-ID>-<short-desc>`.
- Always start a Jira ticket with `/ship <JIRA-ID> <desc>` (see `.claude/commands/ship.md`).
- Reference the `<JIRA-ID>` in the branch name, commit message, and PR title so Jira's
  GitHub integration auto-links the work to the ticket.
- PRs use `.github/pull_request_template.md`. GitHub ops go through the `gh` CLI.

## How this repo is set up for learning
- `.claude/commands/story.md`  — custom slash command (`/story`)
- `.claude/skills/write-tests/` — a Skill (model auto-invokes)
- `.claude/agents/code-auditor.md` — a subagent
- `.claude/settings.json` — a hook that blocks commits to `main`
- See `LEARN-CLAUDE-CODE.md` for the full explanation of each.
