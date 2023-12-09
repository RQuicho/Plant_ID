"use strict";

let DB_NAME;

if (process.env.NODE_ENV === "test") {
  DB_NAME = "plantid_test";
} else {
  DB_NAME = "plantid";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  DB_NAME,
  BCRYPT_WORK_FACTOR
}