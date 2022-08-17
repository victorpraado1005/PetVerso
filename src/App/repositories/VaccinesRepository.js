const { v4 } = require('uuid');

const db = require('../../database');

class VaccinesRepository {
  async findAll(){
    const rows = await db.query(`
      SELECT vaccines.id, vaccines.name, vaccines.application_date, vaccines.next_application,
      animal.name AS animal_name,
      animal.id AS animal_id
      FROM vaccines
      LEFT JOIN animal ON animal.id = vaccines.animal_id
    `);
    return rows;
  }

  async findByAnimalId(id){
    const rows = await db.query(`
      SELECT vaccines.name, vaccines.application_date, vaccines.next_application,
      animal.name AS animal_name
      FROM vaccines
      LEFT JOIN animal ON animal.id = vaccines.animal_id
      WHERE animal_id = $1
    `, [ id ]);
    return rows;
  }

  async findById(vaccine_id){
    const [ row ] = await db.query(`
      SELECT vaccines.id
      FROM vaccines
      WHERE id = $1
    `, [ vaccine_id ]);
    return row;
  }

  async create({
    name, application_date, next_application, animal_id
  }){
    const [ row ] = await db.query(`
      INSERT INTO vaccines(name, application_date, next_application, animal_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [ name, application_date, next_application, animal_id ]);
    return row;
  }

  async update(vaccine_id, {
    name, application_date, next_application
  }) {
    const [row] = await db.query(`
      UPDATE vaccines
      SET name = $1, application_date = $2, next_application = $3
      WHERE vaccines.id = $4
      RETURNING *
    `, [name, application_date, next_application, vaccine_id])
    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`
      DELETE FROM vaccines
      WHERE id = $1
    `, [ id ]);
    return deleteOp;
  }
}

module.exports = new VaccinesRepository();
