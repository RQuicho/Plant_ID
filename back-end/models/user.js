"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError
} = require("../expressError");

const {BCRYPT_WORK_FACTOR} = require("../config");

class User {
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,`
    )
  }
}