# playbook.md — {{NAME}} Playbook

> [!NOTE]
> Security threat models, vulnerability audits, and static scanning technical knowledge base.
> Link back to lessons_index.md using tag anchors.

---

## [SCANNER_RULE_01] Semgrep false positive on raw SQL execution
- **Issue**: Semgrep flags false positive vulnerabilities on parameter-safe raw queries.
- **Cause**: Static scanner rule triggers on any string interpolation.
- **Fix**: Configure scan rule exclusion parameters, or use explicit security parameters tags (e.g., `# nosec` or raw query parametrization comments).
- **Code Workaround**:
  ```python
  # Safe parameterization preventing SQL injection
  cursor.execute("SELECT id FROM users WHERE email = %s", (user_email,))  # nosec
  ```

---

## [SECRET_SCAN_01] Scanning boundary leaks on binary or temporary data folders
- **Issue**: Secret scanners time out or flag binary payloads inside target scans.
- **Cause**: Scanner scanning binary or heavy non-code folders (e.g. `node_modules`, `dist/`).
- **Fix**: Define strict exclude paths in `gitleaks.toml` or `trivy.yaml`.
