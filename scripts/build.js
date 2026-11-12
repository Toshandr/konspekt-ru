// Собирает статический сайт в dist/ по routes.txt.
// BASE_PATH="/имя-репозитория" используется для GitHub Pages.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.cpSync(path.join(root, 'style'), path.join(dist, 'style'), { recursive: true });
fs.cpSync(path.join(root, 'components'), path.join(dist, 'components'), { recursive: true });

const routes = fs.readFileSync(path.join(root, 'routes.txt'), 'utf8');
for (const rawLine of routes.split(/\r?\n/)) {
  const line = rawLine.trim();
  if (!line || line.startsWith('#')) continue;
  const [route, source, course = '', title = ''] = line.split('|');
  const output = route === '/'
    ? path.join(dist, 'index.html')
    : route.endsWith('.html')
      ? path.join(dist, route.slice(1))
      : path.join(dist, route.slice(1), 'index.html');

  const input = path.join(root, 'src', source);
  if (!fs.existsSync(input)) throw new Error(`Не найден исходный файл: ${input}`);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const html = fs.readFileSync(input, 'utf8')
    .replaceAll('{{COURSE}}', course)
    .replaceAll('{{TITLE}}', title);
  fs.writeFileSync(output, html, 'utf8');
}

if (base) {
  const rewrite = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) rewrite(file);
      else if (entry.isFile() && entry.name.endsWith('.html')) {
        const html = fs.readFileSync(file, 'utf8').replace(/(href|src)="\//g, `$1="${base}/`);
        fs.writeFileSync(file, html, 'utf8');
      }
    }
  };
  rewrite(dist);
  const coursesFile = path.join(dist, 'components', 'courses.js');
  fs.writeFileSync(coursesFile, fs.readFileSync(coursesFile, 'utf8').replace("base: ''", `base: '${base}'`), 'utf8');
}

console.log(`Готово: dist/ (base='${base}')`);
