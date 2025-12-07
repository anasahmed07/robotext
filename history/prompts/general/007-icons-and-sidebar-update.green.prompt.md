---
id: "007-icons-and-sidebar-update"
title: "Icons and Sidebar Update"
stage: "green"
date: "2025-12-07"
surface: "agent"
model: "Gemini 3 Pro"
feature: "homepage-redesign"
branch: "001-foundation-auth"
user: "Anas"
command: "use icons instead of emojis and fix the layout of the sidebar"
labels: ["ui", "icons", "sidebar", "docusaurus"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "web/src/pages/index.tsx"
  - "web/sidebars.ts"
  - "web/package.json"
tests: []
---

## Prompt
use icons instead of emojis and fix the layout of the sidebar its not correct currently. read the docasauras docs

## Response
Replaced emojis in the Feature Section with professional icons from `react-icons` (`FaRobot`, `FaNetworkWired`, `FaBrain`, `FaEye`). Updated `web/sidebars.ts` to use a manually defined structure, ensuring the documentation modules appear in the correct order (Intro -> Nervous System -> Digital Twin -> Brain -> VLA).
