const { Client } = require('pg');

const client = new Client({
  host: 'containers-us-west-200.railway.app',
  port: 6571,
  user: 'postgres',
  password: 'JAMspPUCeVvGGoPvxlZN',
  database: 'railway'
});

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
