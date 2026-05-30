# frontier-skill-creation.md — 2026 Frontier Skill Design (Caveman Style)

> [!NOTE]
> Telegraphic best practices for the 2026 model generation: **Gemini 3.5 Flash**, **Claude 4.7 Opus/Sonnet**, and **GPT-5.5**. 
> Slashing outdated 2023 prompting noise. Adapting to native reasoning & outcome-first planning.

---

## 1. The 2026 Paradigm Shifts

### 🔴 GPT-5.5: Outcome-First Execution
- **Stop Process-First Prompting**: Do not write rigid step-by-step instructions ("First A, then B"). Forces sub-optimal paths.
- **Define Goals & Criteria**: State target destination, concrete success criteria, and clear environment boundaries. Let model plan path.
- **Drop legacies**: Remove old prompt stacks. They clutter the context and cause regression.
- **Silence Screaming Constraints**: Drop excessive `ALWAYS`, `NEVER`, `MUST` words unless they represent strict safety rules. Let model execute naturally.

### 🔵 Claude 4.7: Extreme Literalism & Shape Definition
- **No Shorthand Verbs**: Vague verbs (e.g. `review`, `improve`, `clean up`) fail or drift. Use explicit imperatives:
  - *Bad*: "Review this code."
  - *Good*: "List syntax risks, rate severity 1-5, provide exactly one rewrite block for each flagged line."
- **Strict Shape Constraints**: Enforce absolute bounds (e.g. `exactly 5 bullets, each <15 words`). Claude 4.7 follows literal bounds perfectly.
- **Adaptive Thinking**: Trigger native deep reasoning when handling logic leaps by calling: `"Think before answering (maximum reasoning)."`

### 🟢 Gemini 3.5: Native Long-Horizon Agentic Planning
- **Native Planning**: Gemini 3.5 Flash handles multi-step planning natively. Define the "what" rather than the "how".
- **Drop Prompt-Injected CoT**: Do not use manual prompt-injected chain-of-thought steps. Use native configuration parameters (e.g. `thinking_level: "medium"` or `"high"`) to save token context.
- **Workspace Multimodality**: Leverage native audio, visual, and Workspace integrations.

---

## 2. Structural Guidelines (Progressive Disclosure)

- **Tier 1: YAML Frontmatter**
  - **Pushy Description**: Include direct target domain context to trigger active semantic loading.
- **Tier 2: SKILL.md Body (<500 lines)**
  - Direct outcome-based playbooks using XML tags.
- **Tier 3: `references/` Folder**
  - Extract detailed framework specifications to separate files. Instruct the agent exactly when to load them.

---

## 3. Context & Caching Engineering
- **Descriptive XML Boundaries**: Use descriptive tags (`<instructions>`, `<safety_restrictions>`) to prevent context bleeding.
- **Cache-Hit Alignment**: Place static files and XML schemas at the beginning of the prompt. Place dynamic user inputs at the end. Maintain identical formatting (character-by-character) across templates.
- **Self-Improving Autolearner**: Include `lessons_index.md` and `playbook.md` to feed specific system coordinate fixes directly into the active context cache.
