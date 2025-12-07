---
description: "Task list for Curriculum Book Content"
---

# Tasks: Curriculum Book Content

**Input**: Design documents from `/specs/002-curriculum-book-content/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/frontmatter.yaml, quickstart.md

**Organization**: Tasks are grouped by Module to support the requested "chapter-wise" implementation, ensuring each module delivers a complete slice of value (Content + Visuals + Translation).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: [US1] Structure/Content, [US2] Translation, [US3] Visuals/Code

## Phase 1: Setup & Foundational

**Purpose**: Project initialization and structure for all modules.

- [x] T001 Create module directory structure in web/docs/ (01..04)
- [x] T002 Create translation directory structure in web/i18n/ur/docusaurus-plugin-content-docs/current/ (01..04)
- [x] T003 [P] Verify docusaurus.config.ts has i18n configuration for Urdu (ur)
- [x] T004 [P] Add frontmatter validation script or check based on contracts/frontmatter.yaml

---

## Phase 2: Module 1 - The Robotic Nervous System (Weeks 1-5)

**Goal**: Deliver Weeks 1-5 content with full bilingual support and visuals.

**Independent Test**: Verify Module 1 appears in sidebar, toggles to Urdu, and shows NotebookLM visuals.

### Week 1-2: Intro to Physical AI

- [x] T005 [P] [US1] Create web/docs/01-robotic-nervous-system/01-intro-physical-ai.mdx
- [x] T006 [P] [US3] Add "Physical AI vs Digital AI" NotebookLM diagram to 01-intro-physical-ai.mdx
- [x] T007 [P] [US3] Add "Sensor Systems" diagram (LIDAR/IMU/Camera) to 01-intro-physical-ai.mdx
- [x] T008 [P] [US3] Add Python code snippet for simple sensor reading to 01-intro-physical-ai.mdx
- [x] T009 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/01-robotic-nervous-system/01-intro-physical-ai.mdx

### Week 3-5: ROS 2 Fundamentals

- [x] T010 [P] [US1] Create web/docs/01-robotic-nervous-system/02-ros2-fundamentals.mdx
- [x] T011 [P] [US3] Add "ROS 2 Graph" NotebookLM diagram (Nodes/Topics) to 02-ros2-fundamentals.mdx
- [x] T012 [P] [US3] Add Python code snippet for a simple Publisher/Subscriber node to 02-ros2-fundamentals.mdx
- [x] T013 [P] [US3] Add XML code snippet for a launch file to 02-ros2-fundamentals.mdx
- [x] T014 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/01-robotic-nervous-system/02-ros2-fundamentals.mdx

### Module Intro
- [x] T015 [P] [US1] Create web/docs/01-robotic-nervous-system/index.mdx (Module Overview)
- [x] T016 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/01-robotic-nervous-system/index.mdx

**Checkpoint**: Module 1 fully readable in English and Urdu with code and diagrams.

---

## Phase 3: Module 2 - The Digital Twin (Weeks 6-7)

**Goal**: Deliver Weeks 6-7 content (Simulation).

**Independent Test**: Verify Module 2 content, visuals, and translation.

### Week 6-7: Robot Simulation

- [x] T017 [P] [US1] Create web/docs/02-digital-twin/01-gazebo-simulation.mdx
- [x] T018 [P] [US3] Add "Gazebo Architecture" NotebookLM diagram (Physics/Rendering) to 01-gazebo-simulation.mdx
- [x] T019 [P] [US3] Add "URDF Structure" diagram to 01-gazebo-simulation.mdx
- [x] T020 [P] [US3] Add URDF XML code example to 01-gazebo-simulation.mdx
- [x] T021 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/02-digital-twin/01-gazebo-simulation.mdx

### Module Intro
- [x] T022 [P] [US1] Create web/docs/02-digital-twin/index.mdx
- [x] T023 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/02-digital-twin/index.mdx

**Checkpoint**: Module 2 complete.

---

## Phase 4: Module 3 - The AI-Robot Brain (Weeks 8-10)

**Goal**: Deliver Weeks 8-10 content (NVIDIA Isaac).

**Independent Test**: Verify Module 3 content, visuals, and translation.

### Week 8-10: NVIDIA Isaac

- [x] T024 [P] [US1] Create web/docs/03-ai-robot-brain/01-nvidia-isaac.mdx
- [x] T025 [P] [US3] Add "Isaac Sim vs Isaac ROS" NotebookLM diagram to 01-nvidia-isaac.mdx
- [x] T026 [P] [US3] Add "Perception Pipeline" diagram to 01-nvidia-isaac.mdx
- [x] T027 [P] [US3] Add code example for Isaac ROS VSLAM config to 01-nvidia-isaac.mdx
- [x] T028 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/03-ai-robot-brain/01-nvidia-isaac.mdx

### Module Intro
- [x] T029 [P] [US1] Create web/docs/03-ai-robot-brain/index.mdx
- [x] T030 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/03-ai-robot-brain/index.mdx

**Checkpoint**: Module 3 complete.

---

## Phase 5: Module 4 - VLA (Weeks 11-13)

**Goal**: Deliver Weeks 11-13 content (VLA & Capstone).

**Independent Test**: Verify Module 4 content, visuals, and translation.

### Week 11-12: Humanoid Development

- [ ] T031 [P] [US1] Create web/docs/04-vla/01-humanoid-development.mdx
- [ ] T032 [P] [US3] Add "Bipedal Locomotion" NotebookLM diagram to 01-humanoid-development.mdx
- [ ] T033 [P] [US3] Add code example for balance control loop to 01-humanoid-development.mdx
- [ ] T034 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/04-vla/01-humanoid-development.mdx

### Week 13: Conversational Robotics

- [ ] T035 [P] [US1] Create web/docs/04-vla/02-conversational-robotics.mdx
- [ ] T036 [P] [US3] Add "VLA Architecture" NotebookLM diagram (Vision+Lang to Action) to 02-conversational-robotics.mdx
- [ ] T037 [P] [US3] Add code example for LLM-to-ROS2 bridge to 02-conversational-robotics.mdx
- [ ] T038 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/04-vla/02-conversational-robotics.mdx

### Module Intro
- [ ] T039 [P] [US1] Create web/docs/04-vla/index.mdx
- [ ] T040 [P] [US2] Create Urdu translation web/i18n/ur/docusaurus-plugin-content-docs/current/04-vla/index.mdx

**Checkpoint**: Module 4 and full book content complete.

---

## Phase 6: Polish & Cross-Cutting

- [ ] T041 Verify all internal links between modules work in English and Urdu
- [ ] T042 Verify all images load correctly and have alt text
- [ ] T043 Run `npm run build` to ensure no MDX errors
- [ ] T044 Update main sidebar navigation in web/sidebars.ts if auto-generation isn't sufficient

---

## Dependencies & Execution Order

1.  **Phase 1 (Setup)** must be done first.
2.  **Phases 2-5 (Modules)** can technically be done in any order or in parallel, but sequential (1->2->3->4) is recommended for narrative flow.
3.  **Within each Module**:
    - English Content (US1) is prerequisite for Translation (US2).
    - Visuals/Code (US3) can be done in parallel with English Content authoring or added immediately after.
4.  **Polish (Phase 6)** is final check.

## Parallel Execution Opportunities

- Different writers can take different Modules (Phases 2, 3, 4, 5) simultaneously.
- A translator can work on Module 1 (US2) while a technical writer starts Module 2 (US1).
- A technical artist can generate all NotebookLM visuals (T006, T007, T011, etc.) in a batch.
