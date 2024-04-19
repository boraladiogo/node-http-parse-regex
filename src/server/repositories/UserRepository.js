import { database } from '../../database/database.js';

class UserRepository {
    find() {
        const users = database.select();
        return users.rows;
    }
}

export const userRepository = new UserRepository();
