"""RAG API endpoints."""
from fastapi import APIRouter, HTTPException
from ..models.schemas import (
    QueryRequest,
    QueryResponse,
    DocumentRequest,
    DocumentResponse
)
from ..services.rag_service import RAGService

router = APIRouter(prefix="/api/rag", tags=["rag"])
rag_service = RAGService()


@router.post("/query", response_model=QueryResponse)
async def query(request: QueryRequest):
    """Perform a RAG query."""
    try:
        result = rag_service.query(request.query, request.top_k)
        return QueryResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/documents", response_model=DocumentResponse)
async def add_document(request: DocumentRequest):
    """Add a document to the vector store."""
    try:
        doc_id = rag_service.add_document(
            content=request.content,
            metadata=request.metadata or {}
        )
        return DocumentResponse(
            success=True,
            message="Document added successfully",
            document_id=doc_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
