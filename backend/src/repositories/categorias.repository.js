const db = require('../config/db');

class CategoriaRepository {
    async getAll() {
        const { rows } = await db.query('SELECT * FROM categorias ORDER BY nombre ASC');
        return rows;
    }

    async create(data) {
        const { nombre } = data;
        const { rows } = await db.query(
            'INSERT INTO categorias (nombre, activo) VALUES ($1, true) RETURNING *',
            [nombre]
        );
        return rows[0];
    }
}
module.exports = new CategoriaRepository();
