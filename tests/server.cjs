const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.jpg':'image/jpeg', '.png':'image/png', '.webp':'image/webp'};
http.createServer((request, response) => {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname.replace(/\/$/, '/index.html')));
  if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  fs.readFile(file, (error, content) => {
    response.writeHead(error ? 404 : 200, {'Content-Type': (types[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8'});
    response.end(error ? 'Not found' : content);
  });
}).listen(4173, '127.0.0.1', () => console.log('Guide available at http://127.0.0.1:4173'));
