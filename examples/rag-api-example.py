"""
RoboText RAG API Python Client Example

This script demonstrates how to interact with the RoboText RAG API using Python.
Make sure the RAG server is running at http://localhost:8000
"""

import requests
import json
from typing import Dict, List, Any

BASE_URL = "http://localhost:8000"


class RoboTextRAGClient:
    """Client for interacting with RoboText RAG API."""
    
    def __init__(self, base_url: str = BASE_URL):
        """Initialize the client."""
        self.base_url = base_url
    
    def health_check(self) -> Dict[str, Any]:
        """Check API health status."""
        response = requests.get(f"{self.base_url}/health")
        response.raise_for_status()
        return response.json()
    
    def add_document(
        self,
        content: str,
        metadata: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Add a document to the vector store."""
        payload = {
            "content": content,
            "metadata": metadata or {}
        }
        response = requests.post(
            f"{self.base_url}/api/rag/documents",
            json=payload
        )
        response.raise_for_status()
        return response.json()
    
    def query(
        self,
        query: str,
        top_k: int = 5
    ) -> Dict[str, Any]:
        """Query the RAG system."""
        payload = {
            "query": query,
            "top_k": top_k
        }
        response = requests.post(
            f"{self.base_url}/api/rag/query",
            json=payload
        )
        response.raise_for_status()
        return response.json()


def main():
    """Run example usage."""
    print("🤖 RoboText RAG API Python Client Example")
    print("=" * 50)
    print()
    
    # Initialize client
    client = RoboTextRAGClient()
    
    # 1. Health check
    print("1. Checking API health...")
    health = client.health_check()
    print(f"   Status: {health['status']}")
    print(f"   Qdrant: {'✅' if health['qdrant_connected'] else '❌'}")
    print(f"   Gemini: {'✅' if health['gemini_configured'] else '❌'}")
    print()
    
    # 2. Add documents
    print("2. Adding documents...")
    
    doc1 = client.add_document(
        content="""
        Physical AI combines artificial intelligence with physical robotics.
        It enables robots to perceive, understand, and interact with the
        physical world using sensors, actuators, and AI algorithms.
        """,
        metadata={
            "source": "python-example",
            "topic": "physical-ai",
            "category": "introduction"
        }
    )
    print(f"   Added document: {doc1['document_id']}")
    
    doc2 = client.add_document(
        content="""
        Humanoid robots are designed to resemble and act like humans.
        They typically have a head, torso, two arms, and two legs,
        allowing them to navigate human environments and use human tools.
        """,
        metadata={
            "source": "python-example",
            "topic": "humanoid-robotics",
            "category": "introduction"
        }
    )
    print(f"   Added document: {doc2['document_id']}")
    print()
    
    # 3. Query the system
    print("3. Querying the system...")
    
    result = client.query(
        query="What is Physical AI and how does it work?",
        top_k=3
    )
    
    print(f"   Question: What is Physical AI and how does it work?")
    print()
    print(f"   Answer: {result['answer']}")
    print()
    print(f"   Sources ({len(result['sources'])}):")
    for i, source in enumerate(result['sources'], 1):
        print(f"   {i}. Score: {source['score']:.4f}")
        print(f"      {source['content'][:100]}...")
        print()
    
    # 4. Another query
    result2 = client.query(
        query="Tell me about humanoid robots",
        top_k=2
    )
    
    print(f"   Question: Tell me about humanoid robots")
    print()
    print(f"   Answer: {result2['answer']}")
    print()
    
    print("✅ Example completed successfully!")


if __name__ == "__main__":
    try:
        main()
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to RAG server")
        print("   Make sure the server is running at http://localhost:8000")
    except Exception as e:
        print(f"❌ Error: {e}")
