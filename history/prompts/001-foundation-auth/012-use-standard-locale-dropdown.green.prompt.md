---
id: 012
title: Use Standard Docusaurus Locale Dropdown
stage: green
date: 2025-12-07
surface: agent
model: Claude Opus 4.5 (Preview)
feature: 001-foundation-auth
branch: 001-foundation-auth
user: anasahmed07
command: use standard locale dropdown
labels: ["ui", "header", "i18n", "config"]
links:
  spec: specs/001-foundation-auth/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - web/docusaurus.config.ts
  - web/src/theme/NavbarItem/index.tsx
tests:
  - Visual verification
---

## Prompt

there is a custom language togle button use the docasauras one

## Response snapshot

Updated `docusaurus.config.ts` to use `type: 'localeDropdown'` instead of `type: 'custom-language-toggle'`.
Removed the custom language toggle logic from `web/src/theme/NavbarItem/index.tsx`.

## Outcome

- ✅ Impact: Navbar now uses the standard Docusaurus locale dropdown.
- 🧪 Tests: Visual verification.
- 📁 Files: 2 files modified (docusaurus.config.ts, web/src/theme/NavbarItem/index.tsx)
- 🔁 Next prompts: None.
- 🧠 Reflection: Using standard components is preferred for maintainability and consistency.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): null
- Next experiment: null
