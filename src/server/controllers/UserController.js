import { userRepository } from '../repositories/UserRepository.js';

class UserController {
    index(_req, res) {
        const data = userRepository.find();
        res.send(200, data);
    }
}

export const userController = new UserController();
