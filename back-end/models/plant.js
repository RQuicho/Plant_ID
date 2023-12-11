"use strict";

const db = require("../db");
const {sqlForPartialUpdate} = require("../helpers/sql");
const { BadRequestError, NotFoundError } = require("../expressError");

class Plant {
  // Create a plant
  static async create({commonName,
                        scientificName,
                        type,
                        flowers,
                        color,
                        fruits,
                        edibleFruit,
                        fruitColor,
                        leaf,
                        leafColor,
                        edibleLeaf,
                        poisonousToHumans,
                        poisonousToPets,
                        thorny,
                        description,
                        defaultImg}) {
    const duplicateCheck = await db.query(
      `SELECT scientific_name AS "scientificName"
       FROM plants
       WHERE scientific_name = $1`,
       [scientificName]);
    if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate plant: ${scientificName}`);

    const result = await db.query(
      `INSERT INTO plants (common_name,
                           scientific_name,
                           type,
                           flowers,
                           color,
                           fruits,
                           edible_fruit,
                           fruit_color,
                           leaf,
                           leaf_color,
                           edible_leaf,
                           poisonous_to_humans,
                           poisonous_to_pets,
                           thorny,
                           description,
                           default_img)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING id, 
                common_name AS "commonName", 
                scientific_name AS "scientificName",
                type,
                flowers, 
                color,
                fruits,
                edible_fruit AS "edibleFruit",
                fruit_color AS "fruitColor",
                leaf,
                leaf_color AS "leafColor",
                edible_leaf AS "edibleLeaf",
                poisonous_to_humans AS "poisonousToHumans",
                poisonous_to_pets AS "poisonousToPets",
                thorny,
                description,
                default_img AS "defaultImg"`,
      [
        commonName,
        scientificName,
        type,
        flowers,
        color,
        fruits,
        edibleFruit,
        fruitColor,
        leaf,
        leafColor,
        edibleLeaf,
        poisonousToHumans,
        poisonousToPets,
        thorny,
        description,
        defaultImg
      ]
    );
    const plant = result.rows[0];
    return plant;
  }

  // Get a plant
  static async get(scientificName) {
    const plantRes = await db.query(
      `SELECT common_name AS "commonName", 
              scientific_name AS "scientificName",
              type,
              flowers, 
              color,
              fruits,
              edible_fruit AS "edibleFruit",
              fruit_color AS "fruitColor",
              leaf,
              leaf_color AS "leafColor",
              edible_leaf AS "edibleLeaf",
              poisonous_to_humans AS "poisonousToHumans",
              poisonous_to_pets AS "poisonousToPets",
              thorny,
              description,
              default_img AS "defaultImg"
       FROM plants
       WHERE scientific_name = $1`,
      [scientificName]
    );
    const plant = plantRes.rows[0];

    if (!plant) throw new NotFoundError(`No plant: ${scientificName}`);

    // const listRes = await db.query(
    //   `SELECT name,
    //           description
    //    FROM lists
    //    WHERE scientificName = $1`,
    //   [plant.scientificName]
    // );

    // delete plant.scientificName;
    // plant.list = listRes.rows[0];

    return plant;
  }

  // Update? i don't think plant info should be updated since it is coming from an API

  // Remove
  static async remove(scientificName) {
    const result = await db.query(
      `DELETE
       FROM plants
       WHERE scientific_name = $1
       RETURNING scientific_name AS "scientificName"`,
      [scientificName]
    );
    const plant = result.rows[0];
    if (!plant) throw new NotFoundError(`No plant: ${scientificName}`);
  }
}

module.exports = Plant;