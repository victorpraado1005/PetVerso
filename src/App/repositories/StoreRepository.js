const { v4 } = require('uuid');

const db = require('../../database');

class StoreRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM stores
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
      SELECT * FROM stores
      WHERE id = $1
    `, [ id ]);
    return row;
  }

  async create({
    name, cnpj, address, city, city_area
  }) {
    const [ row ] = await db.query(`
      INSERT INTO stores(name, cnpj, address, city, city_area)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, cnpj, address, city, city_area]);
    return row;
  }

}

// Singleton
module.exports = new StoreRepository();
