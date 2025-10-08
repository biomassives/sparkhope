import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT_DIR = path.resolve('src/content');

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(content);

  // If frontmatter is missing or malformed, skip silently
  if (!parsed.data) parsed.data = {};

  // Ensure sidebar.hidden is explicitly false
  if (!parsed.data.sidebar) parsed.data.sidebar = {};
  if (parsed.data.sidebar.hidden !== false) {
    parsed.data.sidebar.hidden = false;

    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`☑️ Already OK: ${filePath}`);
  }
}

console.log(`🔍 Scanning ${ROOT_DIR} ...`);
scanDir(ROOT_DIR);
console.log('✅ Done!');

