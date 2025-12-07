---
description: "Task breakdown for Project Foundation & Authentication feature implementation"
---

# Tasks: Foundation & Authentication

**Input**: Design documents from `/specs/001-foundation-auth/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL per specification - not included in this breakdown as testing strategy focuses on manual validation and future test implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This project uses web app structure:
- Backend: `api/` (Express.js + TypeScript)
- Frontend: `web/` (Docusaurus + React + TypeScript)
- Shared: `shared/` (optional shared types)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for both frontend and backend

- [x] T001 Create backend project structure at `api/` with TypeScript, Express.js, and initialize package.json
- [x] T002 Create frontend project structure at `web/` with Docusaurus 3.x and TypeScript
- [x] T003 [P] Configure ESLint and Prettier for backend in `api/.eslintrc.js` and `api/.prettierrc`
- [x] T004 [P] Configure ESLint and Prettier for frontend in `web/.eslintrc.js` and `web/.prettierrc`
- [x] T005 [P] Create shared types directory at `shared/types/` for user models
- [x] T006 [P] Configure Tailwind CSS in `web/tailwind.config.js` with Neon Green (#00e599) and Grey Black (#18191b) colors
- [x] T007 [P] Set up environment variable templates - `api/.env.example` and `web/.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Backend Foundation

- [x] T008 Install and configure Drizzle ORM in `api/drizzle.config.ts` and connect to Neon PostgreSQL
- [x] T009 Define database schema in `api/src/db/schema.ts` (user, session, user_profiles tables per data-model.md)
- [x] T010 Create initial migration in `api/src/db/migrations/001_init.sql` with all tables and indexes
- [x] T011 Run migration and verify tables created in Neon database
- [x] T012 Create database client in `api/src/db/client.ts` with connection pooling
- [x] T013 Configure better-auth in `api/src/auth/config.ts` with Neon adapter and session settings
- [x] T014 [P] Implement CORS middleware in `api/src/middleware/cors.ts` allowing frontend origin
- [x] T015 [P] Implement request logger middleware in `api/src/middleware/logger.ts` using winston or pino
- [x] T016 [P] Implement error handler middleware in `api/src/middleware/errorHandler.ts` with structured error responses
- [x] T017 Create Express server entry point in `api/src/index.ts` with middleware chain and health endpoint
- [x] T018 Create Zod validation schemas in `api/src/utils/validation.ts` for user input (email, password, profile data)

### Frontend Foundation

- [x] T019 Configure Docusaurus i18n in `web/docusaurus.config.ts` for English (default) and Urdu with RTL support
- [x] T020 Create custom CSS in `web/src/css/custom.css` with theme colors (Neon Green, Grey Black, White) and RTL variables
- [x] T021 Create translation files - `web/i18n/ur/docusaurus-plugin-content-docs/current.json` for Urdu
- [x] T022 Implement AuthContext in `web/src/components/AuthContext.tsx` for global authentication state management
- [x] T023 Create Root wrapper in `web/src/theme/Root.tsx` to provide AuthContext to all pages
- [x] T024 [P] Create LanguageToggle component in `web/src/components/LanguageToggle.tsx` for English/Urdu switching
- [x] T025 [P] Create ProtectedRoute component in `web/src/components/ProtectedRoute.tsx` for auth-guarded pages

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Educational Content (Priority: P1) 🎯 MVP

**Goal**: Learners can immediately browse all educational content in their preferred language (English or Urdu) with appropriate layout direction (LTR/RTL).

**Independent Test**: Navigate to site, toggle language between English and Urdu, verify content renders correctly with proper RTL mirroring for Urdu.

### Content Structure

- [x] T026 [P] [US1] Create Module 1 directory structure at `web/docs/01-robotic-nervous-system/` with placeholder intro.md
- [x] T027 [P] [US1] Create Module 2 directory structure at `web/docs/02-digital-twin/` with placeholder intro.md
- [x] T028 [P] [US1] Create Module 3 directory structure at `web/docs/03-ai-robot-brain/` with placeholder intro.md
- [x] T029 [P] [US1] Create Module 4 directory structure at `web/docs/04-vla/` with placeholder intro.md
- [x] T030 [US1] Create main intro page at `web/docs/intro.md` with course overview and navigation to 4 modules
- [x] T031 [US1] Create Urdu translations for intro content in `web/i18n/ur/docusaurus-plugin-content-docs/current/intro.md`

### Landing Page & Navigation

- [x] T032 [US1] Implement Landing Page in `web/src/pages/index.tsx` with Hero section, "Get Started" and "Login/Signup" buttons
- [x] T033 [US1] Style Landing Page with Tailwind CSS (Neon Green accent, responsive design, Dark/Light theme support)
- [x] T034 [US1] Wire "Get Started" button to navigate to `/docs/intro` (Module 1 content)
- [x] T035 [US1] Configure Docusaurus navbar in `web/docusaurus.config.ts` with language toggle and theme toggle

### Internationalization & Layout

- [x] T036 [US1] Implement RTL CSS rules in `web/src/css/custom.css` using logical properties (margin-inline-start, padding-inline-end, etc.)
- [x] T037 [US1] Verify RTL layout mirroring for Urdu - test navigation bar, sidebar, content margins, and buttons
- [x] T038 [US1] Ensure code blocks remain LTR in RTL mode (add explicit `dir="ltr"` to code elements)
- [x] T039 [US1] Test language persistence - verify language preference stored in localStorage and restored on page reload

**Checkpoint**: At this point, User Story 1 should be fully functional - users can browse bilingual content with proper RTL layout

---

## Phase 4: User Story 2 - Create Account & Complete Onboarding (Priority: P2)

**Goal**: New learners create account and complete onboarding by providing programming background, robotics familiarity, and hardware specifications.

**Independent Test**: Sign up with email/password, complete onboarding form with knowledge base and hardware details, verify profile data is saved.

### Backend - Authentication Routes

- [ ] T040 [P] [US2] Implement POST /api/auth/sign-up endpoint in `api/src/routes/auth.ts` using better-auth
- [ ] T041 [P] [US2] Implement POST /api/auth/sign-in endpoint in `api/src/routes/auth.ts` using better-auth
- [x] T042 [P] [US2] Implement POST /api/auth/sign-out endpoint in `api/src/routes/auth.ts` to terminate sessions
- [x] T043 [P] [US2] Implement GET /api/auth/get-session endpoint in `api/src/routes/auth.ts` to check authentication status
- [x] T044 [US2] Mount auth routes in `api/src/index.ts` at `/api/auth` path

### Backend - User Profile Routes

- [x] T045 [US2] Implement POST /api/user/onboarding endpoint in `api/src/routes/user.ts` to save user profile
- [x] T046 [US2] Add Zod validation for onboarding payload (programmingLanguages array, rosFamiliarity enum, roboticsKnowledge enum, hardwareSpecs object)
- [x] T047 [US2] Implement database insert/update logic in `api/src/routes/user.ts` to save user_profiles record
- [x] T048 [US2] Mount user routes in `api/src/index.ts` at `/api/user` path with authentication middleware

### Frontend - Signup Flow

- [x] T049 [US2] Create Signup page in `web/src/pages/signup.tsx` with email, password, and name input fields
- [x] T050 [US2] Implement form validation in signup page (email format, password strength, required fields)
- [x] T051 [US2] Implement signup API call from frontend to POST /api/auth/sign-up endpoint
- [x] T052 [US2] Handle signup success - update AuthContext and redirect to `/onboarding` page
- [x] T053 [US2] Handle signup errors - display validation errors or "email already exists" message

### Frontend - Onboarding Flow

- [x] T054 [US2] Create Onboarding page in `web/src/pages/onboarding.tsx` with form fields for profile data
- [x] T055 [US2] Add programming languages multi-select or text input field (supports multiple entries)
- [x] T056 [US2] Add ROS familiarity dropdown (Beginner, Intermediate, Advanced)
- [x] T057 [US2] Add robotics knowledge dropdown (Beginner, Intermediate, Advanced)
- [x] T058 [US2] Add hardware specs input fields (GPU, RAM, CPU, OS as free-form text or structured inputs)
- [x] T059 [US2] Implement form validation for onboarding page (required fields, data types)
- [x] T060 [US2] Implement onboarding submission - POST to /api/user/onboarding endpoint
- [x] T061 [US2] Handle onboarding success - redirect to `/docs/intro` and mark onboarding complete in AuthContext
- [x] T062 [US2] Handle onboarding errors - display validation errors or server errors

### Integration

- [x] T063 [US2] Wire "Login/Signup" button on landing page to navigate to `/signup` page
- [x] T064 [US2] Implement onboarding skip prevention - ensure users cannot bypass onboarding after signup
- [x] T065 [US2] Store onboarding completion status in AuthContext (check if user.profile exists)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - users can browse content OR sign up and complete onboarding

---

## Phase 5: User Story 3 - Authenticate and Access Content (Priority: P3)

**Goal**: Returning learners log in to access their personalized experience and pick up where they left off.

**Independent Test**: Log in with existing credentials, verify session persists across page refreshes, log out successfully.

### Backend - Session Management

- [x] T066 [US3] Verify better-auth session persistence is configured correctly (30-day expiration)
- [x] T067 [US3] Implement GET /api/user/me endpoint in `api/src/routes/user.ts` to return current user + profile
- [x] T068 [US3] Add authentication middleware check to GET /api/user/me (require valid session token)

### Frontend - Login Flow

- [x] T069 [US3] Create Login page in `web/src/pages/login.tsx` with email and password input fields
- [x] T070 [US3] Implement form validation in login page (email format, required fields)
- [x] T071 [US3] Implement login API call from frontend to POST /api/auth/sign-in endpoint
- [x] T072 [US3] Handle login success - update AuthContext with user data and redirect to `/docs/intro`
- [x] T073 [US3] Handle login errors - display "invalid credentials" message

### Frontend - Session Persistence

- [x] T074 [US3] Implement session restoration in AuthContext - call GET /api/auth/get-session on app initialization
- [x] T075 [US3] Update AuthContext to store session token in memory or secure cookie
- [x] T076 [US3] Implement session check on page load - restore user state if session is valid
- [x] T077 [US3] Handle session expiration - redirect to login if session check fails

### Frontend - Logout Flow

- [x] T078 [US3] Add Logout button to navbar/user menu (visible only when authenticated)
- [x] T079 [US3] Implement logout handler - call POST /api/auth/sign-out endpoint
- [x] T080 [US3] Clear AuthContext state on logout and redirect to landing page

### UI State Management

- [x] T081 [US3] Update navbar to show logged-in state - display user name/profile icon instead of "Login/Signup" button
- [x] T082 [US3] Update landing page - hide "Login/Signup" button if already authenticated, show "Go to Docs" instead
- [x] T083 [US3] Implement onboarding re-prompt logic - check if user.profile is null and redirect to /onboarding if incomplete

### Integration

- [x] T084 [US3] Wire "Login/Signup" button to navigate to `/login` page (or `/signup` based on user choice)
- [x] T085 [US3] Test session persistence across browser refresh - verify user remains logged in
- [x] T086 [US3] Test logout flow - verify session is terminated and user is redirected

**Checkpoint**: All user stories should now be independently functional - complete authentication and content browsing experience

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, deployment readiness, and documentation

### Deployment Configuration

- [x] T087 [P] Create Railway configuration file `api/railway.json` with build and deploy settings
- [x] T088 [P] Create GitHub Actions workflow `.github/workflows/deploy-frontend.yml` for Docusaurus → GitHub Pages
- [ ] T089 [P] Configure environment variables in Railway dashboard (DATABASE_URL, AUTH_SECRET, FRONTEND_URL)
- [ ] T090 Set up Neon database and copy DATABASE_URL to Railway environment variables
- [ ] T091 Deploy backend to Railway and verify health endpoint responds at `/health`
- [ ] T092 Deploy frontend to GitHub Pages and verify static site is accessible
- [ ] T093 Test CORS configuration - verify frontend on GitHub Pages can call backend on Railway
- [ ] T094 Update FRONTEND_URL in Railway to match GitHub Pages domain

### Production Validation

- [ ] T095 [P] Test full signup flow in production (sign up → onboarding → content)
- [ ] T096 [P] Test full login flow in production (login → session persistence → logout)
- [ ] T097 [P] Test language switching in production (English ↔ Urdu with RTL layout)
- [ ] T098 [P] Test theme switching in production (Light ↔ Dark mode)
- [ ] T099 Run Lighthouse audit on production site - verify Performance, Accessibility, SEO ≥90 for both languages
- [ ] T100 Test mobile responsive design on iPhone and Android devices

### Documentation & Cleanup

- [x] T101 [P] Update README.md with project overview, tech stack, and links to deployed sites
- [x] T102 [P] Document deployment process in `specs/001-foundation-auth/quickstart.md` (already exists, verify completeness)
- [x] T103 [P] Create rollback procedures document for production issues
- [x] T104 Code cleanup - remove console.logs, unused imports, and commented code
- [ ] T105 Run ESLint and Prettier across all files - ensure code quality standards met
- [x] T106 Verify all environment variables are documented in .env.example files

### Final Validation

- [ ] T107 Run through quickstart.md locally to ensure developer onboarding works
- [ ] T108 Verify all 12 Success Criteria from spec.md are met (SC-001 through SC-012)
- [ ] T109 Complete manual testing checklist from plan.md (12 items)
- [ ] T110 Tag release v1.0.0 for Foundation & Authentication feature

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3, 4, 5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Integrates with US2 (requires user accounts) but independently testable

### Within Each User Story

**US1 (Browse Content)**:
- Content structure tasks (T026-T030) can run in parallel
- Landing page (T032-T034) can run in parallel with content structure
- i18n and RTL tasks (T036-T039) depend on landing page and content being complete

**US2 (Signup & Onboarding)**:
- Backend auth routes (T040-T043) can run in parallel
- Backend user routes (T045-T048) can run after auth routes
- Frontend signup (T049-T053) can run in parallel with backend routes
- Frontend onboarding (T054-T062) can run in parallel with frontend signup
- Integration tasks (T063-T065) require both frontend and backend complete

**US3 (Login & Session)**:
- Backend session (T066-T068) can run in parallel with frontend login (T069-T073)
- Session persistence (T074-T077) depends on both backend and frontend login complete
- Logout (T078-T080) can run in parallel with session persistence
- UI state (T081-T083) depends on session persistence complete
- Integration (T084-T086) requires all above complete

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003, T004, T005, T006, T007)
- All Foundational backend tasks marked [P] can run in parallel (T014, T015, T016)
- All Foundational frontend tasks marked [P] can run in parallel (T024, T025)
- Once Foundational phase completes, all 3 user stories can start in parallel (if team capacity allows)
- Within US1: T026, T027, T028, T029 (module structures) run in parallel
- Within US2: T040, T041, T042, T043 (auth endpoints) run in parallel
- Within Phase 6: Most polish tasks marked [P] can run in parallel (T087-T106)

---

## Parallel Example: User Story 2 (Signup & Onboarding)

Assuming Foundational phase is complete, the following tasks can execute in parallel:

```bash
# Terminal 1: Backend Auth Routes
$ cd api
$ # T040: Implement POST /api/auth/sign-up
$ # T041: Implement POST /api/auth/sign-in
$ # T042: Implement POST /api/auth/sign-out
$ # T043: Implement GET /api/auth/get-session

# Terminal 2: Backend User Routes (can start after auth routes)
$ cd api
$ # T045: Implement POST /api/user/onboarding
$ # T046: Add Zod validation
$ # T047: Database insert/update logic

# Terminal 3: Frontend Signup
$ cd web
$ # T049: Create signup.tsx page
$ # T050: Form validation
$ # T051: API call integration

# Terminal 4: Frontend Onboarding (can run parallel with signup)
$ cd web
$ # T054: Create onboarding.tsx page
$ # T055-T058: Add form fields
$ # T059-T062: Validation and submission
```

After all parallel work completes, integration tasks (T063-T065) bring it together.

---

## Implementation Strategy

### Recommended MVP Scope

**MVP = User Story 1 ONLY**: Browse Educational Content

This provides immediate value - users can access bilingual educational content with proper RTL layout. Demonstrates core platform functionality without requiring authentication complexity.

**Estimated Effort**: 4-6 days (Setup + Foundational + US1)

### Incremental Delivery Approach

1. **Week 1**: Setup (Phase 1) + Foundational (Phase 2) + User Story 1 (Phase 3)
   - Deliverable: Working bilingual educational platform
   - Demo: Show content browsing, language switching, RTL layout

2. **Week 2**: User Story 2 (Phase 4)
   - Deliverable: Add signup and onboarding
   - Demo: New user can create account and complete profile

3. **Week 3**: User Story 3 (Phase 5) + Polish (Phase 6)
   - Deliverable: Complete authentication flow with session persistence
   - Demo: Returning user login, logout, production deployment

### Success Metrics

- **Task Completion**: 110 total tasks
- **MVP (US1 only)**: 39 tasks (T001-T039)
- **Full Feature**: 110 tasks (all 3 user stories + polish)
- **Parallel Opportunities**: 25+ tasks can run in parallel within appropriate phases
- **Independent Test Criteria**: 3 user stories, each independently testable

### Validation Checkpoints

After each phase:
- **Setup**: Verify project structure created, linting configured
- **Foundational**: Verify database connected, auth configured, Docusaurus running
- **US1**: Verify content browsing works in both languages with RTL
- **US2**: Verify signup → onboarding → profile saved flow works
- **US3**: Verify login → session persist → logout flow works
- **Polish**: Verify production deployment, Lighthouse scores ≥90

---

## Summary

- **Total Tasks**: 110
- **Setup Phase**: 7 tasks
- **Foundational Phase**: 18 tasks (BLOCKS all user stories)
- **User Story 1**: 14 tasks (Browse Content - MVP)
- **User Story 2**: 26 tasks (Signup & Onboarding)
- **User Story 3**: 21 tasks (Login & Session)
- **Polish Phase**: 24 tasks (Deployment & Validation)
- **Parallel Opportunities**: 25+ tasks across all phases
- **Suggested MVP**: User Story 1 only (39 tasks total including Setup and Foundational)
- **Estimated Timeline**: 10-14 days for full feature (3 phases), 4-6 days for MVP

**Format Validation**: ✅ All tasks follow checklist format (checkbox, ID, labels, file paths)

**Next Steps**: 
1. Begin with Setup phase (T001-T007)
2. Complete Foundational phase (T008-T025) - this BLOCKS all user stories
3. Start with User Story 1 (MVP) or proceed with all 3 user stories in parallel if team capacity allows
4. Close with Polish phase for production deployment
