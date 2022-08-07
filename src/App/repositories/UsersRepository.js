const { v4 } = require('uuid');

const db = require('../../database');

class UsersRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT users.id, users.name, email, phone
    FROM users
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [ id ]);
    return row;
  }

  async create({
    name, email, phone, address, cep, city, estado, gender, date_of_birth
  }) {
    const [ row ] = await db.query(`
      INSERT INTO users(name, email, phone, address, cep, city, estado, gender, date_of_birth)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [name, email, phone, address, cep, city, estado, gender, date_of_birth]);

    return row;
  }
}

// Singleton
module.exports = new UsersRepository();
