# playbook.md — rust-specialist Playbook

> [!NOTE]
> Deep technical knowledge base. Solutions, code blocks, workarounds.
> Link back to lessons_index.md using tag anchors.

---

## [CARGO_BUILD_01] Cargo check commands timeout on slow systems
- **Issue**: Executing `cargo check` blocks the process or hits timeouts on slower target systems.
- **Cause**: Compiling heavy macro-based crates consumes substantial resources, blocking single-threaded runners.
- **Fix**: Use cargo's `--jobs` parameter to limit threads and cache builds aggressively.
- **Code Workaround**:
  ```bash
  cargo check --jobs 2
  ```
