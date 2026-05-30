/**
 * Antigravity 2.0 Global Command Uninstaller
 * 
 * Safely removes all globally synchronized slash command definitions
 * and compiled Windows CLI launchers from the host system.
 * 
 * Strict Philosophy:
 * - High-quality, robust, fully-commented code logic.
 * - Zero external dependencies.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

// Target potential global configuration folders for Antigravity on Windows (Quad-Path Sync)
const GLOBAL_SKILLS_DIRS = [
  path.resolve(os.homedir(), '.gemini/skills'),
  path.resolve(os.homedir(), '.gemini/antigravity/skills'),
  path.resolve(os.homedir(), '.gemini/antigravity-cli/skills'),
  path.resolve(os.homedir(), '.gemini/config/skills')
];

// Target global bin directory for Windows launchers
const GLOBAL_BIN_DIR = path.resolve(os.homedir(), '.gemini/config/bin');

function uninstallGlobally() {
  console.log("=========================================================");
  console.log("   Uninstalling Antigravity Scaffolder System-Wide CLI   ");
  console.log("=========================================================\n");

  try {
    // 1. Clean up slash command folders
    console.log("📁 Purging global slash command manifests...");
    GLOBAL_SKILLS_DIRS.forEach(dir => {
      try {
        if (fs.existsSync(dir)) {
          // Remove /generate folder
          const commandDir = path.join(dir, 'generate');
          if (fs.existsSync(commandDir)) {
            fs.rmSync(commandDir, { recursive: true, force: true });
            console.log(`  ✓ Removed generate from: ${dir}`);
          }
          
          // Remove /agentic-interviewer folder
          const interviewDir = path.join(dir, 'agentic-interviewer');
          if (fs.existsSync(interviewDir)) {
            fs.rmSync(interviewDir, { recursive: true, force: true });
            console.log(`  ✓ Removed agentic-interviewer from: ${dir}`);
          }

          // Remove /grill-blueprint folder
          const blueprintDir = path.join(dir, 'grill-blueprint');
          if (fs.existsSync(blueprintDir)) {
            fs.rmSync(blueprintDir, { recursive: true, force: true });
            console.log(`  ✓ Removed grill-blueprint from: ${dir}`);
          }
        }
      } catch (dirErr) {
        console.warn(`  ⚠️ Warning: Could not clean folder ${dir}: ${dirErr.message}`);
      }
    });

    // 2. Remove Windows CLI launchers
    if (fs.existsSync(GLOBAL_BIN_DIR)) {
      console.log("\n🚀 Purging compiled Windows CLI launcher executables...");
      
      const cmdLauncher = path.join(GLOBAL_BIN_DIR, 'antigravity-gen.cmd');
      if (fs.existsSync(cmdLauncher)) {
        fs.unlinkSync(cmdLauncher);
        console.log("  ✓ Removed antigravity-gen.cmd launcher.");
      }

      const ps1Launcher = path.join(GLOBAL_BIN_DIR, 'antigravity-gen.ps1');
      if (fs.existsSync(ps1Launcher)) {
        fs.unlinkSync(ps1Launcher);
        console.log("  ✓ Removed antigravity-gen.ps1 launcher.");
      }
    }

    console.log(`\n🟢 Success! System-wide cleanup complete.`);
    console.log("=========================================================");
  } catch (err) {
    console.error(`\n🔴 Uninstallation failed: ${err.message}`);
    process.exit(1);
  }
}

setTimeout(uninstallGlobally, 500);
