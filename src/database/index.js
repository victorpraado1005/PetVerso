const { Client } = require('pg');

// const client = new Client({
//   host: 'ec2-44-205-63-142.compute-1.amazonaws.com',
//   port: 5432,
//   user: 'wvxjfarfsgtslp',
//   password: '8901b534831514e518e4ffd11385fea8b9f96f12fa39f8a1731ef0e4ac669dae',
//   database: 'der3ai32lv1q0p'
// });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
