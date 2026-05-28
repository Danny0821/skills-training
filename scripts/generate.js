/**
 * Antigravity 2.0 Skill, Agent, Hook, and Skill System Scaffolder
 * 
 * A premium, zero-dependency Node.js CLI to generate custom workspaces,
 * files, and self-improving autolearner loops under Windows/Linux.
 * 
 * Strict Philosophy:
 * - This code is highly structured, fully commented, and robust (Code quality firewall).
 * - Generated markdown output templates strictly follow "Caveman Style" (Token sensitive).
 * - Focuses on Security-First defaults.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { registerSkill } from './index_manager.js';

// Resolve current directory for ES modules to properly locate templates
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_DIR = path.resolve(__dirname, '../templates');

// Set up readline interface for CLI interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompts the user via CLI and returns a Promise with the input.
 * @param {string} query The question to display to the user.
 * @returns {Promise<string>} User input.
 */
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

/**
 * Hydrates template content by replacing bracket placeholders with values.
 * @param {string} content The template file contents.
 * @param {Object} replacements Mapping of placeholder name to string value.
 * @returns {string} Fully hydrated file content.
 */
function hydrateTemplate(content, replacements) {
  let hydrated = content;
  for (const [key, value] of Object.entries(replacements)) {
    // Escape special characters in key for regex matching
    const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`{{${escapedKey}}}`, 'g');
    hydrated = hydrated.replace(regex, value);
  }
  return hydrated;
}

/**
 * Safely creates a directory recursively.
 * @param {string} dirPath Folder path to create.
 */
function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Helper to scaffold the Autolearner Dual-File Protocol.
 * Creates lessons_index.md and playbook.md inside the target skill directory.
 * @param {string} targetDir Base directory of the skill.
 * @param {string} componentName Name of the component.
 */
function scaffoldAutolearner(targetDir, componentName) {
  try {
    const indexTmpl = fs.readFileSync(path.join(TEMPLATE_DIR, 'lessons_index_template.md'), 'utf-8');
    const playbookTmpl = fs.readFileSync(path.join(TEMPLATE_DIR, 'playbook_template.md'), 'utf-8');

    const replacements = { NAME: componentName };

    fs.writeFileSync(
      path.join(targetDir, 'lessons_index.md'),
      hydrateTemplate(indexTmpl, replacements),
      'utf-8'
    );
    fs.writeFileSync(
      path.join(targetDir, 'playbook.md'),
      hydrateTemplate(playbookTmpl, replacements),
      'utf-8'
    );

    console.log(`  🟢 Created Autolearner Index: lessons_index.md`);
    console.log(`  🟢 Created Autolearner Playbook: playbook.md`);
  } catch (err) {
    console.error(`  🔴 Failed to scaffold Autolearner files: ${err.message}`);
  }
}

/**
 * Scaffolds a single Skill workspace.
 * @param {Object} options Scaffolding options.
 */
export function scaffoldSkill(options) {
  const { name, description, tags, targetDir, isSubSkill = false, localOnly = false } = options;

  console.log(`\nScaffolding Skill: ${name}...`);
  ensureDirectory(targetDir);
  ensureDirectory(path.join(targetDir, 'scripts'));

  // Read skill template
  const tmplPath = path.join(TEMPLATE_DIR, 'skill_template.md');
  if (!fs.existsSync(tmplPath)) {
    throw new Error(`Template not found: ${tmplPath}`);
  }
  const template = fs.readFileSync(tmplPath, 'utf-8');

  // Format tags and playbook steps
  const tagList = tags.split(',').map(t => t.trim()).filter(Boolean).map(t => `"${t}"`).join('\n  - ');
  const defaultPlaybookSteps = `- Learn context: Read lessons_index.md for known issues.\n- Execute tasks securely.\n- Log mistakes: Write newly learned facts to lessons_index.md.`;

  // Hydrate template variables
  const hydrated = hydrateTemplate(template, {
    NAME: name,
    DESCRIPTION: description,
    TAGS: tagList,
    PLAYBOOK_STEPS: defaultPlaybookSteps
  });

  // Write SKILL.md
  fs.writeFileSync(path.join(targetDir, 'SKILL.md'), hydrated, 'utf-8');
  console.log(`  🟢 Created: SKILL.md`);

  // Create references/ and evals/ directories
  ensureDirectory(path.join(targetDir, 'references'));
  ensureDirectory(path.join(targetDir, 'evals'));

  // Write a mock security-first placeholder script under scripts/
  const mockScript = `/**
 * Verification script for ${name}
 * High-quality, robust validation.
 */
export function verifyEnvironment() {
  console.log("Verifying sandboxed execution parameters...");
  // Check for presence of credentials in env variables, ensure none are hardcoded
  if (process.env.UNEXPECTED_PLAIN_TEXT_KEY) {
    console.error("🔴 Security violation: Hardcoded API keys detected in runtime environment.");
    return false;
  }
  console.log("🟢 Environment verified. Strict credential restrictions satisfied.");
  return true;
}

verifyEnvironment();
`;
  fs.writeFileSync(path.join(targetDir, 'scripts/security_check.js'), mockScript, 'utf-8');
  console.log(`  🟢 Created: scripts/security_check.js`);

  // Scaffold evals.json
  const evalsTmplPath = path.join(TEMPLATE_DIR, 'evals_template.json');
  if (fs.existsSync(evalsTmplPath)) {
    const evalsTmpl = fs.readFileSync(evalsTmplPath, 'utf-8');
    const hydratedEvals = hydrateTemplate(evalsTmpl, { NAME: name });
    fs.writeFileSync(path.join(targetDir, 'evals/evals.json'), hydratedEvals, 'utf-8');
    console.log(`  🟢 Created: evals/evals.json`);
  }

  // Scaffold Autolearner
  scaffoldAutolearner(targetDir, name);

  // Register skill to global index
  if (!localOnly) {
    try {
      registerSkill({
        name: name,
        description: description,
        version: '0.1.0',
        triggers: [`idea: check ${name}`, `/${name}`],
        tags: tags.split(',').map(t => t.trim()).filter(Boolean)
      }, targetDir);
      console.log(`  🟢 Registered skill in agy-gen global index.`);
    } catch (indexErr) {
      console.warn(`  ⚠️ Warning: Failed to register skill in index: ${indexErr.message}`);
    }
  } else {
    console.log(`  ⚠️ Local-only mode enabled. Bypassing global registry registration.`);
  }

  console.log(`🟢 Skill [${name}] successfully scaffolded!`);
}

/**
 * Scaffolds a single Agent Hook rule.
 * @param {Object} options Scaffolding options.
 */
export function scaffoldHook(options) {
  const { name, events, filePatterns, severity, targetDir } = options;

  console.log(`\nScaffolding Agent Hook: ${name}...`);
  ensureDirectory(targetDir);

  const tmplPath = path.join(TEMPLATE_DIR, 'hook_template.md');
  if (!fs.existsSync(tmplPath)) {
    throw new Error(`Template not found: ${tmplPath}`);
  }
  const template = fs.readFileSync(tmplPath, 'utf-8');

  const defaultActionScript = `# Pre-commit safety scan to check for plaintext keys and unsafe terminal commands
echo "Executing security-first hook validations for ${name}..."
grep -rnE "[a-zA-Z0-9_-]{24,}" --exclude-dir=node_modules . && echo "🔴 Security failure: Hardcoded keys detected!" && exit 1
echo "🟢 Safety validations complete."
`;

  const hydrated = hydrateTemplate(template, {
    NAME: name,
    EVENTS: events,
    FILE_PATTERNS: filePatterns,
    SEVERITY: severity,
    ACTION_SCRIPT: defaultActionScript
  });

  const hookFileName = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_hook.md`;
  fs.writeFileSync(path.join(targetDir, hookFileName), hydrated, 'utf-8');
  console.log(`  🟢 Created Hook Rule: ${hookFileName}`);
  console.log(`🟢 Hook [${name}] successfully created under ${targetDir}!`);
}

/**
 * Scaffolds a single Agent Profile.
 * @param {Object} options Scaffolding options.
 */
export function scaffoldAgent(options) {
  const { name, description, role, allowedSkills, targetDir } = options;

  console.log(`\nScaffolding Agent Profile: ${name}...`);
  ensureDirectory(targetDir);

  const tmplPath = path.join(TEMPLATE_DIR, 'agent_template.md');
  if (!fs.existsSync(tmplPath)) {
    throw new Error(`Template not found: ${tmplPath}`);
  }
  const template = fs.readFileSync(tmplPath, 'utf-8');

  const skillList = allowedSkills.split(',').map(s => s.trim()).filter(Boolean).join('\n  - ');

  const hydrated = hydrateTemplate(template, {
    NAME: name,
    DESCRIPTION: description,
    ROLE: role,
    ALLOWED_SKILLS: skillList
  });

  fs.writeFileSync(path.join(targetDir, 'AGENT.md'), hydrated, 'utf-8');
  console.log(`  🟢 Created Agent Profile: AGENT.md`);
  console.log(`🟢 Agent [${name}] successfully created!`);
}

/**
 * Scaffolds a Coordinated Skill System / Multi-Agent Agency.
 * Generates parent manifest, maps sub-skills recursively, and coordinates shared resources.
 * @param {Object} options Scaffolding options.
 */
export async function scaffoldSkillSystem(options) {
  const { name, orchestrator, subSkillsText, targetDir, childScopes = null } = options;

  console.log(`\nScaffolding Coordinated Skill System: ${name}...`);
  ensureDirectory(targetDir);

  // Read system template
  const tmplPath = path.join(TEMPLATE_DIR, 'system_template.md');
  if (!fs.existsSync(tmplPath)) {
    throw new Error(`Template not found: ${tmplPath}`);
  }
  const template = fs.readFileSync(tmplPath, 'utf-8');

  const subSkills = subSkillsText.split(',').map(s => s.trim()).filter(Boolean);

  // Resolve scopes for each child skill (Local vs Global)
  const resolvedChildScopes = {};
  const globalConfigBase = path.resolve(os.homedir(), '.gemini/config');

  for (const childSkill of subSkills) {
    let scope = '1'; // Default: Local
    if (childScopes && childScopes[childSkill]) {
      scope = childScopes[childSkill];
    } else if (options.isInteractive) {
      console.log(`\nConfigure scope for sub-skill [${childSkill}]:`);
      console.log(`  [1] Local (inside this system's folder: ./skills/${childSkill})`);
      console.log(`  [2] Global (system-wide folder: ~/.gemini/config/skills/${childSkill})`);
      scope = (await askQuestion("Enter selection (1-2, Default: 1): ")).trim() || '1';
    }
    resolvedChildScopes[childSkill] = scope;
  }

  // Hydrate child components lists with their resolved paths
  const subSkillsList = subSkills.map(s => {
    const isGlobal = resolvedChildScopes[s] === '2';
    const linkPath = isGlobal 
      ? path.join(globalConfigBase, 'skills', s, 'SKILL.md') 
      : `./skills/${s}/SKILL.md`;
    return `- [${s}](${linkPath})`;
  }).join('\n');

  const subAgentsList = subSkills.map(s => {
    const isGlobal = resolvedChildScopes[s] === '2';
    const linkPath = isGlobal 
      ? path.join(globalConfigBase, 'agents', `${s}_agent`, 'AGENT.md') 
      : `./agents/${s}_agent/AGENT.md`;
    return `- [${s}-agent](${linkPath})`;
  }).join('\n');

  const hydrated = hydrateTemplate(template, {
    NAME: name,
    ORCHESTRATOR: orchestrator,
    SUB_SKILLS_LIST: subSkillsList,
    SUB_AGENTS_LIST: subAgentsList
  });

  // Write parent SYSTEM.md manifest
  fs.writeFileSync(path.join(targetDir, 'SYSTEM.md'), hydrated, 'utf-8');
  console.log(`  🟢 Created System Manifest: SYSTEM.md`);

  // Create local base directories
  ensureDirectory(path.join(targetDir, 'skills'));
  ensureDirectory(path.join(targetDir, 'agents'));

  // Scaffold top-level Autolearner for the whole System
  scaffoldAutolearner(targetDir, name);

  // Recursively scaffold each sub-skill
  for (const childSkill of subSkills) {
    const isGlobal = resolvedChildScopes[childSkill] === '2';
    
    const childTargetSkillDir = isGlobal 
      ? path.join(globalConfigBase, 'skills', childSkill)
      : path.join(targetDir, 'skills', childSkill);

    const childTargetAgentDir = isGlobal
      ? path.join(globalConfigBase, 'agents', `${childSkill}_agent`)
      : path.join(targetDir, 'agents', `${childSkill}_agent`);

    scaffoldSkill({
      name: childSkill,
      description: `Coordinated skill for ${childSkill} within the ${name} system.`,
      tags: `${name}, child-skill`,
      targetDir: childTargetSkillDir,
      isSubSkill: true
    });

    // Scaffold a matching specialized child Agent profile
    scaffoldAgent({
      name: `${childSkill}-agent`,
      description: `Specialized agent managing ${childSkill} capabilities.`,
      role: `${childSkill} specialist`,
      allowedSkills: childSkill,
      targetDir: childTargetAgentDir
    });
  }

  console.log(`\n🟢 Skill System [${name}] fully scaffolded with ${subSkills.length} sub-agents/skills!`);
}

/**
 * Main Interactive Scaffolding loop.
 */
export async function main() {
  console.clear();
  console.log("==================================================================");
  console.log("             Antigravity 2.0 Generator Scaffolder CLI            ");
  console.log("   Zero-Dependency Security-First, Caveman-styled Scaffolding    ");
  console.log("==================================================================\n");

  try {
    console.log("Select component type to generate:");
    console.log("  [1] Standalone Skill");
    console.log("  [2] Agent Hook / Event Rule");
    console.log("  [3] Standalone Agent Profile");
    console.log("  [4] Coordinated Skill System / Multi-Agent Agency");
    console.log("  [5] Exit\n");

    const choice = (await askQuestion("Enter selection (1-5): ")).trim();

    if (choice === '5') {
      console.log("Exiting generator. Keep coding!");
      rl.close();
      return;
    }

    const name = (await askQuestion("\nEnter component/system name (e.g. python-security): ")).trim();
    if (!name) {
      console.log("🔴 Name cannot be empty.");
      rl.close();
      return;
    }

    console.log("\nSelect target scope for the generated component:");
    console.log("  [1] Local (project workspace output directory)");
    console.log("  [2] Global (system-wide Antigravity user config directory)");
    const scopeChoice = (await askQuestion("Enter selection (1-2, Default: 1): ")).trim() || '1';

    let targetDir;
    if (scopeChoice === '2') {
      const globalConfigBase = path.resolve(os.homedir(), '.gemini/config');
      if (choice === '1' || choice === '4') {
        targetDir = path.join(globalConfigBase, 'skills', name);
      } else if (choice === '3') {
        targetDir = path.join(globalConfigBase, 'agents', name);
      } else {
        targetDir = path.join(globalConfigBase, 'skills', name); // default
      }
      console.log(`Global scope selected. Target path: ${targetDir}`);
    } else {
      const targetBase = (await askQuestion("Enter target output folder path (Default: ./output): ")).trim() || './output';
      targetDir = path.resolve(process.cwd(), targetBase, name);
    }

    switch (choice) {
      case '1': {
        const description = (await askQuestion("Enter short description: ")).trim() || "Custom Antigravity skill.";
        const tags = (await askQuestion("Enter comma-separated tags (e.g. security, python, review): ")).trim() || "general";
        const localOnlyAnswer = (await askQuestion("Explicitly keep this skill local-only (y/N)? ")).trim().toLowerCase();
        const localOnly = localOnlyAnswer === 'y' || localOnlyAnswer === 'yes';
        scaffoldSkill({ name, description, tags, targetDir, localOnly });
        break;
      }
      case '2': {
        const events = (await askQuestion("Enter triggering event (Default: pre-commit): ")).trim() || "pre-commit";
        const filePatterns = (await askQuestion("Enter target file patterns (Default: *): ")).trim() || "*";
        const severity = (await askQuestion("Enter failure severity level (block / warn / suggest): ")).trim() || "block";
        scaffoldHook({ name, events, filePatterns, severity, targetDir });
        break;
      }
      case '3': {
        const description = (await askQuestion("Enter description: ")).trim() || "Antigravity specialized agent.";
        const role = (await askQuestion("Enter agent role/persona (e.g. Python security analyst): ")).trim() || "specialized analyst";
        const allowedSkills = (await askQuestion("Enter comma-separated allowed skills (e.g. python-security): ")).trim() || "none";
        scaffoldAgent({ name, description, role, allowedSkills, targetDir });
        break;
      }
      case '4': {
        const orchestrator = (await askQuestion("Enter name of system orchestrator agent (Default: system-coordinator): ")).trim() || "system-coordinator";
        const subSkillsText = (await askQuestion("Enter comma-separated sub-skills to scaffold (e.g. python-dev, python-review, python-security): ")).trim();
        if (!subSkillsText) {
          console.log("🔴 At least one sub-skill is required to scaffold a system.");
          rl.close();
          return;
        }
        await scaffoldSkillSystem({ name, orchestrator, subSkillsText, targetDir, isInteractive: true });
        break;
      }
      default:
        console.log("🔴 Invalid choice. Exiting.");
    }
  } catch (err) {
    console.error(`\n🔴 An unexpected error occurred: ${err.message}`);
  } finally {
    rl.close();
  }
}

// Execute CLI if run directly
const isDirectRun = process.argv[1] && (
  process.argv[1] === fileURLToPath(import.meta.url) ||
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
);
if (isDirectRun) {
  main();
}

