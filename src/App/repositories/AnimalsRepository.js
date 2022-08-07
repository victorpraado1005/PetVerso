const { v4 } = require('uuid');

const db = require('../../database');

class AnimalsRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT animal.*, users.name AS parent_name
    FROM animal
    LEFT JOIN users ON users.id = parent
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
    SELECT animal.*, users.name AS parent_name
    FROM animal
    LEFT JOIN users ON users.id = parent
    WHERE animal.id = $1
    `, [ id ]);
    return row;
  }

  async findByParent(parent){
    const row = await db.query(`
      SELECT animal.name, breed, animal.gender, users.name AS parent_name
      FROM animal
      LEFT JOIN users ON users.id = parent
      WHERE parent = $1
    `, [ parent ])
    return row
  }

  async create({
    name, breed, date_of_birth, gender
  }) {
    const [ row ] = await db.query(`
      INSERT INTO animal(name, breed, date_of_birth, gender)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, breed, date_of_birth, gender]);

    return row;
  }
}

// Singleton
module.exports = new AnimalsRepository();
