const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: "postgresql-amorphous-60784",
    host: 'localhost',
    port: 5432,
    database: 'fullstack'
});

module.exports = pool;


