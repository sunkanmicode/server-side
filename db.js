const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: process.env.DATABASE_URL,
    ssl: true
});

module.exports = pool;


