const { v4 } = require('uuid');

const db = require('../../database');

class MedicationsRepository {
  async findAll(){
    const rows = await db.query(`
      SELECT pedidos.id, data_pedido, loja, valor_total, users.name AS users_name
      FROM pedidos
      LEFT JOIN users ON users.id = pedidos.user_id
    `);
    return rows;
  }

  async findByUserId(id){
    const rows = await db.query(`
      SELECT pedidos.id, data_pedido, loja, valor_total, users.name AS users_name
      FROM pedidos
      LEFT JOIN users ON users.id = pedidos.user_id
      WHERE user_id = $1
    `, [ id ]);
    return rows;
  }

  async findById(pedidoId){
    const [ row ] = await db.query(`
      SELECT pedidos.id
      FROM pedidos
      WHERE pedidos.id = $1
    `, [ pedidoId ]);
    return row;
  }

  async create({
    data_pedido, loja, valor_total, user_id
  }){
    const [ row ] = await db.query(`
      INSERT INTO pedidos(data_pedido, loja, valor_total, user_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [ data_pedido, loja, valor_total, user_id ]);
    return row;
  }
}

module.exports = new MedicationsRepository();
