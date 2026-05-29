# playbook.md — {{NAME}} Playbook

> [!NOTE]
> Python deep technical knowledge base. Solutions, code blocks, workarounds.
> Link back to lessons_index.md using tag anchors.

---

## [OS_SYNTAX_01] Linux vs Windows subprocess execution in Python
- **Issue**: executing child process commands fails on Windows host.
- **Cause**: Shell environment flags not passed to subprocess module.
- **Fix**: Set `shell=True` on Windows or check standard platform module using `sys.platform`.
- **Code Workaround**:
  ```python
  import sys
  import subprocess
  is_windows = sys.platform == "win32"
  subprocess.run(["dir" if is_windows else "ls"], shell=is_windows)
  ```

---

## [CRED_SAFETY_01] Attempting to commit plain text API keys in Python
- **Issue**: Plaintext API keys caught by scanner.
- **Cause**: Raw assignment of sensitive credentials in code.
- **Fix**: Move to env file. In Python, load securely using `os.environ` or `os.getenv`.
- **Code Workaround**:
  ```python
  import os
  from dotenv import load_dotenv
  load_dotenv()
  api_key = os.getenv("API_KEY")
  if not api_key:
      raise ValueError("Missing API_KEY in environment variables")
  ```

---

## [ENV_PATH_01] Directory slashes broken on target system in Python
- **Issue**: Path concatenation failures on Windows.
- **Cause**: Raw slash manipulations.
- **Fix**: Import Python's built-in `pathlib` module and concatenate using standard `/` operators.
- **Code Workaround**:
  ```python
  from pathlib import Path
  target_path = Path(dir_name) / file_name
  ```

---

## [TEST_RUNNER_01] pytest module importing failures
- **Issue**: pytest module not found or import references fail.
- **Cause**: Missing active virtual environment (venv) or incorrect python sys path references.
- **Fix**: Activate python environment, execute pytest via module runner `python -m pytest`.
- **Code Workaround**:
  ```bash
  python -m pytest tests/
  ```
