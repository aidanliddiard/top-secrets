const pool = require('../utils/pool');

module.exports = class Secret {
  id;
  title;
  description;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
  }

  static async getSecrets() {
    const { rows } = await pool.query('SELECT * FROM secrets');
    return rows.map((row) => new Secret({ title: row.title }));
  }
  static async addSecret({ title, description, createdAt }) {
    const { rows } = await pool.query(
      'INSERT INTO secrets (title, description, createdAt) VALUES ($1, $2, $3) RETURNING *',
      [title, description, createdAt]
    );
    return new Secret(rows[0]);
  }
};
