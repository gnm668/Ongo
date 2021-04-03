const Pool = require("pg").Pool;
const keys = require("./config/keys");

const pool = new Pool({
  user: keys.psql_username,
  password: keys.psql_password,
  host: "localhost",
  port: 5432,
  database: "ongotasks"
});

module.exports = pool;