# Quickstart: Adding Curriculum Content

## 1. Create English Content

1.  Navigate to the appropriate Module folder in `web/docs/`.
2.  Create a new `.mdx` file (e.g., `01-intro.mdx`).
3.  Add Frontmatter:
    ```yaml
    ---
    title: Introduction to Physical AI
    sidebar_label: Intro to Physical AI
    description: Understanding the bridge between digital intelligence and physical bodies.
    ---
    ```
4.  Write content using Markdown and MDX components.
5.  Add images to `web/static/img/docs/[module]/` and reference them: `![Alt](/img/docs/module/image.png)`.

## 2. Translate to Urdu

1.  Copy the file structure to `web/i18n/ur/docusaurus-plugin-content-docs/current/`.
2.  Translate the `title`, `sidebar_label`, and `description` in Frontmatter.
3.  Translate the body text.
4.  **Keep code blocks and image references intact** (unless images have text, which they shouldn't).

## 3. Verify

1.  Run `npm start` in `web/`.
2.  Check the page in English.
3.  Use the navbar dropdown to switch to Urdu and verify.
