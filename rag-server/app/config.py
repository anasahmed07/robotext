"""Application configuration."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    # Qdrant settings
    qdrant_host: str = "localhost"
    qdrant_port: int = 6333
    collection_name: str = "robotext_docs"
    
    # Gemini API settings
    gemini_api_key: str
    gemini_embedding_model: str = "models/text-embedding-004"
    gemini_chat_model: str = "gemini-1.5-flash"
    
    # API settings
    api_title: str = "RoboText RAG API"
    api_version: str = "1.0.0"
    
    class Config:
        env_file = ".env"


settings = Settings()
