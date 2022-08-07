const { v4 } = require('uuid');

const db = require('../../database');

class AnimalsRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM animal
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
      SELECT * FROM animal
      WHERE id = $1
    `, [ id ]);
    return row;
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
