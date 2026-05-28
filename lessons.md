# lessons.md — Antigravity Generator Rules

## Rules
- **No Heavy Deps**: Keep scripts zero-dependency. Node `fs`, `path`, `readline` only. No heavy packages.
- **Caveman Markdown**: All docs/templates in telegraph-speak. No fluff. Cuts 70% tokens. Keep precise paths.
- **Firewall Code Quality**: JS/TS code MUST be high-quality. Full comments, robust types, complete error checking. Never caveman code.
- **Security Guardrails**: Always enforce sandbox, credentials safety, no plaintext keys, shell safety wrappers.

## Lessons
- `lessons_index.md` & `playbook.md` key for self-improvement. Always scaffold them in child skills.
- Windows path vs Linux: Node `path.join` or `path.resolve` mandatory. Avoid raw slashes.
- Readline block: readline needs standard close cleanup. Keep streams clean.
- Unified Prompt Architecture (UPA): Use stable XML tags (`<role>`, `<context>`, `<scope_constraints>`) at top. Isolates rules. Future-proofs models. Elevates performance on both frontier and non-frontier models.
