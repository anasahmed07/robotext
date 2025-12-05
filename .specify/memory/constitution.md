<!--
Sync Impact Report:
Version: 1.0.0 → 1.1.0 (MINOR: Added curriculum structure and content standards)
Modified Principles:
  - I. Educational Excellence (expanded with curriculum outline requirements)
Added Sections:
  - Curriculum Structure (course outline, module mapping)
  - Content Generation Standards (chapter requirements)
Templates Status:
  ✅ spec-template.md (Constitution Check section aligned)
  ✅ plan-template.md (Constitution Check gates aligned)
  ✅ tasks-template.md (Task categorization aligned)
Follow-up TODOs: None
-->

# Robotext Constitution

## Core Principles

### I. Educational Excellence

Content MUST follow progressive complexity: fundamentals → intermediate → advanced. Every concept MUST include:
- Clear, accessible explanations in both English and Urdu
- Practical, runnable code examples where applicable
- Visual aids (diagrams, architecture visuals, hardware images)
- Self-check questions for concept validation

**Book Content MUST adhere to the defined curriculum structure**:
- 4 Modules mapped to 13-week timeline
- Content generated according to course outline (see Curriculum Structure section)
- Each chapter follows the weekly breakdown progression
- All content aligns with module objectives and learning outcomes

**Rationale**: Physical AI and Robotics are complex domains. Learners need structured progression and multi-modal learning to build solid foundations before tackling advanced topics. A well-defined curriculum ensures comprehensive coverage and logical learning flow.

### II. Bilingual Accessibility (i18n)

All content MUST be available in English (LTR) and Urdu (RTL). UI MUST:
- Support seamless language toggling
- Automatically mirror layout for RTL when Urdu is selected
- Maintain consistent terminology across languages
- Preserve technical accuracy in translation

**Rationale**: Making Physical AI education accessible to Urdu-speaking learners removes language barriers and democratizes access to cutting-edge robotics knowledge.

### III. AI-Native Architecture

The system MUST implement strict Retrieval-Augmented Generation (RAG):
- Chatbot answers ONLY from book content (no hallucination)
- If answer not in corpus, decline politely
- Use collected user data (knowledge base, preferences, hardware specs) for personalization
- Maintain context awareness across conversations

**Rationale**: Educational integrity requires accurate, verifiable information. RAG ensures learners receive only validated content from the curriculum.

### IV. Separation of Concerns (Services)

System architecture MUST maintain clear service boundaries:
- **Frontend (Docusaurus)**: Content rendering, MDX execution, i18n routing, client-side interactivity
- **Auth API (Node.js/Typescript/better-auth)**: User management, onboarding data collection, authentication flows
- **Chat API (Python/FastAPI)**: RAG pipeline, vector search, LLM completions

Services communicate via defined contracts. No cross-service business logic leakage.

**Rationale**: Independent services enable parallel development, isolated testing, and independent scaling. Clear boundaries prevent coupling and facilitate maintenance.

### V. Access Control & Feature Gating

Content access MUST follow two-tier model:
- **Open Access**: All MDX content, basic interactive components, ungraded self-check questions
- **Advanced Features (Auth-Gated)**: AI chatbot, personalized quizzes, progress tracking

User onboarding MUST collect: preferences, knowledge base (languages, ROS, Physical AI familiarity), hardware specifications.

**Rationale**: Open access maximizes reach while gated features create engagement incentives and enable personalization. Onboarding data powers adaptive learning experiences.

### VI. Content as Code (MDX)

All educational content MUST be authored in MDX (Markdown + JSX):
- Version controlled in Git
- Embedded interactive React components allowed
- Strict separation: content files vs. component implementations
- No hardcoded content in components

**Rationale**: MDX enables rich interactivity while maintaining content readability, version control, and collaborative editing. Content and code coexist in a single authoring format.

### VII. Mobile-First & Responsive Design

UI MUST be fully responsive with mobile-first approach:
- Touch-friendly interactive elements
- Optimized reading experience on small screens
- Performant animations (framer-motion or CSS transitions)
- No heavy 3D simulations (defer to future phases)

Dark/Light theme support MANDATORY with color palette:
- Primary Accent: Neon Green (#00e599)
- Dark Background: Grey Black (#18191b)
- Light Background: White (#ffffff)

**Rationale**: Many learners access educational content on mobile devices. Mobile-first design ensures accessibility regardless of device.

### VIII. Observability & Data Privacy

**Rationale**: Observability enables rapid issue detection and system optimization. Privacy compliance builds learner trust and meets regulatory requirements.

## Curriculum Structure

**Course Architecture**: 4 modules delivered over 13 weeks

### Module Outline

1. **Module 1: The Robotic Nervous System (ROS 2)**
   - Foundation of robot communication and control
   - Weeks 3-5: ROS 2 Fundamentals
   
2. **Module 2: The Digital Twin (Gazebo & Unity)**
   - Robot simulation and virtual testing
   - Weeks 6-7: Robot Simulation with Gazebo
   
3. **Module 3: The AI-Robot Brain (NVIDIA Isaac™)**
   - AI-powered robot perception and planning
   - Weeks 8-10: NVIDIA Isaac Platform
   
4. **Module 4: Vision-Language-Action (VLA)**
   - Conversational and multimodal robotics
   - Weeks 11-13: Humanoid Robot Development + Conversational Robotics + Capstone

### Weekly Timeline

| Week(s) | Topic | Module |
|---------|-------|--------|
| 1-2 | Introduction to Physical AI | Foundation |
| 3-5 | ROS 2 Fundamentals | Module 1 |
| 6-7 | Robot Simulation with Gazebo | Module 2 |
| 8-10 | NVIDIA Isaac Platform | Module 3 |
| 11-12 | Humanoid Robot Development | Module 4 |
| 13 | Conversational Robotics + Capstone | Module 4 |

**Content Sequencing Rules**:
- Week 1-2 content MUST establish foundational concepts before module-specific topics
- Each module MUST build on previous modules (no standalone silos)
- Capstone (Week 13) MUST integrate concepts from all 4 modules
- Code examples MUST be cumulative (later weeks reference earlier implementations)

## Content Generation Standards

All book content MUST be generated according to these requirements:

### Chapter Structure

Content MUST be organized into chapters following the weekly breakdown:
- Each week or multi-week topic becomes a chapter
- Chapters MUST follow sequential numbering aligned with timeline
- Chapter titles MUST clearly indicate the topic and module context

**Example Chapter Mapping**:
- Chapter 1: Introduction to Physical AI (Weeks 1-2)
- Chapter 2: ROS 2 Fundamentals (Weeks 3-5)
- Chapter 3: Robot Simulation with Gazebo (Weeks 6-7)
- Chapter 4: NVIDIA Isaac Platform (Weeks 8-10)
- Chapter 5: Humanoid Robot Development (Weeks 11-12)
- Chapter 6: Conversational Robotics & Capstone (Week 13)

### Per-Chapter Requirements

Each chapter MUST contain:

1. **Learning Objectives** (3-5 bullets)
   - Clear, measurable outcomes
   - Aligned with module goals
   
2. **Progressive Content Flow**
   - Conceptual Introduction (fundamentals)
   - Technical Deep-Dive (intermediate)
   - Advanced Applications (advanced)
   
3. **Runnable Code Examples**
   - Minimum 3 code examples per major concept
   - Examples MUST execute successfully in standard environments
   - Code MUST include comments explaining key sections
   - Prerequisites clearly stated (dependencies, hardware requirements)
   
4. **Visual Learning Assets**
**Version**: 1.1.0 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-06)
   - Hardware images where applicable (robots, sensors, compute platforms)
   - Screenshots of tools/interfaces (Gazebo, Isaac Sim, RViz)
   
5. **Self-Check Questions**
   - Minimum 5 questions per chapter
   - Mix of: multiple choice, true/false, short answer
   - Answers provided (or linked for auth-gated quiz variants)
   - Questions MUST test comprehension, not memorization

### Content Quality Gates

Before publishing any chapter, verify:
- [ ] Progressive complexity maintained (no sudden difficulty spikes)
- [ ] All code examples tested and functional
- [ ] Visual assets present and properly captioned
- [ ] Self-check questions aligned with learning objectives
- [ ] Bilingual content available (English + Urdu)
- [ ] Terminology consistent with previous chapters
- [ ] External references cited (research papers, official docs)

## Technology Stackerformance metrics (response times, error rates)
- **Analytics**: Reading progress, quiz completion rates (aggregated, anonymized)
- **Privacy**: User data (preferences, hardware specs, progress) stored securely in Neon DB; no external sharing without consent

**Rationale**: Observability enables rapid issue detection and system optimization. Privacy compliance builds learner trust and meets regulatory requirements.

## Technology Stack

**MANDATORY Technologies**:
- **Frontend**: Docusaurus, React, MDX
- **Auth Backend**: Node.js, Express.js, better-auth, Neon (PostgreSQL)
- **AI Backend**: Python, FastAPI, Qdrant (vector DB), Google Gemini (LLM + embeddings)
- **Hosting**: GitHub Pages (frontend), Railway (backends)
- **CI/CD**: GitHub Actions

**Versioning Requirements**:
- Node.js: ≥18.x
- Python: ≥3.10
- React: Compatible with Docusaurus stable version
- All dependencies pinned in package.json / requirements.txt

## Development Standards

### Code Quality
- ESLint + Prettier for JavaScript/TypeScript (frontend, Auth API)
- Black + Flake8 for Python (Chat API)
- Type annotations REQUIRED (TypeScript for frontend/Node, Python type hints for FastAPI)
- No console.log in production code (use proper logging libraries)

### Testing
- **Frontend**: Jest + React Testing Library for components
- **Auth API**: Mocha/Chai or Jest for endpoint tests
- **Chat API**: pytest for RAG pipeline, endpoint tests
- Integration tests REQUIRED for inter-service contracts (Auth ↔ Frontend, Chat ↔ Frontend)

### Performance
- **Frontend**: Lighthouse score ≥90 (Performance, Accessibility, SEO)
- **Auth API**: <200ms p95 latency for authentication flows
- **Chat API**: <3s p95 for RAG responses (including LLM completion)
- **Database**: Query optimization for user progress tracking (indexed lookups)

### Security
- HTTPS enforced (Railway, GitHub Pages)
- Environment variables for secrets (never committed)
- Input validation on all API endpoints (sanitize user queries to Chat API)
- Rate limiting on Auth API (prevent brute-force) and Chat API (prevent abuse)
- CORS configured appropriately (frontend ↔ backends)

### Documentation
- README.md MUST include: project setup, environment variables, deployment steps
- API contracts documented (OpenAPI/Swagger for backends)
- Inline code comments for complex logic only (code should be self-explanatory)
- ADRs for architectural decisions (e.g., choice of Qdrant, Gemini, better-auth)

## Governance

This constitution supersedes all other development practices. All code changes, PRs, and architectural decisions MUST comply with these principles.

**Amendment Process**:
1. Propose changes with rationale in GitHub issue or discussion
2. Document impact on existing code/architecture
3. Increment version semantically (MAJOR: breaking changes to principles; MINOR: new principles/sections; PATCH: clarifications)
4. Update all dependent templates and documentation
5. Commit with message format: `docs: amend constitution to vX.Y.Z (<brief change>)`

**Compliance Review**:
- All PRs MUST pass automated checks (linting, tests, Lighthouse scores)
- Maintainers verify principle adherence during code review
- Monthly architecture review to assess constitution alignment

**Versioning Policy**:
- Constitution version format: MAJOR.MINOR.PATCH
- Linked from README.md and all template files

**Runtime Guidance**:
- See `.github/copilot-instructions.md` for agent-specific development workflows
- Constitution principles override agent defaults when conflicts arise

**Version**: 1.0.0 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-06
