# Data Model: Foundation & Authentication

**Feature**: Foundation & Authentication  
**Date**: 2025-12-06  
**Database**: Neon PostgreSQL  
**ORM**: Drizzle ORM

## Overview

This document defines the database schema for user authentication and profile management. The schema supports better-auth standard tables plus custom extensions for Robotext-specific user data (knowledge base, hardware specifications).

## Entity Relationship Diagram

```
┌──────────────┐          ┌──────────────────┐
│     user     │──────────│  user_profiles   │
│              │   1:1    │                  │
│  - id (PK)   │          │  - id (PK)       │
│  - email     │          │  - user_id (FK)  │
│  - name      │          │  - programming   │
│  - ...       │          │  - ros_fam       │
└──────┬───────┘          │  - robotics_k    │
       │                  │  - hardware      │
       │ 1:N              └──────────────────┘
       │
┌──────▼───────┐
│   session    │
│              │
│  - id (PK)   │
│  - user_id   │
│  - token     │
│  - expiresAt │
└──────────────┘
```

## Entities

### 1. user (better-auth standard)

**Description**: Core user account entity managed by better-auth.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | text | PRIMARY KEY | Unique user identifier (UUID format) |
| email | text | UNIQUE, NOT NULL | User email address |
| emailVerified | boolean | DEFAULT false | Email verification status |
| name | text | NULLABLE | User display name |
| image | text | NULLABLE | Profile image URL |
| createdAt | timestamp | DEFAULT NOW() | Account creation timestamp |
| updatedAt | timestamp | DEFAULT NOW() | Last update timestamp |

**Indexes**:
- PRIMARY KEY on `id`
- UNIQUE index on `email`

**Validation Rules**:
- Email must be valid format (validated by Zod schema)
- Email is case-insensitive (normalized to lowercase)

**State Transitions**:
```
[New User] → emailVerified: false
         ↓
  [Email Verified] → emailVerified: true
```

---

### 2. session (better-auth standard)

**Description**: Active user sessions for authentication state management.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | text | PRIMARY KEY | Session identifier |
| userId | text | FOREIGN KEY → user.id | Owner of session |
| token | text | UNIQUE, NOT NULL | Session token |
| expiresAt | timestamp | NOT NULL | Session expiration time |
| ipAddress | text | NULLABLE | IP address of session creation |
| userAgent | text | NULLABLE | Browser/device user agent |
| createdAt | timestamp | DEFAULT NOW() | Session creation time |

**Indexes**:
- PRIMARY KEY on `id`
- FOREIGN KEY on `userId` → `user.id` (CASCADE DELETE)
- UNIQUE index on `token`
- Index on `expiresAt` for cleanup queries

**Validation Rules**:
- `expiresAt` must be in the future
- Token must be cryptographically secure (handled by better-auth)

**State Transitions**:
```
[Active] → expiresAt > NOW()
    ↓
[Expired] → expiresAt <= NOW() (session invalid)
    ↓
[Deleted] → Cleanup job removes expired sessions
```

---

### 3. user_profiles (Robotext extension)

**Description**: Extended user profile capturing knowledge base and hardware specifications for personalized learning.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Profile identifier |
| userId | text | FOREIGN KEY → user.id, UNIQUE | Owner (1:1 with user) |
| programmingLanguages | jsonb | DEFAULT [] | Array of known languages |
| rosFamiliarity | enum | DEFAULT 'Beginner' | ROS knowledge level |
| roboticsKnowledge | enum | DEFAULT 'Beginner' | Robotics expertise |
| hardwareSpecs | jsonb | NULLABLE | Hardware capabilities |
| createdAt | timestamp | DEFAULT NOW() | Profile creation time |
| updatedAt | timestamp | DEFAULT NOW() | Last update time |

**Enums**:
- `proficiencyEnum`: `['Beginner', 'Intermediate', 'Advanced']`

**JSON Schema** (programmingLanguages):
```typescript
string[] // e.g., ["Python", "C++", "JavaScript"]
```

**JSON Schema** (hardwareSpecs):
```typescript
{
  gpu?: string;    // e.g., "NVIDIA RTX 3060"
  ram?: string;    // e.g., "16GB"
  cpu?: string;    // e.g., "Intel i7-12700K"
  os?: string;     // e.g., "Ubuntu 22.04"
}
```

**Indexes**:
- PRIMARY KEY on `id`
- FOREIGN KEY on `userId` → `user.id` (CASCADE DELETE)
- UNIQUE constraint on `userId` (ensures 1:1 relationship)

**Validation Rules**:
- `programmingLanguages`: Array of strings, each 1-50 characters
- `rosFamiliarity`: Must be one of enum values
- `roboticsKnowledge`: Must be one of enum values
- `hardwareSpecs`: JSON object matching schema (validated by Zod)

**State Transitions**:
```
[User Signs Up] → No profile (null)
         ↓
[Completes Onboarding] → Profile created with user input
         ↓
[Updates Profile] → updatedAt timestamp refreshed
```

---

### 4. account (better-auth standard - future use)

**Description**: OAuth provider accounts (for future social authentication).

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | text | PRIMARY KEY | Account identifier |
| userId | text | FOREIGN KEY → user.id | Account owner |
| accountId | text | NOT NULL | Provider account ID |
| providerId | text | NOT NULL | OAuth provider (google, github) |
| accessToken | text | NULLABLE | OAuth access token |
| refreshToken | text | NULLABLE | OAuth refresh token |
| expiresAt | timestamp | NULLABLE | Token expiration |
| createdAt | timestamp | DEFAULT NOW() | Link creation time |

**Indexes**:
- PRIMARY KEY on `id`
- FOREIGN KEY on `userId` → `user.id` (CASCADE DELETE)
- UNIQUE constraint on (`providerId`, `accountId`)

**Note**: Phase 1 uses email/password only. This table will be populated when social auth is added.

---

### 5. verification (better-auth standard - future use)

**Description**: Email verification and password reset tokens.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | text | PRIMARY KEY | Verification ID |
| identifier | text | NOT NULL | Email or user ID |
| value | text | NOT NULL | Verification token |
| expiresAt | timestamp | NOT NULL | Token expiration |
| createdAt | timestamp | DEFAULT NOW() | Creation time |

**Indexes**:
- PRIMARY KEY on `id`
- Index on `identifier` for lookups
- Index on `expiresAt` for cleanup

**Note**: Phase 1 defers email verification and password reset. This table structure is defined but not actively used.

---

## Drizzle ORM Schema Definition

```typescript
// api/src/db/schema.ts
import { pgTable, text, uuid, jsonb, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const proficiencyEnum = pgEnum("proficiency", ["Beginner", "Intermediate", "Advanced"]);

// better-auth standard tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Robotext extension
export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull().unique(),
  
  programmingLanguages: jsonb("programming_languages").$type<string[]>().default([]),
  rosFamiliarity: proficiencyEnum("ros_familiarity").default("Beginner"),
  roboticsKnowledge: proficiencyEnum("robotics_knowledge").default("Beginner"),
  
  hardwareSpecs: jsonb("hardware_specs").$type<{
    gpu?: string;
    ram?: string;
    cpu?: string;
    os?: string;
  }>(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

## Migrations

### Initial Migration (001_init.sql)

```sql
-- Create proficiency enum
CREATE TYPE proficiency AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- Create user table
CREATE TABLE "user" (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  email_verified BOOLEAN DEFAULT false,
  name TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create session table
CREATE TABLE session (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_session_user_id ON session(user_id);
CREATE INDEX idx_session_expires_at ON session(expires_at);

-- Create account table
CREATE TABLE account (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  account_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(provider_id, account_id)
);

CREATE INDEX idx_account_user_id ON account(user_id);

-- Create verification table
CREATE TABLE verification (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_verification_identifier ON verification(identifier);
CREATE INDEX idx_verification_expires_at ON verification(expires_at);

-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE REFERENCES "user"(id) ON DELETE CASCADE,
  programming_languages JSONB DEFAULT '[]'::jsonb,
  ros_familiarity proficiency DEFAULT 'Beginner',
  robotics_knowledge proficiency DEFAULT 'Beginner',
  hardware_specs JSONB,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
```

## Sample Data

### Example User with Profile

```json
{
  "user": {
    "id": "usr_abc123",
    "email": "learner@example.com",
    "emailVerified": false,
    "name": "Ahmed Khan",
    "image": null,
    "createdAt": "2025-12-06T10:00:00Z",
    "updatedAt": "2025-12-06T10:00:00Z"
  },
  "userProfile": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "usr_abc123",
    "programmingLanguages": ["Python", "C++", "JavaScript"],
    "rosFamiliarity": "Intermediate",
    "roboticsKnowledge": "Beginner",
    "hardwareSpecs": {
      "gpu": "NVIDIA RTX 3060",
      "ram": "16GB",
      "cpu": "Intel i7-12700K",
      "os": "Ubuntu 22.04"
    },
    "createdAt": "2025-12-06T10:05:00Z",
    "updatedAt": "2025-12-06T10:05:00Z"
  }
}
```

## Data Access Patterns

### 1. Get User with Profile (most common)

```typescript
const userWithProfile = await db
  .select()
  .from(user)
  .leftJoin(userProfiles, eq(user.id, userProfiles.userId))
  .where(eq(user.id, userId));
```

### 2. Create User Profile (onboarding)

```typescript
await db.insert(userProfiles).values({
  userId: session.userId,
  programmingLanguages: ["Python", "C++"],
  rosFamiliarity: "Beginner",
  roboticsKnowledge: "Beginner",
  hardwareSpecs: { gpu: "RTX 3060", ram: "16GB" }
});
```

### 3. Update User Profile

```typescript
await db
  .update(userProfiles)
  .set({
    programmingLanguages: ["Python", "Rust"],
    updatedAt: new Date()
  })
  .where(eq(userProfiles.userId, userId));
```

### 4. Clean Expired Sessions (cron job)

```typescript
await db
  .delete(session)
  .where(lt(session.expiresAt, new Date()));
```

## Performance Considerations

1. **Indexes**: All foreign keys indexed for fast joins
2. **Connection Pooling**: Use Neon's connection pooling to reduce latency
3. **Query Optimization**: Use `.prepare()` for frequently-run queries
4. **JSON Queries**: JSONB allows efficient querying of nested data
5. **Cascade Deletes**: User deletion automatically removes sessions and profile

## Security Considerations

1. **Password Hashing**: Handled by better-auth (bcrypt)
2. **Token Security**: Session tokens are cryptographically random
3. **JSONB Injection**: All user input validated with Zod before insertion
4. **Cascade Deletes**: Ensures no orphaned data when user deletes account
5. **Unique Constraints**: Prevent duplicate emails, duplicate sessions

## Future Extensions

- Add `progress_tracking` table for user learning progress
- Add `quiz_results` table for personalized quiz scores
- Add `bookmarks` table for saved content
- Add `chat_history` table for AI chatbot conversations
- Add `notifications` table for user alerts
