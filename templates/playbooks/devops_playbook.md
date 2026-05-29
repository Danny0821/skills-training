# playbook.md — {{NAME}} Playbook

> [!NOTE]
> DevOps, containerization, and CI/CD technical knowledge base.
> Link back to lessons_index.md using tag anchors.

---

## [DOCKER_MOUNT_01] Windows volume mount permission lock (EPERM)
- **Issue**: Windows volume mount throws EPERM on virtualized file operations.
- **Cause**: Windows host filesystem permissions mapping mismatches under Docker.
- **Fix**: Run containers with explicitly mapped user IDs or configure named volumes inside compose.
- **Code Workaround**:
  ```yaml
  # docker-compose.yml snippet
  services:
    app:
      image: node:18-alpine
      volumes:
        - .:/app:delegated
  ```

---

## [CI_SECRET_01] Hardcoded credentials leak in deployment pipelines
- **Issue**: Secret credentials exposed in CI/CD pipeline actions.
- **Cause**: Placing raw plain-text credentials in config files or scripts.
- **Fix**: Force all credentials to be read from pipeline secrets repositories, injected dynamically as environment variables.
