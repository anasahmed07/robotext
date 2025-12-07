---
id: "011-fix-navbar-items-visibility"
title: "Fix Navbar Items Visibility"
stage: "green"
date: "2025-12-07"
surface: "agent"
model: "Gemini 3 Pro"
feature: "ui-fix"
branch: "001-foundation-auth"
user: "Anas"
command: "the language taggle is not visible nor the signup and signin buttons"
labels: ["ui", "navbar", "docusaurus", "swizzle"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "web/src/theme/NavbarItem/index.tsx"
  - "web/docusaurus.config.ts"
  - "web/src/theme/Navbar/index.tsx"
tests: []
---

## Prompt
the language taggle is not visible nor the signup and signin buttons

## Response
Fixed the visibility issue by switching from wrapping the entire `Navbar` component (which doesn't support children injection easily) to swizzling `NavbarItem`.
1. Created `web/src/theme/NavbarItem/index.tsx` to handle custom navbar item types (`custom-language-toggle` and `custom-user-nav`).
2. Updated `web/docusaurus.config.ts` to use these custom types in the `navbar.items` array.
3. Removed the obsolete `web/src/theme/Navbar/index.tsx`.
This ensures the components are properly rendered by Docusaurus's layout engine.
