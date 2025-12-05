"""Qdrant vector store service."""
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from typing import List, Dict, Any
import uuid
from ..config import settings


class VectorStoreService:
    """Service for managing vector store operations."""
    
    def __init__(self):
        """Initialize Qdrant client."""
        self.client = QdrantClient(
            host=settings.qdrant_host,
            port=settings.qdrant_port
        )
        self.collection_name = settings.collection_name
        self._ensure_collection()
    
    def _ensure_collection(self):
        """Ensure the collection exists."""
        collections = self.client.get_collections().collections
        collection_names = [col.name for col in collections]
        
        if self.collection_name not in collection_names:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=768,  # Gemini text-embedding-004 dimension
                    distance=Distance.COSINE
                )
            )
    
    def add_documents(
        self,
        embeddings: List[List[float]],
        texts: List[str],
        metadatas: List[Dict[str, Any]]
    ) -> List[str]:
        """Add documents to the vector store."""
        points = []
        ids = []
        
        for embedding, text, metadata in zip(embeddings, texts, metadatas):
            doc_id = str(uuid.uuid4())
            ids.append(doc_id)
            
            points.append(
                PointStruct(
                    id=doc_id,
                    vector=embedding,
                    payload={
                        "text": text,
                        **metadata
                    }
                )
            )
        
        self.client.upsert(
            collection_name=self.collection_name,
            points=points
        )
        
        return ids
    
    def search(
        self,
        query_embedding: List[float],
        top_k: int = 5
    ) -> List[Dict[str, Any]]:
        """Search for similar documents."""
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=top_k
        )
        
        return [
            {
                "id": result.id,
                "score": result.score,
                "text": result.payload.get("text", ""),
                "metadata": {
                    k: v for k, v in result.payload.items()
                    if k != "text"
                }
            }
            for result in results
        ]
    
    def is_connected(self) -> bool:
        """Check if connected to Qdrant."""
        try:
            self.client.get_collections()
            return True
        except Exception:
            return False
