#!/usr/bin/env node

/**
 * Antigravity 2.0 Scaffolder Binary Entry Point
 * 
 * Invokes the modular generator logic from scripts/generate.js
 * or delegates to scripts/index_manager.js for index lookups.
 * 
 * Strict Philosophy:
 * - High-quality, robust, fully-commented code logic (Code quality firewall).
 * - Zero external dependencies.
 */

import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';
import { loadIndex, searchSkills, scanWorkspace, unregisterSkill } from '../scripts/index_manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to print CLI help menu
function printHelp() {
  console.log(`
==================================================================
             Antigravity 2.0 CLI Tool & Skill Indexer
==================================================================
Usage: agy-gen [options]

Options:
  -l, --list             List all globally registered skills in agy-gen index
  -s, --search <term>    Fuzzy search for registered skills by name or tag
  -c, --scan <path>      Scan a directory recursively to discover and register skills
  -r, --remove <name>    Unregister a skill from global index. Add --purge to delete files.
  -h, --help             Display this help menu

If no options are specified, the interactive component generator will run.
`);
}

// Helper to print a skill entry beautifully in the console
function printSkillEntry(skill, index) {
  console.log(`------------------------------------------------------------------`);
  console.log(`[#${index + 1}] Name:        \x1b[36m${skill.name}\x1b[0m (v${skill.version})`);
  console.log(`     Path:        \x1b[90m${skill.path}\x1b[0m`);
  console.log(`     Description: ${skill.description || 'No description provided.'}`);
  if (skill.triggers && skill.triggers.length > 0) {
    console.log(`     Triggers:    \x1b[33m${skill.triggers.join(', ')}\x1b[0m`);
  }
  if (skill.tags && skill.tags.length > 0) {
    console.log(`     Tags:        \x1b[32m${skill.tags.join(', ')}\x1b[0m`);
  }
}

async function handleCommands() {
  const args = process.argv.slice(2);

  // 1. Help Command
  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  // 2. List Command
  if (args.includes('--list') || args.includes('-l')) {
    console.log("\n==================================================================");
    console.log("             Globally Registered Antigravity Skills               ");
    console.log("==================================================================");
    
    try {
      const registry = loadIndex();
      if (!registry.skills || registry.skills.length === 0) {
        console.log("\n🔍 No skills registered yet in the agy-gen global index.");
        console.log("Run the generator or scan a directory to catalog skills.");
      } else {
        registry.skills.forEach((skill, index) => printSkillEntry(skill, index));
        console.log(`------------------------------------------------------------------`);
        console.log(`Total: ${registry.skills.length} skill(s) registered.`);
      }
    } catch (err) {
      console.error("🔴 Failed to load index:", err.message);
    }
    process.exit(0);
  }

  // 3. Search Command
  const searchIndex = args.findIndex(arg => arg === '--search' || arg === '-s');
  if (searchIndex !== -1) {
    const term = args[searchIndex + 1];
    if (!term) {
      console.error("🔴 Error: Please specify a search term (e.g., agy-gen --search branch).");
      process.exit(1);
    }

    console.log(`\n🔍 Searching agy-gen index for: "${term}"...`);
    try {
      const matches = searchSkills(term);
      if (matches.length === 0) {
        console.log(`❌ No registered skills found matching query: "${term}"`);
      } else {
        matches.forEach((skill, index) => printSkillEntry(skill, index));
        console.log(`------------------------------------------------------------------`);
        console.log(`Found: ${matches.length} matching skill(s).`);
      }
    } catch (err) {
      console.error("🔴 Search failed:", err.message);
    }
    process.exit(0);
  }

  // 4. Scan Command
  const scanIndex = args.findIndex(arg => arg === '--scan' || arg === '-c');
  if (scanIndex !== -1) {
    let scanPath = args[scanIndex + 1];
    if (!scanPath) {
      scanPath = '.'; // Default to current folder
    }

    const absoluteScanPath = path.resolve(scanPath);
    if (!fs.existsSync(absoluteScanPath)) {
      console.error(`🔴 Error: Target scan folder does not exist at: ${absoluteScanPath}`);
      process.exit(1);
    }

    console.log(`\n📁 Scanning recursively for SKILL.md files: ${absoluteScanPath}...`);
    try {
      const registered = scanWorkspace(absoluteScanPath);
      console.log(`\n==================================================================`);
      console.log(`🎉 Scan completed successfully!`);
      console.log(`==================================================================`);
      if (registered.length === 0) {
        console.log("No new skills were discovered in the specified path.");
      } else {
        registered.forEach((skill, index) => {
          console.log(`  🟢 Registered: \x1b[36m${skill.name}\x1b[0m inside \x1b[90m${skill.path}\x1b[0m`);
        });
        console.log(`------------------------------------------------------------------`);
        console.log(`Success: Registered ${registered.length} new skill(s) globally.`);
      }
    } catch (err) {
      console.error("🔴 Workspace scan failed:", err.message);
    }
    process.exit(0);
  }

  // 4.5 Remove Command
  const removeIndex = args.findIndex(arg => arg === '--remove' || arg === '-r');
  if (removeIndex !== -1) {
    const name = args[removeIndex + 1];
    if (!name) {
      console.error("🔴 Error: Please specify a skill name to remove (e.g. agy-gen --remove go-senior-dev).");
      process.exit(1);
    }
    const purge = args.includes('--purge');

    try {
      console.log(`\n🗑️ Unregistering skill "${name}"...`);
      const skill = unregisterSkill(name, purge);
      console.log(`🟢 Successfully unregistered skill "${name}" from agy-gen index.`);
      if (purge) {
        console.log(`🧹 Purged skill files from folder: ${skill.path}`);
      }
    } catch (err) {
      console.error("🔴 Failed to remove skill:", err.message);
      process.exit(1);
    }
    process.exit(0);
  }

  // 5. Default Fallback: Boot up the interactive menu from scripts/generate.js
  const generatePath = path.resolve(__dirname, '../scripts/generate.js');
  const generateUrl = pathToFileURL(generatePath).href;

  import(generateUrl).then((module) => {
    if (module.main) {
      module.main();
    } else {
      throw new Error("main() entry point function not exported in scripts/generate.js.");
    }
  }).catch((err) => {
    console.error("🔴 Failed to launch Antigravity Generator CLI:", err.message);
    process.exit(1);
  });
}

handleCommands();
