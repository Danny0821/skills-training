# SYSTEM.md — {{NAME}}
 
<system_topology>
- Name: {{NAME}}
- Orchestrator: {{ORCHESTRATOR}}
- Sub-Skills:
{{SUB_SKILLS_LIST}}
- Sub-Agents:
{{SUB_AGENTS_LIST}}
</system_topology>

<orchestration_protocol>
- Flow: User Idea -> Orchestrator Agent -> Semantic Split -> Sub-Skills -> Validation -> Complete.
- Delegation: Sub-agents handle dedicated domains (security, dev, review).
- Communication: Compact, telegraphic payload messages.
</orchestration_protocol>

<global_safety_controls>
- Credentials: Central `.env` parsing. No child duplicates.
- Sandbox: Uniform sandbox execution and path controls.
- Stop Policy: Single child safety violation halts entire system.
</global_safety_controls>

<learning_base>
- Coordinated lessons_index.md aggregates sub-skill lessons.
- Playbook.md resolves system-wide bugs.
</learning_base>
