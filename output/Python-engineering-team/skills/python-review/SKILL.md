---
name: "python-review"
description: "Coordinated skill for python-review within the Python-engineering-team system."
version: "0.1.0"
triggers:
  - "idea: python-review"
  - "context: "Python-engineering-team"
  - "child-skill""
requirements:
  - "node: >=18"
---

# SKILL.md — python-review (Caveman Style)

> [!NOTE]
> Dense playbook. Cuts tokens. Keeps accuracy. Brain big. Mouth small.

## 🔴 Hard Safety Guardrails
- **No Secret Plaintext**: Never write keys, tokens, or credentials in files. Use environment variables.
- **Sandboxed Bash**: Escape shell args. Verify paths before run. Double check `rm` or `curl`.
- **Command Validate**: Only run whitelisted commands. No blind exec.

## 🟢 Playbook Steps
- Learn context: Read lessons_index.md for known issues.
- Execute tasks securely.
- Log mistakes: Write newly learned facts to lessons_index.md.

## ⚠️ Devil's Advocate Review
- Before edit: Scan files for vulnerabilities.
- Run security test script `scripts/security_check.js` if exists.
- Stop on critical issue. Ask user before overwrite config.

## 🔄 Autolearner Reference
- Check `lessons_index.md` for known bugs/lessons.
- Check `playbook.md` for OS workarounds.
- Document new errors encountered with coordinates in `lessons_index.md`.
