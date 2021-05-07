const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    connectionString: "postgresql-amorphous-60784",
    ssl:true,
});

module.exports = pool;


