const {Client} = require("pg");
const {DB_NAME} = require("./config");
const {DATABASE_URL} = require("./config");

const db = new Client({
  // host: "/var/run/postgresql/",
  // database: DATABASE_URL
  connectionString: DATABASE_URL,
});

db.connect();

module.exports = db;