import http from 'node:http';
import { routes } from './routes.js'

const PORT = 3333;
const server = http.createServer((req, res) => {
    const route = routes.find((it) => (
        req.method === it.method && req.url === it.endpoint
    ));

    if (route) {
        res.end('Ok');
    } else {
        res.writeHead(404).end();
    }
});

server.listen(PORT, console.log(`Server running at http://localhot:${ PORT }`))