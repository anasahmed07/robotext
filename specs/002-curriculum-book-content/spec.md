# Feature Specification: Curriculum Book Content

**Feature Branch**: `002-curriculum-book-content`
**Created**: 2025-12-07
**Status**: Draft
**Input**: User description: "we will write the complete content of the book following the cirriculam stated in the @web/docs/cirriculam.md . the content difficulty level should be gradually increasing and all the content should have proper references from the public content available and generated explainatory images in notebook lm style to explain the concepts. each page should have the necessary code examples and visual diagrams. the entire book will be written in mdx in the web/docs folder. and every page should have its urdu translated version"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Access Structured Curriculum Content (Priority: P1)

As a student, I want to read the book content organized by the curriculum modules and weeks so that I can follow the learning path systematically.

**Why this priority**: This is the core purpose of the feature: to provide the educational content.

**Independent Test**: Verify that the navigation structure matches the `cirriculam.md` outline and each section leads to the correct content page.

**Acceptance Scenarios**:

1. **Given** the documentation site is open, **When** I navigate to the "Physical AI & Humanoid Robotics" section, **Then** I see the structure matching Modules 1-4 and Weekly breakdowns.
2. **Given** I am on a specific week (e.g., "Week 1"), **When** I view the page, **Then** I see content relevant to that week's topic with increasing difficulty.

---

### User Story 2 - Bilingual Content Access (Urdu/English) (Priority: P1)

As a student, I want to be able to view the content in Urdu so that I can understand concepts in my native language.

**Why this priority**: Explicit requirement for "every page should have its urdu translated version".

**Independent Test**: Verify that switching the language selector to Urdu displays the translated content for the current page.

**Acceptance Scenarios**:

1. **Given** I am reading a content page in English, **When** I switch the language to Urdu, **Then** the text content updates to Urdu while preserving code blocks and diagrams.
2. **Given** a page with technical terms, **When** viewed in Urdu, **Then** the core concepts are explained clearly in Urdu.

---

### User Story 3 - Conceptual Understanding via Visuals and Code (Priority: P2)

As a student, I want to see explanatory images (NotebookLM style) and code examples so that I can grasp complex concepts and see practical implementations.

**Why this priority**: Essential for the "gradually increasing difficulty" and effective learning.

**Independent Test**: Check a random sample of pages to ensure they contain both visual aids and code snippets.

**Acceptance Scenarios**:

1. **Given** I am reading a concept (e.g., ROS 2 Nodes), **When** I scroll to the explanation, **Then** I see a "NotebookLM style" visual diagram summarizing the concept.
2. **Given** I am reading about a technical implementation, **When** I look for examples, **Then** I find relevant, copyable code blocks.

### Edge Cases

- **Missing Translation**: If an Urdu translation is missing for a page, the system should fallback to English or display a "Translation in progress" notice (standard behavior of the documentation platform).
- **Broken References**: If external public content references become unavailable, the core explanatory content MUST remain self-contained enough to be useful.
- **Complex Diagrams**: If a concept is too abstract for a simple diagram, it should be broken down into multiple smaller visual steps.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide documentation pages for all 4 Modules and 13 Weeks defined in `web/docs/cirriculam.md`.
- **FR-002**: Content MUST be written in MDX format located in `web/docs`.
- **FR-003**: Each content page MUST have a corresponding Urdu translation accessible via the platform's localization mechanism.
- **FR-004**: Each page MUST include at least one code example relevant to the topic.
- **FR-005**: Each page MUST include at least one visual diagram/explanatory image in "NotebookLM style" (clean, schema-like visuals).
- **FR-006**: Content difficulty MUST progress from foundational concepts (Weeks 1-2) to advanced implementation (Weeks 11-13).
- **FR-007**: Content MUST include citations/references to public resources where applicable.

### Key Entities

- **Curriculum Module**: Top-level grouping (e.g., "Module 1: The Robotic Nervous System").
- **Weekly Topic**: Specific content unit (e.g., "Week 3: ROS 2 Fundamentals").
- **Content Asset**: Images, diagrams, code snippets embedded in the MDX.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the Modules and Weeks listed in `cirriculam.md` have a corresponding MDX page.
- **SC-002**: 100% of the created MDX pages have a valid Urdu translation file.
- **SC-003**: Each page contains at least 1 image and 1 code block.
- **SC-004**: Navigation menu reflects the exact hierarchy of the curriculum.