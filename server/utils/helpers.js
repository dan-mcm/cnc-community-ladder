const { Pool } = require('pg');

function createPool() {
  let pool;
  if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }
  return pool;
}

const pool = createPool();

// For handling SQL injection
function cleanInput(input) {
  return /^\d+$/.test(input) ? input : 3;
}

module.exports = {
  createPool,
  cleanInput,
};
