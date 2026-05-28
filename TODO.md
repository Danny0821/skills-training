# TODO.md — Future Milestones (Caveman Style)

> [!NOTE]
> Future roadmap for Antigravity 2.0 Generator. Release `0.2.0` (UX & Installation) and `0.3.0` (Centralized Index & Reuse).

---

## 🚀 Release 0.2.0: Installation UX & Agent Guiding

### Goal
Make generator installation fast, secure, and friendly for both humans (even non-technical users) and AI agents.

### Tasks
- `[ ]` **NPX Scaffolder Execution**:
  - Enable running generator directly via `npx` from github:
    ```bash
    npx -y github:JuliusBrussee/antigravity-generator --help
    ```
- `[ ]` **PowerShell / Bash One-Liners**:
  - Support one-line installers (e.g. `irm` / `curl` scripts) to download and install globally in 10 seconds.
- `[ ]` **Agent Onboarding Manifest**:
  - Write explicit rules in `SKILL.md`/`generate.md` for AI agents.
  - If user pastes github repo link -> agent must intercept, recognize generator, and guide user step-by-step through the installation process.
- `[ ]` **Non-Technical User Playbook**:
  - Write simple, jargon-free instructions for less technical users (e.g. explaining "npm", "terminal", "powershell" with gentle definitions).

---

## 📦 Release 0.3.0: Centralized Skill Index & Reuse

### Goal
Prevent token waste and coding duplication. Allow agents to discover and reuse existing local skills across different project folders.

### Tasks
- `[ ]` **Central Index Database**:
  - Create a global catalog file (`C:\Users\Daniel\.gemini\config\skills_index.json`).
  - Track all generated local skills, folders, triggers, and capabilities in one spot.
- `[ ]` **Auto-Register on Scaffolding**:
  - When CLI `generate.js` creates a local skill, automatically append its metadata and absolute path to the global index.
- `[ ]` **Discovery Tooling**:
  - Build a search/discovery command (e.g. `/generate-search [term]` or `/skills-list`).
  - Allows AI agents to read the index first, check if a python auditor already exists locally, and load/import it instead of writing a new one.
