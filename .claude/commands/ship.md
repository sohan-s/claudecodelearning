---
description: Full GitHub workflow for a Jira ticket — branch, implement, verify, commit, push, open PR
argument-hint: <JIRA-ID> <short kebab description>  e.g. PROJ-123 password-reset
allowed-tools: Bash(git*), Bash(gh*), Bash(npm*)
---

Run the end-to-end delivery workflow for Jira ticket: **$ARGUMENTS**

Treat the first token as the Jira ticket ID (e.g. `PROJ-123`) and the rest as a short
kebab-case description. Work through these stages **in order** and stop to report after each
gate; do not skip a failing gate.

## 0. Read the Jira ticket (if Atlassian MCP is connected)
- Use the Atlassian MCP tools to fetch the ticket `<JIRA-ID>`: summary, description,
  and acceptance criteria. Restate the acceptance criteria back before coding so we agree
  on scope. If the MCP isn't connected, ask the user to paste the ticket details.

## 1. Create the feature branch
- Confirm the working tree is clean (`git status`). If dirty, stop and ask.
- Branch off the latest `main`:
  ```
  git switch main && git pull --ff-only
  git switch -c feature/<JIRA-ID>-<description>
  ```

## 2. Implement
- Make the change. Follow the conventions in `CLAUDE.md` (repository pattern, etc.).
- Ship tests with the change (the `write-tests` skill applies here).

## 3. Verify (quality gate — must pass before continuing)
- Run the test suite and lint: `npm test` and `npm run lint`.
- Run `/code-review` on the diff and address blockers/majors.
- Run `/security-review` for anything touching auth, input handling, or secrets.
- If any gate fails, fix and re-run. Do not proceed with failing checks.

## 4. Commit
- Reference the ticket in the message so Jira auto-links it:
  ```
  git add -A
  git commit -m "<JIRA-ID>: <what changed and why>"
  ```
- The `protect-main` hook guarantees this never lands on `main` directly.

## 5. Push
  ```
  git push -u origin feature/<JIRA-ID>-<description>
  ```

## 6. Open the pull request
  ```
  gh pr create \
    --title "<JIRA-ID>: <concise title>" \
    --body "$(cat <<'EOF'
  ## Summary
  <what & why>

  ## Jira
  <JIRA-ID>

  ## Testing
  - [ ] Unit tests pass
  - [ ] Lint clean
  - [ ] Manually verified

  🤖 Generated with Claude Code
  EOF
  )"
  ```
- Print the PR URL when done.

Report a short summary of each stage's outcome at the end.
