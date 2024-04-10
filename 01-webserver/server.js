const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello World!');
});

server.listen(8000);
