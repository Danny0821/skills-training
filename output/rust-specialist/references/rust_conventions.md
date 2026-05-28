# rust_conventions.md — Rust Naming & Safety Conventions

> [!NOTE]
> Detailed conventions list. Keeps SKILL.md under 500 lines.

## Safety Guidelines
- Avoid `unsafe` unless dealing with strict FFI interfaces.
- Prefer safe structures (`RefCell`, `Mutex`, `Rc`) over raw pointers.

## Linting Conventions
- Enable Clippy warnings.
- Avoid hardcoded panic points (`unwrap()`). Use `expect()` with high-context messages or robust error-handling `Result` propagation.
