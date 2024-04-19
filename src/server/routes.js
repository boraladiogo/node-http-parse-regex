export const routes = [
    {
        method: 'GET',
        endpoint: '/users',
        handler: (_req, res) => { res.writeHead(200).end(JSON.stringify({ message: 'HI!' })); },
    },
];
