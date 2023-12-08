const {Client} = require("pg");

let DB_NAME;

if (process.env.NODE_ENV === "test") {
  DB_NAME = "plantid_test";
} else {
  DB_NAME = "plantid";
}

const db = new Client({
  host: "/var/run/postgresql/",
  database: DB_NAME
});

db.connect();

module.exports = db;