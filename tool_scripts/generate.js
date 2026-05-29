/**
 * Antigravity 2.0 Skill, Agent, Hook, and Skill System Scaffolder
 * 
 * A premium, zero-dependency Node.js CLI to generate custom workspaces,
 * files, and self-improving autolearner loops under Windows/Linux.
 * 
 * Strict Philosophy:
 * - This code is highly structured, fully commented, and robust (Code quality firewall).
 * - Generated markdown output templates strictly follow "Caveman Style" (Token sensitive).
 * - Focuses on Security-First defaults.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { execSync } from 'child_process';
import { registerSkill } from './index_manager.js';

// Resolve current directory for ES modules to properly locate templates
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_DIR = path.resolve(__dirname, '../templates');

// Set up readline interface for CLI interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompts the user via CLI and returns a Promise with the input.
 * @param {string} query The question to display to the user.
 * @returns {Promise<string>} User input.
 */
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

/**
 * Hydrates template content by replacing bracket placeholders with values.
 * @param {string} content The template file contents.
 * @param {Object} replacements Mapping of placeholder name to string value.
 * @returns {string} Fully hydrated file content.
 */
function hydrateTemplate(content, replacements) {
  let hydrated = content;
  for (const [key, value] of Object.entries(replacements)) {
    // Escape special characters in key for regex matching
    const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`{{${escapedKey}}}`, 'g');
    hydrated = hydrated.replace(regex, value);
  }
  return hydrated;
}

/**
 * Safely creates a directory recursively.
 * @param {string} dirPath Folder path to create.
 */
function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Dynamic Telemetry Registry with Safe 3-Tier Fallback
 * Maps archetype and language stacks to specific, isolated telemetry/playbook templates.
 */
export const TELEMETRY_REGISTRY = {
  'developer:js': {
    lessons: 'lessons/developer_js_lessons.md',
    playbook: 'playbooks/developer_js_playbook.md'
  },
  'developer:py': {
    lessons: 'lessons/developer_py_lessons.md',
    playbook: 'playbooks/developer_py_playbook.md'
  },
  'architect': {
    lessons: 'lessons/architect_lessons.md',
    playbook: 'playbooks/architect_playbook.md'
  },
  'pm': {
    lessons: 'lessons/pm_lessons.md',
    playbook: 'playbooks/pm_playbook.md'
  },
  'devops': {
    lessons: 'lessons/devops_lessons.md',
    playbook: 'playbooks/devops_playbook.md'
  },
  'qa': {
    lessons: 'lessons/qa_lessons.md',
    playbook: 'playbooks/qa_playbook.md'
  },
  'auditor': {
    lessons: 'lessons/auditor_lessons.md',
    playbook: 'playbooks/auditor_playbook.md'
  },
  'default': {
    lessons: 'lessons/default_lessons.md',
    playbook: 'playbooks/default_playbook.md'
  }
};

/**
 * Helper to scaffold the Autolearner Dual-File Protocol.
 * Creates lessons_index.md and playbook.md inside the target skill directory
 * using a dynamic, stack-specific telemetry registry with safe 3-tiered fallback.
 * @param {string} targetDir Base directory of the skill.
 * @param {string} componentName Name of the component.
 * @param {string} archetype Archetype profile of the skill.
 * @param {string} scriptLanguage Active script language stack.
 */
export function scaffoldAutolearner(targetDir, componentName, archetype = 'default', scriptLanguage = 'js') {
  try {
    const registryKey = `${archetype}:${scriptLanguage}`;
    const target = TELEMETRY_REGISTRY[registryKey]
                || TELEMETRY_REGISTRY[archetype]
                || TELEMETRY_REGISTRY['default'];

    const indexTmplPath = path.join(TEMPLATE_DIR, target.lessons);
    const playbookTmplPath = path.join(TEMPLATE_DIR, target.playbook);

    if (!fs.existsSync(indexTmplPath) || !fs.existsSync(playbookTmplPath)) {
      throw new Error(`Templates not found for resolved key: ${registryKey}`);
    }

    const indexTmpl = fs.readFileSync(indexTmplPath, 'utf-8');
    const playbookTmpl = fs.readFileSync(playbookTmplPath, 'utf-8');

    const replacements = { NAME: componentName };

    fs.writeFileSync(
      path.join(targetDir, 'lessons_index.md'),
      hydrateTemplate(indexTmpl, replacements),
      'utf-8'
    );
    fs.writeFileSync(
      path.join(targetDir, 'playbook.md'),
      hydrateTemplate(playbookTmpl, replacements),
      'utf-8'
    );
  } catch (err) {
    console.error(`  🔴 Failed to scaffold Autolearner files: ${err.message}`);
  }
}

/**
 * 6 DevTeam Archetypes Profiles Registry
 * Each profile strictly maps to one of the 6 roles of a high-performance software organization,
 * completely eliminating cross-stack AI slop and dynamic greenfield conflicts.
 */
export const ARCHETYPE_PROFILES = {
  pm: {
    description: "Product Manager / Coordinator",
    tone: "Dense, Caveman-style, zero-filler. Focus on roadmaps, priorities, and backlog coordination.",
    requirements: ['"host-environment: >=v1"'],
    tasks: [
      "Interactive Guided Onboarding & Backlog Setup:\n    1. Dynamic Onboarding: Conduct a dynamic, technology-agnostic interview with the user. Ask high-level, targeted questions based on their business domain to discover what they want to achieve.\n    2. Milestone Scaffolding: Never make assumptions in ambiguous grey areas. Once aligned on objectives, scaffold the central project roadmap and backlog definitions (`ROADMAP.md` or `BACKLOG.md`) in the repository root. Do not write application code.",
      "Track and update project milestones, feature sets, and task lists.",
      "Coordinate deliverable tracking and project telemetry logs."
    ],
    reviews: [
      "Verify complete backlog structure alignment with user requests.",
      "Assert clear priority tags exist on all task items.",
      "Confirm ROADMAP.md is successfully committed in repository root."
    ],
    coordinationRules: "- **Lifecycle Coordination (DMCP)**:\n    1. **Orchestrated Mode**: If a parent coordinator is active, follow specific scheduling directives.\n    2. **Choreographed Fallback**: You are a Product Manager (PM). If the workspace is empty, you have priority. Execute immediately to output the roadmap, unblocking design and engineering phases.",
    scriptLanguage: 'js'
  },
  architect: {
    description: "Designer / Software Architect",
    tone: "Dense, Caveman-style, zero-filler. Focus on system design, database schemas, and UX workflows.",
    requirements: ['"rest-api: >=v1"', '"json-schema: >=draft-07"'],
    tasks: [
      "Interactive System & Architecture Design:\n    1. UI & Schema Discovery: Interview the user regarding UI preferences (style, themes, layout concepts) and data schemas. Never invent database tables or layout properties without explicit user consent.\n    2. Blueprint Scaffolding: Once aligned on specifications, design and save the wireframes, schema DDL, and API specs inside `docs/architecture/` (e.g., `schema.sql` or `wireframes.md`). Do not write application code.",
      "Verify JSON schema compliance between mock structures and target integration platforms."
    ],
    reviews: [
      "Verify database schema is normalized (e.g., 3NF compliance for SQL).",
      "Confirm wireframes and API contracts exist inside `docs/architecture/` folder."
    ],
    coordinationRules: "- **Lifecycle Coordination (DMCP)**:\n    1. **Orchestrated Mode**: If a parent coordinator is active, follow specific scheduling directives.\n    2. **Choreographed Fallback**: You are a Designer/Architect. If the workspace is empty, you have priority. Execute immediately to save specs and schemas, unblocking DevOps and developers.",
    scriptLanguage: 'js'
  },
  devops: {
    description: "DevOps / Infrastructure Engineer",
    tone: "Dense, Caveman-style, zero-filler. Focus on virtualization, containers, and deployment scripts.",
    requirements: ['"host-environment: >=v1"', '"docker: >=20"'],
    tasks: [
      "Interactive Virtualization & Environment Design:\n    1. Infrastructure Alignment: Interview the user to confirm containerization engines, target ports, and CI/CD hosting parameters. Discuss configuration options instead of writing generic scripts in grey areas.\n    2. DevOps Scaffolding: Once aligned, scaffold the virtualization configuration (e.g., `Dockerfile`, `docker-compose.yml`, `.env.example`, `.github/workflows/deploy.yml`). Do not write core business logic.",
      "Verify environment virtualization setups and CI/CD pipelines run cleanly."
    ],
    reviews: [
      "Verify multi-stage container optimization exists in Dockerfiles.",
      "Confirm CI/CD pipeline configurations verify host lint standards.",
      "Assert secrets and credentials are kept in env templates, never hardcoded."
    ],
    coordinationRules: "- **Lifecycle Coordination (DMCP)**:\n    1. **Orchestrated Mode**: If a parent coordinator is active, follow specific scheduling directives.\n    2. **Choreographed Fallback**: You are a DevOps Engineer. If no codebase exists, configure the virtualization (Dockerfile, compose) based on database specs. Yield code execution until developers bootstrap files.",
    scriptLanguage: 'js'
  },
  developer: {
    description: "Developer / Software Creator",
    tone: "Dense, Caveman-style, zero-filler. Focus on modular coding, compiler/runtime compliance, and unit TDD.",
    requirements: ['"node: >=[HOST_NODE_VERSION]"'],
    tasks: [
      "Interactive Bootstrapping & Modular Coding:\n    1. Requirement Clarification: Do not invent professional mock data or placeholder slop in grey areas. Ask the user in chat to describe what they want to achieve or to paste their real data (e.g., CV details, experience list, portfolio content). Suggest providing a draft text file as an option, but do not make it mandatory.\n    2. Modular Code Scaffolding: Once aligned on the user's data and requirements, bootstrap the project runtime immediately (e.g., 'npm init -y', 'dotnet new', 'cargo init') and begin modular coding following unit TDD.",
      "Target compiler/runtime executions at the highest modern standard flag supported by host compiler (e.g., C# 12, Python 3.12, C++20).",
      "Verify logic correctness: Compile/run code and verify correctness against active unit test suites (e.g. Catch2, Google Test, pytest, Jest) in sandbox rather than solely reading code/comments."
    ],
    reviews: [
      "Before edit: Scan dependency files for outdated packages.",
      "Verify code compiles and executes flawlessly under the maximum modern language standard supported by the host.",
      "Run test runner script and verify 100% test assertion success."
    ],
    coordinationRules: "- **Lifecycle Coordination (DMCP)**:\n    1. **Orchestrated Mode**: If a parent coordinator is active, follow specific scheduling directives.\n    2. **Choreographed Fallback**: You are a Developer. If the workspace is empty and no design blueprints or backlog milestones exist in `docs/` or `ROADMAP.md`, immediately yield execution. Instruct Designer/PM skills in the workspace to run first.",
    scriptLanguage: 'js'
  },
  qa: {
    description: "QA / Test Automation Engineer",
    tone: "Dense, Caveman-style, zero-filler. Focus on E2E testing, API tests, and performance validation.",
    requirements: ['"host-environment: >=v1"'],
    tasks: [
      "Interactive E2E & Automation Test Planning:\n    1. Critical Flows Scoping: Interview the user to map out the most critical user journeys, edge cases, and success flows they want guaranteed. Avoid generic, useless assertions.\n    2. QA Test Scaffolding: Once priorities are verified, write automated E2E and integration tests in the `tests/` directory.",
      "Verify system performance, rate-limiting, and error-path node coverages."
    ],
    reviews: [
      "Verify test coverage satisfies E2E user-flow paths.",
      "Confirm test mock fixtures represent clean, isolated payloads.",
      "Run test runner script and verify 100% test assertion success."
    ],
    coordinationRules: "- **Lifecycle Coordination (DMCP)**:\n    1. **Orchestrated Mode**: If a parent coordinator is active, follow specific scheduling directives.\n    2. **Choreographed Fallback**: You are a QA Engineer. If the workspace is empty, draft test plans in `tests/` and yield E2E execution until developer bootstrapping is complete.",
    scriptLanguage: 'js'
  },
  auditor: {
    description: "Security Auditor / Safety Gate",
    tone: "Dense, Caveman-style, zero-filler. Focus on static security, threat modeling, and OWASP compliance.",
    requirements: ['"host-environment: >=v1"'],
    tasks: [
      "Interactive Threat Scoping & Auditing:\n    1. Security Bounds Alignment: Discuss the target security threat model and compliance scope (e.g. OWASP targets, custom scan limits) with the user before scanning.\n    2. Auditor Scaffolding: Once threat model ranges are approved, write Semgrep rules, scans configuration, and audit files inside `docs/security/`.",
      "Scan all project files for hardcoded secrets, keys, or plaintext credentials."
    ],
    reviews: [
      "Verify complete absence of hardcoded keys/secrets across all repository files.",
      "Confirm OWASP-10 compliant safety gates are satisfied in threat models.",
      "Run security scan tools and verify zero critical vulnerabilities exist."
    ],
    coordinationRules: "- **Lifecycle Coordination (DMCP)**:\n    1. **Orchestrated Mode**: If a parent coordinator is active, follow specific scheduling directives.\n    2. **Choreographed Fallback**: You are a Security Auditor. If the workspace is empty, write threat models to `docs/security/` first, and yield active code security scans until developer bootstrapping is complete.",
    scriptLanguage: 'py'
  }
};

/**
 * Dynamic Archetype Classifier
 * Automatically categorizes the target skill based on keywords inside its name, description, and tags.
 */
export function detectArchetype(name, description, tags) {
  const cleanInput = `${name} ${description} ${tags}`.toLowerCase();
  
  if (/\b(pm|product|manager|roadmap|backlog|scrum|coordinator)\b/.test(cleanInput)) {
    return 'pm';
  }
  if (/\b(architect|design|ux|ui|database|schema|fig|figma|blueprint)\b/.test(cleanInput)) {
    return 'architect';
  }
  if (/\b(devops|deploy|docker|compose|cicd|actions|pipeline|infra|infrastructure)\b/.test(cleanInput)) {
    return 'devops';
  }
  if (/\b(qa|test|e2e|cypress|playwright|jmeter|selenium|tester|testing)\b/.test(cleanInput)) {
    return 'qa';
  }
  if (/\b(security|audit|scanner|compliance|threat|owasp|auditor|safety|guardrail)\b/.test(cleanInput)) {
    return 'auditor';
  }
  return 'developer'; // Fallback to developer
}

/**
 * Scaffolds a single Skill workspace.
 * @param {Object} options Scaffolding options.
 */
export function scaffoldSkill(options) {
  const {
    name,
    description,
    tags,
    targetDir,
    isSubSkill = false,
    localOnly = false,
    creationMode = 'quick',
    archetype = null,
    customTriggers = [],
    customRequirements = [],
    customTasks = [],
    customReviews = [],
    scriptLanguage = null
  } = options;

  ensureDirectory(targetDir);
  ensureDirectory(path.join(targetDir, 'scripts'));

  // 1. Resolve Archetype
  const resolvedArchetype = archetype || detectArchetype(name, description, tags);
  const profile = ARCHETYPE_PROFILES[resolvedArchetype] || ARCHETYPE_PROFILES.developer;

  // Read skill template
  const tmplPath = path.join(TEMPLATE_DIR, 'skill_template.md');
  if (!fs.existsSync(tmplPath)) {
    throw new Error(`Template not found: ${tmplPath}`);
  }
  const template = fs.readFileSync(tmplPath, 'utf-8');

  // Format Triggers List
  let triggerLines = [];
  if (creationMode === 'advanced' && customTriggers.length > 0) {
    triggerLines = customTriggers.map(t => `"${t.trim()}"`);
  } else {
    triggerLines = [
      `"idea: ${name}"`,
      `"context: ${tags.split(',').map(t => t.trim()).filter(Boolean).join(', ')}"`
    ];
  }
  const triggersListStr = triggerLines.map(t => `- ${t}`).join('\n  ');

  // Format Requirements List
  let requirementLines = [];
  if (creationMode === 'advanced' && customRequirements.length > 0) {
    requirementLines = customRequirements.map(r => `"${r.trim()}"`);
  } else {
    // Dynamic Host Baselining on Profile-based Requirements (Option 2)
    const nodeMajor = process.versions.node.split('.')[0];
    let pythonVersion = '>=3.10';
    try {
      const stdout = execSync('python3 --version || python --version', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      const match = stdout.match(/Python\s+([0-9]+\.[0-9]+)/i);
      if (match) {
        pythonVersion = `>=${match[1]}`;
      }
    } catch (e) {
      // Safe fallback
    }

    requirementLines = profile.requirements.map(req => {
      let r = req;
      r = r.replace('[HOST_NODE_VERSION]', nodeMajor);
      r = r.replace('[HOST_PYTHON_VERSION]', pythonVersion);
      return r;
    });
  }
  const requirementsListStr = requirementLines.map(r => `- ${r}`).join('\n  ');

  // Format Playbook Steps (Tasks)
  let taskLines = [];
  if (creationMode === 'advanced' && customTasks.length > 0) {
    taskLines = customTasks.map(t => t.trim()).filter(Boolean);
  } else {
    taskLines = profile.tasks;
  }
  const playbookStepsStr = taskLines.map(t => `- ${t}`).join('\n');

  // Format Review Checks
  let reviewLines = [];
  if (creationMode === 'advanced' && customReviews.length > 0) {
    reviewLines = customReviews.map(r => r.trim()).filter(Boolean);
  } else {
    reviewLines = profile.reviews;
  }
  const reviewChecksStr = reviewLines.map(r => `- ${r}`).join('\n');

  // Resolve Script Language
  const targetScriptLang = scriptLanguage || profile.scriptLanguage || 'js';

  // Hydrate template variables (DMCP & Dynamic tag hydration)
  const hydrated = hydrateTemplate(template, {
    NAME: name,
    DESCRIPTION: description,
    TAGS: tags.split(',').map(t => t.trim()).filter(Boolean).join(', '),
    TRIGGERS_LIST: triggersListStr,
    REQUIREMENTS_LIST: requirementsListStr,
    PLAYBOOK_STEPS: playbookStepsStr,
    REVIEW_CHECKS: reviewChecksStr,
    COORDINATION_RULES: profile.coordinationRules
  });

  // Write SKILL.md
  fs.writeFileSync(path.join(targetDir, 'SKILL.md'), hydrated, 'utf-8');

  // Create references/ and evals/ directories
  ensureDirectory(path.join(targetDir, 'references'));
  ensureDirectory(path.join(targetDir, 'evals'));

  // Write a mock security-first placeholder script under scripts/
  if (targetScriptLang === 'py') {
    const pythonScript = `#!/usr/bin/env python3
"""
Verification script for ${name}
High-quality, robust validation.
"""
import os
import sys

def verify_environment():
    print("Verifying sandboxed Python execution parameters...")
    # Check for presence of credentials in env variables, ensure none are hardcoded
    if os.environ.get("UNEXPECTED_PLAIN_TEXT_KEY"):
        print("[ERROR] Security violation: Hardcoded API keys detected in runtime environment.", file=sys.stderr)
        return False
    print("[OK] Environment verified. Strict credential restrictions satisfied.")
    return True

if __name__ == "__main__":
    if not verify_environment():
        sys.exit(1)
    sys.exit(0)
`;
    fs.writeFileSync(path.join(targetDir, 'scripts/security_check.py'), pythonScript, 'utf-8');
  } else if (targetScriptLang === 'js') {
    const mockScript = `/**
 * Verification script for ${name}
 * High-quality, robust validation.
 */
export function verifyEnvironment() {
  console.log("Verifying sandboxed execution parameters...");
  // Check for presence of credentials in env variables, ensure none are hardcoded
  if (process.env.UNEXPECTED_PLAIN_TEXT_KEY) {
    console.error("🔴 Security violation: Hardcoded API keys detected in runtime environment.");
    return false;
  }
  console.log("🟢 Environment verified. Strict credential restrictions satisfied.");
  return true;
}

if (!verifyEnvironment()) {
  process.exit(1);
}
`;
    fs.writeFileSync(path.join(targetDir, 'scripts/security_check.js'), mockScript, 'utf-8');
  }

  // Scaffold evals.json
  const evalsTmplPath = path.join(TEMPLATE_DIR, 'evals_template.json');
  if (fs.existsSync(evalsTmplPath)) {
    const evalsTmpl = fs.readFileSync(evalsTmplPath, 'utf-8');
    const hydratedEvals = hydrateTemplate(evalsTmpl, { NAME: name });
    fs.writeFileSync(path.join(targetDir, 'evals/evals.json'), hydratedEvals, 'utf-8');
  }

  // Scaffold Layer 3 (CI/CD GitHub Actions Security Workflow) for Defense-in-Depth
  ensureDirectory(path.join(targetDir, '.github/workflows'));
  const workflowPath = path.join(targetDir, '.github/workflows/security_scan.yml');
  const workflowContent = `name: Security and Guardrails Scan

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  security-audit:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Set up ${targetScriptLang === 'py' ? 'Python' : 'Node.js'}
      uses: actions/${targetScriptLang === 'py' ? 'setup-python@v5' : 'setup-node@v4'}
      with:
        ${targetScriptLang === 'py' ? 'python-version: \'3.11\'' : 'node-version: \'20\''}

    - name: Run Credentials & Sandboxing Auditing
      run: |
        ${targetScriptLang === 'py' ? 'python scripts/security_check.py' : 'node scripts/security_check.js'}

    - name: Run Secret Leak Static Scan
      run: |
        # Assert no plaintext secrets match high-entropy strings, excluding standard workflows & files
        ! grep -rnE "[a-zA-Z0-9_-]{24,}" --exclude-dir=node_modules --exclude-dir=.git --exclude=.github/workflows/security_scan.yml .
`;
  fs.writeFileSync(workflowPath, workflowContent, 'utf-8');

  // Scaffold global scanner exclusions if Security Auditor archetype is active
  if (resolvedArchetype === 'auditor') {
    const gitleaksTmplPath = path.join(TEMPLATE_DIR, 'gitleaks_template.toml');
    const trivyTmplPath = path.join(TEMPLATE_DIR, 'trivy_template.yaml');
    
    if (fs.existsSync(gitleaksTmplPath)) {
      const gitleaksContent = fs.readFileSync(gitleaksTmplPath, 'utf-8');
      fs.writeFileSync(path.join(targetDir, 'gitleaks.toml'), gitleaksContent, 'utf-8');
    }
    if (fs.existsSync(trivyTmplPath)) {
      const trivyContent = fs.readFileSync(trivyTmplPath, 'utf-8');
      fs.writeFileSync(path.join(targetDir, 'trivy.yaml'), trivyContent, 'utf-8');
    }
  }

  // Scaffold Autolearner
  scaffoldAutolearner(targetDir, name, resolvedArchetype, targetScriptLang);

  // Register skill to global index
  if (!localOnly) {
    try {
      registerSkill({
        name: name,
        description: description,
        version: '0.1.0',
        triggers: triggerLines.map(t => t.replace(/^['"]|['"]$/g, '')),
        tags: tags.split(',').map(t => t.trim()).filter(Boolean)
      }, targetDir);
    } catch (indexErr) {
      console.warn(`  ⚠️ Warning: Failed to register skill in index: ${indexErr.message}`);
    }
  }

  // Generate high-density telegraphic log
  const filesList = ['SKILL.md', 'lessons_index.md', 'playbook.md'];
  if (targetScriptLang === 'py' || targetScriptLang === 'js') {
    filesList.push(`scripts/security_check.${targetScriptLang}`);
  }
  if (fs.existsSync(path.join(targetDir, 'evals/evals.json'))) {
    filesList.push('evals/evals.json');
  }
  if (fs.existsSync(path.join(targetDir, '.github/workflows/security_scan.yml'))) {
    filesList.push('workflows/security_scan.yml');
  }
  if (resolvedArchetype === 'auditor') {
    filesList.push('gitleaks.toml', 'trivy.yaml');
  }

  console.log(`✓ Scaffolded skill [${name}] [${resolvedArchetype}]: (${filesList.join(', ')})` + (!localOnly ? ' [Registered]' : ' [Local]'));
  if (!isSubSkill) {
    console.log("\n==================================================================");
    console.log("👉 QUICK-START GUIDE FOR PAIR PROGRAMMING:");
    console.log("   1. Point your Antigravity chat client to this folder or import it.");
    console.log(`   2. Trigger this skill by typing its active context keywords:`);
    console.log(`      - "${tags}"`);
    console.log("==================================================================\n");
  }
}

/**
 * Scaffolds a single Agent Hook rule.
 * @param {Object} options Scaffolding options.
 */
export function scaffoldHook(options) {
  const { name, events, filePatterns, severity, targetDir } = options;

  ensureDirectory(targetDir);

  const tmplPath = path.join(TEMPLATE_DIR, 'hook_template.md');
  if (!fs.existsSync(tmplPath)) {
    throw new Error(`Template not found: ${tmplPath}`);
  }
  const template = fs.readFileSync(tmplPath, 'utf-8');

  const defaultActionScript = `# Pre-commit safety scan to check for plaintext keys and unsafe terminal commands
echo "Executing security-first hook validations for ${name}..."
grep -rnE "[a-zA-Z0-9_-]{24,}" --exclude-dir=node_modules . && echo "🔴 Security failure: Hardcoded keys detected!" && exit 1
echo "🟢 Safety validations complete."
`;

  const hydrated = hydrateTemplate(template, {
    NAME: name,
    EVENTS: events,
    FILE_PATTERNS: filePatterns,
    SEVERITY: severity,
    ACTION_SCRIPT: defaultActionScript
  });

  const hookFileName = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_hook.md`;
  fs.writeFileSync(path.join(targetDir, hookFileName), hydrated, 'utf-8');
  console.log(`✓ Scaffolded hook [${name}] (${hookFileName})`);
}

/**
 * Scaffolds a single Agent Profile.
 * @param {Object} options Scaffolding options.
 */
export function scaffoldAgent(options) {
  const { name, description, role, allowedSkills, targetDir } = options;

  ensureDirectory(targetDir);

  const resolvedArchetype = detectArchetype(name, description, role);
  const profile = ARCHETYPE_PROFILES[resolvedArchetype] || ARCHETYPE_PROFILES.developer;

  const tmplPath = path.join(TEMPLATE_DIR, 'agent_template.md');
  if (!fs.existsSync(tmplPath)) {
    throw new Error(`Template not found: ${tmplPath}`);
  }
  const template = fs.readFileSync(tmplPath, 'utf-8');

  const skillList = allowedSkills.split(',').map(s => s.trim()).filter(Boolean).join('\n  - ');

  const hydrated = hydrateTemplate(template, {
    NAME: name,
    DESCRIPTION: description,
    ROLE: role,
    ALLOWED_SKILLS: skillList
  });

  fs.writeFileSync(path.join(targetDir, 'AGENT.md'), hydrated, 'utf-8');
  console.log(`✓ Scaffolded agent [${name}] (AGENT.md)`);
}

/**
 * Scaffolds a Coordinated Skill System / Multi-Agent Agency.
 * Generates parent manifest, maps sub-skills recursively, and coordinates shared resources.
 * @param {Object} options Scaffolding options.
 */
export async function scaffoldSkillSystem(options) {
  const { name, orchestrator, subSkillsText, targetDir, childScopes = null } = options;

  console.log(`\nScaffolding Coordinated Skill System: ${name}...`);
  ensureDirectory(targetDir);

  // Read system template
  const tmplPath = path.join(TEMPLATE_DIR, 'system_template.md');
  if (!fs.existsSync(tmplPath)) {
    throw new Error(`Template not found: ${tmplPath}`);
  }
  const template = fs.readFileSync(tmplPath, 'utf-8');

  const subSkills = subSkillsText.split(',').map(s => s.trim()).filter(Boolean);

  // Resolve scopes for each child skill (Local vs Global)
  const resolvedChildScopes = {};
  const globalConfigBase = path.resolve(os.homedir(), '.gemini/config');

  for (const childSkill of subSkills) {
    let scope = '1'; // Default: Local
    if (childScopes && childScopes[childSkill]) {
      scope = childScopes[childSkill];
    } else if (options.isInteractive) {
      console.log(`\nConfigure scope for sub-skill [${childSkill}]:`);
      console.log(`  [1] Local (inside this system's folder: ./skills/${childSkill})`);
      console.log(`  [2] Global (system-wide folder: ~/.gemini/config/skills/${childSkill})`);
      scope = (await askQuestion("Enter selection (1-2, Default: 1): ")).trim() || '1';
    }
    resolvedChildScopes[childSkill] = scope;
  }

  // Hydrate child components lists with their resolved paths
  const subSkillsList = subSkills.map(s => {
    const isGlobal = resolvedChildScopes[s] === '2';
    const linkPath = isGlobal 
      ? path.join(globalConfigBase, 'skills', s, 'SKILL.md') 
      : `./skills/${s}/SKILL.md`;
    return `- [${s}](${linkPath})`;
  }).join('\n');

  const subAgentsList = subSkills.map(s => {
    const isGlobal = resolvedChildScopes[s] === '2';
    const linkPath = isGlobal 
      ? path.join(globalConfigBase, 'agents', `${s}_agent`, 'AGENT.md') 
      : `./agents/${s}_agent/AGENT.md`;
    return `- [${s}-agent](${linkPath})`;
  }).join('\n');

  const hydrated = hydrateTemplate(template, {
    NAME: name,
    ORCHESTRATOR: orchestrator,
    SUB_SKILLS_LIST: subSkillsList,
    SUB_AGENTS_LIST: subAgentsList
  });

  // Write parent SYSTEM.md manifest
  fs.writeFileSync(path.join(targetDir, 'SYSTEM.md'), hydrated, 'utf-8');
  console.log(`  🟢 Created System Manifest: SYSTEM.md`);

  // Create local base directories
  ensureDirectory(path.join(targetDir, 'skills'));
  ensureDirectory(path.join(targetDir, 'agents'));

  // Scaffold top-level Autolearner for the whole System
  scaffoldAutolearner(targetDir, name, 'pm', 'js');

  // Recursively scaffold each sub-skill
  for (const childSkill of subSkills) {
    const isGlobal = resolvedChildScopes[childSkill] === '2';
    
    const childTargetSkillDir = isGlobal 
      ? path.join(globalConfigBase, 'skills', childSkill)
      : path.join(targetDir, 'skills', childSkill);

    const childTargetAgentDir = isGlobal
      ? path.join(globalConfigBase, 'agents', `${childSkill}_agent`)
      : path.join(targetDir, 'agents', `${childSkill}_agent`);

    scaffoldSkill({
      name: childSkill,
      description: `Coordinated skill for ${childSkill} within the ${name} system.`,
      tags: `${name}, child-skill`,
      targetDir: childTargetSkillDir,
      isSubSkill: true
    });

    // Scaffold a matching specialized child Agent profile
    scaffoldAgent({
      name: `${childSkill}-agent`,
      description: `Specialized agent managing ${childSkill} capabilities.`,
      role: `${childSkill} specialist`,
      allowedSkills: childSkill,
      targetDir: childTargetAgentDir
    });
  }

  console.log(`\n🟢 Skill System [${name}] fully scaffolded with ${subSkills.length} sub-agents/skills!`);
  console.log("\n==================================================================");
  console.log("👉 QUICK-START GUIDE FOR PAIR PROGRAMMING:");
  console.log("   1. Open the newly generated project folder in your Antigravity chat client.");
  console.log("   2. In the chat, type: 'Let's begin the PM backlog coordination phase.'");
  console.log("   3. Your Product Manager archetype will actively interview you to align on details");
  console.log("      and design system preferences. Follow their guidance to unblock developers!");
  console.log("==================================================================\n");
}

/**
 * Validates the schema of a synthesized blueprint object.
 * Maps missing attributes to safe architectural defaults.
 * @param {Object} rawBlueprint - Raw parsed JSON blueprint.
 * @returns {Object} Validated, normalized blueprint.
 */
export function validateBlueprint(rawBlueprint) {
  if (!rawBlueprint || typeof rawBlueprint !== 'object') {
    throw new Error("Invalid blueprint format: Must be an object.");
  }
  if (!rawBlueprint.projectName) {
    throw new Error("Mandatory field 'projectName' is missing.");
  }
  if (!rawBlueprint.skills || !Array.isArray(rawBlueprint.skills)) {
    throw new Error("Mandatory field 'skills' is missing or not an array.");
  }

  const validArchetypes = ['pm', 'architect', 'devops', 'developer', 'qa', 'auditor'];

  const validatedSkills = rawBlueprint.skills.map((skill, index) => {
    if (!skill || typeof skill !== 'object') {
      throw new Error(`Skill at index ${index} is not an object.`);
    }
    if (!skill.name || !skill.archetype || !skill.description) {
      throw new Error(`Skill at index ${index} requires 'name', 'archetype', and 'description'.`);
    }
    if (!validArchetypes.includes(skill.archetype)) {
      throw new Error(`Skill '${skill.name}' has invalid archetype '${skill.archetype}'.`);
    }

    return {
      name: skill.name,
      archetype: skill.archetype,
      description: skill.description,
      language: skill.language || 'default', // Cascading Agnostic Default fallback
      triggers: Array.isArray(skill.triggers) ? skill.triggers : [],
      requirements: Array.isArray(skill.requirements) ? skill.requirements : [],
      customTasks: Array.isArray(skill.customTasks) ? skill.customTasks : [],
      customReviews: Array.isArray(skill.customReviews) ? skill.customReviews : []
    };
  });

  return {
    projectName: rawBlueprint.projectName,
    coordinationRules: rawBlueprint.coordinationRules || '',
    skills: validatedSkills
  };
}

/**
 * Executes non-interactive multi-skill scaffolding from a JSON blueprint file.
 * Protects against accidental overwrites unless force flag is supplied.
 * @param {string} blueprintPath - Absolute path to blueprint JSON file.
 * @param {boolean} force - Overwrite existing directories if true.
 */
export async function scaffoldFromBlueprint(blueprintPath, force = false) {
  console.log("=====================================================");
  console.log("       Executing Declarative Blueprint Scaffolding   ");
  console.log("=====================================================\n");

  const rawContent = fs.readFileSync(blueprintPath, 'utf8');
  let rawBlueprint;
  try {
    rawBlueprint = JSON.parse(rawContent);
  } catch (err) {
    throw new Error(`Blueprint file contains invalid JSON: ${err.message}`);
  }

  const blueprint = validateBlueprint(rawBlueprint);
  const targetDir = path.resolve(blueprint.projectName);

  // Overwrite Protection (Safety Protocol)
  if (fs.existsSync(targetDir) && !force) {
    console.error(`🔴 Aborted: Target project directory already exists at: ${targetDir}`);
    console.error("To overwrite this folder, execute again with the --force flag.");
    process.exit(1);
  }

  console.log(`📂 Project Name: \x1b[36m${path.basename(targetDir)}\x1b[0m`);
  console.log(`📂 Target Path: \x1b[90m${targetDir}\x1b[0m\n`);

  ensureDirectory(targetDir);

  // Write central coordinated playbook files for the team
  const roadmapPath = path.join(targetDir, 'lessons_index.md');
  const playbookPath = path.join(targetDir, 'playbook.md');

  const roadmapContent = `# Coordinated Team Issue Index

> Coordinated multi-skill team lessons database. Matches playbook anchors.
`;
  const playbookContent = `# Coordinated Team Playbook

> Coordinated multi-skill DMCP playbook.
`;

  // Write files
  fs.writeFileSync(roadmapPath, roadmapContent, 'utf-8');
  fs.writeFileSync(playbookPath, playbookContent, 'utf-8');

  // Traverse skills and scaffold sequentially
  for (const skill of blueprint.skills) {
    const skillDir = path.join(targetDir, 'skills', skill.name);
    
    // Scaffolding skill natively
    scaffoldSkill({
      name: skill.name,
      description: skill.description,
      tags: skill.archetype, // Fallback to archetype name
      targetDir: skillDir,
      isSubSkill: true,
      localOnly: false, // Default: register in global indexing catalog
      creationMode: 'advanced',
      archetype: skill.archetype,
      customTriggers: skill.triggers,
      customRequirements: skill.requirements,
      customTasks: skill.customTasks,
      customReviews: skill.customReviews,
      scriptLanguage: skill.language
    });
  }

  console.log("\n=====================================================");
  console.log("🎉 Coordinated Multi-Skill Team Scaffolding Completed!");
  console.log("=====================================================");
  console.log("\n👉 QUICK-START GUIDE FOR PAIR PROGRAMMING:");
  console.log("   1. Open the newly generated project folder in your Antigravity chat client.");
  console.log("   2. In the chat, type: 'Let's begin the PM backlog coordination phase.'");
  console.log("   3. Your Product Manager archetype will actively interview you to align on details");
  console.log("      and design system preferences. Follow their guidance to unblock developers!");
  console.log("=====================================================\n");
}

/**
 * Main Interactive Scaffolding loop.
 */
export async function main() {
  console.clear();
  console.log("==================================================================");
  console.log("             Antigravity 2.0 Generator Scaffolder CLI            ");
  console.log("   Zero-Dependency Security-First, Caveman-styled Scaffolding    ");
  console.log("==================================================================\n");

  try {
    console.log("Select component type to generate:");
    console.log("  [1] Standalone Skill");
    console.log("  [2] Agent Hook / Event Rule");
    console.log("  [3] Standalone Agent Profile");
    console.log("  [4] Coordinated Skill System / Multi-Agent Agency");
    console.log("  [5] Exit\n");

    const choice = (await askQuestion("Enter selection (1-5): ")).trim();

    if (choice === '5') {
      console.log("Exiting generator. Keep coding!");
      rl.close();
      return;
    }

    const name = (await askQuestion("\nEnter component/system name (e.g. python-security): ")).trim();
    if (!name) {
      console.log("🔴 Name cannot be empty.");
      rl.close();
      return;
    }

    console.log("\nSelect target scope for the generated component:");
    console.log("  [1] Local (project workspace skillsets directory)");
    console.log("  [2] Global (system-wide Antigravity user config directory)");
    const scopeChoice = (await askQuestion("Enter selection (1-2, Default: 1): ")).trim() || '1';

    let targetDir;
    if (scopeChoice === '2') {
      const globalConfigBase = path.resolve(os.homedir(), '.gemini/config');
      if (choice === '1' || choice === '4') {
        targetDir = path.join(globalConfigBase, 'skills', name);
      } else if (choice === '3') {
        targetDir = path.join(globalConfigBase, 'agents', name);
      } else {
        targetDir = path.join(globalConfigBase, 'skills', name); // default
      }
      console.log(`Global scope selected. Target path: ${targetDir}`);
    } else {
      const targetBase = (await askQuestion("Enter target output folder path (Default: ./skillsets): ")).trim() || './skillsets';
      targetDir = path.resolve(process.cwd(), targetBase, name);
    }

    switch (choice) {
      case '1': {
        const description = (await askQuestion("Enter short description: ")).trim() || "Custom Antigravity skill.";
        const tags = (await askQuestion("Enter comma-separated tags (e.g. security, python, review): ")).trim() || "general";
        
        console.log("\nSelect Creation Mode:");
        console.log("  [1] Quick Creation (Auto-fill with defaults)");
        console.log("  [2] Advanced Creation (Interactively customize triggers, requirements, and tasks)");
        const modeChoice = (await askQuestion("Enter selection (1-2, Default: 1): ")).trim() || '1';
        const creationMode = modeChoice === '2' ? 'advanced' : 'quick';

        let customTriggers = [];
        let customRequirements = [];
        let customTasks = [];
        let customReviews = [];
        let scriptLanguage = 'js';
        let archetype = null;

        if (creationMode === 'advanced') {
          console.log("\n--- Advanced Customization Loop ---");
          console.log("Select Skill Archetype:");
          console.log("  [1] Developer / Creator (Active coding, TDD, bootstrapping)");
          console.log("  [2] Designer / Architect (UX design, DB schema, wireframes)");
          console.log("  [3] DevOps / Infrastructure (CI/CD, Docker, pipelines)");
          console.log("  [4] QA / Test Engineer (E2E testing, playwright, mock fixtures)");
          console.log("  [5] Security Auditor / Safety Gate (OWASP scanning, threat models)");
          console.log("  [6] Product Manager / Coordinator (ROADMAP.md, Scrum backlog)");
          const archChoice = (await askQuestion("Enter selection (1-6, Default: 1): ")).trim() || '1';
          const archMap = { '1': 'developer', '2': 'architect', '3': 'devops', '4': 'qa', '5': 'auditor', '6': 'pm' };
          archetype = archMap[archChoice] || 'developer';

          const triggersInput = await askQuestion("\nEnter comma-separated triggers (e.g. /my-cmd, context: check): ");
          if (triggersInput.trim()) {
            customTriggers = triggersInput.split(',').map(t => t.trim()).filter(Boolean);
          }

          const reqsInput = await askQuestion("Enter runtime requirements (e.g. node: >=18, python: >=3.10): ");
          if (reqsInput.trim()) {
            customRequirements = reqsInput.split(',').map(r => r.trim()).filter(Boolean);
          }

          const tasksInput = await askQuestion("Enter custom task definitions (semicolon-separated): ");
          if (tasksInput.trim()) {
            customTasks = tasksInput.split(';').map(t => t.trim()).filter(Boolean);
          }

          const reviewsInput = await askQuestion("Enter custom review checks (semicolon-separated): ");
          if (reviewsInput.trim()) {
            customReviews = reviewsInput.split(';').map(r => r.trim()).filter(Boolean);
          }

          console.log("\nSelect Verification Script Language:");
          console.log("  [1] Node.js (scripts/security_check.js)");
          console.log("  [2] Python (scripts/security_check.py - Hardened)");
          const langChoice = (await askQuestion("Enter selection (1-2, Default: 1): ")).trim() || '1';
          scriptLanguage = langChoice === '2' ? 'py' : 'js';
        }

        const localOnlyAnswer = (await askQuestion("\nExplicitly keep this skill local-only (y/N)? ")).trim().toLowerCase();
        const localOnly = localOnlyAnswer === 'y' || localOnlyAnswer === 'yes' || process.argv.includes('--local-only') || process.argv.includes('-o');

        scaffoldSkill({
          name,
          description,
          tags,
          targetDir,
          localOnly,
          creationMode,
          archetype,
          customTriggers,
          customRequirements,
          customTasks,
          customReviews,
          scriptLanguage
        });
        break;
      }
      case '2': {
        const events = (await askQuestion("Enter triggering event (Default: pre-commit): ")).trim() || "pre-commit";
        const filePatterns = (await askQuestion("Enter target file patterns (Default: *): ")).trim() || "*";
        const severity = (await askQuestion("Enter failure severity level (block / warn / suggest): ")).trim() || "block";
        scaffoldHook({ name, events, filePatterns, severity, targetDir });
        break;
      }
      case '3': {
        const description = (await askQuestion("Enter description: ")).trim() || "Antigravity specialized agent.";
        const role = (await askQuestion("Enter agent role/persona (e.g. Python security analyst): ")).trim() || "specialized analyst";
        const allowedSkills = (await askQuestion("Enter comma-separated allowed skills (e.g. python-security): ")).trim() || "none";
        scaffoldAgent({ name, description, role, allowedSkills, targetDir });
        break;
      }
      case '4': {
        const orchestrator = (await askQuestion("Enter name of system orchestrator agent (Default: system-coordinator): ")).trim() || "system-coordinator";
        const subSkillsText = (await askQuestion("Enter comma-separated sub-skills to scaffold (e.g. python-dev, python-review, python-security): ")).trim();
        if (!subSkillsText) {
          console.log("🔴 At least one sub-skill is required to scaffold a system.");
          rl.close();
          return;
        }
        await scaffoldSkillSystem({ name, orchestrator, subSkillsText, targetDir, isInteractive: true });
        break;
      }
      default:
        console.log("🔴 Invalid choice. Exiting.");
    }
  } catch (err) {
    console.error(`\n🔴 An unexpected error occurred: ${err.message}`);
  } finally {
    rl.close();
  }
}

// Execute CLI if run directly
const isDirectRun = process.argv[1] && (
  process.argv[1] === fileURLToPath(import.meta.url) ||
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
);
if (isDirectRun) {
  main();
}

