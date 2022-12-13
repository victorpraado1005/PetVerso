const { Client } = require('pg');

const client = new Client({
  host: 'petversodb.cqdlkeva8dsc.us-east-1.rds.amazonaws.com',
  port: 5432,
  user: 'petverso',
  password: 'sBY0EnDuDGhugoAkEPlrh',
  database: 'petverso'
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
