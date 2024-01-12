"use strict";

// const SECRET_KEY = process.env.SECRET_KEY || "secret";
// const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secret";
const PORT = process.env.DATABASE_URL || 3001;

let DB_NAME;

if (process.env.NODE_ENV === "test") {
  DB_NAME = "plantid_test";
} else {
  DB_NAME = "plantid";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  SECRET_KEY,
  PORT,
  DB_NAME,
  BCRYPT_WORK_FACTOR
}