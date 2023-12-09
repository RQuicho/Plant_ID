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
  // Authenticate
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              password,
              email
      FROM users
      WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }

  // Register
  static async register({username, firstName, lastName, password, email}) {
    const duplicateCheck = await db.query(
      `SELECT username
      FROM users
      WHERE username = $1`,
      [username],
    );
    
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
       (username,
        first_name,
        last_name,
        password,
        email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
      [
        username,
        firstName,
        lastName,
        hashedPassword,
        email,
      ],
    );

    const user = result.rows[0];

    return user;
  }

  // GET
  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email
      FROM users
      WHERE username = $1`,
      [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    const userListsRes = await db.query(
      `SELECT l.id
       FROM lists AS l
       WHERE l.username = $1`,
       [username]
    );

    user.lists = userListsRes.rows.map(l => l.id);
    return user;

  }

  // UPDATE
  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const result = await db.query(
      `UPDATE users SET
        password=($1),
        first_name=($2),
        last_name=($3),
        email=($4)
        WHERE username=$5
      RETURNING username,
                first_name,
                last_name,
                email`,
      [
        hashedPassword,
        data.first_name,
        data.last_name,
        data.email,
        username
      ],
    );
    
    const user = result.rows[0];
    if (!user) {
      throw new NotFoundError(`No user: ${username}`);
    }

    delete result.rows[0].password;
    return result.rows[0];
  }

  // REMOVE
  static async remove(username) {
    let result = await db.query(
      `DELETE
       FROM users
       WHERE username = $1
       RETURNING username`,
      [username],
    );
    const user = result.rows[0];
    if (!user) {
      throw new NotFoundError(`No user: ${username}`);
    }
  }

}