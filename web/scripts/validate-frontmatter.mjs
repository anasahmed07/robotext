import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, '../docs');
const REQUIRED_FIELDS = ['title', 'sidebar_label', 'description'];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let hasError = false;

walkDir(DOCS_DIR, (filePath) => {
  if (path.extname(filePath) !== '.md' && path.extname(filePath) !== '.mdx') return;

  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontmatterMatch) {
    console.error(`❌ No frontmatter found in ${filePath}`);
    hasError = true;
    return;
  }

  const frontmatter = frontmatterMatch[1];
  
  REQUIRED_FIELDS.forEach(field => {
    // Simple check: looking for "key:" pattern. 
    // Not a full YAML parser but sufficient for "existence" check.
    const regex = new RegExp(`^${field}:`, 'm');
    if (!regex.test(frontmatter)) {
      console.error(`❌ Missing '${field}' in ${filePath}`);
      hasError = true;
    }
  });
});

if (hasError) {
  console.log("Validation failed.");
  process.exit(1);
} else {
  console.log("✅ All docs have valid frontmatter.");
}
