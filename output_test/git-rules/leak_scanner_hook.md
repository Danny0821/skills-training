# Hook Rules — leak_scanner

<instructions>
  <role>
  - Automated event-driven pre-commit/save validator hook.
  </role>

  <context>
  - Trigger Events: pre-commit
  - Target File Patterns: `*.py`
  - Severity Level: `block`
  - Target Workspace and Git status context.
  </context>

  <task_definition>
  - Run the following validation pipeline script:
```bash
# Pre-commit safety scan to check for plaintext keys and unsafe terminal commands
echo "Executing security-first hook validations for leak_scanner..."
grep -rnE "[a-zA-Z0-9_-]{24,}" --exclude-dir=node_modules . && echo "🔴 Security failure: Hardcoded keys detected!" && exit 1
echo "🟢 Safety validations complete."

```
  </task_definition>

  <output_format>
  - Failures: Return non-zero exit code. Print: `🔴 Rule leak_scanner failed. Coordinate: leak_scanner_hook.md#L[line]`
  - Success: Exit code 0. Print: `🟢 Safety validations complete.`
  - Write failure context to lessons_index.md and playbook.md on block.
  </output_format>

  <scope_constraints>
  - Scan Keys: Block if regex `[a-zA-Z0-9_-]{24,}` found in code (potential API keys).
  - Dangerous Commands: Check terminal commands against blacklist: `rm -rf`, `curl | sh`, `wget`.
  - Credential Quarantine: Prevent commit of `.env`, `.pem`, `.git-credentials`.
  </scope_constraints>
</instructions>
