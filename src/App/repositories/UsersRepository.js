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

  async findByEmail(email){
    const [ row ] = await db.query(`
      SELECT id, name, email, password
      FROM users
      WHERE email = $1
    `, [ email ]);
    return row;
  }

  async findUserByEmailAndPassword(email, password) {
    const [ row ] = await db.query(`
      SELECT id, name
      FROM users
      WHERE email = $1 AND password = $2
    `, [ email, password ]);
    return row;
  }

  async create({
    name, email, phone, address, cep, city, estado, gender, assinante, hashedPassword
  }) {
    const [ row ] = await db.query(`
      INSERT INTO users(name, email, phone, address, cep, city, estado, gender, assinante, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [name, email, phone, address, cep, city, estado, gender, assinante, hashedPassword]);
    return row;
  }

  async update(id,{
    name, email, phone, address, cep, city, estado, gender, date_of_birth
  }) {
    const [ row ] = await db.query(`
      UPDATE users
      SET name = $1, email = $2, phone = $3, address = $4, cep = $5, city = $6,
      estado = $7, gender = $8, date_of_birth = $9
      WHERE id = $10
      RETURNING *
    `, [ name, email, phone, address, cep, city, estado, gender, date_of_birth, id ]);

    return row;
  }

  async updateSubscription(id,{
    assinante
  }) {
    const [ row ] = await db.query(`
      UPDATE users
      SET assinante = $1
      WHERE id = $2
      RETURNING *
    `, [ assinante, id ]);

    return row;
  }

}

// Singleton
module.exports = new UsersRepository();
