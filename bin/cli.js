#!/usr/bin/env node

/**
 * Antigravity 2.0 Scaffolder Binary Entry Point
 * 
 * Invokes the modular generator logic from scripts/generate.js.
 * Ensures robust relative path resolution when running globally or via npx.
 * 
 * Strict Philosophy:
 * - High-quality, robust, fully-commented code logic (Code quality firewall).
 * - Zero external dependencies.
 */

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generatePath = path.resolve(__dirname, '../scripts/generate.js');

// Dynamically import generate.js and run its exported main function
import(generatePath).then((module) => {
  if (module.main) {
    module.main();
  } else {
    throw new Error("main() entry point function not exported in scripts/generate.js.");
  }
}).catch((err) => {
  console.error("🔴 Failed to launch Antigravity Generator CLI:", err.message);
  process.exit(1);
});
