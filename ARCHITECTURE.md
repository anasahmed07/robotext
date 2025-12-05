# RoboText Architecture

This document describes the architecture of the RoboText platform.

## Overview

RoboText is a full-stack platform for learning Physical AI and Humanoid Robotics, featuring:
- Documentation website
- Authentication system
- AI-powered question answering
- Vector-based semantic search

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Browser    │  │  Mobile App  │  │   API Client │          │
│  │  (Docusaurus)│  │   (Future)   │  │              │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
└─────────┼──────────────────┼──────────────────┼──────────────────┘
          │                  │                  │
          │                  │                  │
┌─────────┼──────────────────┼──────────────────┼──────────────────┐
│         │         Application Layer           │                   │
│         │                  │                  │                   │
│    ┌────▼─────┐      ┌────▼─────┐      ┌────▼─────┐            │
│    │ Docusaurus│      │   Auth   │      │   RAG    │            │
│    │   :3000   │      │  Server  │      │  Server  │            │
│    │           │      │  :3001   │      │  :8000   │            │
│    │  (React)  │      │(Express) │      │(FastAPI) │            │
│    └───────────┘      └────┬─────┘      └────┬─────┘            │
│                            │                  │                   │
└────────────────────────────┼──────────────────┼──────────────────┘
                             │                  │
                             │                  │
┌────────────────────────────┼──────────────────┼──────────────────┐
│            Data Layer       │                  │                   │
│                        ┌────▼─────┐      ┌────▼─────┐            │
│                        │  SQLite  │      │  Qdrant  │            │
│                        │   DB     │      │  Vector  │            │
│                        │          │      │   DB     │            │
│                        │(Auth Data)      │ :6333    │            │
│                        └──────────┘      └────┬─────┘            │
│                                                │                   │
└────────────────────────────────────────────────┼──────────────────┘
                                                 │
                                                 │
┌────────────────────────────────────────────────┼──────────────────┐
│           External Services                    │                   │
│                                          ┌─────▼──────┐           │
│                                          │   Gemini   │           │
│                                          │    API     │           │
│                                          │            │           │
│                                          │ (Embedding │           │
│                                          │  & Chat)   │           │
│                                          └────────────┘           │
└──────────────────────────────────────────────────────────────────┘
```

## Components

### 1. Docusaurus Static Site (Port 3000)

**Technology Stack:**
- Docusaurus v3
- React
- TypeScript
- Markdown/MDX

**Responsibilities:**
- Serve documentation content
- Blog posts
- Static site generation
- Search functionality

**Key Files:**
- `docs/docusaurus.config.ts` - Main configuration
- `docs/docs/` - Documentation pages
- `docs/src/` - React components
- `docs/blog/` - Blog posts

### 2. Auth Server (Port 3001)

**Technology Stack:**
- Express.js
- better-auth
- Prisma ORM
- SQLite
- TypeScript

**Responsibilities:**
- User authentication
- Session management
- OAuth integration (GitHub, Google)
- Email/password authentication

**Key Files:**
- `auth-server/src/index.ts` - Express app
- `auth-server/src/auth.ts` - better-auth configuration
- `auth-server/prisma/schema.prisma` - Database schema

**Database Schema:**
- `User` - User accounts
- `Session` - Active sessions
- `Account` - OAuth accounts and passwords
- `Verification` - Email verification tokens

**API Endpoints:**
- `POST /api/auth/sign-up/email` - Register
- `POST /api/auth/sign-in/email` - Login
- `GET /api/user` - Get current user (protected)
- `GET /health` - Health check

### 3. RAG Server (Port 8000)

**Technology Stack:**
- FastAPI
- Pydantic
- Qdrant Client
- Google Gemini API
- Python 3.11+

**Responsibilities:**
- Handle RAG queries
- Manage document embeddings
- Vector similarity search
- AI-powered answer generation

**Key Files:**
- `rag-server/app/main.py` - FastAPI app
- `rag-server/app/routers/rag.py` - API endpoints
- `rag-server/app/services/rag_service.py` - RAG logic
- `rag-server/app/services/gemini_service.py` - AI integration
- `rag-server/app/services/vector_store.py` - Qdrant integration

**API Endpoints:**
- `POST /api/rag/query` - RAG query
- `POST /api/rag/documents` - Add document
- `GET /health` - Health check
- `GET /docs` - Interactive API docs

### 4. Qdrant Vector Database (Port 6333)

**Technology Stack:**
- Qdrant (containerized)

**Responsibilities:**
- Store document embeddings (768-dimensional vectors)
- Perform similarity search
- Manage collections

**Collection Schema:**
- Collection: `robotext_docs`
- Vector Size: 768 (Gemini embedding dimension)
- Distance: Cosine similarity
- Payload: text content + metadata

### 5. RAG Pipeline

**Technology Stack:**
- Python 3.11+
- Google Gemini API
- Qdrant Client
- BeautifulSoup4
- Markdown parser

**Responsibilities:**
- Process markdown documentation
- Chunk documents with overlap
- Generate embeddings
- Populate vector database

**Key Files:**
- `rag-pipeline/embed_docs.py` - Main pipeline script

## Data Flow

### RAG Query Flow

1. **User submits query** → RAG Server (`/api/rag/query`)
2. **Generate query embedding** → Gemini API (text-embedding-004)
3. **Similarity search** → Qdrant (cosine similarity, top-k results)
4. **Retrieve relevant chunks** ← Qdrant (with scores)
5. **Build context** → Combine retrieved chunks
6. **Generate answer** → Gemini API (gemini-1.5-flash)
7. **Return response** ← RAG Server (answer + sources)
8. **Display to user** ← Client

### Document Embedding Flow

1. **Load markdown files** → RAG Pipeline
2. **Parse and chunk** → DocumentProcessor (1000 chars, 200 overlap)
3. **Generate embeddings** → Gemini API (batch processing)
4. **Store in vector DB** → Qdrant (with metadata)
5. **Confirm success** ← Pipeline

### Authentication Flow

1. **User submits credentials** → Auth Server
2. **Validate credentials** → better-auth + Prisma
3. **Create session** → SQLite database
4. **Return session token** ← Auth Server
5. **Store in client** ← Client (cookie/localStorage)
6. **Authenticated requests** → Include session token
7. **Validate session** → Auth Server middleware

## Deployment

### Development

```bash
docker-compose up -d
```

All services run in containers with hot-reload enabled.

### Production Considerations

1. **Docusaurus:**
   - Build static files: `npm run build`
   - Serve via CDN or static hosting
   - Enable caching

2. **Auth Server:**
   - Use production database (PostgreSQL recommended)
   - Enable HTTPS
   - Set secure session cookies
   - Configure OAuth callbacks

3. **RAG Server:**
   - Scale horizontally with load balancer
   - Use Qdrant cluster for high availability
   - Implement rate limiting
   - Cache frequent queries

4. **Qdrant:**
   - Use persistent volumes
   - Configure backups
   - Consider managed service

## Security

### Authentication
- Session-based auth with secure cookies
- Password hashing (handled by better-auth)
- OAuth 2.0 for social login
- CSRF protection

### API Security
- CORS configuration
- Input validation with Pydantic
- Error handling without exposing internals
- Rate limiting (to be implemented)

### Secrets Management
- Environment variables for sensitive data
- Required BETTER_AUTH_SECRET validation
- No hardcoded secrets
- .env files in .gitignore

## Performance Optimizations

### Current
- Singleton pattern for RAG service
- Lazy service initialization
- Connection pooling in Qdrant
- Batch document processing

### Future Improvements
- Async batch embeddings
- Query result caching
- CDN for static assets
- Database query optimization
- Vector search indexing

## Monitoring & Observability

### Health Checks
- All services expose `/health` endpoints
- Container health checks in docker-compose
- Service dependency checking

### Logging
- Structured logging in Python services
- Console logging in development
- Error tracking (to be implemented)

### Metrics (To Be Implemented)
- Request rates
- Response times
- Error rates
- Vector search performance
- Embedding generation latency

## Future Enhancements

1. **User Interface**
   - Interactive chat interface in Docusaurus
   - User dashboard
   - Document upload UI

2. **Features**
   - Multi-language support
   - Advanced search filters
   - Document versioning
   - User feedback collection

3. **Infrastructure**
   - CI/CD pipeline
   - Automated testing
   - Performance monitoring
   - Automated backups

4. **AI Capabilities**
   - Multiple AI model support
   - Fine-tuned embeddings
   - Conversation memory
   - Suggested follow-up questions
