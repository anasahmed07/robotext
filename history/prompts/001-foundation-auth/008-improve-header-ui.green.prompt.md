---
id: 008
title: Improve Header UI and User Dropdown
stage: green
date: 2025-12-07
surface: agent
model: Claude Opus 4.5 (Preview)
feature: 001-foundation-auth
branch: 001-foundation-auth
user: anasahmed07
command: fix header style and dropdown
labels: ["ui", "header", "dropdown", "css"]
links:
  spec: specs/001-foundation-auth/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - web/src/components/UserNav/index.tsx
  - web/src/components/UserNav/UserNav.module.css
tests:
  - Manual verification of UI
---

## Prompt

fix the style of the header with proper profile/ login/signup dropdown and proper ui

## Response snapshot

Improved the `UserNav` component to include a proper dropdown menu for authenticated users and refined the unauthenticated view.

**Changes:**
- **User Dropdown:** Added a dropdown menu triggered by clicking the user's avatar/name.
  - Shows user email.
  - Includes a "Logout" button with an icon.
  - Implemented click-outside logic to close the dropdown.
- **Styling:**
  - Updated Login/Sign Up buttons to match Docusaurus theme (primary color for Sign Up, subtle hover for Login).
  - Used `--ifm-` CSS variables for consistent theming (colors, spacing, shadows, border radius).
  - Added a user avatar placeholder with initials.
  - Added a chevron icon that rotates when the dropdown is open.
  - Ensured responsiveness (hiding username on smaller screens).

## Outcome

- ✅ Impact: Enhanced header UI with a functional and styled user dropdown.
- 🧪 Tests: Visual verification of the dropdown and buttons.
- 📁 Files: 2 files modified (UserNav/index.tsx, UserNav/UserNav.module.css)
- 🔁 Next prompts: None immediately.
- 🧠 Reflection: Using Docusaurus theme variables ensures the UI looks native to the site.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): null
- Next experiment: null
