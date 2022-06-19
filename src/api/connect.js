const { Client } = require("pg");

const connectionString =
  "postgres://postgres:postgres@localhost:5432/welbexTest";
const client = new Client({
  connectionString: connectionString,
});

module.exports = client;
