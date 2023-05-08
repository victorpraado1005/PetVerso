const { v4 } = require('uuid');

const db = require('../../database');

class ProductsRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM products
    `);
    return rows;
  }

  async findById(id) {
    const [ row ] = await db.query(`
      SELECT * FROM products
      WHERE id = $1
    `, [ id ]);
    return row;
  }

  async findByStoreId(id) {
    const [ row ] = await db.query(`
      SELECT products.*, stores.name AS store_name
      FROM products
      LEFT JOIN stores ON stores.id = products.store_id
      WHERE store.id = $1
    `, [ id ]);
    return row;
  }

  async create({
    name, price, quantity, store_id
  }) {
    const [ row ] = await db.query(`
      INSERT INTO products(name, price, quantity, store_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, price, quantity, store_id]);
    return row;
  }

}

// Singleton
module.exports = new ProductsRepository();
