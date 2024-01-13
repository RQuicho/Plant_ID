const {Client} = require("pg");
const {DB_NAME} = require("./config");
const {DATABASE_URL} = require("./config");

const db = new Client({
  host: process.env.DATABASE_URL,
  database: DB_NAME
  // connectionString: DATABASE_URL,
});

db.connect();

module.exports = db;