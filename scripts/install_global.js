/**
 * Antigravity 2.0 Global Command Installer
 * 
 * Copies the slash command skill definitions to all standard global
 * Antigravity configuration directories, enabling system-wide access on Windows.
 * 
 * Strict Philosophy:
 * - High-quality, robust, fully-commented code logic (Code quality firewall).
 * - Zero external dependencies.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { syncSystemPath } from './path_manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PACKAGE_ROOT = path.resolve(__dirname, '..');

// Target potential global configuration folders for Antigravity on Windows (Quad-Path Sync)
const GLOBAL_SKILLS_DIRS = [
  path.resolve(os.homedir(), '.gemini/skills'),
  path.resolve(os.homedir(), '.gemini/antigravity/skills'),
  path.resolve(os.homedir(), '.gemini/antigravity-cli/skills'),
  path.resolve(os.homedir(), '.gemini/config/skills')
];

// Target global bin directory for Windows launchers
const GLOBAL_BIN_DIR = path.resolve(os.homedir(), '.gemini/config/bin');

// Source paths relative to package root (supports npx and local runs)
const LOCAL_COMMAND_PATH = path.join(PACKAGE_ROOT, '.agent/skills/generate.md');
const LOCAL_INTERVIEW_PATH = path.join(PACKAGE_ROOT, '.agent/skills/agentic-interviewer');

/**
 * Recursively copies a directory to a target destination in zero-dependency Node.js.
 */
function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach(file => {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  });
}

/**
 * Safely copies the local slash command skill definitions to global user configuration.
 */
function installGlobally() {
  console.log("=========================================================");
  console.log("   Installing Antigravity Scaffolder System-Wide CLI   ");
  console.log("=========================================================\n");

  try {
    // 1. Verify local source files exist
    if (!fs.existsSync(LOCAL_COMMAND_PATH)) {
      throw new Error(`Source command manifest not found at ${LOCAL_COMMAND_PATH}.\nPlease ensure you run this script from the workspace root.`);
    }
    if (!fs.existsSync(LOCAL_INTERVIEW_PATH)) {
      throw new Error(`Source interviewer folder not found at ${LOCAL_INTERVIEW_PATH}.`);
    }

    // 2. Synchronize to all potential native slash command folders (Quad-Path Sync)
    console.log("📁 Syncing slash command manifests to native global folders...");
    GLOBAL_SKILLS_DIRS.forEach(dir => {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Copy /generate manifest
        const targetCommandPath = path.join(dir, 'generate.md');
        fs.copyFileSync(LOCAL_COMMAND_PATH, targetCommandPath);
        
        // Copy /agy-interview & /grill-blueprint manifest folder
        const targetInterviewPath = path.join(dir, 'agentic-interviewer');
        if (fs.existsSync(targetInterviewPath)) {
          fs.rmSync(targetInterviewPath, { recursive: true, force: true });
        }
        copyFolderRecursiveSync(LOCAL_INTERVIEW_PATH, targetInterviewPath);

        console.log(`  🟢 Synced to: ${dir}`);
      } catch (dirErr) {
        console.warn(`  ⚠️ Could not write to directory ${dir}: ${dirErr.message}`);
      }
    });

    // 3. Compile and write local Windows launcher files
    if (process.platform === 'win32') {
      console.log("\n🚀 Compiling native Windows CLI launcher executables...");
      if (!fs.existsSync(GLOBAL_BIN_DIR)) {
        fs.mkdirSync(GLOBAL_BIN_DIR, { recursive: true });
      }

      const cliPath = path.join(PACKAGE_ROOT, 'bin/cli.js');
      const cmdLauncherContent = `@echo off\nnode "${cliPath}" %*`;
      const ps1LauncherContent = `node "${cliPath}" $args`;

      fs.writeFileSync(path.join(GLOBAL_BIN_DIR, 'antigravity-gen.cmd'), cmdLauncherContent, 'utf8');
      fs.writeFileSync(path.join(GLOBAL_BIN_DIR, 'antigravity-gen.ps1'), ps1LauncherContent, 'utf8');
      console.log(`  🟢 Windows CLI Launchers compiled inside: ${GLOBAL_BIN_DIR}`);

      // Run native Windows PATH registration
      try {
        syncSystemPath();
      } catch (pathErr) {
        console.warn(`  ⚠️ Windows PATH sync failed: ${pathErr.message}`);
      }
    }

    console.log(`\n🟢 Success! System-wide registration complete.`);
    console.log("\n✨ The native slash commands are now active globally!");
    console.log("👉 You can now type `/generate`, `/agy-interview`, or `/grill-blueprint` inside your Windows agy client.");
    console.log("=========================================================");
  } catch (err) {
    console.error(`\n🔴 Installation failed: ${err.message}`);
    process.exit(1);
  }
}

installGlobally();
