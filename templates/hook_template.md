# Hook Rules — {{NAME}}

<instructions>
  <role>Automated pre-commit/save validator hook.</role>

  <context>
  - Events: {{EVENTS}}
  - Patterns: `{{FILE_PATTERNS}}`
  - Severity: `{{SEVERITY}}`
  - Target workspace & Git status.
  </context>

  <task_definition>
  - Run validation script:
```bash
{{ACTION_SCRIPT}}
```
  </task_definition>

  <output_format>
  - Fail: Exit code > 0. Print: `🔴 Rule {{NAME}} failed. Coordinate: {{NAME}}_hook.md#L[line]`
  - Success: Exit code 0. Print: `🟢 Safety validations complete.`
  - Write failure context to lessons_index.md & playbook.md on block.
  </output_format>

  <scope_constraints>
  - Block if potential credentials pattern `[a-zA-Z0-9_-]{24,}` found.
  - Block blacklisted commands: `rm -rf`, `curl | sh`, `wget`.
  - Quarantine: Block commits of `.env`, `.pem`, `.git-credentials`.
  </scope_constraints>
</instructions>
