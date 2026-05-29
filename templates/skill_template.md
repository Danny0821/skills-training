---
name: "{{NAME}}"
description: "{{DESCRIPTION}}"
version: "0.1.0"
triggers:
  {{TRIGGERS_LIST}}
requirements:
  {{REQUIREMENTS_LIST}}
---

# SKILL.md — {{NAME}} (Caveman Style)

> [!NOTE]
> Dense playbook. Cuts tokens. Keeps accuracy. Follows 2026 progressive disclosure & prompt anatomy standards.

<instructions>
  <role>
  - Specialized agent skill for {{NAME}}.
  - Tone: Dense, Caveman-style, zero-filler. Focus on maximum technical accuracy.
  </role>

  <context>
  - Target system: {{NAME}}
  - Primary triggers: {{TAGS}}
  - Always consult lessons_index.md and playbook.md before execution to bypass regression.
  </context>

  <task_definition>
  {{PLAYBOOK_STEPS}}
  </task_definition>

  <output_format>
  - Core deliverables must be output cleanly to files.
  - Use clear XML output delimiters when returning complex data.
  </output_format>

  <scope_constraints>
  - Do not use hardcoded plaintext credentials (keys, tokens).
  - Limit operations strictly to target workspace and sandbox boundaries.
  - Keep this file under 500 lines. Split domains to references/ if too large.
  </scope_constraints>
</instructions>

<review_checks>
{{REVIEW_CHECKS}}
</review_checks>

<autolearner>
- Check lessons_index.md for known bugs/lessons.
- Check playbook.md for OS workarounds.
- Document new errors encountered with coordinates in lessons_index.md.
</autolearner>
