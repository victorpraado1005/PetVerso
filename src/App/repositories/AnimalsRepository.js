const { v4 } = require('uuid');

const db = require('../../database');

class AnimalsRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT animal.*, users.name AS parent_name
    FROM animal
    LEFT JOIN users ON users.id = animal.users_id
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
    SELECT animal.*, users.name AS parent_name
    FROM animal
    LEFT JOIN users ON users.id = animal.users_id
    WHERE animal.id = $1
    `, [ id ]);
    return row;
  }

  async findByParent(parent){
    const row = await db.query(`
      SELECT animal.name, breed, animal.gender, users.name AS parent_name
      FROM animal
      LEFT JOIN users ON users.id = animal.users_id
      WHERE users.id = $1
    `, [ parent ])
    return row
  }

  async create({
    name, breed, date_of_birth, gender, users_id
  }) {
    const [ row ] = await db.query(`
      INSERT INTO animal(name, breed, date_of_birth, gender, users_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, breed, date_of_birth, gender, users_id]);

    return row;
  }

  async update(id, {
    name, breed,  date_of_birth, gender
  }) {
    const [row] = await db.query(`
      UPDATE animal
      SET name = $1, breed = $2, date_of_birth = $3, gender = $4
      WHERE id = $5
      RETURNING *
    `, [name, breed, date_of_birth, gender, id])
    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`
      DELETE FROM animal
      WHERE id = $1
    `, [ id ]);
    return deleteOp;
  }
}

// Singleton
module.exports = new AnimalsRepository();
