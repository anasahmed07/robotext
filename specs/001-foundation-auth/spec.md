# Feature Specification: Foundation & Authentication

**Feature Branch**: `001-foundation-auth`  
**Created**: 2025-12-06  
**Status**: Draft  
**Input**: User description: "Phase 1 Specification: Foundation & Authentication - Deploy Docusaurus shell with i18n, custom theming, and Authentication API (better-auth) connected to Neon DB"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Browse Educational Content (Priority: P1)

A learner visits the Robotext platform and can immediately browse all educational content in their preferred language (English or Urdu) with appropriate layout direction (LTR/RTL).

**Why this priority**: Core value proposition - making Physical AI education accessible. Without content browsing, there is no educational platform.

**Independent Test**: Can be fully tested by navigating to the site, toggling language between English and Urdu, and verifying content renders correctly with proper RTL mirroring for Urdu.

**Acceptance Scenarios**:

1. **Given** a learner visits the landing page, **When** they view the page, **Then** they see a clean Hero section with "Get Started" and "Login/Signup" buttons in English (default)
2. **Given** a learner is viewing content in English, **When** they switch to Urdu, **Then** the entire UI mirrors to RTL layout and content displays in Urdu
3. **Given** a learner clicks "Get Started", **When** the navigation completes, **Then** they are directed to Module 1 content
4. **Given** a learner browses the course outline, **When** they view the structure, **Then** they see 4 modules organized with the correct weekly breakdown

---

### User Story 2 - Create Account & Complete Onboarding (Priority: P2)

A new learner creates an account and completes onboarding by providing their programming background, robotics familiarity, and hardware specifications to enable personalized learning experiences.

**Why this priority**: Enables personalized features (quizzes, chatbot responses tailored to user's knowledge level) and future content adaptation based on hardware capabilities.

**Independent Test**: Can be fully tested by signing up with email/password, completing the onboarding form with knowledge base and hardware details, and verifying profile data is saved.

**Acceptance Scenarios**:

1. **Given** a visitor clicks "Login/Signup", **When** they choose to sign up, **Then** they are presented with email/password registration form
2. **Given** a user completes signup, **When** registration succeeds, **Then** they are redirected to /onboarding page
3. **Given** a user is on the onboarding page, **When** they view the form, **Then** they see fields for programming languages, ROS familiarity, robotics knowledge, and hardware specs
4. **Given** a user submits the onboarding form, **When** submission completes, **Then** they are redirected to /docs/intro and their profile data is saved
5. **Given** a user has completed onboarding, **When** they return to the site later, **Then** they are not prompted for onboarding again

---

### User Story 3 - Authenticate and Access Content (Priority: P3)

A returning learner logs in to access their personalized experience and picks up where they left off.

**Why this priority**: Enables session persistence and prepares for gated features (chatbot, personalized quizzes) in future phases. Creates continuous learning experience.

**Independent Test**: Can be fully tested by logging in with existing credentials, verifying session persists across page refreshes, and logging out successfully.

**Acceptance Scenarios**:

1. **Given** a returning user clicks "Login/Signup", **When** they choose to log in, **Then** they are presented with email/password login form
2. **Given** a user enters valid credentials, **When** they submit the login form, **Then** they are logged in and redirected to the content
3. **Given** a logged-in user refreshes the page, **When** the page reloads, **Then** they remain logged in (session persists)
4. **Given** a logged-in user clicks logout, **When** logout completes, **Then** their session is terminated and they are redirected to the landing page
5. **Given** a logged-in user, **When** they view any page, **Then** the UI shows their logged-in state (e.g., profile icon instead of "Login/Signup")

---

### Edge Cases

- What happens when a user selects Urdu but content translation is incomplete? (System shows available Urdu content and falls back to English for missing translations with clear indicator)
- How does the system handle invalid email formats during signup? (Client-side validation shows error message before submission)
- What happens if a user abandons onboarding midway? (Session is created but profile is incomplete; user is re-prompted on next login)
- How does the system handle concurrent sessions? (Multiple sessions allowed; logout from one device doesn't affect others)
- What happens if database connection fails during authentication? (User sees friendly error message; authentication is retried with exponential backoff)
- How does the system handle RTL layout for code examples in Urdu content? (Code blocks remain LTR even in RTL mode, as code is language-agnostic)

## Requirements *(mandatory)*

### Functional Requirements

**Content & Internationalization**

- **FR-001**: System MUST serve all content in both English (LTR) and Urdu (RTL)
- **FR-002**: System MUST automatically apply `dir="rtl"` to the `<html>` tag when Urdu is selected
- **FR-003**: System MUST mirror the entire UI layout when RTL is active (navigation, buttons, margins, padding)
- **FR-004**: System MUST preserve language preference across sessions (stored in browser localStorage)
- **FR-005**: System MUST display a language toggle that is accessible from all pages

**Theming & UI**

- **FR-006**: System MUST support both Light and Dark themes
- **FR-007**: System MUST use Neon Green (#00e599) as primary accent color
- **FR-008**: System MUST use Grey Black (#18191b) background in Dark Mode
- **FR-009**: System MUST use White (#ffffff) background in Light Mode
- **FR-010**: Landing page MUST include Hero section with "Get Started" and "Login/Signup" buttons
- **FR-011**: "Get Started" button MUST navigate to Module 1 content
- **FR-012**: "Login/Signup" button MUST trigger authentication flow

**Content Structure**

- **FR-013**: System MUST create directory structure for 4 modules: Robotic Nervous System (ROS 2), Digital Twin (Gazebo & Unity), AI-Robot Brain (NVIDIA Isaac), Vision-Language-Action (VLA)
- **FR-014**: System MUST organize content according to the 13-week curriculum structure defined in the constitution

**Authentication**

- **FR-015**: System MUST allow users to sign up using email and password
- **FR-016**: System MUST validate email format before account creation
- **FR-017**: System MUST hash and securely store passwords (never plaintext)
- **FR-018**: System MUST allow users to log in with email and password
- **FR-019**: System MUST maintain user sessions across page refreshes
- **FR-020**: System MUST allow users to log out and terminate their session
- **FR-021**: System MUST check user authentication status on initial page load

**Onboarding & User Profile**

- **FR-022**: System MUST redirect new users to /onboarding page after successful signup
- **FR-023**: Onboarding form MUST collect programming languages known (multi-select or text input)
- **FR-024**: Onboarding form MUST collect ROS familiarity level (Beginner, Intermediate, Advanced)
- **FR-025**: Onboarding form MUST collect robotics knowledge level (Beginner, Intermediate, Advanced)
- **FR-026**: Onboarding form MUST collect hardware specifications (GPU, RAM, CPU)
- **FR-027**: System MUST save user profile data to database upon onboarding completion
- **FR-028**: System MUST redirect users to /docs/intro after onboarding completion
- **FR-029**: System MUST not re-prompt completed onboarding users on subsequent logins

**API & Integration**

- **FR-030**: Frontend MUST communicate with backend via REST API
- **FR-031**: System MUST provide `/api/user/me` endpoint to retrieve current user session and profile
- **FR-032**: System MUST provide `/api/user/onboarding` endpoint to save user profile data
- **FR-033**: Authentication API MUST be accessible from the Docusaurus client

**Data Persistence**

- **FR-034**: System MUST store user accounts in database (users table)
- **FR-035**: System MUST store user sessions in database (sessions table)
- **FR-036**: System MUST store user profile data in separate table linked to user ID
- **FR-037**: User profile MUST store programming_languages as array/JSON
- **FR-038**: User profile MUST store hardware_specs as JSON object

### Key Entities

- **User**: Represents a learner account with authentication credentials (email, hashed password), creation timestamp, and status
- **Session**: Represents an active authentication session linking user to their browser, with expiration time
- **UserProfile**: Represents learner's knowledge base and hardware capabilities, including programming languages (array), ROS familiarity (enum), robotics knowledge (enum), hardware specifications (JSON)
- **Module**: Represents one of four educational modules with title, description, sequence number, and content path
- **Content**: Represents educational material (chapters, sections) with bilingual versions, module association, and ordering

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Learners can access the landing page and browse content within 3 seconds of initial page load
- **SC-002**: Language switching between English and Urdu completes within 1 second with full UI mirroring
- **SC-003**: New users can complete signup and onboarding in under 5 minutes
- **SC-004**: Returning users can log in and access content within 10 seconds
- **SC-005**: The site achieves Lighthouse performance score ≥90 for both languages
- **SC-006**: The site achieves Lighthouse accessibility score ≥90 for both LTR and RTL modes
- **SC-007**: RTL layout renders correctly in Urdu mode with all UI elements properly mirrored
- **SC-008**: Dark and Light themes render correctly with specified color values
- **SC-009**: Authentication sessions persist correctly across browser refreshes
- **SC-010**: User profile data is accurately saved and retrieved after onboarding
- **SC-011**: All 4 module directory structures are created and navigable
- **SC-012**: Frontend successfully communicates with backend API with <500ms average response time

## Assumptions

1. **Email-only authentication**: Initial phase uses email/password only; social auth (Google, GitHub) can be added in future iterations
2. **Single onboarding session**: Users complete onboarding in one session; partial completion requires restarting the form
3. **English-first content**: Initial deployment may have incomplete Urdu translations; fallback to English is acceptable with clear indicators
4. **Hardware specs format**: Users provide hardware specifications in free-form JSON or structured fields (GPU model, RAM amount, CPU type)
5. **Session duration**: Sessions remain active for 30 days by default (standard web app behavior)
6. **No password reset**: Password recovery flow is deferred to future phase; users contact support for password reset
7. **Content scaffolding only**: Phase 1 creates directory structure and placeholder content; full educational content generation is separate effort
8. **Deployment readiness**: Both frontend (GitHub Pages) and backend (Railway) deployment configurations are included in Phase 1

## Dependencies

- Neon database must be provisioned and accessible before backend deployment
- GitHub repository must have GitHub Pages enabled for frontend deployment
- Railway account must be configured with environment variables (DATABASE_URL, AUTH_SECRET)
- Domain/subdomain configuration if custom domain is required (otherwise use GitHub Pages default domain)

## Out of Scope (Phase 1)

- Full educational content for all 4 modules (only structure created)
- AI chatbot and RAG pipeline (deferred to future phase)
- Personalized quizzes (deferred to future phase)
- Progress tracking (deferred to future phase)
- Social authentication (Google, GitHub OAuth)
- Password reset/recovery flow
- Email verification for new accounts
- Admin panel or content management system
- Mobile native applications (web-responsive only)
