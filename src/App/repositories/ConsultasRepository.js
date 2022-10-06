const { v4 } = require('uuid');

const db = require('../../database');

class ConsultasRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT consultas.id, consultas.data_consulta, consultas.hora_consulta, consultas.clinica, animal.name AS animal_name, users.name AS user_name
    FROM consultas
    LEFT JOIN animal ON animal.id = consultas.animal_id
    LEFT JOIN users ON users.id = consultas.users_id
    `);
    return rows;
  }

  async findByAnimalId(id) {
    const rows = await db.query(`
    SELECT consultas.id, consultas.data_consulta, consultas.hora_consulta, consultas.clinica, animal.name AS animal_name, users.name AS user_name
    FROM consultas
    LEFT JOIN animal ON animal.id = consultas.animal_id
    LEFT JOIN users ON users.id = consultas.users_id
    WHERE consultas.animal_id = $1
    `, [ id ]);
    return rows;
  }

  async findByUser(users_id) {
    const rows = await db.query(`
      SELECT data_consulta, consultas.hora_consulta, clinica, animal.name AS animal_name, users.name AS user_name
      FROM consultas
      LEFT JOIN animal ON animal.id = consultas.animal_id
      LEFT JOIN users ON users.id = consultas.users_id
      WHERE consultas.users_id = $1
    `, [ users_id ]);

    return rows;
  }

  async findConsulta(data_consulta, clinica, hora_consulta) {
    const [ row ] = await db.query(`
      SELECT *
      FROM consultas
      WHERE data_consulta = $1
      AND clinica = $2
      AND hora_consulta = $3;
    `, [ data_consulta, clinica, hora_consulta ]);

    return row;
  }

  async create({
    data_consulta, hora_consulta,clinica, animal_id, users_id
  }) {
    const [ row ] = await db.query(`
      INSERT INTO consultas(data_consulta, hora_consulta, clinica, animal_id, users_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [data_consulta, hora_consulta, clinica, animal_id, users_id]);

    return row;
  }

  async update(id, {
    data_consulta, hora_consulta, clinica, animal_id, users_id
  }) {
    const [ row ] = await db.query(`
      UPDATE consultas
      SET data_consulta = $1, hora_consulta = $2, clinica = $3, animal_id = $4, users_id = $5
      WHERE id = $6
      RETURNING *
    `, [ data_consulta, hora_consulta, clinica, animal_id, users_id, id ]);

    return row
  }

  async delete(id){
    const deleteOP = await db.query(`
      DELETE FROM consultas
      WHERE id = $1
    `, [ id ]);

    return deleteOP;
  }

  async deleteByAnimalId(animalId){
    const deleteOP = await db.query(`
      DELETE FROM consultas
      WHERE animal_id = $1
    `, [ animalId ]);

    return deleteOP;
  }
}

module.exports = new ConsultasRepository();
