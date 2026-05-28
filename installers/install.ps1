# Antigravity 2.0 Global Command Installer (PowerShell)
# 
# Install globally by running this one-liner in your PowerShell terminal:
# irm https://raw.githubusercontent.com/Daniel/antigravity-generator/master/installers/install.ps1 | iex

$ErrorActionPreference = "Stop"

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "    Installing Antigravity Scaffolder System-Wide CLI    " -ForegroundColor Cyan
Write-Host "=========================================================\n" -ForegroundColor Cyan

try {
    # 1. Environment Verification
    Write-Host "Step 1: Checking environment prerequisites..." -ForegroundColor Yellow
    
    # Verify Node.js
    try {
        $nodeVer = & node -v 2>$null
        Write-Host "  ✓ Node.js detected: $nodeVer" -ForegroundColor Green
    } catch {
        Write-Error "Node.js is required to execute generated scripts but was not detected. Please install Node.js (>=18.0.0) from https://nodejs.org/"
    }

    # Verify Git
    try {
        $gitVer = & git --version 2>$null
        Write-Host "  ✓ Git detected: $gitVer" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️ Git was not detected. You can still use the scaffolder, but npx installation requires Git." -ForegroundColor DarkYellow
    }

    # 2. Resolve target directories
    Write-Host "`nStep 2: Resolving global directories..." -ForegroundColor Yellow
    $globalConfigBase = Join-Path $Home ".gemini\config"
    $globalSkillsBase = Join-Path $globalConfigBase "skills"

    if (-not (Test-Path $globalSkillsBase)) {
        Write-Host "  Creating global skills directory at: $globalSkillsBase" -ForegroundColor Gray
        New-Item -ItemType Directory -Force -Path $globalSkillsBase | Out-Null
    }
    $targetPath = Join-Path $globalSkillsBase "generate.md"

    # 3. Source manifest deployment
    Write-Host "`nStep 3: Deploying /generate command manifest..." -ForegroundColor Yellow
    
    # Check if we are running inside the local repository
    $localManifest = Join-Path $PSScriptRoot "../.agent/skills/generate.md"
    if (Test-Path $localManifest) {
        Write-Host "  ✓ Local workspace manifest detected. Deploying local copy." -ForegroundColor Green
        Copy-Item -Path $localManifest -Destination $targetPath -Force
    } else {
        # Fetch from remote GitHub raw repository
        $githubRawUrl = "https://raw.githubusercontent.com/Daniel/antigravity-generator/master/.agent/skills/generate.md"
        Write-Host "  Fetching manifest from GitHub repository..." -ForegroundColor Gray
        
        # Use TLS 1.2/1.3 for secure download
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $githubRawUrl -OutFile $targetPath -UseBasicParsing
        Write-Host "  ✓ Successfully fetched from GitHub raw." -ForegroundColor Green
    }

    Write-Host "`n=========================================================" -ForegroundColor Green
    Write-Host "🟢 Success! System-wide registration complete." -ForegroundColor Green
    Write-Host "📂 Global Command Location: $targetPath" -ForegroundColor Gray
    Write-Host "`n✨ The native slash command is now active globally!" -ForegroundColor Green
    Write-Host "👉 You can now type '/generate' in ANY workspace directory on this system." -ForegroundColor Green
    Write-Host "=========================================================" -ForegroundColor Green

} catch {
    Write-Host "`n🔴 Installation failed: $_" -ForegroundColor Red
    Exit 1
}
