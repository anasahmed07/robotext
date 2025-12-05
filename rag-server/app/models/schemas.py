"""Pydantic models for request/response schemas."""
from pydantic import BaseModel
from typing import List, Optional


class QueryRequest(BaseModel):
    """Request model for RAG query."""
    query: str
    top_k: int = 5


class DocumentChunk(BaseModel):
    """Model for a document chunk."""
    content: str
    score: float
    metadata: dict


class QueryResponse(BaseModel):
    """Response model for RAG query."""
    answer: str
    sources: List[DocumentChunk]


class DocumentRequest(BaseModel):
    """Request model for adding a document."""
    content: str
    metadata: Optional[dict] = None


class DocumentResponse(BaseModel):
    """Response model for document operations."""
    success: bool
    message: str
    document_id: Optional[str] = None


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    qdrant_connected: bool
    gemini_configured: bool
