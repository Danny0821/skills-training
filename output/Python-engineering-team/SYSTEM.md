# SYSTEM.md — Python-engineering-team Coordinated System

> [!NOTE]
> System manifest for coordinated multi-agent skill packages.

## Topology
- **System Name**: Python-engineering-team
- **Orchestrator**: system-coordinator
- **Sub-Skills**:
- [python-dev](./skills/python-dev/SKILL.md)
- [python-review](./skills/python-review/SKILL.md)
- [python-security](./skills/python-security/SKILL.md)
- [python-visuals](./skills/python-visuals/SKILL.md)
- [python-database](./skills/python-database/SKILL.md)
- **Sub-Agents**:
- [python-dev-agent](./agents/python-dev_agent/AGENT.md)
- [python-review-agent](./agents/python-review_agent/AGENT.md)
- [python-security-agent](./agents/python-security_agent/AGENT.md)
- [python-visuals-agent](./agents/python-visuals_agent/AGENT.md)
- [python-database-agent](./agents/python-database_agent/AGENT.md)

## 🟢 Orchestration Protocol
- **Flow**: User Idea -> Orchestrator Agent -> Semantic Split -> Sub-Skills -> Validation -> Complete.
- **Delegation**: Sub-agents handle dedicated domains (e.g. security vs. development vs. review).
- **Communication**: Shared payload schemas. Keep messages compact, telegraphic.

## 🔴 Centralized Safety Controls
- **Shared Credentials**: Centralized `.env` parsing. No child skill duplicates credentials.
- **Global Sandbox**: All child skills use uniform command-execution checks and path sandboxing.
- **Global Stop Policy**: Any single sub-agent safety violation blocks the entire system pipeline.

## 🔄 Shared Learning Base
- Coordinated `lessons_index.md` aggregates sub-skill lessons.
- Shared `playbook.md` contains unified resolutions for system-wide bugs.
