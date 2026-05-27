/**
 * Antigravity 2.0 Global Command Installer
 * 
 * Copies the /generate slash command skill definition to the global
 * Antigravity configuration directory, enabling system-wide access.
 * 
 * Strict Philosophy:
 * - High-quality, robust, fully-commented code logic (Code quality firewall).
 * - Zero external dependencies.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

// Target global configurations folder for Antigravity on Windows/Linux
const GLOBAL_CONFIG_DIR = path.resolve(os.homedir(), '.gemini/config');
const GLOBAL_SKILLS_DIR = path.join(GLOBAL_CONFIG_DIR, 'skills');

// Source file in local workspace
const LOCAL_COMMAND_PATH = path.resolve(process.cwd(), '.agent/skills/generate.md');

/**
 * Safely copies the local slash command skill definition to global user configuration.
 */
function installGlobally() {
  console.log("=========================================================");
  console.log("   Installing Antigravity Scaffolder System-Wide CLI   ");
  console.log("=========================================================\n");

  try {
    // 1. Verify source file exists
    if (!fs.existsSync(LOCAL_COMMAND_PATH)) {
      throw new Error(`Source command manifest not found at ${LOCAL_COMMAND_PATH}.\nPlease ensure you run this script from the workspace root.`);
    }

    // 2. Ensure target global directory exists
    if (!fs.existsSync(GLOBAL_SKILLS_DIR)) {
      console.log(`Creating global skills folder at: ${GLOBAL_SKILLS_DIR}`);
      fs.mkdirSync(GLOBAL_SKILLS_DIR, { recursive: true });
    }

    // 3. Write file to destination
    const targetPath = path.join(GLOBAL_SKILLS_DIR, 'generate.md');
    fs.copyFileSync(LOCAL_COMMAND_PATH, targetPath);

    console.log(`\n🟢 Success! System-wide registration complete.`);
    console.log(`📂 Global Command Location: ${targetPath}`);
    console.log("\n✨ The native slash command is now active globally!");
    console.log("👉 You can now type `/generate` in ANY workspace directory on this system.");
    console.log("=========================================================");
  } catch (err) {
    console.error(`\n🔴 Installation failed: ${err.message}`);
    process.exit(1);
  }
}

installGlobally();
