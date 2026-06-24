#!/usr/bin/env bash
# PreToolUse hook: blocks `git commit` while on a protected branch (main/master).
# Receives the tool call as JSON on stdin. Exit code 2 + stderr = block the action.

input=$(cat)

# Only care about git commit commands.
if echo "$input" | grep -q "git commit"; then
  branch=$(git symbolic-ref --short HEAD 2>/dev/null)
  if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
    echo "BLOCKED by protect-main hook: do not commit directly to '$branch'." >&2
    echo "Create a feature branch first, e.g.: git switch -c feature/TICKET-123-my-change" >&2
    exit 2
  fi
fi

exit 0
