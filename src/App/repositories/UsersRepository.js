const { v4 } = require('uuid');

const db = require('../../database');

class UsersRepository {
  async findAll() {
    console.log('entrou no user repository')
    const rows = await db.query(`
    SELECT users.id, users.name, email, phone
    FROM users
    `);
    console.log('passou da query')
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
      SELECT email
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
    name, email, phone, address, cep, city, estado, gender, assinante, password
  }) {
    const [ row ] = await db.query(`
      INSERT INTO users(name, email, phone, address, cep, city, estado, gender, assinante, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [name, email, phone, address, cep, city, estado, gender, assinante, password]);

    return row;
  }

  async update(id,{
    name, email, phone, address, cep, city, estado, gender, date_of_birth, assinante
  }) {
    const [ row ] = await db.query(`
      UPDATE users
      SET name = $1, email = $2, phone = $3, address = $4, cep = $5, city = $6,
      estado = $7, gender = $8, date_of_birth = $9, assinante = $10
      WHERE id = $11
      RETURNING *
    `, [ name, email, phone, address, cep, city, estado, gender, date_of_birth, assinante, id ]);

    return row;
  }

}

// Singleton
module.exports = new UsersRepository();
