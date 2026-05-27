# SYSTEM.md — python-security-agency Coordinated System

> [!NOTE]
> System manifest for coordinated multi-agent skill packages.

<system_topology>
- **System Name**: python-security-agency
- **Orchestrator**: security-coordinator
- **Sub-Skills**:
- [python-audit](./skills/python-audit/SKILL.md)
- [python-fixer](./skills/python-fixer/SKILL.md)
- **Sub-Agents**:
- [python-audit-agent](./agents/python-audit_agent/AGENT.md)
- [python-fixer-agent](./agents/python-fixer_agent/AGENT.md)
</system_topology>

<orchestration_protocol>
- **Flow**: User Idea -> Orchestrator Agent -> Semantic Split -> Sub-Skills -> Validation -> Complete.
- **Delegation**: Sub-agents handle dedicated domains (e.g. security vs. development vs. review).
- **Communication**: Shared payload schemas. Keep messages compact, telegraphic.
</orchestration_protocol>

<global_safety_controls>
- **Shared Credentials**: Centralized `.env` parsing. No child skill duplicates credentials.
- **Global Sandbox**: All child skills use uniform command-execution checks and path sandboxing.
- **Global Stop Policy**: Any single sub-agent safety violation blocks the entire system pipeline.
</global_safety_controls>

<learning_base>
- Coordinated `lessons_index.md` aggregates sub-skill lessons.
- Shared `playbook.md` contains unified resolutions for system-wide bugs.
</learning_base>
