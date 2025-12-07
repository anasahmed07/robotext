---
id: "014-fix-env-loading-order"
title: "Fix Environment Variable Loading Order"
stage: "green"
date: "2025-12-07"
surface: "agent"
model: "Gemini 3 Pro"
feature: "auth-fix"
branch: "001-foundation-auth"
user: "Anas"
command: "fix auth invalid url error try again"
labels: ["auth", "api", "dotenv", "es-modules"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "api/src/index.ts"
tests: []
---

## Prompt
TypeError: Invalid URL ... code: 'ERR_INVALID_URL', input: '/'

## Response
The error persisted because `dotenv.config()` was called *after* the `auth/config.ts` import in `api/src/index.ts`. In ES modules, imports are hoisted and evaluated before the code body runs, so `process.env.BETTER_AUTH_URL` was still `undefined` when `betterAuth` was initialized.

Fix:
1.  Modified `api/src/index.ts` to use `import 'dotenv/config';` as the very first import. This ensures environment variables are loaded before any other modules are evaluated.
