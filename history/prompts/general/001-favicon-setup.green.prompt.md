ID: 001
TITLE: Favicon Setup
STAGE: green
DATE_ISO: 2025-12-07
SURFACE: agent
MODEL: Gemini 3 Pro (Preview)
FEATURE: none
BRANCH: 001-foundation-auth
USER: anasahmed07
COMMAND: install favicons
LABELS: ["favicon", "docusaurus", "branding"]
LINKS: null
FILES_YAML:
 - web/static/favicon/favicon.svg
 - web/static/favicon/favicon-96x96.png
 - web/static/favicon/favicon.ico
 - web/static/favicon/apple-touch-icon.png
 - web/static/favicon/web-app-manifest-192x192.png
 - web/static/favicon/web-app-manifest-512x512.png
 - web/static/favicon/site.webmanifest
 - web/docusaurus.config.ts
TESTS_YAML:
 - Manual verification of file existence
 - Configuration update
PROMPT_TEXT: |
  I have generated my favicon with RealFaviconGenerator. Now I want to install it in my docs website and remove the previous placeholder ones.

  First, you need to identify the folder where the files are publicly accessible. It might be called `public` or something similar. Later on, this folder is referred as `PUBLIC_FOLDER`. Moreover, the favicon files need to be put to a subdirectory of `PUBLIC_FOLDER` (in `PUBLIC_FOLDER/favicon`).

  Please:

  - Download https://realfavicongenerator.net/files/0da75c8b-2cc6-4d37-a0bf-0e7589d83dc7/favicon.svg and save it to `PUBLIC_FOLDER/favicon`
  - Download https://realfavicongenerator.net/files/0da75c8b-2cc6-4d37-a0bf-0e7589d83dc7/favicon-96x96.png and save it to `PUBLIC_FOLDER/favicon`
  - Download https://realfavicongenerator.net/files/0da75c8b-2cc6-4d37-a0bf-0e7589d83dc7/favicon.ico and save it to `PUBLIC_FOLDER/favicon`
  - Download https://realfavicongenerator.net/files/0da75c8b-2cc6-4d37-a0bf-0e7589d83dc7/apple-touch-icon.png and save it to `PUBLIC_FOLDER/favicon`
  - Download https://realfavicongenerator.net/files/0da75c8b-2cc6-4d37-a0bf-0e7589d83dc7/web-app-manifest-192x192.png and save it to `PUBLIC_FOLDER/favicon`
  - Download https://realfavicongenerator.net/files/0da75c8b-2cc6-4d37-a0bf-0e7589d83dc7/web-app-manifest-512x512.png and save it to `PUBLIC_FOLDER/favicon`
  - Download https://realfavicongenerator.net/files/0da75c8b-2cc6-4d37-a0bf-0e7589d83dc7/site.webmanifest and save it to `PUBLIC_FOLDER/favicon`

  There are HTML markups to add to all pages of the website. However, they should not be duplicated. There must be a file (or a few files) in my project where these markups can be added once for all. This is probably the file where the root `<html>` tag is defined.

  In this file (or these files), add the following HTML markups:

  ```html
  <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
  <link rel="shortcut icon" href="/favicon/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
  <link rel="manifest" href="/favicon/site.webmanifest" />
  ```
RESPONSE_TEXT: |
  Downloaded favicon files to `web/static/favicon`.
  Updated `web/docusaurus.config.ts` to include the new favicons via `headTags` and updated the `favicon` property.
  Removed the old `web/static/img/favicon.ico`.
