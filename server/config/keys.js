const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  psql_username: process.env.USERNAME,
  psql_password: process.env.PASSWORD,
};