# Data Model: Curriculum Book Content

## 1. File System Hierarchy

The content is organized physically by Module and logically by Week.

```text
web/docs/
├── 01-robotic-nervous-system/      # Module 1
│   ├── 01-introduction-physical-ai.mdx   # Week 1-2
│   ├── 02-ros2-fundamentals.mdx          # Week 3-5
│   └── index.mdx                         # Module Intro
├── 02-digital-twin/                # Module 2
│   ├── 01-gazebo-simulation.mdx          # Week 6-7
│   └── index.mdx
├── 03-ai-robot-brain/              # Module 3
│   ├── 01-nvidia-isaac.mdx               # Week 8-10
│   └── index.mdx
└── 04-vla/                         # Module 4
    ├── 01-humanoid-development.mdx       # Week 11-12
    ├── 02-conversational-robotics.mdx    # Week 13
    └── index.mdx
```

*Note: Filenames may vary slightly but must follow `MM-topic-name` convention within module folders.*

## 2. Content Metadata (Frontmatter)

Every MDX file MUST include the following Frontmatter:

```yaml
---
id: [unique-id]
title: [Display Title]
sidebar_label: [Menu Label]
description: [SEO Description]
keywords: [list, of, keywords]
---
```

## 3. Translation Mapping

Urdu translations reside in a mirror structure:

`web/i18n/ur/docusaurus-plugin-content-docs/current/[path-to-file]`

The `id` in Frontmatter MUST match the English version (or be omitted to default to filename).
The `title`, `sidebar_label`, and `description` MUST be translated.
