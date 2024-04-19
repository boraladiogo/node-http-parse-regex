import http from 'node:http';
import { routes } from './routes.js';

const PORT = 3333;
const server = http.createServer((req, res) => {
    const route = routes.find((it) => (
        req.method === it.method && req.url === it.endpoint
    ));

    if (route) {
        res.send = (statusCode, payload) => {
            res.writeHead(statusCode, { 'Content-Type': 'Application/json' });
            res.end(JSON.stringify(payload));
        };

        route.handler(req, res);
    } else {
        res.writeHead(404).end(JSON.stringify({ error: 'Page not found.' }));
    }
});

server.listen(PORT, console.log(`Server running at http://localhost:${PORT}`));
