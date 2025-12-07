---
id: 002
title: Foundation Auth Implementation Planning
stage: plan
date: 2025-12-06
surface: agent
model: Claude Sonnet 4.5
feature: 001-foundation-auth
branch: 001-foundation-auth
user: anasahmed07
command: /sp.plan
labels: ["plan", "architecture", "docusaurus", "better-auth", "drizzle", "neon"]
links:
  spec: specs/001-foundation-auth/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-foundation-auth/plan.md
  - specs/001-foundation-auth/research.md
  - specs/001-foundation-auth/data-model.md
  - specs/001-foundation-auth/contracts/auth-api.yaml
  - specs/001-foundation-auth/contracts/user-api.yaml
  - specs/001-foundation-auth/quickstart.md
tests:
  - none
---

## Prompt

Follow instructions in [sp.plan.prompt.md](file:///d%3A/Anas/robotext/.github/prompts/sp.plan.prompt.md).
Technical Implementation Plan: Robotext Phase 1Phase: Foundation & AuthenticationGoal: Establish the Docusaurus shell, Neon Database, and Express Authentication API.1. Technology Stack & EnvironmentComponentTechnologyRationaleFrontendDocusaurus v3 (React 18)Optimized for content-heavy documentation, built-in i18n.StylingTailwind CSS v3Rapid UI development, easily customizable for the Neon/Dark theme.LanguageTypeScriptType safety across full stack (Frontend & Backend).BackendNode.js + ExpressFlexible API server for custom business logic beyond standard auth.Authbetter-authModern, type-safe auth library with plugin support.DatabaseNeon (PostgreSQL)Serverless scaling, branching support for dev/prod environments.ORMDrizzle ORMLightweight, type-safe, best-in-class TypeScript support.HostingGitHub Pages (Web) / Railway (API)Cost-effective, high-performance split hosting.2. System ArchitectureThe system uses a Headless Auth pattern:Docusaurus serves the static shell and interactive React components.Express API handles all dynamic data (Auth, User Profiles).Neon DB stores persistent state.Client-Side Integration: React Context (AuthContext) manages session state via REST calls to the API.3. Database Schema Design (Drizzle ORM)We will use Drizzle to define the schema in TypeScript. This serves as the single source of truth.A. Core Auth Tables (better-auth standard)user: id, email, name, emailVerified, image, createdAt, updatedAtsession: id, userId, token, expiresAt, ipAddress, userAgentaccount: id, userId, accountId, providerId, accessToken, etc.verification: id, identifier, value, expiresAtB. Robotext Extension: user_profilesThis table stores the onboarding data required by the specification.// db/schema.ts
import { pgTable, text, uuid, jsonb, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth-schema"; // imported from better-auth generation

export const proficiencyEnum = pgEnum("proficiency", ["Beginner", "Intermediate", "Advanced"]);

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id).notNull().unique(), // 1:1 relation
  
  // Knowledge Base
  programmingLanguages: jsonb("programming_languages").$type<string[]>().default([]),
  rosFamiliarity: proficiencyEnum("ros_familiarity").default("Beginner"),
  roboticsKnowledge: proficiencyEnum("robotics_knowledge").default("Beginner"),
  
  // Hardware Specs (for code example tailoring)
  hardwareSpecs: jsonb("hardware_specs").$type<{
    gpu?: string;
    ram?: string;
    cpu?: string;
    os?: string;
  }>(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
4. API Implementation PlanA. Authentication Routes (Handled by better-auth)POST /api/auth/sign-upPOST /api/auth/sign-inPOST /api/auth/sign-outGET /api/auth/get-sessionB. User Data RoutesGET /api/user/meMiddleware: requireAuthLogic: Fetch user session + join user_profiles table.Response: { user: { ...session.user }, profile: { ...userProfiles } }POST /api/user/onboardingMiddleware: requireAuthValidation: Zod schema validation for hardware specs and enums.Logic: Upsert into user_profiles linked to req.session.userId.5. Frontend Implementation Plan (Docusaurus)A. Scaffolding & ConfigurationInitialize: npx create-docusaurus@latest web classic --typescriptTailwind: Install tailwindcss, postcss, autoprefixer. Configure docusaurus-plugin-postcss.i18n Config (docusaurus.config.ts):i18n: {
  defaultLocale: 'en',
  locales: ['en', 'ur'],
  localeConfigs: {
    en: { label: 'English', direction: 'ltr' },
    ur: { label: 'Urdu', direction: 'rtl' }, // Docusaurus handles dir="rtl" automatically
  },
}
B. Theme ImplementationColor Palette: define CSS variables in src/css/custom.css for Neon Green (#00e599) and Dark Mode (#18191b).Swizzling: Eject the Root component (or use a layout wrapper) to provide the AuthContext.C. Client-Side Auth LogicAuthContext:useAuth() hook.useEffect to call /api/auth/get-session on mount.Global state: isAuthenticated, isLoading, user.Protected Routes:Create a <ProtectedRoute> wrapper component.If !isAuthenticated, redirect to login.If isAuthenticated but no profile data, redirect to /onboarding.D. Onboarding Page (/src/pages/onboarding.tsx)Design: A clean, multi-step form.Logic:Fetch user (redirect if not logged in).Collect data (Languages, ROS level, Hardware).POST to /api/user/onboarding.Redirect to /docs/intro (Module 1).6. Step-by-Step Development RoadmapRepository SetupInitialize Monorepo: /web (Docusaurus) and /api (Express).Configure ESLint/Prettier for TypeScript.Backend FoundationSet up Neon Database project.Initialize Drizzle ORM and generate migration files.Implement Express server with better-auth.Create user_profiles API endpoints.Test via Postman/Curl.Frontend FoundationInitialize Docusaurus.Configure Tailwind & Themes.Configure i18n (English/Urdu).Verify RTL layout switching.IntegrationImplement AuthContext in Frontend.Build Login/Signup pages (using better-auth client client).Build Onboarding Form.Connect Frontend to Backend API (proxy or CORS setup).DeploymentBackend: Deploy to Railway (connect GitHub repo, set env vars).Frontend: Configure GitHub Actions for Docusaurus build -> gh-pages.

## Response snapshot

Created comprehensive implementation plan for Foundation & Authentication with complete architecture, technology decisions, and design artifacts.

**Artifacts Generated**:

1. **plan.md**: Complete implementation plan including:
   - Technical context (TypeScript, Docusaurus, Express, better-auth, Drizzle, Neon)
   - Constitution Check (14 gates, all passed except N/A AI-Native for Phase 1)
   - Project structure (web/ and api/ directories)
   - 3 implementation phases (Backend, Frontend, Integration & Deployment)
   - Testing strategy (unit, integration, E2E, manual checklist)
   - Deployment configuration (env vars, GitHub Actions, Railway)
   - Risk mitigation (7 risks identified with mitigation plans)

2. **research.md**: Technology research covering 8 decision areas:
   - better-auth over Passport.js/NextAuth (TypeScript-first, plugin architecture)
   - Drizzle ORM over Prisma/TypeORM (lightweight, Neon-optimized)
   - Split hosting (GitHub Pages + Railway) over Vercel/AWS
   - Docusaurus i18n over react-i18next (native RTL support)
   - React Context over Redux (sufficient for auth state)
   - Tailwind CSS over plain CSS/styled-components (RTL support, dark mode)
   - Zod over Yup/Joi (TypeScript inference, shared schemas)
   - Jest + RTL + Mocha (industry standard, user-centric)

3. **data-model.md**: Complete database schema:
   - 5 entities (user, session, account, verification, user_profiles)
   - ERD diagrams, field definitions, validation rules, state transitions
   - Drizzle ORM schema code, SQL migrations
   - Sample data, data access patterns
   - Performance and security considerations

4. **contracts/auth-api.yaml**: OpenAPI 3.0 spec for authentication:
   - 4 endpoints (sign-up, sign-in, sign-out, get-session)
   - Request/response schemas, error codes
   - Security schemes (Bearer token)

5. **contracts/user-api.yaml**: OpenAPI 3.0 spec for user profile:
   - 2 endpoints (GET /user/me, POST /user/onboarding)
   - UserProfile schema with knowledge base fields
   - OnboardingInput validation schema

6. **quickstart.md**: Local development guide:
   - Prerequisites, environment setup
   - Database migrations, running locally
   - Testing the flow (signup, onboarding, language switch)
   - Development workflow, troubleshooting
   - Useful commands reference

**Architecture Highlights**:
- Headless auth pattern (static frontend + dynamic backend)
- TypeScript full-stack (type safety across web + api)
- Neon serverless PostgreSQL with Drizzle ORM
- Docusaurus i18n with automatic RTL for Urdu
- Better-auth for modern authentication
- Split hosting (GitHub Pages + Railway)

**Ready For**: `/sp.tasks` to generate detailed implementation task breakdown

## Outcome

- ✅ Impact: Comprehensive architecture plan with complete technology stack, database schema, API contracts, and development guide for Phase 1 foundation
- 🧪 Tests: Testing strategy defined (Jest + RTL frontend, Mocha + Chai backend, integration tests, manual checklist)
- 📁 Files: 6 artifacts created (plan, research, data-model, 2 API contracts, quickstart guide)
- 🔁 Next prompts: Run `/sp.tasks` for task breakdown, `/sp.adr` for technology decision ADRs (better-auth, Drizzle, split hosting)
- 🧠 Reflection: Plan successfully bridges specification requirements with concrete technical implementation. Research document resolves all technology uncertainties. Data model supports both standard auth and Robotext-specific onboarding. Ready for task generation.

## Evaluation notes (flywheel)

- Failure modes observed: None (all planning artifacts generated successfully)
- Graders run and results (PASS/FAIL): Manual validation PASS - Constitution Check 13/14 passed (AI-Native N/A for Phase 1), all 8 technology decisions documented with rationale, database schema includes migrations and sample data, API contracts valid OpenAPI 3.0, quickstart guide comprehensive
- Prompt variant (if applicable): Incorporated detailed technical implementation plan from user prompt into formal plan structure
- Next experiment (smallest change to try): Monitor whether 3 implementation phases are sufficient or need further subdivision during task generation; validate that Drizzle ORM setup matches better-auth requirements during implementation
