import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const skillsDir = path.join(repoRoot, 'skills');
const requiredKeys = ['name', 'scope', 'auto_invoke', 'dependencies'];

function getSkillFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getSkillFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (entry.name === 'README.md' || entry.name === 'SKILLS_INDEX.md') {
        continue;
      }
      results.push(fullPath);
    }
  }
  return results;
}

function parseFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  if (lines.length < 3) return null;
  if (lines[0].trim() != '---') return null;
  let endIndex = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }
  if (endIndex == -1) return null;
  const keys = new Set();
  for (const line of lines.slice(1, endIndex)) {
    const match = line.match(/^([A-Za-z0-9_]+)\s*:/);
    if (match) {
      keys.add(match[1]);
    }
  }
  return keys;
}

function validateFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const keys = parseFrontmatter(text);
  if (!keys) {
    return { filePath, errors: ['missing_frontmatter'] };
  }
  const errors = [];
  for (const key of requiredKeys) {
    if (!keys.has(key)) {
      errors.push(`missing_${key}`);
    }
  }
  if (!keys.has('trigger') && !keys.has('triggers')) {
    errors.push('missing_trigger');
  }
  return { filePath, errors };
}

function main() {
  const files = getSkillFiles(skillsDir);
  const failures = [];
  for (const filePath of files) {
    const { errors } = validateFile(filePath);
    if (errors.length > 0) {
      failures.push({ filePath, errors });
    }
  }

  if (failures.length > 0) {
    const lines = ['Skill frontmatter validation failed:'];
    for (const failure of failures) {
      lines.push(`- ${path.relative(repoRoot, failure.filePath)}: ${failure.errors.join(', ')}`);
    }
    process.stderr.write(`${lines.join('\n')}\n`);
    process.exit(1);
  }

  process.stdout.write(`Validated ${files.length} skills.\n`);
}

main();
