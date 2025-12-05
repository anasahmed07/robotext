# RAG Pipeline

This directory contains scripts for embedding and indexing documentation into the Qdrant vector database.

## Overview

The RAG pipeline processes markdown documentation files and:
1. Loads and parses markdown files
2. Chunks documents into smaller pieces with overlap
3. Generates embeddings using Google Gemini's text-embedding-004 model
4. Stores embeddings and metadata in Qdrant vector database

## Setup

Install dependencies:

```bash
pip install -r requirements.txt
```

Set up environment variables (in `.env` file or export):

```bash
export GEMINI_API_KEY="your-gemini-api-key"
export QDRANT_HOST="localhost"
export QDRANT_PORT="6333"
```

## Usage

### Embed Documentation

Process all markdown files in a directory:

```bash
python embed_docs.py /path/to/docs
```

Or use the default docs location (../docs/docs):

```bash
python embed_docs.py
```

### Configuration

The `DocumentProcessor` class can be configured with:
- `chunk_size`: Maximum size of each text chunk (default: 1000 characters)
- `overlap`: Overlap between chunks (default: 200 characters)

### What Gets Stored

For each document chunk, the following is stored in Qdrant:
- **Vector**: 768-dimensional embedding from Gemini
- **Text**: The actual chunk content
- **Metadata**:
  - `source`: Original file path
  - `filename`: File name
  - `type`: Document type (e.g., "markdown")
  - `chunk_index`: Index of the chunk within the document

## Example

```python
from embed_docs import EmbeddingPipeline

# Create pipeline
pipeline = EmbeddingPipeline()

# Process documentation directory
pipeline.process_directory(Path("../docs/docs"))
```

## Notes

- The script processes files in batches of 10 to optimize API calls
- Failed files are logged but don't stop the entire process
- The collection "robotext_docs" is created automatically if it doesn't exist
- Embeddings are 768-dimensional vectors using cosine similarity
