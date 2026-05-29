# playbook.md — {{NAME}} Playbook

> [!NOTE]
> General, technology-agnostic deep technical knowledge base.
> Link back to lessons_index.md using tag anchors.

---

## [OS_PATH_01] Cross-platform directory path failures
- **Issue**: Directory path concatenation errors across operating systems.
- **Cause**: Using raw hardcoded OS-specific path separators.
- **Fix**: Always utilize built-in path utilities or runtime-agnostic library conventions.
- **Workaround**: Check platform at boot or use libraries like `path` (Node) or `pathlib` (Python) instead of manual string addition.

---

## [ENV_SECRET_01] Risk of committing raw secrets/keys
- **Issue**: Attempting to commit plain-text credentials.
- **Cause**: Storing keys directly in scripts or manifest configs.
- **Fix**: Move keys to environment configurations and add target config names to ignore records.
