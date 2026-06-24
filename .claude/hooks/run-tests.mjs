#!/usr/bin/env node
// PostToolUse hook: after Claude edits a JS source/test file, run the test suite.
// If tests fail, exit code 2 + stderr feeds the failure back to Claude so it self-corrects.
// Receives the tool call as JSON on stdin.

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  let data = {};
  try {
    data = JSON.parse(input);
  } catch {
    process.exit(0); // can't parse — do nothing
  }

  const file = data?.tool_input?.file_path || "";

  // Only react to JS/TS files inside the project (ignore node_modules, configs, docs).
  if (!/\.(m?js|ts)$/.test(file) || file.includes("node_modules")) process.exit(0);

  // Only run if the project actually defines a test script.
  if (!existsSync("package.json")) process.exit(0);
  let pkg = {};
  try {
    pkg = JSON.parse(readFileSync("package.json", "utf8"));
  } catch {
    process.exit(0);
  }
  if (!pkg.scripts?.test) process.exit(0);

  try {
    execSync("npm test", { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    process.exit(0); // green — stay silent
  } catch (e) {
    const out = `${e.stdout || ""}${e.stderr || ""}`;
    process.stderr.write(
      `Tests FAILED after editing ${file}:\n\n${out}\n` +
        `Fix the failing test(s) before moving on.\n`
    );
    process.exit(2); // feed the failure back to Claude
  }
});
