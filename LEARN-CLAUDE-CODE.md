# Learning Claude Code primitives — one of each, explained

This repo was scaffolded with **one concrete example of each primitive** so you can see
how they differ and when to use which. Below is what was created and *why*.

---

## 1. `CLAUDE.md` — project memory (foundation)
**File:** `CLAUDE.md`
**What:** Auto-loaded into context every session. Holds conventions, stack, and commands.
**Why this, not a prompt:** You'd otherwise repeat "we use the repository pattern" in every
chat. Putting it here means Claude always knows it. *Foundation everything else builds on.*
**Try it:** Ask me "what's our branch naming convention?" — I know it without you telling me.

---

## 2. Slash command `/story` — a saved prompt you trigger
**File:** `.claude/commands/story.md`
**What:** `/story user can reset password` → a structured user story + acceptance criteria.
**Why a slash command:** It's a repeatable instruction *you* invoke on demand. `$ARGUMENTS`
injects your text. Manual trigger = you stay in control of when it runs.
**Try it:** Type `/story a user can log in with Google`.

---

## 3. Skill `write-tests` — auto-invoked procedure + expertise
**File:** `.claude/skills/write-tests/SKILL.md`
**What:** Bundles your test-writing methodology (happy/edge/error paths, naming, 80% coverage).
**Why a skill, not a slash command:** A skill is **model-invoked** — Claude reads the
`description` and applies it automatically when you say "add tests for this", without you
remembering a command. Skills can also bundle scripts and reference files.
**Try it:** Write any function, then say "write tests for it" — the skill's rules kick in.

---

## 4. Subagent `code-auditor` — isolated, parallel worker
**File:** `.claude/agents/code-auditor.md`
**What:** A skeptical reviewer that independently audits a diff and returns a verdict.
**Why a subagent:** It runs in its **own context window**, so a big review doesn't pollute
your main conversation. You can also run several agents in parallel. It's restricted to
read-only tools (`Read, Grep, Glob, Bash`) — it reports, never edits.
**Try it:** "Use the code-auditor agent to review my changes."

---

## 5. Hook `protect-main` — deterministic, guaranteed gate
**Files:** `.claude/settings.json` + `.claude/hooks/protect-main.sh`
**What:** A `PreToolUse` hook that **blocks any `git commit` while on `main`/`master`**.
**Why a hook, not an instruction:** Hooks are run by the *harness*, not the model — so they
fire **every time, guaranteed**, even if Claude "forgets." Anything that MUST happen (lint,
format, security gate, branch protection) belongs in a hook. Exit code 2 = block the action.
**Verified:** commit-on-main → blocked; status-on-main → allowed; commit-on-feature → allowed.
**Extend it:** Add a `PostToolUse` hook to auto-run `npm test`/`eslint` after every edit.

---

## 6. MCP — connectors to external systems
**What:** MCP servers let Claude reach live data/actions in other tools.
**Status here:** You already have a **Neon (Postgres)** MCP server connected — I can create DB
branches, run SQL, and manage migrations directly.
**Why MCP:** Use it whenever Claude needs to *reach into another system* — Jira (requirements),
GitHub (PRs), Sentry/Snyk (errors & security), your DB.
**Add more:** create a `.mcp.json` in the project root, e.g.:
```json
{
  "mcpServers": {
    "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] }
  }
}
```
Project `.mcp.json` is shared with the team; servers can also be added via `claude mcp add`.

---

## The decision rule
```
Must it happen every time, automatically?      -> HOOK
Need live data/action in another system?        -> MCP
A repeated instruction you trigger yourself?     -> SLASH COMMAND
Auto-apply a procedure + expertise?              -> SKILL
Big, independent work that clutters context?     -> SUBAGENT
A fact Claude should always know?                -> CLAUDE.md
```
