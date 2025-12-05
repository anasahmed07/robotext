# RoboText API Examples

This directory contains example scripts demonstrating how to use the RoboText APIs.

## Prerequisites

- RoboText services running (use `docker-compose up -d` from the root directory)
- For Python examples: `pip install requests`
- For shell examples: `curl` and `jq` installed

## Available Examples

### RAG API Examples

#### Bash Script
```bash
./rag-api-examples.sh
```

Demonstrates:
- Health check
- Adding documents
- Querying with RAG
- Using metadata

#### Python Script
```bash
python rag-api-example.py
```

A more sophisticated example showing:
- Client class implementation
- Error handling
- Document management
- Query execution
- Response parsing

## Usage

### 1. Start Services

```bash
cd ..
docker-compose up -d
```

Wait for services to be ready (~10 seconds).

### 2. Run Examples

**Shell script:**
```bash
cd examples
./rag-api-examples.sh
```

**Python script:**
```bash
cd examples
pip install requests
python rag-api-example.py
```

## API Endpoints

### RAG Server (http://localhost:8000)

- `GET /health` - Health check
- `POST /api/rag/query` - Query the RAG system
- `POST /api/rag/documents` - Add a document
- `GET /docs` - Interactive API documentation

### Auth Server (http://localhost:3001)

- `GET /health` - Health check
- `POST /api/auth/sign-up/email` - Register with email
- `POST /api/auth/sign-in/email` - Sign in with email
- `GET /api/user` - Get current user (protected)

## Extending Examples

### Adding Custom Queries

Edit the example scripts to add your own queries:

```python
result = client.query(
    query="Your custom question here",
    top_k=5  # Number of documents to retrieve
)
```

### Adding Custom Documents

```python
client.add_document(
    content="Your document content",
    metadata={
        "source": "custom",
        "category": "example",
        "author": "Your Name"
    }
)
```

## Interactive Testing

Use the FastAPI interactive documentation at http://localhost:8000/docs to:
- Try API endpoints directly in your browser
- See request/response schemas
- Test different parameters

## Troubleshooting

**Connection refused:**
- Ensure services are running: `docker-compose ps`
- Check if ports are accessible: `curl http://localhost:8000/health`

**Empty query results:**
- Make sure documents are added first
- Verify Qdrant is running: `curl http://localhost:6333/health`
- Check if Gemini API key is configured in `.env`

**Python dependencies:**
```bash
pip install requests
```

## Next Steps

1. Explore the interactive API docs
2. Embed your own documentation with the RAG pipeline
3. Integrate the API into your application
4. Build a custom UI on top of the APIs
