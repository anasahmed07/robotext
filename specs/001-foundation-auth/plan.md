# Implementation Plan: Foundation & Authentication

**Branch**: `001-foundation-auth` | **Date**: 2025-12-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-foundation-auth/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Deploy the Robotext foundation comprising a Docusaurus-based educational platform with full bilingual support (English/Urdu with RTL), custom theming (Neon Green accent, Dark/Light modes), and an Express.js Authentication API connected to Neon PostgreSQL database. The system enables learners to browse educational content, create accounts, complete onboarding to capture knowledge base and hardware specifications, and authenticate for future personalized features.

**Technical Approach**: Headless authentication pattern with static frontend (Docusaurus on GitHub Pages) and dynamic backend (Express.js on Railway), communicating via REST API. Client-side React Context manages session state.

## Technical Context

**Language/Version**: 
- Frontend: TypeScript 5.x with React 18 (via Docusaurus 3.x)
- Backend: TypeScript 5.x with Node.js 18+

**Primary Dependencies**:
- **Frontend**: Docusaurus v3, React 18, Tailwind CSS v3, Axios/Fetch for API calls
- **Backend**: Express.js, better-auth (authentication), Drizzle ORM, Zod (validation)
- **Database**: Neon (Serverless PostgreSQL)

**Storage**: Neon PostgreSQL (users, sessions, user_profiles tables)

**Testing**:
- **Frontend**: Jest + React Testing Library
- **Backend**: Mocha/Chai or Jest for API endpoints
- **Integration**: Contract tests for API endpoints

**Target Platform**: Web (Desktop + Mobile responsive)

**Project Type**: Web application (frontend + backend split)

**Performance Goals**:
- Frontend: Lighthouse ≥90 (Performance, Accessibility, SEO)
- Backend: <200ms p95 for authentication endpoints
- API: <500ms average response time
- Language switch: <1s complete UI update

**Constraints**:
- Frontend must be deployable to GitHub Pages (static hosting)
- Backend must be serverless-compatible (Railway deployment)
- Database must support Neon's serverless scaling model
- RTL layout must work without JavaScript (CSS-based)

**Scale/Scope**:
- Initial: 100-1000 concurrent users
- Content: 4 modules, 6 chapters, scaffolded structure
- User profiles: ~10KB per user (knowledge base + hardware specs)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Educational Excellence**: Content scaffolding follows curriculum structure (4 modules)
- [x] **Curriculum Structure**: Directory structure aligned with 4-module, 13-week outline
- [x] **Content Standards**: Phase 1 creates structure; full content generation is separate
- [x] **Bilingual Accessibility**: Docusaurus i18n configured for English/Urdu with RTL
- [ ] **AI-Native Architecture**: N/A for Phase 1 (deferred to Chat API phase)
- [x] **Separation of Concerns**: Clear boundaries - Docusaurus (frontend), Express (Auth API)
- [x] **Access Control**: Two-tier model prepared (open content, auth-gated features ready)
- [x] **Content as Code**: MDX format via Docusaurus
- [x] **Mobile-First**: Tailwind CSS with responsive design
- [x] **Observability**: Structured logging planned (winston/pino), request tracking
- [x] **Technology Stack**: Docusaurus, Node.js/Express, better-auth, Neon, Drizzle ORM
- [x] **Code Quality**: ESLint + Prettier (TypeScript), type safety enforced
- [x] **Performance**: <200ms Auth API, <500ms average, Lighthouse ≥90
- [x] **Security**: HTTPS (Railway + GitHub Pages), env vars, password hashing, input validation

**Status**: ✅ All applicable gates passed. AI-Native Architecture deferred to future phase as planned.

## Project Structure

### Documentation (this feature)

```text
specs/001-foundation-auth/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Technology research & decisions
├── data-model.md        # Database schema & entities
├── quickstart.md        # Local development guide
├── contracts/           # API contracts (OpenAPI specs)
│   ├── auth-api.yaml
│   └── user-api.yaml
├── checklists/
│   └── requirements.md  # Spec quality validation
└── diagrams/            # Architecture diagrams (if created)
```

### Source Code (repository root)

```text
web/                     # Docusaurus Frontend
├── docs/                # Educational content (MDX)
│   ├── intro.md
│   ├── 01-robotic-nervous-system/
│   ├── 02-digital-twin/
│   ├── 03-ai-robot-brain/
│   └── 04-vla/
├── i18n/                # Urdu translations
│   └── ur/
│       ├── docusaurus-plugin-content-docs/
│       └── code.json
├── src/
│   ├── components/      # React components
│   │   ├── AuthContext.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── LanguageToggle.tsx
│   ├── pages/           # Custom pages
│   │   ├── index.tsx    # Landing page
│   │   ├── onboarding.tsx
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── css/
│   │   └── custom.css   # Theme colors
│   └── theme/           # Swizzled components
│       └── Root.tsx     # Auth context provider
├── static/              # Static assets
├── docusaurus.config.ts
├── tailwind.config.js
├── package.json
└── tsconfig.json

api/                     # Express.js Backend
├── src/
│   ├── index.ts         # Server entry point
│   ├── auth/            # better-auth configuration
│   │   ├── config.ts
│   │   └── middleware.ts
│   ├── routes/
│   │   ├── auth.ts      # Auth routes
│   │   └── user.ts      # User profile routes
│   ├── db/
│   │   ├── schema.ts    # Drizzle schema
│   │   ├── migrations/
│   │   └── client.ts    # Neon connection
│   ├── middleware/
│   │   ├── cors.ts
│   │   ├── logger.ts
│   │   └── errorHandler.ts
│   └── utils/
│       └── validation.ts # Zod schemas
├── tests/
│   ├── integration/
│   │   ├── auth.test.ts
│   │   └── user.test.ts
│   └── unit/
├── drizzle.config.ts
├── package.json
├── tsconfig.json
└── railway.json         # Railway deployment config

.github/
└── workflows/
    ├── deploy-frontend.yml  # Docusaurus → GitHub Pages
    └── deploy-backend.yml   # API → Railway (optional, Railway auto-deploys)

shared/                  # Shared types (optional)
└── types/
    └── user.ts
```

**Structure Decision**: Web application (Option 2) selected due to clear frontend/backend separation. Docusaurus frontend serves static content, Express backend handles dynamic authentication and user data.

## Complexity Tracking

> **No violations detected - this section not required**

All architecture decisions align with constitution principles. Clear service separation, mandated technology stack, and appropriate testing frameworks.

## Phase 0: Research & Technology Decisions

**See**: [research.md](./research.md) for detailed technology analysis and best practices.

**Key Decisions**:
1. **Authentication Library**: better-auth over Passport.js or NextAuth
2. **ORM Choice**: Drizzle over Prisma or TypeORM
3. **Deployment Strategy**: Split hosting (GitHub Pages + Railway)
4. **i18n Implementation**: Docusaurus built-in i18n vs. custom solution
5. **State Management**: React Context vs. Redux/Zustand

## Phase 1: Design Artifacts

**Generated**:
- [data-model.md](./data-model.md) - Database schema and entity relationships
- [contracts/auth-api.yaml](./contracts/auth-api.yaml) - Authentication endpoints
- [contracts/user-api.yaml](./contracts/user-api.yaml) - User profile endpoints
- [quickstart.md](./quickstart.md) - Local development setup guide

## Implementation Phases

### Phase 1: Backend Foundation (API + Database)

**Duration**: 3-5 days

**Tasks**:
1. Initialize Express.js project with TypeScript
2. Configure Drizzle ORM and connect to Neon database
3. Define database schema (users, sessions, user_profiles)
4. Run migrations and verify tables created
5. Implement better-auth configuration
6. Create authentication routes (signup, signin, signout, get-session)
7. Create user profile routes (GET /api/user/me, POST /api/user/onboarding)
8. Add middleware (CORS, logging, error handling)
9. Write integration tests for all endpoints
10. Deploy to Railway with environment variables

**Deliverables**:
- Functioning API at Railway URL
- All auth flows tested (signup, login, logout)
- User profile CRUD operations working
- API documentation (Postman collection or OpenAPI docs)

### Phase 2: Frontend Foundation (Docusaurus Shell)

**Duration**: 4-6 days

**Tasks**:
1. Initialize Docusaurus project with TypeScript
2. Configure Tailwind CSS
3. Set up i18n for English and Urdu
4. Verify RTL layout switching works correctly
5. Implement custom theme (Neon Green, Dark/Light modes)
6. Create content directory structure (4 modules)
7. Build Landing Page with Hero section
8. Implement AuthContext for session management
9. Create Login/Signup pages
10. Build Onboarding page with form
11. Implement ProtectedRoute component
12. Connect frontend to backend API (CORS configured)
13. Test full authentication flow end-to-end
14. Achieve Lighthouse ≥90 scores

**Deliverables**:
- Docusaurus site with bilingual support (English/Urdu)
- Custom theming applied
- Authentication flow working (signup → onboarding → content)
- Content scaffolding in place (4 module directories)

### Phase 3: Integration & Deployment

**Duration**: 2-3 days

**Tasks**:
1. Configure GitHub Actions for Docusaurus build → GitHub Pages
2. Set up custom domain (if applicable)
3. Verify Railway backend is accessible from GitHub Pages frontend
4. Test CORS configuration in production
5. Test full user journey in production environment
6. Verify Lighthouse scores in production
7. Test RTL layout on mobile devices
8. Document deployment process
9. Create rollback procedures

**Deliverables**:
- Production frontend: GitHub Pages
- Production backend: Railway
- CI/CD pipelines functioning
- Deployment documentation complete

## Testing Strategy

### Frontend Tests
- **Unit Tests**: React components (AuthContext, ProtectedRoute)
- **Integration Tests**: Page flows (Login → Onboarding → Content)
- **E2E Tests**: Full user journeys (Playwright or Cypress)
- **Visual Regression**: Theme switching, RTL layout

### Backend Tests
- **Unit Tests**: Validation functions, utility functions
- **Integration Tests**: API endpoints with test database
- **Contract Tests**: API responses match OpenAPI spec
- **Load Tests**: Authentication endpoints under concurrent load

### Manual Testing Checklist
- [ ] Signup flow completes successfully
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials fails appropriately
- [ ] Logout terminates session
- [ ] Onboarding form saves data correctly
- [ ] Language toggle switches English ↔ Urdu
- [ ] RTL layout renders correctly in Urdu
- [ ] Dark/Light theme toggle works
- [ ] Session persists across page refreshes
- [ ] Protected routes redirect unauthenticated users
- [ ] Mobile responsive design works on iPhone/Android
- [ ] Lighthouse scores ≥90 for both languages

## Deployment Configuration

### Environment Variables

**Backend (Railway)**:
```bash
DATABASE_URL=postgresql://user:pass@neon-host/dbname
AUTH_SECRET=<generate-strong-secret>
FRONTEND_URL=https://username.github.io/robotext
NODE_ENV=production
PORT=3000
```

**Frontend (Docusaurus)**:
```bash
# docusaurus.config.ts
BACKEND_API_URL=https://your-app.railway.app
```

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: cd web && npm ci
      - name: Build
        run: cd web && npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web/build
```

### Railway Configuration

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd api && npm ci && npm run build"
  },
  "deploy": {
    "startCommand": "cd api && npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Risk Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Neon database cold starts causing timeouts | High | Medium | Implement connection pooling, add retry logic |
| CORS issues between GitHub Pages and Railway | High | Low | Test CORS extensively in staging, configure allowed origins correctly |
| RTL layout breaks with certain content | Medium | Medium | Test RTL thoroughly, use CSS logical properties |
| Urdu translation incomplete | Medium | High | Implement fallback to English, mark missing translations clearly |
| better-auth compatibility issues | High | Low | Stick to stable better-auth version, maintain test coverage |
| GitHub Pages build failures | Medium | Low | Test build locally, pin Docusaurus version |
| Railway deployment downtime | Medium | Low | Monitor health checks, set up status page |

## Next Steps

After completing Phase 1 Foundation & Authentication:

1. **Run `/sp.tasks`** to generate detailed task breakdown
2. **Create ADR** for key technology choices (better-auth, Drizzle, split hosting)
3. **Set up monitoring** (LogRocket, Sentry, or similar)
4. **Plan Phase 2** (Chat API + RAG pipeline)
5. **Begin content generation** for Module 1 (ROS 2 Fundamentals)
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
