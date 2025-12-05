---
id: 001
title: Robotext Constitution Initial Ratification
stage: constitution
date: 2025-12-06
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: main
user: anasahmed07
command: /sp.constitution
labels: ["constitution", "initial-setup", "governance", "robotext"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
tests:
  - none
---

## Prompt

Follow instructions in [sp.constitution.prompt.md](file:///d%3A/Anas/robotext/.github/prompts/sp.constitution.prompt.md).
Project Specification: Robotext1. Project OverviewName: RobotextDomain: Physical AI and RoboticsFormat: AI-Native, Interactive Web-BookMission: To provide a comprehensive, interactive, and bilingual (English/Urdu) educational resource on Physical AI and Robotics, utilizing state-of-the-art LLMs for context-aware learner assistance.2. Content & Localization StrategyContent Architecture (The Outline):Module 1: The Robotic Nervous System (ROS 2)Module 2: The Digital Twin (Gazebo & Unity)Module 3: The AI-Robot Brain (NVIDIA Isaac™)Module 4: Vision-Language-Action (VLA)Weekly Breakdown:Weeks 1-2: Introduction to Physical AIWeeks 3-5: ROS 2 FundamentalsWeeks 6-7: Robot Simulation with GazeboWeeks 8-10: NVIDIA Isaac PlatformWeeks 11-12: Humanoid Robot DevelopmentWeek 13: Conversational Robotics + CapstoneEducational Philosophy (Educational Excellence):Progressive Complexity: Content flows strictly from fundamentals to advanced topics.Practical Examples: Every concept includes runnable code examples where applicable.Visual Learning: Extensive use of diagrams, architecture visuals, and hardware images.Assessment Integration: Each module includes self-check questions.Format: MDX (Markdown + JSX). Content includes embedded interactive React components.Internationalization (i18n):Languages: English (LTR) and Urdu (RTL).Implementation: Docusaurus i18n.Requirement: Seamless toggling. UI Mirroring: The layout must automatically flip (mirror) to Right-to-Left (RTL) when Urdu is selected.3. Design System & UI/UXTheme Strategy: Dual-mode support (Dark/Light).Color Palette:Primary Accent: Neon Green (#00e599)Dark Mode Background: Grey Black (#18191b)Light Mode Background: White (#ffffff)Visual Style:Animations: Subtle UI animations on the landing page and book interface (framer-motion or CSS transitions). Note: No heavy 3D simulations for now.Layout: Responsive, Mobile-first.4. System ArchitectureA. Frontend (The Book)Tech: Docusaurus, React.Hosting: GitHub Pages.Function: Renders MDX, handles i18n routing (LTR/RTL), and client-side interactivity.B. Backend Service 1: User Management (Auth API)Tech: Node.js / Express.js.Library: better-auth for authentication flows.Database: Neon (Serverless PostgreSQL).Hosting: Railway.Onboarding & Data Collection:Upon signup, the flow must collect:User Preferences.Knowledge Base: Programming languages known, familiarity with ROS, Physical AI, and Robotics.Hardware Specifications: User's available compute power (to tailor code examples).Purpose: Authenticate users to grant access to Advanced Features.C. Backend Service 2: AI & RAG Pipeline (Chat API)Tech: Python / FastAPI.Vector Database: Qdrant.LLM Provider: Google Gemini (Completions and Embeddings).Hosting: Railway.Architecture: Retrieval-Augmented Generation (RAG).Constraint: Strict RAG. The chatbot must answer only based on the provided book content. If the answer is not in the book, it must decline to answer.5. Functional Requirements & Advanced FeaturesStandard Features (Open Access):Reading all MDX content.Basic interactive components.Self-check questions (ungraded).Advanced Features (Gated by Auth):AI Chatbot: The floating RAG chat widget for Q&A.Personalized Quizzes: Quizzes generated dynamically based on the user's "Educational Stage" and "Knowledge Base" (collected during onboarding).Progress Tracking: Saving reading history and quiz scores to the Neon DB.6. Deployment PipelineCI/CD: GitHub Actions.Workflow:Commit to main triggers Docusaurus build -> Deploy to GitHub Pages.Backend changes trigger Railway re-deployment.

## Response snapshot

Created Robotext Constitution v1.0.0 with the following structure:

**Core Principles (8 total)**:
1. Educational Excellence - Progressive complexity, multi-modal learning
2. Bilingual Accessibility (i18n) - English/Urdu with RTL support
3. AI-Native Architecture - Strict RAG, no hallucination
4. Separation of Concerns - Frontend/Auth API/Chat API boundaries
5. Access Control & Feature Gating - Two-tier access model
6. Content as Code (MDX) - Version-controlled educational content
7. Mobile-First & Responsive Design - Touch-friendly, theme support
8. Observability & Data Privacy - Logging, monitoring, privacy compliance

**Additional Sections**:
- Technology Stack (mandatory: Docusaurus, Node.js, FastAPI, Neon, Qdrant, Gemini)
- Development Standards (code quality, testing, performance, security, documentation)
- Governance (amendment process, compliance review, versioning policy)

**Template Updates**:
- Updated plan-template.md Constitution Check section with 12 specific gates aligned to Robotext principles
- Verified spec-template.md and tasks-template.md align with constitution requirements

**Version**: 1.0.0 (MAJOR bump - initial ratification)
**Ratification Date**: 2025-12-06

## Outcome

- ✅ Impact: Established foundational governance document defining 8 core principles, technology stack mandates, and development standards for Robotext project
- 🧪 Tests: N/A (governance document)
- 📁 Files: Created/updated `.specify/memory/constitution.md` (171 lines), updated `.specify/templates/plan-template.md` (Constitution Check section)
- 🔁 Next prompts: Run `/sp.specify` to create first feature spec, `/sp.adr` to document technology choices (Qdrant, Gemini, better-auth)
- 🧠 Reflection: Constitution successfully captures educational mission (bilingual accessibility, progressive learning) while enforcing technical rigor (RAG constraints, service separation, performance budgets)

## Evaluation notes (flywheel)

- Failure modes observed: None (initial creation)
- Graders run and results (PASS/FAIL): Manual validation passed - no unresolved placeholders, all 8 principles have clear rationale, technology stack explicit, governance process defined
- Prompt variant (if applicable): N/A (baseline constitution creation)
- Next experiment (smallest change to try): Monitor whether Constitution Check gates in plan-template.md need refinement after first feature planning cycle
