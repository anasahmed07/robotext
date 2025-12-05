"""RAG (Retrieval Augmented Generation) service."""
from typing import List, Dict, Any
from .vector_store import VectorStoreService
from .gemini_service import GeminiService
from ..models.schemas import DocumentChunk


class RAGService:
    """Service for RAG operations."""
    
    def __init__(self):
        """Initialize RAG service."""
        self.vector_store = VectorStoreService()
        self.gemini = GeminiService()
    
    def add_document(self, content: str, metadata: Dict[str, Any] = None) -> str:
        """Add a document to the vector store."""
        if metadata is None:
            metadata = {}
        
        # Generate embedding
        embedding = self.gemini.embed_text(content)
        
        # Store in vector database
        doc_ids = self.vector_store.add_documents(
            embeddings=[embedding],
            texts=[content],
            metadatas=[metadata]
        )
        
        return doc_ids[0]
    
    def query(self, query_text: str, top_k: int = 5) -> Dict[str, Any]:
        """Perform RAG query."""
        # Generate query embedding
        query_embedding = self.gemini.embed_query(query_text)
        
        # Search vector store
        search_results = self.vector_store.search(
            query_embedding=query_embedding,
            top_k=top_k
        )
        
        # Prepare context from search results
        context = "\n\n".join([
            f"[Source {i+1}]: {result['text']}"
            for i, result in enumerate(search_results)
        ])
        
        # Generate answer
        answer = self.gemini.generate_answer(query_text, context)
        
        # Prepare response
        sources = [
            DocumentChunk(
                content=result['text'],
                score=result['score'],
                metadata=result['metadata']
            )
            for result in search_results
        ]
        
        return {
            "answer": answer,
            "sources": sources
        }
    
    def health_check(self) -> Dict[str, bool]:
        """Check health of RAG components."""
        return {
            "qdrant_connected": self.vector_store.is_connected(),
            "gemini_configured": self.gemini.is_configured()
        }
