"""Script to embed and populate Qdrant with documentation."""
import os
import sys
from pathlib import Path
from typing import List, Dict, Any
import google.generativeai as genai
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
import uuid
import markdown
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class DocumentProcessor:
    """Process and chunk documents."""
    
    def __init__(self, chunk_size: int = 1000, overlap: int = 200):
        """Initialize processor."""
        self.chunk_size = chunk_size
        self.overlap = overlap
    
    def load_markdown(self, file_path: Path) -> Dict[str, Any]:
        """Load and parse markdown file."""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Convert markdown to HTML
        html = markdown.markdown(content)
        
        # Extract text
        soup = BeautifulSoup(html, 'html.parser')
        text = soup.get_text()
        
        return {
            'content': text,
            'metadata': {
                'source': str(file_path),
                'filename': file_path.name,
                'type': 'markdown'
            }
        }
    
    def chunk_text(self, text: str, metadata: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Split text into overlapping chunks."""
        chunks = []
        start = 0
        
        while start < len(text):
            end = start + self.chunk_size
            chunk = text[start:end]
            
            chunks.append({
                'content': chunk,
                'metadata': {
                    **metadata,
                    'chunk_index': len(chunks)
                }
            })
            
            start += self.chunk_size - self.overlap
        
        return chunks


class EmbeddingPipeline:
    """Pipeline for embedding and storing documents."""
    
    def __init__(self):
        """Initialize pipeline."""
        # Initialize Gemini
        gemini_api_key = os.getenv('GEMINI_API_KEY')
        if not gemini_api_key:
            raise ValueError("GEMINI_API_KEY not found in environment")
        
        genai.configure(api_key=gemini_api_key)
        self.embedding_model = "models/text-embedding-004"
        
        # Initialize Qdrant
        qdrant_host = os.getenv('QDRANT_HOST', 'localhost')
        qdrant_port = int(os.getenv('QDRANT_PORT', 6333))
        self.client = QdrantClient(host=qdrant_host, port=qdrant_port)
        self.collection_name = "robotext_docs"
        
        # Initialize document processor
        self.processor = DocumentProcessor()
        
        self._ensure_collection()
    
    def _ensure_collection(self):
        """Ensure the collection exists."""
        collections = self.client.get_collections().collections
        collection_names = [col.name for col in collections]
        
        if self.collection_name not in collection_names:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=768,
                    distance=Distance.COSINE
                )
            )
            print(f"Created collection: {self.collection_name}")
    
    def embed_text(self, text: str) -> List[float]:
        """Generate embedding for text."""
        result = genai.embed_content(
            model=self.embedding_model,
            content=text,
            task_type="retrieval_document"
        )
        return result['embedding']
    
    def process_directory(self, docs_path: Path):
        """Process all markdown files in a directory."""
        md_files = list(docs_path.glob('**/*.md'))
        
        if not md_files:
            print(f"No markdown files found in {docs_path}")
            return
        
        print(f"Found {len(md_files)} markdown files")
        
        total_chunks = 0
        
        for md_file in md_files:
            print(f"\nProcessing: {md_file}")
            
            try:
                # Load and parse document
                doc = self.processor.load_markdown(md_file)
                
                # Chunk document
                chunks = self.processor.chunk_text(
                    doc['content'],
                    doc['metadata']
                )
                
                print(f"  Created {len(chunks)} chunks")
                
                # Process chunks in batches
                batch_size = 10
                for i in range(0, len(chunks), batch_size):
                    batch = chunks[i:i + batch_size]
                    
                    # Generate embeddings
                    points = []
                    for chunk in batch:
                        embedding = self.embed_text(chunk['content'])
                        chunk_id = str(uuid.uuid4())
                        
                        points.append(
                            PointStruct(
                                id=chunk_id,
                                vector=embedding,
                                payload={
                                    'text': chunk['content'],
                                    **chunk['metadata']
                                }
                            )
                        )
                    
                    # Store in Qdrant
                    self.client.upsert(
                        collection_name=self.collection_name,
                        points=points
                    )
                    
                    print(f"  Uploaded batch {i // batch_size + 1}")
                
                total_chunks += len(chunks)
                
            except Exception as e:
                print(f"  Error processing {md_file}: {e}")
        
        print(f"\n✓ Successfully embedded {total_chunks} chunks from {len(md_files)} documents")


def main():
    """Main function."""
    # Get docs path from command line or use default
    if len(sys.argv) > 1:
        docs_path = Path(sys.argv[1])
    else:
        # Default to docs directory in the parent folder
        docs_path = Path(__file__).parent.parent / 'docs' / 'docs'
    
    if not docs_path.exists():
        print(f"Error: Documentation path does not exist: {docs_path}")
        sys.exit(1)
    
    print(f"Embedding documentation from: {docs_path}")
    
    # Create and run pipeline
    pipeline = EmbeddingPipeline()
    pipeline.process_directory(docs_path)


if __name__ == "__main__":
    main()
