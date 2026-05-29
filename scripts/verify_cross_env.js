import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PACKAGE_ROOT = path.resolve(__dirname, '..');

console.log("=====================================================");
console.log("      Running Windows E2E Global Launcher Tests      ");
console.log("=====================================================\n");

try {
  // 1. Run the global installer to compile and copy launchers
  console.log("🚀 Executing global command installer...");
  execSync(`node "${path.join(PACKAGE_ROOT, 'scripts/install_global.js')}"`, { stdio: 'inherit' });

  // 2. Assertions for Windows Host
  if (process.platform === 'win32') {
    console.log("\n🔍 Running Windows host assertions...");

    // Define the Quad-Path sync target list
    const globalSkillsDirs = [
      path.resolve(os.homedir(), '.gemini/skills'),
      path.resolve(os.homedir(), '.gemini/antigravity/skills'),
      path.resolve(os.homedir(), '.gemini/antigravity-cli/skills'),
      path.resolve(os.homedir(), '.gemini/config/skills')
    ];

    // Assert that the command manifests exist in all 4 global paths
    globalSkillsDirs.forEach(dir => {
      const commandFile = path.join(dir, 'generate.md');
      const interviewDir = path.join(dir, 'agentic-interviewer');

      if (!fs.existsSync(commandFile)) {
        throw new Error(`🔴 Failed: Manifest missing in directory ${dir}!`);
      }
      if (!fs.existsSync(interviewDir)) {
        throw new Error(`🔴 Failed: Interviewer folder missing in directory ${dir}!`);
      }
      console.log(`  ✓ Manifests successfully synchronized inside: ${dir}`);
    });

    // Assert Windows Local launcher files exist
    const winBinDir = path.resolve(os.homedir(), '.gemini/config/bin');
    const cmdLauncher = path.join(winBinDir, 'antigravity-gen.cmd');
    const ps1Launcher = path.join(winBinDir, 'antigravity-gen.ps1');

    if (!fs.existsSync(cmdLauncher) || !fs.existsSync(ps1Launcher)) {
      throw new Error("🔴 Failed: Windows cmd/ps1 launcher files are missing!");
    }
    console.log("  ✓ Windows local launcher binary executables exist.");
  } else {
    console.log("⚠️ Platform is not win32, skipping Windows E2E assertions.");
  }

  console.log("\n=====================================================");
  console.log("🎉 All Windows E2E Global Launcher Tests Passed!");
  console.log("=====================================================\n");
  process.exit(0);

} catch (err) {
  console.error(`\n❌ Test failed: ${err.message}`);
  process.exit(1);
}
