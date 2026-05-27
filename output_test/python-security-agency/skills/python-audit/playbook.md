# playbook.md — python-audit Playbook

> [!NOTE]
> Deep technical knowledge base. Solutions, code blocks, workarounds.
> Link back to lessons_index.md using tag anchors.

---

## [OS_SYNTAX_01] Linux vs Windows Shell commands mismatch
- **Issue**: executing `ls`, `rm`, `grep` fails on Windows standard shell.
- **Cause**: PowerShell or CMD uses different command aliases and argument flags.
- **Fix**: Use Node's built-in platform checks (`os.platform()`) or use standard Javascript modules (`fs`) instead of child processes.
- **Code Workaround**:
  ```javascript
  import os from 'os';
  const isWindows = os.platform() === 'win32';
  const command = isWindows ? 'dir' : 'ls';
  ```

---

## [CRED_SAFETY_01] Attempting to commit plain text API keys
- **Issue**: Hardcoded API keys caught by pre-commit or security scanner.
- **Cause**: Storing keys in configuration or files for quick convenience.
- **Fix**: Move all secrets to `.env` file, add `.env` to `.gitignore`. Load keys using `process.env.MY_SECRET_KEY`.
- **Code Workaround**:
  ```javascript
  import dotenv from 'dotenv';
  dotenv.config();
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error('Missing API_KEY in process.env');
  ```

---

## [ENV_PATH_01] Directory slashes broken on target system
- **Issue**: Path concatenation with raw slashes (e.g. `dir + '/' + file`) fails or parses incorrectly.
- **Cause**: Windows uses backslashes `\`, Linux/macOS uses forward slashes `/`.
- **Fix**: Always import Node's `path` library. Use `path.join()` or `path.resolve()`.
- **Code Workaround**:
  ```javascript
  import path from 'path';
  const target = path.join(dir, file);
  ```

---

## [CLI_INPUT_01] Readline streams not closing on exit
- **Issue**: Node CLI script hangs or remains active after input loop terminates.
- **Cause**: Active readline interface stream keeps the Node event loop alive.
- **Fix**: Explicitly call `rl.close()` at the end of the input loop.
- **Code Workaround**:
  ```javascript
  const rl = readline.createInterface({ input, output });
  rl.question('Query: ', (answer) => {
    // Process answer
    rl.close();
  });
  ```
