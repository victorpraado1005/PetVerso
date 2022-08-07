const { v4 } = require('uuid');

const db = require('../../database');

class ConsultasRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT consultas.id, consultas.data_consulta, consultas.clinica, animal.name AS animal_name, users.name AS user_name
    FROM consultas
    LEFT JOIN animal ON animal.id = consultas.animal_id
    LEFT JOIN users ON users.id = consultas.users_id
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
    SELECT consultas.data_consulta, consultas.clinica, animal.name AS animal_name, users.name AS user_name
    FROM consultas
    LEFT JOIN animal ON animal.id = consultas.animal_id
    LEFT JOIN users ON users.id = consultas.users_id
    WHERE consultas.id = $1
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
