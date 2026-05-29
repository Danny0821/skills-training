/**
 * E2E Sandbox Integration Verification Suite for Agy-Gen Blueprint Scaffolding
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_OUTPUT_DIR = path.resolve(__dirname, '../output_test');
const SCRATCH_DIR = path.resolve(__dirname, '../scratch');
const REGISTRY_DIR = path.join(TEST_OUTPUT_DIR, 'test-registry');

// Enforce registry isolation redirection
process.env.AGY_GEN_TEST_DIR = REGISTRY_DIR;

function cleanup() {
  if (fs.existsSync(TEST_OUTPUT_DIR)) {
    try {
      fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
      console.log("🧹 Cleaned up old test directories.");
    } catch (e) {
      console.warn("⚠️ Warning: Failed to fully clean old test registry:", e.message);
    }
  }
}

function assertExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Assertion failed: File/Folder does not exist at: ${filePath}`);
  }
  console.log(`  ✓ Verified: ${path.basename(filePath)} exists.`);
}

function assertNotExists(filePath) {
  if (fs.existsSync(filePath)) {
    throw new Error(`Assertion failed: File/Folder unexpectedly exists at: ${filePath}`);
  }
  console.log(`  ✓ Verified: ${path.basename(filePath)} does not exist.`);
}

async function run() {
  console.log("=====================================================");
  console.log("   Running Blueprint E2E Sandbox Scaffolding Tests   ");
  console.log("=====================================================\n");

  cleanup();
  
  if (!fs.existsSync(SCRATCH_DIR)) {
    fs.mkdirSync(SCRATCH_DIR, { recursive: true });
  }

  const blueprintPath = path.join(SCRATCH_DIR, 'test_blueprint_team.json');
  const targetProjectDir = path.join(TEST_OUTPUT_DIR, 'web-automated-team');

  // 1. Synthesize multi-skill team blueprint JSON
  const blueprintContent = {
    projectName: targetProjectDir,
    coordinationRules: "DMCP Coordinated Greenfield flow",
    skills: [
      {
        name: "web-pm",
        archetype: "pm",
        description: "Coordinated Product Backlog Management",
        language: "js"
      },
      {
        name: "web-db",
        archetype: "architect",
        description: "DDL SQL Topologically Sorted Schema specs",
        language: "default"
      },
      {
        name: "web-scanner",
        archetype: "auditor",
        description: "Static scanners and secrets exclusions scanner",
        language: "py"
      }
    ]
  };

  console.log("💾 Step 1: Writing mock coordinated team blueprint JSON...");
  fs.writeFileSync(blueprintPath, JSON.stringify(blueprintContent, null, 2), 'utf-8');
  assertExists(blueprintPath);

  // 2. Execute CLI with --blueprint
  console.log("\n🚀 Step 2: Executing CLI with --blueprint flag...");
  try {
    const cmd = `node "${path.resolve(__dirname, '../cli_bin/cli.js')}" --blueprint "${blueprintPath}"`;
    console.log(`  Running: ${cmd}`);
    
    // We redirect process env to isolate global registry file
    const output = execSync(cmd, { 
      env: { ...process.env, AGY_GEN_TEST_DIR: REGISTRY_DIR },
      encoding: 'utf-8' 
    });
    console.log("  [CLI Output]:\n" + output.split('\n').map(l => `    > ${l}`).join('\n'));
  } catch (err) {
    console.error("🔴 CLI execution failed:", err.message);
    throw err;
  }

  // 3. Assert Scaffolding Structure correctness
  console.log("\n🔍 Step 3: Asserting file system structure correctness...");
  assertExists(targetProjectDir);

  // A. Product Manager Skill (web-pm, Node.js runtime)
  const pmDir = path.join(targetProjectDir, 'skills/web-pm');
  console.log("  Asserting PM Skill folder...");
  assertExists(path.join(pmDir, 'SKILL.md'));
  assertExists(path.join(pmDir, 'lessons_index.md'));
  assertExists(path.join(pmDir, 'playbook.md'));
  assertExists(path.join(pmDir, 'scripts/security_check.js'));
  assertExists(path.join(pmDir, '.github/workflows/security_scan.yml'));

  // B. Architect Skill (web-db, Agnostic Default runtime - non-coding)
  const dbDir = path.join(targetProjectDir, 'skills/web-db');
  console.log("  Asserting Architect Skill folder...");
  assertExists(path.join(dbDir, 'SKILL.md'));
  assertExists(path.join(dbDir, 'lessons_index.md'));
  assertExists(path.join(dbDir, 'playbook.md'));
  assertNotExists(path.join(dbDir, 'scripts/security_check.js')); // Architect has no verifiers by default
  assertExists(path.join(dbDir, '.github/workflows/security_scan.yml'));

  // C. Security Auditor Skill (web-scanner, Python runtime, Custom Exclusions)
  const scanDir = path.join(targetProjectDir, 'skills/web-scanner');
  console.log("  Asserting Security Auditor Skill folder...");
  assertExists(path.join(scanDir, 'SKILL.md'));
  assertExists(path.join(scanDir, 'lessons_index.md'));
  assertExists(path.join(scanDir, 'playbook.md'));
  assertExists(path.join(scanDir, 'scripts/security_check.py'));
  assertExists(path.join(scanDir, 'gitleaks.toml')); // Exclusions scaffolded!
  assertExists(path.join(scanDir, 'trivy.yaml'));     // Exclusions scaffolded!
  assertExists(path.join(scanDir, '.github/workflows/security_scan.yml'));

  // D. Assert Registry catalog database registration
  console.log("  Asserting global registry catalogs...");
  const registryDb = path.join(REGISTRY_DIR, 'skills_index.json');
  assertExists(registryDb);
  const registryContent = JSON.parse(fs.readFileSync(registryDb, 'utf8'));
  const names = registryContent.skills.map(s => s.name);
  if (!names.includes('web-pm') || !names.includes('web-db') || !names.includes('web-scanner')) {
    throw new Error(`Registry catalog does not contain all scaffolded team skills: ${names.join(', ')}`);
  }
  console.log("  ✓ All 3 team skills registered in registry database index!");

  // 4. Test Overwrite Protection (Safety Protocol)
  console.log("\n🔒 Step 4: Running CLI again without --force to test Overwrite Protection...");
  try {
    const cmd = `node "${path.resolve(__dirname, '../cli_bin/cli.js')}" --blueprint "${blueprintPath}"`;
    execSync(cmd, { 
      env: { ...process.env, AGY_GEN_TEST_DIR: REGISTRY_DIR },
      stdio: 'ignore' 
    });
    throw new Error("Safety breach: CLI should have exited with code 1 on directory overwrite attempt!");
  } catch (err) {
    if (err.status !== 1) {
      throw new Error(`Expected exit status 1 on overwrite abort, but got: ${err.status}`);
    }
    console.log("  ✓ Overwrite protection successfully caught collision and aborted safely with Exit Code 1!");
  }

  // 5. Test Force Override Option
  console.log("\n⚡ Step 5: Running CLI again WITH --force override flag...");
  try {
    const cmd = `node "${path.resolve(__dirname, '../cli_bin/cli.js')}" --blueprint "${blueprintPath}" --force`;
    execSync(cmd, { 
      env: { ...process.env, AGY_GEN_TEST_DIR: REGISTRY_DIR },
      stdio: 'ignore' 
    });
    console.log("  ✓ Force override executed and rebuilt target folders cleanly!");
  } catch (err) {
    console.error("🔴 Force override failed:", err.message);
    throw err;
  }

  // 6. Cleanup
  console.log("\n🧹 Step 6: Cleaning up E2E test footprints...");
  if (fs.existsSync(blueprintPath)) {
    fs.unlinkSync(blueprintPath);
    console.log("  ✓ Removed temporary blueprint JSON.");
  }
  cleanup();

  console.log("\n=====================================================");
  console.log("🎉 E2E Sandbox Blueprint Scaffolding Tests Passed perfectly!");
  console.log("=====================================================");
}

run().catch(err => {
  console.error("E2E Test execution failed:", err);
  process.exit(1);
});
