---
id: 001
title: Foundation Auth Specification Creation
stage: spec
date: 2025-12-06
surface: agent
model: Claude Sonnet 4.5
feature: 001-foundation-auth
branch: 001-foundation-auth
user: anasahmed07
command: /sp.specify
labels: ["spec", "foundation", "authentication", "i18n", "docusaurus"]
links:
  spec: specs/001-foundation-auth/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-foundation-auth/spec.md
  - specs/001-foundation-auth/checklists/requirements.md
tests:
  - none
---

## Prompt

Follow instructions in [sp.specify.prompt.md](file:///d%3A/Anas/robotext/.github/prompts/sp.specify.prompt.md).
Phase 1 Specification: Foundation & AuthenticationProject: RobotextPhase Goal: Deploy the Docusaurus shell with full i18n support, custom theming, and a functioning Authentication API (better-auth) connected to Neon DB.1. Architecture Overview (Phase 1)Client: Docusaurus (Static Site + React Client-side hydration).Server: Express.js API (handling Auth).Database: Neon (PostgreSQL).Protocol: REST (Client communicates with Server via fetch/axios).2. Frontend Specifications (The Book Shell)A. Tech StackFramework: Docusaurus (Latest Stable).Styling: Tailwind CSS (configured via docusaurus-plugin-postcss) + CSS Modules.Language: TypeScript (Recommended for robust React components).B. Configuration & i18nLanguages:en (English) - Default, LTR.ur (Urdu) - RTL.RTL Logic: Docusaurus i18n config must be set so that selecting ur applies dir="rtl" to the <html> tag and mirrors the layout.C. Theming & UIColor Variables (custom.css):--ifm-color-primary: #00e599 (Neon Green).--ifm-background-color: #ffffff (Light Mode).--docusaurus-highlighted-code-line-bg: rgba(0, 229, 153, 0.2).Dark Mode overrides:--ifm-background-color: #18191b (Grey Black).Landing Page:Clean, minimalist Hero section."Get Started" button (leads to Module 1)."Login/Signup" button (triggers Auth flow).D. File Structure ScaffoldingCreate the directory structure for the future content to ensure the Agent knows where to put things later:/docs
  /01-robotic-nervous-system  (Module 1)
  /02-digital-twin            (Module 2)
  /03-ai-robot-brain          (Module 3)
  /04-vla                     (Module 4)
3. Backend Specifications (Auth API)A. Tech StackRuntime: Node.js.Framework: Express.js.Language: TypeScript.Auth Library: better-auth.Database: Neon (PostgreSQL).ORM: Drizzle ORM (Best compatibility with Neon + TypeScript).B. Database Schema (Neon)The database must support the standard Auth tables plus your custom requirements.Standard Auth Tables: user, session, account, verification.Extended User Data (The "Onboarding" requirement):Table: user_profiles (linked to user.id).Columns:programming_languages (JSON/Array: e.g., ["Python", "C++"]).ros_familiarity (Enum: Beginner, Intermediate, Advanced).robotics_knowledge (Enum: Beginner, Intermediate, Advanced).hardware_specs (JSON: e.g., { "gpu": "RTX 3060", "ram": "16GB" }).C. API EndpointsPOST /api/auth/*: Handled by better-auth (Sign up, Sign in, Sign out).GET /api/user/me: Returns current user session + profile data.POST /api/user/onboarding: Updates the user profile with knowledge/hardware data.4. Integration Logic (Client-Side)A. The "Auth Context"Create a React Context (AuthContext) in Docusaurus root (/src/theme/Root.js or generic layout wrapper).Behavior: On site load, check /api/user/me (or check session token).State: user object (null if logged out).B. The Onboarding Flow (Critical)User clicks Signup -> better-auth flow (Email/Pass or Social).Success -> Redirect to /onboarding.Onboarding Page: A React form asking for:Programming skills.Hardware specs.Submit -> POST /api/user/onboarding.Completion -> Redirect to /docs/intro.5. Deployment Specs (Phase 1)Frontend: Configure GitHub Actions workflow to build Docusaurus and push to gh-pages branch.Backend: Create a railway.json or Dockerfile for the Express app. connect to Neon via environment variable DATABASE_URL.

## Response snapshot

Created comprehensive specification for Foundation & Authentication feature (001-foundation-auth).

**Specification Structure**:

**3 User Stories** (Prioritized, Independently Testable):
1. P1: Browse Educational Content - i18n, RTL, theme support
2. P2: Create Account & Complete Onboarding - profile data collection
3. P3: Authenticate and Access Content - session management

**38 Functional Requirements** organized by category:
- Content & Internationalization (FR-001 to FR-005)
- Theming & UI (FR-006 to FR-012)
- Content Structure (FR-013 to FR-014)
- Authentication (FR-015 to FR-021)
- Onboarding & User Profile (FR-022 to FR-029)
- API & Integration (FR-030 to FR-033)
- Data Persistence (FR-034 to FR-038)

**5 Key Entities**:
- User, Session, UserProfile, Module, Content

**12 Success Criteria** (All measurable, technology-agnostic):
- Performance: <3s page load, <1s language switch, <500ms API response
- Quality: Lighthouse ≥90 (performance + accessibility)
- User experience: <5min signup+onboarding, <10s login, session persistence
- Functionality: RTL rendering, theme rendering, profile data accuracy, module navigation

**Validation Results**:
- ✅ All checklist items passed
- ✅ No [NEEDS CLARIFICATION] markers
- ✅ No implementation details in spec
- ✅ All requirements testable and unambiguous
- ✅ Assumptions, dependencies, and out-of-scope clearly documented

## Outcome

- ✅ Impact: Created production-ready specification for Phase 1 foundation, defining complete user journeys, functional requirements, and success criteria for Docusaurus shell + Authentication API
- 🧪 Tests: Specification quality validation passed (14/14 checklist items)
- 📁 Files: `specs/001-foundation-auth/spec.md` (250+ lines), `specs/001-foundation-auth/checklists/requirements.md` (validation results)
- 🔁 Next prompts: Run `/sp.plan` to create architecture plan, `/sp.tasks` to break down into implementation tasks
- 🧠 Reflection: Specification successfully captures bilingual requirements (English/Urdu RTL), onboarding flow for knowledge base collection, and clear separation between open access and auth-gated features. Ready for planning phase.

## Evaluation notes (flywheel)

- Failure modes observed: None (specification passed all quality gates on first iteration)
- Graders run and results (PASS/FAIL): Manual validation PASS - 14/14 checklist items passed; zero [NEEDS CLARIFICATION] markers; all success criteria measurable and technology-agnostic
- Prompt variant (if applicable): N/A (baseline specification creation from detailed Phase 1 requirements)
- Next experiment (smallest change to try): Monitor whether 38 functional requirements are sufficient or if additional requirements emerge during planning phase (API contract definitions, error handling specifics)
