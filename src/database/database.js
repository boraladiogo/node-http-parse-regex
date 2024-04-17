import fs from 'node:fs/promises';

const databasePath = new URL('../data.json', import.meta.url);

export class Database {
    #database = {};

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then((data) => JSON.parse(data))
            .catch(() => this.#persist());
    }
}
