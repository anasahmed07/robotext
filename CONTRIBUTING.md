# Contributing to RoboText

Thank you for your interest in contributing to RoboText! This guide will help you get started.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/robotext.git
   cd robotext
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Install Dependencies**
   
   For Docusaurus:
   ```bash
   cd docs
   npm install
   ```
   
   For Auth Server:
   ```bash
   cd auth-server
   npm install
   ```
   
   For RAG Server:
   ```bash
   cd rag-server
   pip install -r requirements.txt
   ```
   
   For RAG Pipeline:
   ```bash
   cd rag-pipeline
   pip install -r requirements.txt
   ```

## Project Structure

```
robotext/
├── docs/              # Docusaurus documentation site
│   ├── docs/         # Documentation markdown files
│   ├── blog/         # Blog posts
│   └── src/          # React components
├── auth-server/       # Express.js + better-auth
│   ├── src/          # TypeScript source
│   └── prisma/       # Database schema
├── rag-server/        # FastAPI RAG API
│   ├── app/          # Application code
│   │   ├── routers/  # API endpoints
│   │   ├── services/ # Business logic
│   │   └── models/   # Data models
│   └── tests/        # Unit tests (to be added)
└── rag-pipeline/      # Documentation embedding scripts
```

## Development Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation

3. **Test Your Changes**
   - Test locally before committing
   - Ensure all services still work
   - Add tests for new features

4. **Commit**
   ```bash
   git add .
   git commit -m "Brief description of changes"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

## Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript for type safety
- Follow existing naming conventions
- Use async/await over promises
- Handle errors appropriately

### Python
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions and classes
- Use meaningful variable names

### Documentation
- Write clear, concise documentation
- Include code examples
- Keep README files up to date
- Use proper markdown formatting

## Adding Features

### Adding a New Documentation Page

1. Create a markdown file in `docs/docs/`
2. Add frontmatter with title and description
3. Update `sidebars.ts` if needed
4. Test locally with `npm start`

### Adding a New API Endpoint

1. Define schema in `rag-server/app/models/schemas.py`
2. Create endpoint in appropriate router
3. Add business logic in services
4. Test with FastAPI docs at `/docs`
5. Document the endpoint

### Adding a New Auth Feature

1. Update Prisma schema if needed
2. Add endpoint in `auth-server/src/index.ts`
3. Configure better-auth settings
4. Run migrations
5. Test the authentication flow

## Testing

Run tests before submitting:

```bash
# Build all components
cd docs && npm run build
cd ../auth-server && npm run build
cd ../rag-server && python3 -c "import app.main"

# Test with Docker Compose
docker-compose up -d
# Verify all services
docker-compose down
```

## Documentation

- Update README.md for major features
- Update TESTING.md for new test procedures
- Add inline code comments
- Update API documentation

## Questions?

- Open an issue for bugs
- Start a discussion for feature ideas
- Check existing issues before creating new ones

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Keep discussions focused and professional

Thank you for contributing! 🚀
