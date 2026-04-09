const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8765;
const DIR = path.resolve(__dirname);
const ROOT = path.resolve(__dirname, '..');

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.gif': 'image/gif',
  '.png': 'image/png',
  '.json': 'application/json',
  '.css': 'text/css',
};

http.createServer(function(req, res) {
  let urlPath = req.url.split('?')[0];
  let filePath;

  if (urlPath === '/' || urlPath === '/verify-gifs.html') {
    filePath = path.join(DIR, 'verify-gifs.html');
  } else if (urlPath === '/exercises-data.js') {
    filePath = path.join(DIR, 'exercises-data.js');
  } else if (urlPath === '/app.js') {
    filePath = path.join(DIR, 'app.js');
  } else if (urlPath.startsWith('/mobile-app/')) {
    filePath = path.join(ROOT, urlPath);
  } else {
    res.writeHead(404);
    res.end('Not found: ' + urlPath);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, function(err, data) {
    if (err) {
      console.log('404: ' + filePath);
      res.writeHead(404);
      res.end('Not found: ' + urlPath);
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}).listen(PORT, function() {
  console.log('');
  console.log('========================================');
  console.log('  Server running!');
  console.log('  Open: http://localhost:' + PORT + '/verify-gifs.html');
  console.log('  Press Ctrl+C to stop');
  console.log('========================================');
  console.log('');
});
