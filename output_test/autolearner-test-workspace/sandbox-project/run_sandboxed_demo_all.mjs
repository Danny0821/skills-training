/**
 * run_sandboxed_demo_all.mjs
 * 
 * Programmatic generation of all 7 high-performance DevTeam Archetype skills
 * inside a single unified sandbox workspace, isolating telemetry to prevent slop.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Redirect indexing to an isolated sandbox registry directory to keep user global index clean
const RUN_ID = Date.now().toString();
const SANDBOX_REGISTRY_DIR = path.resolve(__dirname, `../../sandboxed-demo-run/registry-all-7-${RUN_ID}`);
process.env.AGY_GEN_TEST_DIR = SANDBOX_REGISTRY_DIR;

// Import the scaffolder utility via standard file:// URL
import { scaffoldSkill } from 'file:///c:/Users/Daniel/Documents/1.Projects/Skills-training/scripts/generate.js';

const DEMO_WORKSPACE_DIR = path.resolve(__dirname, `../../sandboxed-demo-run/workspace-all-7-${RUN_ID}`);

function runDemoAll() {
  console.log("=====================================================");
  console.log("      Scaffolding Unified 7-Role DevTeam Sandbox      ");
  console.log("=====================================================\n");

  fs.mkdirSync(DEMO_WORKSPACE_DIR, { recursive: true });

  // 1. UI/UX Designer Skill (Architect Archetype)
  scaffoldSkill({
    name: 'uiux-designer',
    description: 'Designer / Software Architect specializing in Figma UX mockups and database schemas.',
    tags: 'figma, schema, design, architect',
    targetDir: path.join(DEMO_WORKSPACE_DIR, 'uiux-designer'),
    creationMode: 'advanced',
    archetype: 'architect',
    customTriggers: ['/design-ux', 'context: figma, schema, design'],
    customRequirements: ['figma-api: >=v1', 'json-schema: >=draft-07'],
    customTasks: [
      "Inspect workspace. If empty (Greenfield): scaffold project wireframes inside `docs/architecture/wireframes.md` and database schema blueprints inside `docs/architecture/schema.sql`. Do not write backend or frontend code.",
      "Align database schemas with the Product Manager's roadmap manifest."
    ],
    customReviews: [
      "Verify database schema is in 3rd Normal Form (3NF).",
      "Confirm wireframes include a responsive layout design spec."
    ],
    scriptLanguage: 'js',
    localOnly: true
  });

  // 2. Python Backend Skill (Developer Python Archetype)
  scaffoldSkill({
    name: 'python-backend',
    description: 'High-performance Python FastAPI backend service.',
    tags: 'python, fastapi, server, dev',
    targetDir: path.join(DEMO_WORKSPACE_DIR, 'python-backend'),
    creationMode: 'advanced',
    archetype: 'developer',
    customTriggers: ['/run-backend', 'context: python, fastapi, server'],
    customRequirements: ['python: >=3.10', 'fastapi: >=0.100'],
    customTasks: [
      "Inspect workspace docs/architecture/. If no database schema specs exist, yield execution and instruct the uiux-designer skill to run first.",
      "Bootstrap the Python backend environment using poetry or pipenv.",
      "Write modular endpoints targeting FastAPI, matching the database schema spec.",
      "Run the pytest suite to verify logic correctness."
    ],
    customReviews: [
      "Verify 100% test success using pytest in the sandbox environment.",
      "Assert no hardcoded credentials exist across files."
    ],
    scriptLanguage: 'py',
    localOnly: true
  });

  // 3. Node.js Frontend Skill (Developer JS Archetype)
  scaffoldSkill({
    name: 'nodejs-frontend',
    description: 'React dashboard frontend powered by Vite and Node.js.',
    tags: 'react, frontend, vite, web',
    targetDir: path.join(DEMO_WORKSPACE_DIR, 'nodejs-frontend'),
    creationMode: 'advanced',
    archetype: 'developer',
    customTriggers: ['/run-frontend', 'context: react, vite, web'],
    customRequirements: ['node: >=18', 'npm: >=9'],
    customTasks: [
      "Inspect workspace docs/architecture/. If no UI/UX wireframe specs exist, yield execution and instruct the uiux-designer skill to run first.",
      "Bootstrap the React application using create-vite.",
      "Build modular dashboard components complying with the UX design specs.",
      "Run Jest/Vitest unit tests to verify UI component logic."
    ],
    customReviews: [
      "Verify React components compile cleanly under modern standard strict settings.",
      "Run Jest/Vitest test runner and assert 100% pass."
    ],
    scriptLanguage: 'js',
    localOnly: true
  });

  // 4. DevOps Deploy Pipeline Skill (DevOps Archetype)
  scaffoldSkill({
    name: 'devops-deploy-pipeline',
    description: 'Docker deployment pipeline with multi-stage virtualization and CI/CD rules.',
    tags: 'devops, docker, deploy, pipeline',
    targetDir: path.join(DEMO_WORKSPACE_DIR, 'devops-deploy-pipeline'),
    creationMode: 'advanced',
    archetype: 'devops',
    customTriggers: ['/run-deploy', 'context: docker, deploy, devops'],
    customRequirements: ['docker: >=20.10', 'github-actions: >=v2'],
    customTasks: [
      "Inspect workspace. If database schemas or architectures exist, align container virtualizations.",
      "Scaffold containerization configurations (Dockerfile, docker-compose.yml) and environment variable templates (.env.example). Do not write core business logic.",
      "Configure Github deployment action pipelines under CI rules."
    ],
    customReviews: [
      "Verify multi-stage container optimization is present in dockerfiles.",
      "Confirm environment configurations keep credentials secure, never hardcoded."
    ],
    scriptLanguage: 'js',
    localOnly: true
  });

  // 5. Playwright E2E Suite Skill (QA Archetype)
  scaffoldSkill({
    name: 'playwright-e2e-suite',
    description: 'Playwright test suite for E2E user flows and browser validation.',
    tags: 'qa, test, playwright, cypress',
    targetDir: path.join(DEMO_WORKSPACE_DIR, 'playwright-e2e-suite'),
    creationMode: 'advanced',
    archetype: 'qa',
    customTriggers: ['/run-e2e', 'context: qa, test, playwright'],
    customRequirements: ['node: >=18', 'playwright: >=1.38'],
    customTasks: [
      "Inspect workspace. If empty (Greenfield): draft integration check sheets and E2E checklists. Save fixtures to tests/.",
      "Once codebase is active: write Playwright automated E2E tests covering complete user journeys in tests/.",
      "Assert selector performance and wait timers to satisfy async rendering tolerances."
    ],
    customReviews: [
      "Verify locator checks use reliable data-testid selectors.",
      "Confirm E2E test scripts pass cleanly with mock fixture responses."
    ],
    scriptLanguage: 'js',
    localOnly: true
  });

  // 6. Security Leak Detector Skill (Security Auditor Archetype)
  scaffoldSkill({
    name: 'secret-leak-detector',
    description: 'Gitleaks safety scanning auditor to capture plaintext secrets and credentials leaks.',
    tags: 'security, audit, scanner, safety',
    targetDir: path.join(DEMO_WORKSPACE_DIR, 'secret-leak-detector'),
    creationMode: 'advanced',
    archetype: 'auditor',
    customTriggers: ['/scan-secrets', 'context: security, scanner, safety'],
    customRequirements: ['python: >=3.10', 'gitleaks: >=8.0'],
    customTasks: [
      "Inspect workspace. If empty (Greenfield): write threat models and static scanner exclusions config sheets inside docs/security/.",
      "Once codebase is active: run credential scanning sweeps on all codebases to locate hardcoded plain-text passwords or API tokens.",
      "Run safety auditing checks satisfying OWASP-10 standard compliance."
    ],
    customReviews: [
      "Confirm complete exclusion of plain-text secrets across all folders.",
      "Verify static scanner triggers report zero critical threat alerts."
    ],
    scriptLanguage: 'py',
    localOnly: true
  });

  // 7. Scrum Board Tracker Skill (Product Manager Archetype)
  scaffoldSkill({
    name: 'scrum-board-tracker',
    description: 'Project Roadmap tracking PM backlog milestones.',
    tags: 'pm, backlog, roadmap, scrum',
    targetDir: path.join(DEMO_WORKSPACE_DIR, 'scrum-board-tracker'),
    creationMode: 'advanced',
    archetype: 'pm',
    customTriggers: ['/manage-scrum', 'context: pm, scrum, roadmap'],
    customRequirements: ['node: >=18'],
    customTasks: [
      "Inspect workspace. If empty (Greenfield): scaffold project roadmaps and backlog milestone cards inside ROADMAP.md and BACKLOG.md in root.",
      "Coordinate deliverable statuses and milestone priority cards, aligning backlog with user specifications.",
      "Bypasses core software code creation."
    ],
    customReviews: [
      "Verify backlog items are prioritised via explicit MoSCoW tags.",
      "Confirm ROADMAP.md is committed in workspace root."
    ],
    scriptLanguage: 'js',
    localOnly: true
  });

  console.log("\n=====================================================");
  console.log("🟢 All 7 DevTeam Sandbox Skills Successfully Scaffolded!");
  console.log(`Unified Workspace Path: ${DEMO_WORKSPACE_DIR}`);
  console.log("=====================================================");
}

runDemoAll();
