# Quickstart: Local Development Setup

**Feature**: Foundation & Authentication  
**Last Updated**: 2025-12-06

## Prerequisites

Ensure you have the following installed:

- **Node.js**: v18+ ([Download](https://nodejs.org/))
- **pnpm** or **npm**: Package manager
- **Git**: Version control
- **Neon Account**: Serverless PostgreSQL ([Sign up](https://neon.tech/))
- **Railway Account** (optional): For backend deployment testing

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/anasahmed07/robotext.git
cd robotext
git checkout 001-foundation-auth
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ../web
npm install
```

### 3. Configure Environment Variables

#### Backend (api/.env)

Create `api/.env` file:

```bash
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-example-123456.us-east-2.aws.neon.tech/robotext?sslmode=require"

# Authentication
AUTH_SECRET="generate-random-secret-here"  # Use: openssl rand -base64 32
NODE_ENV="development"

# CORS
FRONTEND_URL="http://localhost:3000"  # Docusaurus dev server

# Server
PORT=4000
```

**Get DATABASE_URL from Neon**:
1. Go to [Neon Console](https://console.neon.tech/)
2. Create project → Name: "robotext-dev"
3. Copy connection string from "Connection Details"

#### Frontend (web/.env)

Create `web/.env` file:

```bash
# API endpoint
REACT_APP_API_URL="http://localhost:4000/api"
```

### 4. Database Setup

#### Run Migrations

```bash
cd api

# Generate migration files (first time)
npm run db:generate

# Push schema to Neon database
npm run db:push

# Verify tables created
npm run db:studio  # Opens Drizzle Studio in browser
```

**Expected Tables**:
- `user`
- `session`
- `account`
- `verification`
- `user_profiles`
- `proficiency` (enum type)

## Running Locally

### Start Backend (Terminal 1)

```bash
cd api
npm run dev
```

**Output**:
```
🚀 Server running on http://localhost:4000
✅ Database connected (Neon)
```

**Test Backend**:
```bash
curl http://localhost:4000/health
# Expected: {"status":"ok","timestamp":"2025-12-06T12:00:00.000Z"}
```

### Start Frontend (Terminal 2)

```bash
cd web
npm start
```

**Output**:
```
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000
```

**Access**:
- Frontend: http://localhost:3000
- API Docs: http://localhost:4000/api-docs (if Swagger configured)
- Drizzle Studio: http://localhost:4040 (run `npm run db:studio` in api/)

## Testing the Flow

### 1. Sign Up

**Frontend**:
1. Navigate to http://localhost:3000
2. Click "Login/Signup" button
3. Click "Sign Up" tab
4. Enter email, password, name
5. Submit form

**Backend Test** (via curl):
```bash
curl -X POST http://localhost:4000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "name": "Test User"
  }'
```

**Expected Response**:
```json
{
  "user": {
    "id": "usr_...",
    "email": "test@example.com",
    "name": "Test User",
    "emailVerified": false
  },
  "session": {
    "token": "eyJ...",
    "expiresAt": "2026-01-05T..."
  }
}
```

### 2. Complete Onboarding

**Frontend**:
1. After signup, you're redirected to `/onboarding`
2. Fill out the form:
   - Programming Languages: Python, C++
   - ROS Familiarity: Beginner
   - Robotics Knowledge: Beginner
   - Hardware: GPU, RAM, CPU, OS
3. Submit

**Backend Test**:
```bash
# Get session token from signup response
TOKEN="your-session-token-here"

curl -X POST http://localhost:4000/api/user/onboarding \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "programmingLanguages": ["Python", "C++"],
    "rosFamiliarity": "Beginner",
    "roboticsKnowledge": "Beginner",
    "hardwareSpecs": {
      "gpu": "NVIDIA RTX 3060",
      "ram": "16GB",
      "cpu": "Intel i7-12700K",
      "os": "Ubuntu 22.04"
    }
  }'
```

### 3. Get User Profile

```bash
curl http://localhost:4000/api/user/me \
  -H "Authorization: Bearer $TOKEN"
```

**Expected**:
```json
{
  "user": { /* user data */ },
  "profile": {
    "programmingLanguages": ["Python", "C++"],
    "rosFamiliarity": "Beginner",
    /* ... */
  }
}
```

### 4. Test Language Switching

1. Navigate to http://localhost:3000
2. Click language toggle (top-right)
3. Select "Urdu"
4. Verify:
   - URL changes to http://localhost:3000/ur
   - UI mirrors to RTL
   - Content displays in Urdu (if translations exist)

### 5. Test Dark/Light Mode

1. Click theme toggle (usually top-right)
2. Verify:
   - Colors change (Neon Green accent, Grey Black background in dark mode)
   - Toggle state persists across page refreshes

## Development Workflow

### Making Changes

#### Backend Changes

1. **Edit code** in `api/src/`
2. **Server auto-restarts** (nodemon/tsx watch mode)
3. **Test endpoint** with curl or Postman
4. **Write tests** in `api/tests/`
5. **Run tests**: `npm test`

#### Frontend Changes

1. **Edit components** in `web/src/`
2. **Hot reload** updates browser automatically
3. **Check console** for errors
4. **Test manually** in browser
5. **Run tests**: `npm test`

#### Database Changes

1. **Edit schema** in `api/src/db/schema.ts`
2. **Generate migration**: `npm run db:generate`
3. **Review migration** in `api/src/db/migrations/`
4. **Push to database**: `npm run db:push`
5. **Verify in Drizzle Studio**: `npm run db:studio`

### Testing

#### Run All Tests

```bash
# Backend tests
cd api
npm test

# Frontend tests
cd web
npm test
```

#### Run Specific Tests

```bash
# Backend integration tests
cd api
npm test -- tests/integration/auth.test.ts

# Frontend component tests
cd web
npm test -- src/components/AuthContext.test.tsx
```

#### Manual Testing Checklist

- [ ] Signup creates user and session
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials fails
- [ ] Logout terminates session
- [ ] Onboarding saves profile data
- [ ] `/api/user/me` returns user + profile
- [ ] Language toggle switches English ↔ Urdu
- [ ] RTL layout works in Urdu mode
- [ ] Dark/Light theme toggle works
- [ ] Session persists across page refreshes

## Troubleshooting

### Database Connection Fails

**Error**: `connect ECONNREFUSED` or `timeout`

**Solutions**:
- Verify `DATABASE_URL` in `api/.env` is correct
- Check Neon project is active (not paused)
- Ensure IP is whitelisted in Neon settings (if IP restrictions enabled)
- Test connection: `psql $DATABASE_URL`

### CORS Errors

**Error**: `Access to fetch at 'http://localhost:4000/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solutions**:
- Verify `FRONTEND_URL` in `api/.env` matches frontend URL
- Check `api/src/middleware/cors.ts` has correct configuration
- Clear browser cache and cookies
- Check browser console for specific CORS error details

### Better-auth Errors

**Error**: `AUTH_SECRET is not defined`

**Solutions**:
- Generate secret: `openssl rand -base64 32`
- Add to `api/.env`: `AUTH_SECRET="your-generated-secret"`
- Restart backend server

### Docusaurus Build Errors

**Error**: `Module not found` or `Cannot find module`

**Solutions**:
- Delete `node_modules` and `package-lock.json`: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Clear Docusaurus cache: `npm run clear`
- Rebuild: `npm run build`

### RTL Layout Not Working

**Solutions**:
- Verify `docusaurus.config.ts` has `direction: 'rtl'` for Urdu locale
- Check browser inspector: `<html dir="rtl">` should be present
- Use CSS logical properties (`margin-inline-start` instead of `margin-left`)
- Clear browser cache

## Useful Commands

```bash
# Backend
cd api
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
npm run lint         # Run ESLint
npm run format       # Run Prettier

# Frontend
cd web
npm start            # Start dev server
npm run build        # Build for production
npm run serve        # Serve production build
npm test             # Run tests
npm run clear        # Clear Docusaurus cache
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

## Next Steps

1. **Complete all user stories** (browse content, signup, onboarding, login)
2. **Write tests** for all critical paths
3. **Achieve Lighthouse ≥90** for both English and Urdu
4. **Document deployment** process for Railway and GitHub Pages
5. **Create content** scaffolding for 4 modules
6. **Run `/sp.tasks`** to generate detailed implementation tasks

## Resources

- [Docusaurus Docs](https://docusaurus.io/docs)
- [better-auth Docs](https://www.better-auth.com/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Neon Docs](https://neon.tech/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [OpenAPI Spec](./contracts/auth-api.yaml)
- [Data Model](./data-model.md)
