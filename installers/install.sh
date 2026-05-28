#!/usr/bin/env bash

# Antigravity 2.0 Global Command Installer (Bash)
# 
# Install globally by running this one-liner in your terminal:
# curl -fsSL https://raw.githubusercontent.com/Daniel/antigravity-generator/master/installers/install.sh | bash

set -e

# Color variables for rich logging
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}=========================================================${NC}"
echo -e "${CYAN}    Installing Antigravity Scaffolder System-Wide CLI    ${NC}"
echo -e "${CYAN}=========================================================\n${NC}"

# 1. Environment Verification
echo -e "${YELLOW}Step 1: Checking environment prerequisites...${NC}"

# Verify Node.js
if command -v node >/dev/null 2>&1; then
    nodeVer=$(node -v)
    echo -e "  ✓ Node.js detected: ${GREEN}$nodeVer${NC}"
else
    echo -e "  ${RED}🔴 Node.js is required but was not detected. Please install Node.js (>=18.0.0).${NC}"
    exit 1
fi

# Verify Git
if command -v git >/dev/null 2>&1; then
    gitVer=$(git --version)
    echo -e "  ✓ Git detected: ${GREEN}$gitVer${NC}"
else
    echo -e "  ${YELLOW}⚠️ Git was not detected. Local command cloning is still active but remote npx requires Git.${NC}"
fi

# 2. Resolve target directories
echo -e "\n${YELLOW}Step 2: Resolving global directories...${NC}"
GLOBAL_CONFIG_BASE="$HOME/.gemini/config"
GLOBAL_SKILLS_BASE="$GLOBAL_CONFIG_BASE/skills"

if [ ! -d "$GLOBAL_SKILLS_BASE" ]; then
    echo -e "  Creating global skills directory at: $GLOBAL_SKILLS_BASE"
    mkdir -p "$GLOBAL_SKILLS_BASE"
fi
TARGET_PATH="$GLOBAL_SKILLS_BASE/generate.md"

# 3. Source manifest deployment
echo -e "\n${YELLOW}Step 3: Deploying /generate command manifest...${NC}"

# Check if we are running inside the local repository
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LOCAL_MANIFEST="$SCRIPT_DIR/../.agent/skills/generate.md"

if [ -f "$LOCAL_MANIFEST" ]; then
    echo -e "  ✓ Local workspace manifest detected. Deploying local copy."
    cp "$LOCAL_MANIFEST" "$TARGET_PATH"
else
    # Fetch from remote GitHub raw repository
    GITHUB_RAW_URL="https://raw.githubusercontent.com/Daniel/antigravity-generator/master/.agent/skills/generate.md"
    echo -e "  Fetching manifest from GitHub repository..."
    curl -fsSL "$GITHUB_RAW_URL" -o "$TARGET_PATH"
    echo -e "  ✓ Successfully fetched from GitHub raw."
fi

echo -e "\n${GREEN}=========================================================${NC}"
echo -e "${GREEN}🟢 Success! System-wide registration complete.${NC}"
echo -e "📂 Global Command Location: ${NC}$TARGET_PATH"
echo -e "\n${GREEN}✨ The native slash command is now active globally!${NC}"
echo -e "${GREEN}👉 You can now type '/generate' in ANY workspace directory on this system.${NC}"
echo -e "${GREEN}=========================================================${NC}"
