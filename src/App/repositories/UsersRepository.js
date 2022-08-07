const { v4 } = require('uuid');

const db = require('../../database');

class UsersRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT users.id, users.name, email, phone, animal.name AS animal_name, animal.id AS animal_id
    FROM users
    LEFT JOIN animal ON animal.id = animal_id
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
    name, email, phone, address, cep, city, estado, gender, date_of_birth, animal_id
  }) {
    const [ row ] = await db.query(`
      INSERT INTO users(name, email, phone, address, cep, city, estado, gender, date_of_birth, animal_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [name, email, phone, address, cep, city, estado, gender, date_of_birth, animal_id]);

    return row;
  }
}

// Singleton
module.exports = new UsersRepository();
