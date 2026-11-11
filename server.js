const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const PORT = process.env.PORT || 4173;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};
const candidates = p => [
  p,
  p + '.html',
  path.join(p, 'index.html'),
];
http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/') p = '/index.html';
  const base = path.join(ROOT, p);
  if (!base.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  const tryFile = (list, i) => {
    if (i >= list.length) { res.writeHead(404); res.end('not found'); return; }
    const file = list[i];
    fs.readFile(file, (err, data) => {
      if (err) return tryFile(list, i + 1);
      res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(data);
    });
  };
  tryFile(candidates(base), 0);
}).listen(PORT, () => console.log('Kyuto clone on http://localhost:' + PORT));
