/**
 * Verification & Test Suite for Antigravity Scaffolder
 * Runs programmatic generation and asserts correct file structure creation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scaffoldSkillSystem, scaffoldHook, scaffoldAgent } from './generate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root path for output tests
const TEST_OUTPUT_DIR = path.resolve(__dirname, '../output_test');
process.env.AGY_GEN_TEST_DIR = path.join(TEST_OUTPUT_DIR, 'test-registry');

function cleanup() {
  if (fs.existsSync(TEST_OUTPUT_DIR)) {
    fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
    console.log("🧹 Cleaned up old test directory.");
  }
}

function assertExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Assertion failed: File does not exist at ${filePath}`);
  }
  console.log(`  ✓ Verified file exists: ${path.basename(filePath)}`);
}

async function runTests() {
  console.log("=====================================================");
  console.log("   Running Antigravity Generator Programmatic Tests   ");
  console.log("=====================================================\n");

  cleanup();

  try {
    // 1. Test Skill System / Multi-Agent Scaffolding
    console.log("🧪 Test Case 1: Scaffolding a Coordinated Skill System...");
    const systemDir = path.join(TEST_OUTPUT_DIR, 'python-security-agency');
    await scaffoldSkillSystem({
      name: 'python-security-agency',
      orchestrator: 'security-coordinator',
      subSkillsText: 'python-audit, python-fixer',
      targetDir: systemDir
    });

    // Assert system files
    assertExists(path.join(systemDir, 'SYSTEM.md'));
    assertExists(path.join(systemDir, 'lessons_index.md'));
    assertExists(path.join(systemDir, 'playbook.md'));
    
    // Assert sub-skills
    assertExists(path.join(systemDir, 'skills/python-audit/SKILL.md'));
    assertExists(path.join(systemDir, 'skills/python-audit/lessons_index.md'));
    assertExists(path.join(systemDir, 'skills/python-audit/playbook.md'));
    assertExists(path.join(systemDir, 'skills/python-audit/scripts/security_check.js'));
    assertExists(path.join(systemDir, 'skills/python-audit/evals/evals.json'));
    assertExists(path.join(systemDir, 'skills/python-audit/references'));

    assertExists(path.join(systemDir, 'skills/python-fixer/SKILL.md'));
    assertExists(path.join(systemDir, 'skills/python-fixer/lessons_index.md'));
    assertExists(path.join(systemDir, 'skills/python-fixer/playbook.md'));
    assertExists(path.join(systemDir, 'skills/python-fixer/evals/evals.json'));
    assertExists(path.join(systemDir, 'skills/python-fixer/references'));

    // Assert sub-agents
    assertExists(path.join(systemDir, 'agents/python-audit_agent/AGENT.md'));
    assertExists(path.join(systemDir, 'agents/python-fixer_agent/AGENT.md'));

    console.log("\n🟢 Test Case 1 passed successfully!\n");

    // 2. Test Standalone Agent Hook Rules
    console.log("🧪 Test Case 2: Scaffolding Standalone Hook...");
    const hookDir = path.join(TEST_OUTPUT_DIR, 'git-rules');
    scaffoldHook({
      name: 'leak_scanner',
      events: 'pre-commit',
      filePatterns: '*.py',
      severity: 'block',
      targetDir: hookDir
    });

    assertExists(path.join(hookDir, 'leak_scanner_hook.md'));
    console.log("\n🟢 Test Case 2 passed successfully!\n");

    // 3. Test Standalone Agent
    console.log("🧪 Test Case 3: Scaffolding Standalone Agent Profile...");
    const agentDir = path.join(TEST_OUTPUT_DIR, 'auditor-agent');
    scaffoldAgent({
      name: 'code-auditor',
      description: 'Audit TypeScript/Javascript code.',
      role: 'security expert',
      allowedSkills: 'typescript-audit',
      targetDir: agentDir
    });

    assertExists(path.join(agentDir, 'AGENT.md'));
    console.log("\n🟢 Test Case 3 passed successfully!\n");

    console.log("=====================================================");
    console.log("🎉 All programmatic scaffolding tests passed successfully!");
    console.log("=====================================================");
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Test suite failed: ${err.message}`);
    process.exit(1);
  }
}

runTests();
