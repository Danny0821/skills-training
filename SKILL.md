---
name: "antigravity-generator"
description: "Scaffold security-first, Caveman-styled skills, hooks, agents, or multi-agent systems for Antigravity 2.0."
version: "0.1.0"
triggers:
  - "idea: turn idea into skill"
  - "idea: create agent hook"
  - "idea: create custom agent"
  - "idea: multi-agent system"
requirements:
  - "node: >=18"
---

# SKILL.md — Antigravity 2.0 Generator (Caveman Style)

> [!NOTE]
> Dense playbook for turning ideas into sandboxed Skills, Hooks, Agents, or coordinated systems.

## 🔴 Safety Restraints (Non-Negotiable)
- **No plaintext credentials**: Scanned & blocked from all generated templates.
- **Sandboxed Execution**: Escaped arguments, path validation, absolute paths only.
- **Pristine Code Firewall**: Code generated inside scripts MUST be production-grade, highly readable, fully commented. Caveman style restricted purely to markdown rules & log messages.

## 🟢 Playbook Steps

### 1. Identify Need & Suggest Architecture
- Receive idea. Check scope complexity.
- **If scope has >1 distinct domain of responsibility** (e.g. "Python dev + security auditor + reviewer"):
  - **Recommend coordinated Skill System**.
  - Group into parent folder. Manifest in `SYSTEM.md`.
- **If scope is event-driven task automation** (e.g. check on save, scan keys before commit):
  - **Suggest Agent Hook** (place in `.agent/rules/`).
- **If scope is custom persona or dedicated interface**:
  - **Suggest Agent Profile** (`AGENT.md`).
- **Otherwise**:
  - **Suggest standard Skill** (folder with `SKILL.md`).

### 2. Scaffold using CLI
- Direct user to execute zero-dep interactive CLI:
  ```bash
  npm run generate
  ```
- Or run it directly for user:
  ```bash
  node scripts/generate.js
  ```

### 3. Autolearner Protocol Integration
- Every scaffolded system/skill MUST contain:
  1. `lessons_index.md`: high-level bullet issue log + exact coordinate pointer (`playbook.md#L[num]`).
  2. `playbook.md`: deep-dive technical solution context, code workarounds.
- Instruct user to document platform specific quirks (e.g. Windows slashes, command mismatches) into these files to prevent regression.

### 4. Apply 2026 Frontier Models Guidelines
- When writing generated skill playbooks/instructions:
  - **Outcome-First (GPT-5.5)**: Define concrete destination success criteria, drop rigid process constraints.
  - **Extreme Literalism (Claude 4.7)**: Avoid vague verbs like "review" or "improve". Write exact execution parameters.
  - **Prompt Caching (Gemini 3.5 / Claude 4.7)**: Place static rules first, dynamic variables last. Keep formatting character-stable.

### 5. Prompt Enhancement & Elaboration Rule (CRITICAL)
- **Do not copy-paste raw user ideas** into the generated templates.
- Act as an Expert Prompt and Workflow Architect.
- When generating, **elaborate the task dynamically**:
  - Invent highly descriptive, expert-level sub-tasks and outcomes matching the domain.
  - Formulate concrete edge cases (e.g. rate limits, platform-specific command differences, timeout flags).
  - Draft precise, safe terminal commands and regex validation rules.
  - Expand `{{PLAYBOOK_STEPS}}` into full, production-grade instructions structured cleanly under XML nodes (<role>, <context>, <task_definition>, <output_format>, <scope_constraints>).

## ⚠️ Review Loops (Devil's Advocate)
- Before presenting generated scaffold to user, inspect generated output files.
- Double-check:
  - Is `SYSTEM.md` or `SKILL.md` written in Caveman format (no filler words, high-density)?
  - Is generated javascript/typescript code of high quality, complete, and properly commented?
  - Are all credential and command safety guidelines present?
