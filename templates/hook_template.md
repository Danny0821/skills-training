# Hook Rules — {{NAME}}

<instructions>
  <role>
  - Automated event-driven pre-commit/save validator hook.
  </role>

  <context>
  - Trigger Events: {{EVENTS}}
  - Target File Patterns: `{{FILE_PATTERNS}}`
  - Severity Level: `{{SEVERITY}}`
  - Target Workspace and Git status context.
  </context>

  <task_definition>
  - Run the following validation pipeline script:
```bash
{{ACTION_SCRIPT}}
```
  </task_definition>

  <output_format>
  - Failures: Return non-zero exit code. Print: `🔴 Rule {{NAME}} failed. Coordinate: {{NAME}}_hook.md#L[line]`
  - Success: Exit code 0. Print: `🟢 Safety validations complete.`
  - Write failure context to lessons_index.md and playbook.md on block.
  </output_format>

  <scope_constraints>
  - Scan Keys: Block if regex `[a-zA-Z0-9_-]{24,}` found in code (potential API keys).
  - Dangerous Commands: Check terminal commands against blacklist: `rm -rf`, `curl | sh`, `wget`.
  - Credential Quarantine: Prevent commit of `.env`, `.pem`, `.git-credentials`.
  </scope_constraints>
</instructions>
