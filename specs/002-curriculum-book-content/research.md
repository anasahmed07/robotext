# Research: Curriculum Book Content

**Feature**: Curriculum Book Content
**Date**: 2025-12-07

## 1. Docusaurus Internationalization (i18n)

**Decision**: Use Docusaurus standard i18n file system routing.

**Rationale**:
- Native support in Docusaurus.
- Allows keeping translations separate from source code (`web/i18n/ur/...`).
- Automatic locale detection and language dropdown support.

**Structure**:
- Source (English): `web/docs/**`
- Translation (Urdu): `web/i18n/ur/docusaurus-plugin-content-docs/current/**`
- The filenames and folder structure in `i18n` MUST match the source `docs` exactly for proper mapping.

**Implementation Details**:
- Config is already set in `docusaurus.config.ts` (assumed based on `i18n` folder presence).
- Markdown files in `i18n` should contain the translated content but keep the same Frontmatter `id` (or implied id from filename).

## 2. Visual Style ("NotebookLM Style")

**Decision**: Use a consistent prompt strategy for generating explanatory images that mimics the "NotebookLM" or "Schematic" aesthetic.

**Style Definition**:
- **Type**: Technical Illustration / Schematic.
- **Color Palette**: High contrast (White/Black or Dark Blue/White), typically monochrome with 1-2 accent colors (e.g., Neon Blue or Orange).
- **Line Work**: Clean, thin lines, geometric shapes, "hand-drawn" but precise feel (like a digital whiteboard).
- **Content**: Simplified abstractions of complex systems (e.g., Nodes as circles, Topics as pipes, Robots as wireframes).

**Prompt Template**:
> "A technical schematic illustration in the style of a clean digital whiteboard or NotebookLM. Minimalist line art. [Subject Description]. High contrast, dark background, neon blue accents. Precise geometric shapes, no text labels."

## 3. Educational Content Structure (MDX)

**Decision**: Use MDX components to enhance learning.

**Components to Use**:
- `<Tabs>` / `<TabItem>`: For showing code in different languages (if applicable) or switching between "Concept" and "Implementation".
- `<Admonition>`: For "Key Takeaways", "Warnings", and "Self-Check Questions".
- `<CodeBlock>`: For runnable examples.
- `<Details>` / `<Summary>`: For "Deep Dives" or "Answers" to self-check questions to avoid clutter.

**Rationale**:
- Increases engagement.
- Allows progressive disclosure of complex information.
