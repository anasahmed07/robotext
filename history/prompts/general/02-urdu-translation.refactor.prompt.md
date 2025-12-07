---
title: Translate Web Docs to Urdu
stage: refactor
date: 2025-12-07
surface: agent
model: gemini-2.0-pro-exp-02-05
feature: localization
branch: main
user: anasahmed07
command: write_to_file
labels: [localization, urdu, translation]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\intro.md
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\01-robotic-nervous-system\intro.md
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\01-robotic-nervous-system\01-intro-physical-ai.mdx
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\01-robotic-nervous-system\02-ros2-fundamentals.mdx
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\02-digital-twin\intro.md
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\02-digital-twin\01-gazebo-simulation.mdx
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\03-ai-robot-brain\intro.md
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\03-ai-robot-brain\01-nvidia-isaac.mdx
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\04-vla\intro.md
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\04-vla\01-humanoid-development.mdx
 - d:\Anas\robotext\web\i18n\ur\docusaurus-plugin-content-docs\current\04-vla\02-conversational-robotics.mdx
tests_yaml:
 - Manual review of translated files.
prompt_text: |
 now as we have written the content in english i wanted you to reflect the changes in the urdu version as well
response_text: |
 Translated all updated English documentation to Urdu.
 - Mirrored content changes from `web/docs` to `web/i18n/ur`.
 - Translated titles, headers, descriptions, and body text while preserving code blocks, images, and Mermaid diagrams.
 - Covered all modules: Robotic Nervous System, Digital Twin, AI Robot Brain, and VLA.
outcome: success
evaluation:
 metrics:
  - content_completeness: high
  - translation_accuracy: high
  - style_preservation: pass
---

# Prompt History Record

## Implementation
Iterated through the list of recently updated English files in `web/docs` and created/overwrote the corresponding files in `web/i18n/ur/docusaurus-plugin-content-docs/current`.
Used direct translation for text while maintaining technical terms (like ROS 2, Gazebo, URDF, VLA) in English script or transliterated where appropriate for clarity.
Preserved all frontmatter metadata, standardizing translated fields where possible.

## Key Updates
- **Intro & Module intros**: Fully translated to reflect the new curriculum structure.
- **Deep Dive MDX files**: Translated comprehensive technical guides for Physical AI, ROS 2, Gazebo, Isaac, and Humanoid VLA.
- **Diagrams**: Updated Mermaid graph labels to Urdu where textual, or kept English if too technical (like variable names).

## Validation
Verified file existence and content structure match the English source.
