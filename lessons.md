# lessons.md — Antigravity Generator Rules

## Rules
- **No Heavy Deps**: Keep scripts zero-dependency. Node `fs`, `path`, `readline` only. No heavy packages.
- **Caveman Markdown**: All docs/templates in telegraph-speak. No fluff. Cuts 70% tokens. Keep precise paths.
- **Firewall Code Quality**: JS/TS code MUST be high-quality. Full comments, robust types, complete error checking. Never caveman code.
- **Security Guardrails**: Always enforce sandbox, credentials safety, no plaintext keys, shell safety wrappers.
- **Release Documentation Firewall**: Every release version bump (e.g. 0.3.0 -> 0.3.1 -> 0.4.0) MANDATORILY requires updating `Agy-gen-documentation.md` to reflect all architectural changes, CLI flags, and schemas before closing.

## Lessons
- `lessons_index.md` & `playbook.md` key for self-improvement. Always scaffold them in child skills.
- Windows path vs Linux: Node `path.join` or `path.resolve` mandatory. Avoid raw slashes.
- Readline block: readline needs standard close cleanup. Keep streams clean.
- Unified Prompt Architecture (UPA): Use stable XML tags (`<role>`, `<context>`, `<scope_constraints>`) at top. Isolates rules. Future-proofs models. Elevates performance on both frontier and non-frontier models.
- Registry Test Isolation: Always assign `process.env.AGY_GEN_TEST_DIR` at top of test scripts (e.g. `test_generator.js`, `verify_index_sandbox.js`) before importing scaffolding utilities. Prevents test functions polluting user's real global registry.
- Slash Commands Folder Alignment: Antigravity 2.0 requires global slash command manifests to be placed inside a structured subfolder containing a `SKILL.md` file (e.g., `~/.gemini/skills/{skill_name}/SKILL.md`) instead of flat files to trigger system-wide client discovery.
- Single-Trigger Directory Limit: The client parser only registers the first trigger declared in the UPA frontmatter of a folder's `SKILL.md`. Active triggers (e.g., `/interview` vs. `/grill-blueprint`) must have separate directory structures to coexist in autocomplete menus.
- Hidden Folder npm Packaging Constraints: Avoid storing active command templates inside hidden directories (like `.agent/skills/`) inside the npm package registry. Windows environments throw `lstat` unpack warning errors and directory lock contentions. Always relocate them to accessible top-level folders (such as `command_manifests/`).
- Loop Limit Safeguard: Restrict wait loops and status checks inside playbooks to a maximum of 10 retries to prevent infinite agent execution loops and token depletion.
- Zero-Slop Consent: Generated prompts must strictly require agents to stop and clarify specifications in ambiguous areas instead of generating fake placeholder content.
- Crawler Registry Exclusions: Exclude temporary, coverage, and build directories (`build`, `dist`, `skillsets`, `coverage`, `tool_tests`) from crawler indexes to prevent global catalog pollution.

