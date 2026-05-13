// backend/src/repositories/auth.repository.js
const db = require('../config/db');

class AuthRepository {
  async findUserByUsername(username) {
    const { rows } = await db.query(
      'SELECT * FROM usuarios WHERE username = $1',
      [username]
    );
    return rows[0];
  }

  async countUsers() {
    const { rows } = await db.query('SELECT COUNT(*) FROM usuarios');
    return parseInt(rows[0].count);
  }

  async createUser(userData) {
    const { nombre, username, password, rol_id } = userData;
    const { rows } = await db.query(
      'INSERT INTO usuarios (nombre, username, password, rol_id) VALUES ($1, $2, $3, $4) RETURNING id, nombre, username',
      [nombre, username, password, rol_id]
    );
    return rows[0];
  }

  async getAdminRoleId() {
    const { rows } = await db.query("SELECT id FROM roles WHERE nombre ILIKE '%admin%' OR nombre ILIKE '%master%' LIMIT 1");
    return rows[0]?.id || 1; // Por defecto 1 si no encuentra
  }
}

module.exports = new AuthRepository();