"""Google Gemini AI service."""
import google.generativeai as genai
from typing import List
from ..config import settings


class GeminiService:
    """Service for Google Gemini AI operations."""
    
    def __init__(self):
        """Initialize Gemini client."""
        genai.configure(api_key=settings.gemini_api_key)
        self.embedding_model = settings.gemini_embedding_model
        self.chat_model = genai.GenerativeModel(settings.gemini_chat_model)
    
    def embed_text(self, text: str) -> List[float]:
        """Generate embeddings for text."""
        result = genai.embed_content(
            model=self.embedding_model,
            content=text,
            task_type="retrieval_document"
        )
        return result['embedding']
    
    def embed_query(self, query: str) -> List[float]:
        """Generate embeddings for a query."""
        result = genai.embed_content(
            model=self.embedding_model,
            content=query,
            task_type="retrieval_query"
        )
        return result['embedding']
    
    def embed_batch(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for multiple texts."""
        embeddings = []
        for text in texts:
            embedding = self.embed_text(text)
            embeddings.append(embedding)
        return embeddings
    
    def generate_answer(self, query: str, context: str) -> str:
        """Generate an answer using RAG context."""
        prompt = f"""You are a helpful assistant for RoboText, a platform to learn Physical AI & Humanoid Robotics.

Use the following context to answer the user's question. If the answer cannot be found in the context, say so.

Context:
{context}

Question: {query}

Answer:"""
        
        response = self.chat_model.generate_content(prompt)
        return response.text
    
    def is_configured(self) -> bool:
        """Check if Gemini is properly configured."""
        return bool(settings.gemini_api_key)
