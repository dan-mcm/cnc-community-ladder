const { Pool } = require('pg');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
// Local docker
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// });

// For prod
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const getAllMatches = function() {
  const selectAll = {
    name: 'fetch-matches',
    text: 'SELECT * FROM matches'
  };

  const res = pool.query(selectAll, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      return res.rows;
    }
    // Syntax used to hide error logging of pool end > once
    // pool.end(() => {});
  });

  return res;
};

module.exports = {
  getAllMatches
};
