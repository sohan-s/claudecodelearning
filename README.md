# claudecodelearning

A sample web application project for learning Claude Code across the SDLC/PDLC.

## What's here
This repo is configured with one example of each Claude Code primitive:

| Primitive | Location | Purpose |
|---|---|---|
| Project memory | `CLAUDE.md` | Conventions Claude always knows |
| Slash command | `.claude/commands/story.md` (`/story`) | Idea → user story |
| Slash command | `.claude/commands/ship.md` (`/ship`) | Ticket → branch → verify → PR |
| Skill | `.claude/skills/write-tests/` | Auto-applied test-writing methodology |
| Subagent | `.claude/agents/code-auditor.md` | Independent adversarial review |
| Hook | `.claude/hooks/protect-main.sh` | Blocks direct commits to `main` |
| MCP | (Neon) | Live Postgres access |

See [`LEARN-CLAUDE-CODE.md`](./LEARN-CLAUDE-CODE.md) for the full explanation.

## Workflow
One ticket = one feature branch = one PR. Start work with `/ship <JIRA-ID> <desc>`.
