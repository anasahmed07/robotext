# Research: Foundation & Authentication Technology Decisions

**Feature**: Foundation & Authentication  
**Date**: 2025-12-06  
**Status**: Complete

## Overview

This document records technology research, decisions, and rationale for the Robotext Phase 1 foundation infrastructure.

## 1. Authentication Library Selection

### Decision: better-auth

**Alternatives Considered**:
- **Passport.js**: Mature, extensive strategy ecosystem
- **NextAuth.js**: Popular in Next.js ecosystem
- **Auth0 SDK**: Managed service
- **better-auth**: Modern, type-safe, plugin-based

**Rationale**:
- **TypeScript-first**: Better-auth is built with TypeScript, providing excellent type safety across the entire auth flow
- **Plugin Architecture**: Extensible for future needs (social auth, 2FA, magic links)
- **Framework Agnostic**: Works with Express.js without tight coupling to Next.js
- **Modern API Design**: Clean, promise-based API matching modern Node.js patterns
- **Active Development**: Regular updates, responsive maintainers

**Rejected Alternatives**:
- Passport.js: Callback-based API feels dated, requires more boilerplate
- NextAuth.js: Tightly coupled to Next.js, not ideal for Express backend
- Auth0: Adds external dependency and cost; want self-hosted solution

**Best Practices**:
- Use environment variables for `AUTH_SECRET`
- Implement rate limiting on auth endpoints (5 attempts per 15 minutes)
- Enable CSRF protection for state-changing operations
- Store sessions in database (not in-memory) for horizontal scaling
- Implement proper password hashing (bcrypt with cost factor 12+)

## 2. ORM Choice

### Decision: Drizzle ORM

**Alternatives Considered**:
- **Prisma**: Most popular TypeScript ORM
- **TypeORM**: Mature decorator-based ORM
- **Kysely**: Type-safe SQL query builder
- **Drizzle ORM**: Lightweight, type-safe, SQL-like

**Rationale**:
- **Neon Compatibility**: Excellent support for Neon's serverless PostgreSQL
- **Lightweight**: Minimal runtime overhead, no heavy ORM machinery
- **SQL-like Syntax**: Easier to optimize queries, less abstraction
- **Type Safety**: Fully typed schema → queries without code generation step
- **Edge Runtime Compatible**: Works in serverless/edge environments
- **Migration Support**: Built-in migration tool (drizzle-kit)

**Rejected Alternatives**:
- Prisma: Heavier runtime, requires code generation step, slower cold starts
- TypeORM: Decorator-based API less idiomatic for modern TypeScript
- Kysely: More verbose than Drizzle for common patterns

**Best Practices**:
- Define schema in TypeScript (single source of truth)
- Use `drizzle-kit` for migrations (never manual SQL)
- Use prepared statements for frequently-run queries
- Implement connection pooling for Neon
- Use transactions for multi-table operations (onboarding flow)

## 3. Deployment Strategy

### Decision: Split Hosting (GitHub Pages + Railway)

**Alternatives Considered**:
- **Vercel (Frontend + Backend)**: Unified platform
- **Netlify + Railway**: Split hosting
- **AWS Amplify**: Fully managed AWS solution
- **GitHub Pages + Railway**: Selected approach

**Rationale**:
- **Cost Effective**: GitHub Pages free for public repos, Railway generous free tier
- **Performance**: GitHub Pages CDN for static content, Railway for dynamic API
- **Simplicity**: Docusaurus designed for GitHub Pages, Railway simple Express deployment
- **Separation of Concerns**: Frontend and backend can scale independently
- **CI/CD Integration**: GitHub Actions native for Pages, Railway auto-deploys from Git

**Rejected Alternatives**:
- Vercel: Serverless functions have cold start latency, GitHub Pages already available
- AWS Amplify: More complex setup, higher learning curve
- Self-hosted VPS: Requires maintenance, less cost-effective for MVP

**Best Practices**:
- Use custom domain with HTTPS for production
- Configure CORS carefully (whitelist GitHub Pages origin)
- Implement health check endpoint for Railway monitoring
- Set up status page for API availability
- Use environment-specific configurations (staging vs. production)

## 4. i18n Implementation

### Decision: Docusaurus Built-in i18n

**Alternatives Considered**:
- **react-i18next**: Popular React i18n library
- **next-intl**: Next.js focused
- **Docusaurus i18n**: Built-in solution
- **Custom solution**: Roll our own

**Rationale**:
- **Native Support**: Docusaurus has first-class i18n with RTL support
- **File-based**: Translations organized in `/i18n/{locale}/` directories
- **Automatic RTL**: Docusaurus applies `dir="rtl"` automatically for RTL locales
- **Build-time**: Pre-generates localized pages (no runtime overhead)
- **URL Structure**: Clean `/ur/docs/...` URLs for Urdu content
- **Plugin Ecosystem**: Works seamlessly with Docusaurus plugins

**Rejected Alternatives**:
- react-i18next: Requires custom RTL logic, more complex setup
- Custom solution: Reinventing the wheel, maintenance burden

**Best Practices**:
- Use `defaultLocale: 'en'` for fallback
- Mark RTL languages explicitly in `docusaurus.config.ts`
- Use `<Translate>` component for inline translations
- Keep translation files in sync with CI checks
- Use translation namespaces for organization
- Test RTL layout with actual Urdu content, not Latin placeholders

## 5. State Management

### Decision: React Context (for auth state only)

**Alternatives Considered**:
- **Redux Toolkit**: Full-featured state management
- **Zustand**: Lightweight state manager
- **Jotai/Recoil**: Atomic state management
- **React Context**: Built-in solution

**Rationale**:
- **Simplicity**: Auth state is simple (user object, loading state, auth status)
- **No External Dependency**: Built into React, zero bundle size increase
- **Sufficient for Scope**: Don't need Redux for just authentication
- **Provider Pattern**: Natural fit for global auth context
- **Easy Testing**: Context providers straightforward to mock

**Rejected Alternatives**:
- Redux: Overkill for simple auth state, adds complexity
- Zustand/Jotai: Unnecessary dependency when Context suffices

**Best Practices**:
- Create single `AuthContext` provider
- Wrap in `<Root>` component (Docusaurus theme)
- Provide `useAuth()` hook for consuming components
- Memoize context value to prevent unnecessary re-renders
- Handle loading states properly (show spinner during session check)

## 6. CSS Framework

### Decision: Tailwind CSS

**Alternatives Considered**:
- **Plain CSS/SCSS**: Maximum control
- **CSS Modules**: Scoped styles
- **Styled Components**: CSS-in-JS
- **Tailwind CSS**: Utility-first framework

**Rationale**:
- **Rapid Development**: Utility classes speed up UI implementation
- **Consistency**: Design tokens built-in (spacing, colors, breakpoints)
- **Responsive**: Mobile-first breakpoints out of the box
- **Dark Mode**: Built-in dark mode support via `dark:` prefix
- **RTL Support**: `rtl:` variant for RTL-specific styles
- **Tree Shaking**: Unused styles purged in production
- **Docusaurus Compatible**: Works via PostCSS plugin

**Rejected Alternatives**:
- Plain CSS: More verbose, harder to maintain consistency
- CSS Modules: More boilerplate than Tailwind for common patterns
- Styled Components: Runtime overhead, conflicts with Docusaurus build

**Best Practices**:
- Configure theme colors in `tailwind.config.js` (Neon Green, Dark Grey)
- Use `@apply` sparingly (prefer utility classes in JSX)
- Extract components when repetition occurs (not just for style reuse)
- Use Tailwind's `theme()` function for custom CSS
- Leverage RTL variants: `rtl:text-right` instead of manual checks

## 7. Form Validation

### Decision: Zod

**Alternatives Considered**:
- **Yup**: Mature validation library
- **Joi**: Originally for Node.js
- **Zod**: TypeScript-first schema validation
- **class-validator**: Decorator-based

**Rationale**:
- **TypeScript Inference**: Infer TypeScript types from Zod schemas
- **Share Schema**: Same schema for frontend and backend validation
- **Composable**: Easy to build complex nested schemas
- **Runtime Safety**: Validates data at runtime (API boundaries)
- **Better-auth Integration**: Works well with better-auth

**Rejected Alternatives**:
- Yup: Less TypeScript-friendly, schemas not inferred as types
- Joi: Not TypeScript-first, more verbose

**Best Practices**:
- Define schemas in `shared/types` for reuse across frontend/backend
- Validate all API inputs with Zod schemas
- Use `.strict()` to reject unknown keys
- Provide helpful error messages with `.describe()`
- Use Zod discriminated unions for polymorphic data

## 8. Testing Framework

### Decision: Jest + React Testing Library (Frontend), Mocha + Chai (Backend)

**Alternatives Considered**:
- **Vitest**: Fast Vite-native test runner
- **Jest**: Industry standard
- **Mocha + Chai**: Flexible backend testing
- **Supertest**: API integration testing

**Rationale**:
- **Jest**: Wide adoption, Docusaurus compatible, snapshot testing
- **React Testing Library**: User-centric testing (not implementation details)
- **Mocha + Chai**: Lightweight for Express API tests, flexible assertions
- **Supertest**: Perfect for HTTP integration tests

**Rejected Alternatives**:
- Vitest: Docusaurus uses Jest, mixing test runners adds complexity

**Best Practices**:
- Test user flows, not implementation details
- Use Testing Library queries (`getByRole`, not `getByTestId`)
- Mock API calls in frontend tests
- Use test database for backend integration tests
- Implement contract tests for API spec compliance
- Aim for >80% coverage on critical paths (auth flows)

## Summary Table

| Decision Area | Choice | Primary Rationale |
|---------------|--------|-------------------|
| Authentication | better-auth | TypeScript-first, plugin architecture, modern API |
| ORM | Drizzle ORM | Lightweight, Neon-optimized, type-safe |
| Hosting | GitHub Pages + Railway | Cost-effective, performant, simple deployment |
| i18n | Docusaurus i18n | Native RTL support, file-based, build-time |
| State Management | React Context | Simple auth state, built-in, no extra deps |
| CSS Framework | Tailwind CSS | Rapid dev, RTL support, dark mode, consistent |
| Validation | Zod | TypeScript inference, composable, shared schemas |
| Testing | Jest + RTL + Mocha | Industry standard, user-centric, flexible |

## Open Questions (Resolved)

All technical unknowns from Technical Context section have been resolved through research:

- ✅ Authentication library: better-auth selected
- ✅ ORM choice: Drizzle ORM selected
- ✅ Deployment strategy: Split hosting (GitHub Pages + Railway)
- ✅ i18n approach: Docusaurus built-in
- ✅ State management: React Context
- ✅ CSS framework: Tailwind CSS
- ✅ Validation: Zod
- ✅ Testing: Jest + React Testing Library + Mocha

## References

- [better-auth Documentation](https://www.better-auth.com/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Docusaurus i18n Guide](https://docusaurus.io/docs/i18n/introduction)
- [Tailwind CSS RTL](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)
- [Zod Documentation](https://zod.dev/)
- [Neon Database Best Practices](https://neon.tech/docs/get-started-with-neon/signing-up)
