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
       WHERE lp.list_name = $1`,
       [name]
    );

    list.listplant = listPlantRes.rows.map(lp => lp.plant_id);
    return list;
  }

  // UPDATE
  static async update(name, data) {
    const {setCols, values} = sqlForPartialUpdate(
      data,
      {
        description: 'description',
      });
    const nameVarIdx = "$" + (values.length +1);

    const querySql = `UPDATE lists
                      SET ${setCols}
                      WHERE name=${nameVarIdx}
                      RETURNING name, description`;
    const result = await db.query(querySql, [...values, name]);

    const list = result.rows[0];
    if (!list) {
      throw new NotFoundError(`No list: ${name}`);
    }

    return list;
  }

  // REMOVE
  static async remove(name) {
    let result = await db.query(
      `DELETE
       FROM lists
       WHERE name = $1
       RETURNING name`,
      [name]
    );
    const list = result.rows[0];
    if (!list) {
      throw new NotFoundError(`No list: ${name}`);
    }
  }

  // Add plant to list
  static async addPlantToList(listName, plantId) {
    const checkListName = await db.query(
      `SELECT name
       FROM lists
       WHERE name = $1`,
       [listName]
    );
    const list = checkListName.rows[0];
    if (!list) throw new NotFoundError(`No list: ${listName}`);

    const checkPlantId = await db.query(
      `SELECT id
       FROM plants
       WHERE id = $1`,
       [plantId]
    );
    const plant = checkPlantId.rows[0];
    if (!plant) throw new NotFoundError(`No plant: ${plantId}`);

    await db.query(
      `INSERT INTO listPlant (list_name, plant_id)
       VALUES ($1, $2)`,
       [listName, plantId]
    );
  }
}

module.exports = List;