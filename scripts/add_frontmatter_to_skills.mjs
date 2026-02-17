import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const skillsDir = path.join(repoRoot, 'skills');

function listSkillFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listSkillFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (entry.name === 'README.md' || entry.name === 'SKILLS_INDEX.md') {
        continue;
      }
      results.push(fullPath);
    }
  }
  return results;
}

function hasFrontmatter(text) {
  return text.trimStart().startsWith('---');
}

function slugFromFilename(filePath) {
  return path.basename(filePath, '.md');
}

function scopeFromPath(filePath) {
  const rel = path.relative(skillsDir, filePath);
  const parts = rel.split(path.sep);
  return parts[0] || 'global';
}

function firstSentence(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return '';
  const firstLine = lines[0];
  const match = firstLine.match(/^(.*?[.!?])\s/);
  return match ? match[1] : firstLine;
}

function addFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (hasFrontmatter(content)) {
    return false;
  }

  const name = slugFromFilename(filePath);
  const scope = scopeFromPath(filePath);
  const description = firstSentence(content);
  const escapedDescription = description.replace(/"/g, '\\"');
  const frontmatter = [
    '---',
    `name: ${name}`,
    `scope: ${scope}`,
    'auto_invoke: true',
    'triggers: []',
    'dependencies: []',
    `description: "${escapedDescription}"`,
    '---',
    '',
  ].join('\n');

  fs.writeFileSync(filePath, frontmatter + content);
  return true;
}

function main() {
  const files = listSkillFiles(skillsDir);
  let updated = 0;
  for (const filePath of files) {
    if (addFrontmatter(filePath)) {
      updated += 1;
    }
  }

  process.stdout.write(`Added frontmatter to ${updated} skill files.\n`);
}

main();
