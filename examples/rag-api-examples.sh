#!/bin/bash

# RoboText RAG API Examples
# Make sure the RAG server is running at http://localhost:8000

BASE_URL="http://localhost:8000"

echo "🤖 RoboText RAG API Examples"
echo "============================"
echo ""

# Health Check
echo "1. Health Check"
echo "---------------"
curl -X GET "$BASE_URL/health" | jq .
echo ""
echo ""

# Add a document
echo "2. Add a Document"
echo "-----------------"
curl -X POST "$BASE_URL/api/rag/documents" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Physical AI refers to artificial intelligence systems that can interact with and manipulate the physical world. This includes robots, autonomous vehicles, and humanoid systems that use sensors, actuators, and AI algorithms to perceive and act in physical environments.",
    "metadata": {
      "source": "example",
      "topic": "physical-ai",
      "author": "RoboText Team"
    }
  }' | jq .
echo ""
echo ""

# Add another document
echo "3. Add Another Document"
echo "-----------------------"
curl -X POST "$BASE_URL/api/rag/documents" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Humanoid robotics involves creating robots with human-like appearance and capabilities. These robots typically have a torso, head, two arms, and two legs, allowing them to navigate human environments and use tools designed for humans.",
    "metadata": {
      "source": "example",
      "topic": "humanoid-robotics",
      "author": "RoboText Team"
    }
  }' | jq .
echo ""
echo ""

# Query the system
echo "4. Query: What is Physical AI?"
echo "-------------------------------"
curl -X POST "$BASE_URL/api/rag/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is Physical AI?",
    "top_k": 3
  }' | jq .
echo ""
echo ""

# Another query
echo "5. Query: Tell me about humanoid robots"
echo "----------------------------------------"
curl -X POST "$BASE_URL/api/rag/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Tell me about humanoid robots",
    "top_k": 3
  }' | jq .
echo ""
echo ""

echo "✅ Examples completed!"
echo ""
echo "💡 Tips:"
echo "   - View interactive API docs at $BASE_URL/docs"
echo "   - Increase top_k for more search results"
echo "   - Add metadata for better organization"
echo ""
