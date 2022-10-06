const { v4 } = require('uuid');

const db = require('../../database');

class ParksRepository {
  async findAll(){
    const rows = await db.query(`SELECT * FROM parks`);
    return rows;
  }

  async findByDistrict(district){
    const rows = await db.query(`SELECT * FROM parks WHERE district = $1`, [ district ]);
    return rows;
  }

  async create({ name,  address, zipcode, district, open_hours }) {
    const [ row ] = await db.query(
      `INSERT INTO parks(name, address, zipcode, district, open_hours)
       VALUES($1, $2, $3, $4, $5)
       RETURNING *
      `, [ name,  address, zipcode, district, open_hours ]
    );
    return row;
  }
}

module.exports = new ParksRepository();
