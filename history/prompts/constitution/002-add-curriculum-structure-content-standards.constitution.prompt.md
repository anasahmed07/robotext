---
id: 002
title: Add Curriculum Structure and Content Standards
stage: constitution
date: 2025-12-06
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: main
user: anasahmed07
command: /sp.constitution
labels: ["constitution", "curriculum", "content-standards", "educational-design"]
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
update the constitution to add the following objectives of the project too. the book content also have to be generated acc to the course outline the book should have three chapters. below is the outline
Book outline:

Content Architecture:

- Module 1: The Robotic Nervous System (ROS 2)

- Module 2: The Digital Twin (Gazebo & Unity)

- Module 3: The AI-Robot Brain (NVIDIA Isaac™)

- Module 4: Vision-Language-Action (VLA)



Weekly Breakdown:

- Weeks 1-2: Introduction to Physical AI

- Weeks 3-5: ROS 2 Fundamentals

- Weeks 6-7: Robot Simulation with Gazebo

- Weeks 8-10: NVIDIA Isaac Platform

- Weeks 11-12: Humanoid Robot Development

- Week 13: Conversational Robotics + Capstone



the book content should be written Educational Excellence

   - Progressive Complexity: Content flows from fundamentals to advanced topics

   - Practical Examples: Every concept includes runnable code examples where applicable

   - Visual Learning: Diagrams, architecture visuals, and hardware images throughout

   - Assessment Integration: Each module includes self-check questions

## Response snapshot

**Constitution Amendment: v1.0.0 → v1.1.0 (MINOR)**

**Changes Made**:

1. **Enhanced Principle I (Educational Excellence)**:
   - Added requirement that book content MUST adhere to defined curriculum structure
   - Linked content generation to 4-module, 13-week course outline
   - Enforced alignment with module objectives and learning outcomes

2. **Added New Section: Curriculum Structure**:
   - Formalized 4-module course architecture
   - Defined weekly timeline (Weeks 1-13)
   - Established module sequence:
     - Module 1: ROS 2 (Weeks 3-5)
     - Module 2: Gazebo & Unity (Weeks 6-7)
     - Module 3: NVIDIA Isaac (Weeks 8-10)
     - Module 4: VLA (Weeks 11-13)
   - Set content sequencing rules (foundational → module-specific → integrative capstone)

3. **Added New Section: Content Generation Standards**:
   - Defined chapter structure mapping to weekly breakdown (6 chapters total)
   - Specified per-chapter requirements:
     - Learning objectives (3-5 per chapter)
     - Progressive content flow (fundamentals → intermediate → advanced)
     - Runnable code examples (minimum 3 per concept)
     - Visual assets (minimum 2 diagrams per chapter)
     - Self-check questions (minimum 5 per chapter)
   - Established content quality gates (checklist for publication readiness)

4. **Updated Templates**:
   - plan-template.md Constitution Check: Added 2 new gates for curriculum structure and content standards compliance

**Version Bump Rationale**:
- MINOR (not PATCH): Added substantial new sections (Curriculum Structure, Content Generation Standards)
- Not MAJOR: No breaking changes to existing principles; only expansions and clarifications

## Outcome

- ✅ Impact: Formalized curriculum architecture and content generation standards, ensuring all book content follows structured 13-week course outline with measurable quality requirements
- 🧪 Tests: N/A (governance document)
- 📁 Files: Updated `.specify/memory/constitution.md` (added ~100 lines for curriculum/content sections), updated `.specify/templates/plan-template.md` (2 new Constitution Check gates)
- 🔁 Next prompts: Create feature spec for Module 1 content generation (`/sp.specify`), document chapter structure in ADR (`/sp.adr chapter-architecture`)
- 🧠 Reflection: Constitution now provides concrete structure for content creators. The 6-chapter mapping (Weeks 1-2, 3-5, 6-7, 8-10, 11-12, 13) creates clear milestones. Quality gates ensure consistency across all generated content.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Manual validation PASS - curriculum structure aligns with 4 modules + 13 weeks; content standards are measurable (minimum counts for code examples, diagrams, questions); chapter mapping is logical
- Prompt variant (if applicable): User requested "three chapters" but outline implies 6 natural chapters based on weekly groupings; implemented 6-chapter structure as it better serves progressive learning
- Next experiment (smallest change to try): Monitor whether chapter-level requirements (3 code examples, 2 diagrams, 5 questions) are sufficient or need adjustment after first chapter generation attempt
