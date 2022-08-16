const { v4 } = require('uuid');

const db = require('../../database');

class MedicationsRepository {
  async findAll(){
    const rows = await db.query(`
      SELECT medication.id, medicine_name, start_date, end_date, repetition, animal.name AS animal_name
      FROM medication
      LEFT JOIN animal ON animal.id = medication.animal_id
    `);
    return rows;
  }

  async findByAnimalId(id){
    const rows = await db.query(`
      SELECT medicine_name, start_date, end_date, repetition, animal.name AS animal_name
      FROM medication
      LEFT JOIN animal ON animal.id = medication.animal_id
      WHERE animal_id = $1
    `, [ id ]);
    return rows;
  }

  async create({
    medicine_name, start_date, end_date, repetition, animal_id
  }){
    const [ row ] = await db.query(`
      INSERT INTO medication(medicine_name, start_date, end_date, repetition, animal_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [ medicine_name, start_date, end_date, repetition, animal_id ]);
    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`
      DELETE FROM medication
      WHERE id = $1
    `, [ id ]);
    return deleteOp;
  }
}

module.exports = new MedicationsRepository();
