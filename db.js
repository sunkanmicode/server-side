const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: "oyebanjo87",
    host: 'localhost',
    port: 5432,
    database: 'fullstack'
});

module.exports = pool;


