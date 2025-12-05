#!/bin/bash

# RoboText Quick Start Script

set -e

echo "🤖 RoboText Quick Start"
echo "======================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env and set your GEMINI_API_KEY before continuing!"
    echo "   You can get a key from: https://aistudio.google.com/apikey"
    exit 1
fi

# Check if GEMINI_API_KEY is set
if ! grep -q "GEMINI_API_KEY=your-gemini-api-key-here" .env 2>/dev/null; then
    echo "✅ Environment file configured"
else
    echo "⚠️  Please set your GEMINI_API_KEY in .env file"
    exit 1
fi

echo "🐳 Starting services with Docker Compose..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

echo ""
echo "🔍 Checking service health..."

# Check Docusaurus
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Docusaurus is running at http://localhost:3000"
else
    echo "❌ Docusaurus is not responding"
fi

# Check Auth Server
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Auth Server is running at http://localhost:3001"
else
    echo "❌ Auth Server is not responding"
fi

# Check RAG Server
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ RAG Server is running at http://localhost:8000"
else
    echo "❌ RAG Server is not responding"
fi

# Check Qdrant
if curl -s http://localhost:6333/health > /dev/null; then
    echo "✅ Qdrant is running at http://localhost:6333"
else
    echo "❌ Qdrant is not responding"
fi

echo ""
echo "📚 Next Steps:"
echo "   1. Embed documentation: cd rag-pipeline && pip install -r requirements.txt && python embed_docs.py"
echo "   2. View API docs: http://localhost:8000/docs"
echo "   3. View documentation: http://localhost:3000"
echo ""
echo "🛑 To stop all services: docker-compose down"
echo ""
