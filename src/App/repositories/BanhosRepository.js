const { v4 } = require('uuid');

const db = require('../../database');

class BanhosRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT banhos.id, banhos.data_banho, banhos.hora_banho, banhos.petshop, animal.name AS animal_name, users.name AS user_name
    FROM banhos
    LEFT JOIN animal ON animal.id = banhos.animal_id
    LEFT JOIN users ON users.id = banhos.users_id
    `);
    return rows;
  }

  async findByAnimalId(id) {
    const rows = await db.query(`
    SELECT banhos.data_banho, banhos.hora_banho, petshop, animal.name AS animal_name, users.name AS user_name
    FROM banhos
    LEFT JOIN animal ON animal.id = banhos.animal_id
    LEFT JOIN users ON users.id = banhos.users_id
    WHERE banhos.animal_id = $1
    `, [ id ]);
    return rows;
  }

  async findByUser(users_id) {
    const rows = await db.query(`
      SELECT banhos.data_banho, banhos.hora_banho, petshop, animal.name AS animal_name, users.name AS user_name
      FROM banhos
      LEFT JOIN animal ON animal.id = banhos.animal_id
      LEFT JOIN users ON users.id = banhos.users_id
      WHERE banhos.users_id = $1
    `, [ users_id ]);

    return rows;
  }

  async findBanho(data_banho, petshop, hora_banho) {
    const [ row ] = await db.query(`
      SELECT *
      FROM banhos
      WHERE data_banho = $1
      AND petshop = $2
      AND hora_banho = $3;
    `, [ data_banho, petshop, hora_banho ]);

    return row;
  }

  async create({
    data_banho, hora_banho, petshop, animal_id, users_id
  }) {
    const [ row ] = await db.query(`
      INSERT INTO banhos(data_banho, hora_banho, petshop, animal_id, users_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [data_banho, hora_banho, petshop, animal_id, users_id]);

    return row;
  }

  async update(id, {
    data_banho, hora_banho, petshop, animal_id, users_id
  }) {
    const [ row ] = await db.query(`
      UPDATE banhos
      SET data_banho = $1, hora_banho = $2, petshop = $3, animal_id = $4, users_id = $5
      WHERE id = $6
      RETURNING *
    `, [ data_banho, hora_banho, petshop, animal_id, users_id, id ]);

    return row
  }

  async delete(id){
    const deleteOP = await db.query(`
      DELETE FROM banhos
      WHERE id = $1
    `, [ id ]);

    return deleteOP;
  }

  async deleteByAnimalId(animalId){
    const deleteOP = await db.query(`
      DELETE FROM banhos
      WHERE animal_id = $1
    `, [ animalId ]);

    return deleteOP;
  }
}

module.exports = new BanhosRepository();
