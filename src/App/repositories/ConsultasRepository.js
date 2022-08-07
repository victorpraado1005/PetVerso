const { v4 } = require('uuid');

const db = require('../../database');

class ConsultasRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM consultas
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
      SELECT * FROM consultas
      WHERE id = $1
    `, [ id ]);
    return row;
  }

  async create({
    data_consulta, clinica, animal_id, users_id
  }) {
    const [ row ] = await db.query(`
      INSERT INTO consultas(data_consulta, clinica, animal_id, users_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [data_consulta, clinica, animal_id, users_id]);

    return row;
  }
}

module.exports = new ConsultasRepository();
