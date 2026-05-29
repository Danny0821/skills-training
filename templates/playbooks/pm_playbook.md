# playbook.md — {{NAME}} Playbook

> [!NOTE]
> Product backlog & roadmap management technical knowledge base.
> Link back to lessons_index.md using tag anchors.

---

## [BACKLOG_01] Task prioritization tag duplication
- **Issue**: Duplicated priorities on backlog tasks.
- **Cause**: Standard backlog lacks clear MoSCoW rules.
- **Fix**: Apply explicit prioritization guidelines (`Must`, `Should`, `Could`, `Won't`).
- **Workaround**: Mark each milestone backlog item with standard MoSCoW tags to ensure precise planning:
  ```markdown
  - [Must] Core authentication endpoint setup.
  - [Should] Logging telemetry trackers.
  ```

---

## [ROADMAP_01] Scope creep on Greenfield project initiation
- **Issue**: Greenfield startup delayed due to bloated roadmap.
- **Cause**: Unconstrained scoping of features before architecture alignment.
- **Fix**: Restrict phase 1 strictly to MVP milestone bootstrap specs inside `ROADMAP.md`.
