---
id: "010-fix-urdu-accessibility"
title: "Fix Urdu Accessibility"
stage: "green"
date: "2025-12-07"
surface: "agent"
model: "Gemini 3 Pro"
feature: "i18n-fix"
branch: "001-foundation-auth"
user: "Anas"
command: "the urdu content is not accessable and not the urdu translated main page read the docs and fix the problem"
labels: ["i18n", "navbar", "sidebar", "docusaurus"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "web/src/theme/Navbar/index.tsx"
  - "web/docusaurus.config.ts"
  - "web/i18n/ur/docusaurus-plugin-content-docs/current.json"
tests: []
---

## Prompt
the urdu content is not accessable and not the urdu translated main page read the docs and fix the problem

## Response
Fixed the Urdu accessibility issues by:
1.  Adding the custom `LanguageToggle` component to the Navbar in `web/src/theme/Navbar/index.tsx` to ensure the language switcher is visible and functional.
2.  Removing the default `localeDropdown` from `web/docusaurus.config.ts` to avoid duplication.
3.  Adding missing sidebar translations to `web/i18n/ur/docusaurus-plugin-content-docs/current.json` so the sidebar is correctly translated in Urdu mode.

Note: In development mode (`npm start`), only the default locale (English) is served. To view the Urdu version locally, you must run `npm run start -- --locale ur`.
