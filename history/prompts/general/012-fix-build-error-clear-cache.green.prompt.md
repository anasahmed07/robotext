---
id: "012-fix-build-error-clear-cache"
title: "Fix Build Error by Clearing Cache"
stage: "green"
date: "2025-12-07"
surface: "agent"
model: "Gemini 3 Pro"
feature: "bugfix"
branch: "001-foundation-auth"
user: "Anas"
command: "fix build error Can't resolve @theme/Navbar"
labels: ["build", "docusaurus", "cache"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files: []
tests: []
---

## Prompt
Client Compiled with some errors... Module not found: Error: Can't resolve '@theme/Navbar'

## Response
The error occurred because the Docusaurus cache still held references to the deleted `Navbar` component. Ran `npm run clear` in the `web` directory to remove the `.docusaurus` and `node_modules/.cache` folders. This forces Docusaurus to rebuild the component map and correctly resolve `@theme/Navbar` to the default theme implementation.
