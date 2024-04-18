import fs from 'node:fs/promises';

export class Database {
    #database = {};

    #save() {
        fs.writeFile(this.path, JSON.stringify(this.#database, null, 2));
    }

    #load() {
        fs.readFile(this.path, 'utf-8')
            .then((data) => { this.#database = JSON.parse(data); })
            .catch(() => this.#save());
    }

    constructor(filename) {
        this.path = new URL(`../${filename}`, import.meta.url);
        this.#load();
    }

    select(table) {
        return { rows: this.#database[table] ?? [] };
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#save();

        return { rows: this.#database[table][this.#database[table].length - 1] };
    }

    update(table, id, data) {
        const updatedData = this.#database[table].reduce((rows, currentRow) => {
            if (currentRow.id === id) {
                rows.push({ ...currentRow, ...data });
            } else {
                rows.push(currentRow);
            }
            return rows;
        }, []);

        this.#database[table] = updatedData;
        this.#save();

        return { rows: updatedData };
    }

    delete(table, id) {
        const updatedData = this.#database[table].reduce((rows, currentRow) => {
            if (currentRow.id !== id) {
                rows.push(currentRow);
            }

            return rows;
        }, []);

        this.#database[table] = updatedData;
        this.#save();

        return { rows: this.#database[table] };
    }
}
