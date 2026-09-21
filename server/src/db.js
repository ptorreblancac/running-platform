const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "running_platform",
    password: "Paulit@2005",
    port: 5432
});

module.exports = pool;