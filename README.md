# RoboText

The Best Platform to learn Physical AI & Humanoid Robotics.

## Project Overview

RoboText is a comprehensive platform that combines:
- **Docusaurus Static Site**: Beautiful documentation website
- **Express.js Auth Server**: Authentication using better-auth
- **FastAPI RAG Server**: AI-powered question answering with Retrieval Augmented Generation
- **Qdrant Vector Store**: High-performance vector database for document embeddings
- **Gemini AI**: Google's Gemini models for embeddings and chat completions
- **RAG Pipeline**: Automated documentation embedding and indexing

## Architecture

```
robotext/
├── docs/              # Docusaurus documentation site
├── auth-server/       # Express.js authentication server (better-auth)
├── rag-server/        # FastAPI RAG API server
├── rag-pipeline/      # Scripts to embed and index documentation
└── docker-compose.yml # Orchestration for all services
```

## Prerequisites

- Node.js 18+ (for Docusaurus and Auth server)
- Python 3.11+ (for RAG server and pipeline)
- Docker & Docker Compose (recommended)
- Google Gemini API key

## Getting Started

### 1. Environment Setup

Copy the example environment file and configure your API keys:

```bash
cp .env.example .env
```

Edit `.env` and set:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `BETTER_AUTH_SECRET`: A secure random string (min 32 characters)

### 2. Running with Docker Compose (Recommended)

Start all services with a single command:

```bash
docker-compose up -d
```

This will start:
- **Docusaurus**: http://localhost:3000
- **Auth Server**: http://localhost:3001
- **RAG Server**: http://localhost:8000
- **Qdrant**: http://localhost:6333

### 3. Running Locally

#### Docusaurus Documentation

```bash
cd docs
npm install
npm start
```

#### Auth Server

```bash
cd auth-server
npm install
npm run dev
```

#### RAG Server

```bash
cd rag-server
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Qdrant (using Docker)

```bash
docker run -p 6333:6333 -p 6334:6334 \
  -v $(pwd)/qdrant_storage:/qdrant/storage \
  qdrant/qdrant
```

## Using the RAG Pipeline

To embed your documentation into the vector database:

```bash
cd rag-pipeline
pip install -r requirements.txt
python embed_docs.py ../docs/docs
```

This will:
1. Read all markdown files from the docs directory
2. Split them into chunks
3. Generate embeddings using Gemini
4. Store them in Qdrant vector database

## API Documentation

### RAG Server API

Once running, visit http://localhost:8000/docs for interactive API documentation.

**Query endpoint:**
```bash
curl -X POST "http://localhost:8000/api/rag/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is Physical AI?",
    "top_k": 5
  }'
```

**Add document endpoint:**
```bash
curl -X POST "http://localhost:8000/api/rag/documents" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your document content here",
    "metadata": {"source": "manual_upload"}
  }'
```

### Auth Server API

**Health check:**
```bash
curl http://localhost:3001/health
```

**Authentication endpoints:** Available at `/api/auth/*`

## Development

### Building for Production

#### Docusaurus
```bash
cd docs
npm run build
npm run serve
```

#### Auth Server
```bash
cd auth-server
npm run build
npm start
```

#### RAG Server
```bash
cd rag-server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Features

### 🔐 Authentication
- Email/password authentication
- GitHub OAuth integration
- Google OAuth integration
- Session management with better-auth

### 🤖 AI-Powered RAG
- Semantic search using Gemini embeddings
- Context-aware answers using Gemini chat models
- Document chunking and indexing
- Similarity-based retrieval

### 📚 Documentation
- Beautiful Docusaurus site
- Markdown-based content
- Versioning support
- Search functionality

### 🗄️ Vector Store
- Qdrant for high-performance vector search
- Automatic collection management
- Scalable architecture

## Technology Stack

- **Frontend**: Docusaurus (React-based)
- **Auth**: Express.js + better-auth + Prisma
- **RAG Backend**: FastAPI + Pydantic
- **Vector DB**: Qdrant
- **AI Models**: Google Gemini (text-embedding-004, gemini-1.5-flash)
- **Database**: SQLite (for auth)
- **Container Orchestration**: Docker Compose

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
