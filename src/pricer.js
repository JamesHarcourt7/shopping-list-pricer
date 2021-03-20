// Shamelessly stolen simple server code from the Internet.

const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('i made this because im poor and lazy');
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}/`);
});