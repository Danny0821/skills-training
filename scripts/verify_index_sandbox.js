/**
 * verify_index_sandbox.js
 * 
 * End-to-end integration test validating the agy-gen index CLI commands
 * (--list, --search, --scan) inside a simulated sandbox project workspace.
 * 
 * Generates its own fresh test fixtures at runtime to remain 100% self-contained.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scaffoldSkill } from './generate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target test registry and source sandbox folders
const SANDBOX_REGISTRY_DIR = path.resolve(__dirname, '../output_test/autolearner-test-workspace/sandbox-registry');
const SOURCE_SANDBOX_DIR = path.resolve(__dirname, '../output_test/autolearner-test-workspace/sandbox-project');
const CLI_PATH = path.resolve(__dirname, '../bin/cli.js');

function cleanRegistry() {
  if (fs.existsSync(SANDBOX_REGISTRY_DIR)) {
    fs.rmSync(SANDBOX_REGISTRY_DIR, { recursive: true, force: true });
  }
  if (fs.existsSync(SOURCE_SANDBOX_DIR)) {
    fs.rmSync(SOURCE_SANDBOX_DIR, { recursive: true, force: true });
  }
}

function runCommandWithEnv(args) {
  return execSync(`node "${CLI_PATH}" ${args}`, {
    env: {
      ...process.env,
      AGY_GEN_TEST_DIR: SANDBOX_REGISTRY_DIR
    },
    encoding: 'utf8'
  });
}

function runSandboxVerification() {
  console.log("=====================================================");
  console.log("     Starting E2E Sandbox Registry Verification       ");
  console.log("=====================================================\n");

  try {
    cleanRegistry();

    // 0. Setup fresh sandbox workspace with mock skills
    console.log("🛠️ Preparing fresh sandbox workspace...");
    fs.mkdirSync(SOURCE_SANDBOX_DIR, { recursive: true });

    scaffoldSkill({
      name: 'file-security-scanner',
      description: 'Scan files for credentials and toxic shell commands.',
      tags: 'security, files, audit',
      targetDir: path.join(SOURCE_SANDBOX_DIR, 'file-security-scanner')
    });

    scaffoldSkill({
      name: 'git-branch-naming-validator',
      description: 'Verify local Git branch names comply with repository conventions.',
      tags: 'git, branch, validation',
      targetDir: path.join(SOURCE_SANDBOX_DIR, 'git-branch-naming-validator')
    });

    console.log("\n✓ Mock skills scaffolded successfully.\n");

    // 1. Initial Empty List check
    console.log("🧪 Step 1: Listing empty registry...");
    const initialList = runCommandWithEnv('--list');
    if (!initialList.includes('No skills registered yet')) {
      throw new Error(`Expected empty warning, got: ${initialList}`);
    }
    console.log("  ✓ Initial list verified empty.");

    // 2. Scan sandbox projects
    console.log("\n🧪 Step 2: Scanning sandbox workspace recursively...");
    const scanOutput = runCommandWithEnv(`--scan "${SOURCE_SANDBOX_DIR}"`);
    console.log(scanOutput);
    
    if (!scanOutput.includes('Scan completed successfully!') || !scanOutput.includes('Registered 2 new skill(s)')) {
      throw new Error("Scan execution did not register the expected 2 sandbox skills.");
    }
    console.log("  ✓ Directory scan successfully parsed and indexed both sandbox skills.");

    // 3. Search matching skill
    console.log("\n🧪 Step 3: Searching for registered 'branch' skill...");
    const searchBranch = runCommandWithEnv('--search branch');
    console.log(searchBranch);

    if (!searchBranch.includes('git-branch-naming-validator') || !searchBranch.includes('Found: 1 matching skill(s)')) {
      throw new Error(`Fuzzy search for 'branch' failed. Output: ${searchBranch}`);
    }
    console.log("  ✓ Fuzzy search correctly discovered matching branch-validator.");

    // 4. Search matching skill by tag
    console.log("\n🧪 Step 4: Searching by tag 'security'...");
    const searchSecurity = runCommandWithEnv('--search security');
    console.log(searchSecurity);

    if (!searchSecurity.includes('file-security-scanner') || !searchSecurity.includes('Found: 1 matching skill(s)')) {
      throw new Error(`Fuzzy search for tag 'security' failed. Output: ${searchSecurity}`);
    }
    console.log("  ✓ Tag fuzzy search successfully discovered security scanner.");

    // 5. Complete list check
    console.log("\n🧪 Step 5: Listing all registered skills...");
    const finalList = runCommandWithEnv('--list');
    console.log(finalList);

    if (!finalList.includes('file-security-scanner') || !finalList.includes('git-branch-naming-validator')) {
      throw new Error("Complete listing did not report both skills.");
    }
    console.log("  ✓ Registry list displays catalog correctly.");

    // 6. Local-Only Scaffolding E2E Check
    console.log("\n🧪 Step 6: Scaffolding local-only skill...");
    scaffoldSkill({
      name: 'local-only-mock',
      description: 'A mock skill kept strictly local.',
      tags: 'local, mock',
      targetDir: path.join(SOURCE_SANDBOX_DIR, 'local-only-mock'),
      localOnly: true
    });
    
    // Assert it does NOT appear in index list
    const postLocalList = runCommandWithEnv('--list');
    if (postLocalList.includes('local-only-mock')) {
      throw new Error("Local-only skill was unexpectedly registered in the global index.");
    }
    console.log("  ✓ Local-only skill scaffolding correctly bypassed global catalog indexing.");

    // 7. E2E Unregistration Check
    console.log("\n🧪 Step 7: Unregistering skill via CLI...");
    const removeOutput = runCommandWithEnv('--remove file-security-scanner');
    console.log(removeOutput);

    if (!removeOutput.includes('Successfully unregistered skill "file-security-scanner"')) {
      throw new Error(`Unregistration command failed. Output: ${removeOutput}`);
    }

    // Verify it is gone from the list
    const postRemoveList = runCommandWithEnv('--list');
    console.log(postRemoveList);
    if (postRemoveList.includes('file-security-scanner')) {
      throw new Error("Skill was not removed from list after unregistering.");
    }
    if (!postRemoveList.includes('git-branch-naming-validator')) {
      throw new Error("Unrelated skill was lost during unregistration.");
    }
    console.log("  ✓ E2E unregistration successfully removed the target skill.");

    console.log("\n=====================================================");
    console.log("🎉 E2E Sandbox Registry Verification passed perfectly!");
    console.log("=====================================================");

    cleanRegistry();
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Sandbox E2E Verification failed: ${err.message}`);
    cleanRegistry();
    process.exit(1);
  }
}

runSandboxVerification();
