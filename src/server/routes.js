import { userController } from './controllers/UserController.js';

export const routes = [
    {
        method: 'GET',
        endpoint: '/users',
        handler: userController.index,
    },
];
