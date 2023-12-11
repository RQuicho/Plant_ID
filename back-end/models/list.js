"use strict";

const db = require("../db");
const {sqlForPartialUpdate} = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError
} = require("../expressError");

class List {
  // Create a list
  static async create({name, description}) {
    const duplicateCheck = await db.query(
      `SELECT name
       FROM lists
       WHERE name = $1`,
       [name]
    );
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate list name: ${name}`);
    }

    const result = await db.query(
      `INSERT INTO lists
       (name, description)
       VALUES ($1, $2)
       RETURNING name, description`,
       [name, description]
    );
    const list = result.rows[0];
    return list;
  }

  // GET
  static async get(name) {
    const listRes = await db.query(
      `SELECT name, description
       FROM lists
       WHERE name = $1`,
       [name]
    );
    const list = listRes.rows[0];

    if (!list) throw new NotFoundError(`No list: ${name}`);

    const listPlantRes = await db.query(
      `SELECT lp.plant_id
       FROM listPlant AS lp
       WHERE lp.name = $1`,
       [name]
    );

    list.listplant = listPlantRes.rows.map(lp => lp.plant_id);
    return list;
  }

  // UPDATE
  


}