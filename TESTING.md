# Testing Guide

This guide provides instructions for testing all components of the RoboText platform.

## Prerequisites

Before testing, ensure you have:
- Docker and Docker Compose installed (for containerized testing)
- Node.js 18+ (for local testing)
- Python 3.11+ (for local testing)
- A Google Gemini API key (for RAG functionality)

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and configure:
```
GEMINI_API_KEY=your-actual-api-key-here
BETTER_AUTH_SECRET=a-random-32-character-minimum-secret
```

## Testing with Docker Compose

The easiest way to test all services together:

```bash
# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Verify Services

1. **Docusaurus** (http://localhost:3000)
   ```bash
   curl http://localhost:3000
   ```

2. **Auth Server** (http://localhost:3001)
   ```bash
   curl http://localhost:3001/health
   ```

3. **RAG Server** (http://localhost:8000)
   ```bash
   curl http://localhost:8000/health
   ```

4. **Qdrant** (http://localhost:6333)
   ```bash
   curl http://localhost:6333/health
   ```

## Testing Individual Services Locally

### 1. Docusaurus Documentation Site

```bash
cd docs
npm install
npm start
```

Visit http://localhost:3000

Build for production:
```bash
npm run build
npm run serve
```

### 2. Auth Server

```bash
cd auth-server
npm install

# Initialize database
npm run db:push

# Development mode
npm run dev

# Production build
npm run build
npm start
```

Test endpoints:
```bash
# Health check
curl http://localhost:3001/health

# Expected: {"status":"ok","message":"Auth server is running"}
```

### 3. RAG Server

First, start Qdrant:
```bash
docker run -p 6333:6333 -p 6334:6334 \
  -v $(pwd)/qdrant_storage:/qdrant/storage \
  qdrant/qdrant
```

Then start the RAG server:
```bash
cd rag-server
pip install -r requirements.txt

# Set environment variables
export GEMINI_API_KEY="your-api-key"
export QDRANT_HOST="localhost"
export QDRANT_PORT="6333"

# Run server
uvicorn app.main:app --reload
```

Test endpoints:
```bash
# Health check
curl http://localhost:8000/health

# API documentation
open http://localhost:8000/docs

# Add a document (requires Gemini API key)
curl -X POST "http://localhost:8000/api/rag/documents" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Physical AI combines artificial intelligence with robotics to create systems that can interact with the physical world.",
    "metadata": {"source": "test"}
  }'

# Query the RAG system (requires documents in DB)
curl -X POST "http://localhost:8000/api/rag/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is Physical AI?",
    "top_k": 5
  }'
```

### 4. RAG Pipeline

Embed documentation into the vector database:

```bash
cd rag-pipeline
pip install -r requirements.txt

# Set environment variables
export GEMINI_API_KEY="your-api-key"
export QDRANT_HOST="localhost"
export QDRANT_PORT="6333"

# Run the pipeline
python embed_docs.py ../docs/docs
```

## Integration Testing

### Full Workflow Test

1. Start all services with Docker Compose
2. Run the RAG pipeline to embed documentation
3. Test querying through the RAG API
4. Verify authentication flows

```bash
# Start services
docker-compose up -d

# Wait for services to be ready
sleep 10

# Test RAG pipeline
cd rag-pipeline
pip install -r requirements.txt
export GEMINI_API_KEY="your-key"
python embed_docs.py ../docs/docs

# Query the system
curl -X POST "http://localhost:8000/api/rag/query" \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me about Docusaurus", "top_k": 3}'
```

## Troubleshooting

### Port Conflicts

If ports are already in use:
```bash
# Check what's using the ports
lsof -i :3000  # Docusaurus
lsof -i :3001  # Auth server
lsof -i :8000  # RAG server
lsof -i :6333  # Qdrant
```

### Database Issues

Reset auth database:
```bash
cd auth-server
rm -f auth.db
npm run db:push
```

Reset Qdrant vector store:
```bash
rm -rf qdrant_storage
# Restart Qdrant
```

### API Key Issues

Verify your Gemini API key:
```bash
curl -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$GEMINI_API_KEY"
```

## Common Test Scenarios

### 1. Test Document Embedding
```python
# In rag-pipeline directory
python3 << 'PYEOF'
from embed_docs import EmbeddingPipeline
from pathlib import Path
import os

os.environ['GEMINI_API_KEY'] = 'your-key'
os.environ['QDRANT_HOST'] = 'localhost'

pipeline = EmbeddingPipeline()
pipeline.process_directory(Path('../docs/docs'))
PYEOF
```

### 2. Test RAG Query
```bash
curl -X POST "http://localhost:8000/api/rag/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How do I create a blog post?",
    "top_k": 5
  }' | jq .
```

### 3. Test Authentication
```bash
# Register a user
curl -X POST "http://localhost:3001/api/auth/sign-up/email" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "name": "Test User"
  }'
```

## Expected Results

All tests should pass with:
- All services returning 200 OK for health checks
- Docusaurus serving the documentation site
- RAG system returning relevant answers
- Auth endpoints accepting and validating credentials

## Continuous Testing

For automated testing in CI/CD:
```bash
# Run linting
cd docs && npm run lint || true
cd ../auth-server && npm run build

# Run type checking
cd ../rag-server && python3 -m mypy app/ || true

# Integration test
docker-compose up -d
sleep 15
curl -f http://localhost:3000 || exit 1
curl -f http://localhost:3001/health || exit 1
curl -f http://localhost:8000/health || exit 1
docker-compose down
```
