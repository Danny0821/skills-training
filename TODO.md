# TODO.md — Future Milestones (Caveman Style)

> [!NOTE]
> Completed and future roadmap for Antigravity 2.0 Generator. Releases 0.2.0 through 0.4.2 are fully implemented and verified on the master branch.

---

## 🚀 Release 0.2.0: Installation UX & Agent Guiding [COMPLETED]

### Goal
Make generator installation fast, secure, and friendly for both humans (even non-technical users) and AI agents.

### Tasks
- `[x]` **NPX Scaffolder Execution**:
  - Enable running generator directly via `npx` from github:
    ```bash
    npx -y github:JuliusBrussee/antigravity-generator --help
    ```
- `[x]` **PowerShell / Bash One-Liners**:
  - Support one-line installers (e.g. `irm` / `curl` scripts) to download and install globally in 10 seconds.
- `[x]` **Agent Onboarding Manifest**:
  - Write explicit rules in `SKILL.md`/`generate.md` for AI agents.
  - If user pastes github repo link -> agent must intercept, recognize generator, and guide user step-by-step through the installation process.
- `[x]` **Non-Technical User Playbook**:
  - Write simple, jargon-free instructions for less technical users (e.g. explaining "npm", "terminal", "powershell" with gentle definitions).

---

## 📦 Release 0.3.0: Centralized Skill Index & Reuse [COMPLETED]

### Goal
Prevent token waste and coding duplication. Allow agents to discover and reuse existing local skills across different project folders.

### Tasks
- `[x]` **Central Index Database**:
  - Create a global catalog file (`C:\Users\Daniel\.gemini\config\skills_index.json`).
  - Track all generated local skills, folders, triggers, and capabilities in one spot.
- `[x]` **Auto-Register on Scaffolding**:
  - When CLI `generate.js` creates a local skill, automatically append its metadata and absolute path to the global index.
- `[x]` **Discovery Tooling**:
  - Build a search/discovery command (e.g. `/generate-search [term]` or `/skills-list`).
  - Allows AI agents to read the index first, check if a python auditor already exists locally, and load/import it instead of writing a new one.

---

## 🆕 Release 0.4.0: Interactive Agentic Skill Creation [COMPLETED]

### Goal
Introduce guided quick-vs-advanced modes with custom requirements, triggers, tasks, reviews, and hardened shebang multi-language verification engines (Node.js & Python).

### Tasks
- `[x]` **Quick vs. Advanced Mode Selection CLI**: Choose quick scaffolding (standard templates) or advanced customization inside the interactive prompt loop.
- `[x]` **Hardened Verification Stack**: Node.js ESM verifier (`security_check.js`) and cross-platform shebang-hardened Python verifier (`security_check.py`) with silent path searches.
- `[x]` **Advanced Custom Metadata Frontmatter**: Seamlessly capture custom triggers, tasks, reviews, and dependencies from user CLI input and hydrate the playbook templates.

---

## 🔒 Release 0.4.1: Scaffolder Hardening & UPA Future-Proofing [COMPLETED]

### Goal
Implement dynamic runtime environment baselining, clean semantic description routers, and active test-driven developer playbooks targeting host capabilities.

### Tasks
- `[x]` **Dynamic Host Baselining**: Probes the host system's running engine versions (`process.versions.node` and dynamic CLI checking for Python) during scaffolding, writing tailored requirements.
- `[x]` **Active Test-Driven Development (TDD) Playbooks**: Replaces comment-based inspection with active test executions inside generated playbooks (JUnit, Jest, Pytest, Catch2).
- `[x]` **Clean Semantic Descriptions**: Separates prompt-routing trigger parameters from descriptions in frontmatter to prevent router confusion.

---

## 👥 Release 0.4.2: Dual-Mode Coordination Protocol (DMCP) & 6 DevTeam Archetypes [COMPLETED]

### Goal
Eradicate technology cross-mixing ("AI slop") and Greenfield empty directory conflicts through structural role isolation and self-coordinating playbooks.

### Tasks
- `[x]` **6 DevTeam Archetype Profiles**: Implemented dedicated registries (`pm`, `architect`, `devops`, `developer`, `qa`, `auditor`) with perfectly decoupled tasks, review checklists, and environment configurations.
- `[x]` **Dynamic Archetype Classifier**: Automatically detects the skill's archetype based on semantic name/description keywords (`detectArchetype`).
- `[x]` **Dual-Mode Coordination Protocol (DMCP)**: Empowers skills to self-coordinate in empty directory contexts, yielding execution to prerequisite blueprint skills (e.g. Developer yields to Architect specs) in the absence of a central orchestrator.
- `[x]` **E2E Sandbox Multi-Archetype Verification**: Embedded Step 9 in sandbox tests asserting strict playbook separation and DMCP choreographed fallback rules.
