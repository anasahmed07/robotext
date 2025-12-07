---
id: "013-fix-auth-invalid-url-error"
title: "Fix Auth Invalid URL Error"
stage: "green"
date: "2025-12-07"
surface: "agent"
model: "Gemini 3 Pro"
feature: "auth-fix"
branch: "001-foundation-auth"
user: "Anas"
command: "fix auth invalid url error"
labels: ["auth", "api", "better-auth", "env"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "api/.env"
  - "api/src/auth/config.ts"
  - "web/src/components/AuthContext.tsx"
  - "web/src/pages/onboarding.tsx"
tests: []
---

## Prompt
the auth is not workingTypeError: Invalid URL ... code: 'ERR_INVALID_URL', input: '/'

## Response
The error was caused by `better-auth` missing the `baseURL` configuration. Additionally, there was a port conflict risk as both API and Web were defaulting to port 3000.

Fixes applied:
1.  Updated `api/.env` to set `PORT=4000` and added `BETTER_AUTH_URL=http://localhost:4000`.
2.  Updated `api/src/auth/config.ts` to use `process.env.BETTER_AUTH_URL`.
3.  Updated `web/src/components/AuthContext.tsx` and `web/src/pages/onboarding.tsx` to point to the new API URL (`http://localhost:4000`).
