"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {sqlForPartialUpdate} = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError
} = require("../expressError");
const {BCRYPT_WORK_FACTOR} = require("../config");
const { query } = require("express");

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

    const userListRes = await db.query(
      `SELECT ul.list_name
       FROM userList AS ul
       WHERE ul.username = $1`,
       [username]
    );

    user.userlist = userListRes.rows.map(ul => ul.list_name);
    return user;

  }

  // UPDATE
  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const {setCols, values} = sqlForPartialUpdate(
      data,
      {
        firstName: 'first_name',
        lastName: 'last_name',
      });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users
                      SET ${setCols}
                      WHERE username=${usernameVarIdx}
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email`;
    const result = await db.query(querySql, [...values, username]);
      
    const user = result.rows[0];
    if (!user) {
      throw new NotFoundError(`No user: ${username}`);
    }

    delete user.password;
    return user;
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

  // Create a list
  static async addListToUser(username, listName) {
    const checkList = await db.query(
      `SELECT name
       FROM lists
       WHERE name = $1`,
       [listName]
    );
    const list = checkList.rows[0];
    if (!list) throw new NotFoundError(`No list: ${listName}`);

    const checkUser = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`,
       [username]
    );
    const user = checkUser.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);

    await db.query(
      `INSERT INTO userList (username, list_name)
       VALUES ($1, $2)`,
       [username, listName]
    );
  }
}

module.exports = User;