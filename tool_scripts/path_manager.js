import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

/**
 * Automates system PATH injection for the custom Antigravity bin directory on Windows.
 * Operates entirely in user-space (zero sudo / zero elevated admin rights).
 */
export function syncSystemPath() {
  if (process.platform === 'win32') {
    const winBinDir = path.resolve(os.homedir(), '.gemini/config/bin');
    if (!fs.existsSync(winBinDir)) {
      fs.mkdirSync(winBinDir, { recursive: true });
    }

    try {
      // Fetch User-level PATH from Registry
      const getPathCmd = `[Environment]::GetEnvironmentVariable('Path', 'User')`;
      const currentPath = execSync(`powershell -Command "${getPathCmd}"`, { encoding: 'utf8' }).trim();
      
      if (!currentPath.includes(winBinDir)) {
        console.log(`\n⚙️ Appending ${winBinDir} to Windows User PATH environment variable...`);
        const newPath = `${currentPath};${winBinDir}`.replace(/;;/g, ';');
        const setPathCmd = `[Environment]::SetEnvironmentVariable('Path', '${newPath}', 'User')`;
        execSync(`powershell -Command "${setPathCmd}"`, { stdio: 'ignore' });
        console.log(`  🟢 Windows User PATH updated successfully! Changes will take effect in new terminals.`);
      }
    } catch (err) {
      console.warn(`  ⚠️ Could not automate Windows PATH update: ${err.message}`);
    }
  }
}
