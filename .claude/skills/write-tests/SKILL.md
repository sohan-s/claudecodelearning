---
name: write-tests
description: Use when the user asks to write, add, or improve tests for code in this project. Generates tests that follow the project's framework, naming, and coverage conventions (target 80%).
---

# Writing tests for this project

When asked to write tests, follow this procedure:

## 1. Understand before writing
- Read the file(s) under test and any existing tests nearby to match style.
- Identify the public behavior, not the implementation details.

## 2. Coverage strategy
For each unit, cover:
- **Happy path** — typical valid input.
- **Edge cases** — empty, null, boundary values, large input.
- **Error paths** — invalid input, thrown errors, rejected promises.

## 3. Conventions
- Test files live next to the source as `<name>.test.ts`.
- Use `describe`/`it` blocks; one `describe` per unit.
- Test names read as sentences: `it("returns 401 when token is missing")`.
- Arrange-Act-Assert structure, with a blank line between sections.
- Mock external systems (DB, network); never hit a real database in unit tests.

## 4. After writing
- Run the test suite and report pass/fail.
- Report coverage; if below 80% for the changed file, add the missing cases.
- Never weaken an assertion just to make a test pass.
