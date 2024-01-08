"use strict";

const db = require("../db");
const {sqlForPartialUpdate} = require("../helpers/sql");
const { BadRequestError, NotFoundError } = require("../expressError");

class Plant {
  // Create a plant
  static async create({ commonName,
                        scientificName,
                        imageUrl,
                        vegetable,
                        ediblePart,
                        edible,
                        flowerColor,
                        foliageTexture,
                        foliageColor,
                        fruitOrSeedColor,
                        fruitOrSeedShape,
                        growthForm,
                        growthHabit,
                        toxicity}) {
    if (!scientificName) throw new BadRequestError("Scientific name is required.");
    const duplicateCheck = await db.query(
      `SELECT scientific_name AS "scientificName"
       FROM plants
       WHERE scientific_name = $1`,
       [scientificName]);
    if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate plant: ${scientificName}`);

    const result = await db.query(
      `INSERT INTO plants ( common_name,
                            scientific_name,
                            image_url,
                            vegetable,
                            edible_part,
                            edible,
                            flower_color,
                            foliage_texture,
                            foliage_color,
                            fruit_or_seed_color,
                            fruit_or_seed_shape,
                            growth_form,
                            growth_habit,
                            toxicity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id, 
                common_name AS "commonName",
                scientific_name AS "scientificName",
                image_url AS "imageUrl",
                vegetable,
                edible_part AS "ediblePart",
                edible,
                flower_color AS "flowerColor",
                foliage_texture AS "foliageTexture",
                foliage_color AS "foliageColor",
                fruit_or_seed_color AS "fruitOrSeedColor",
                fruit_or_seed_shape AS "fruitOrSeedShape",
                growth_form AS "growthForm",
                growth_habit AS "growthHabit",
                toxicity`,
      [
        commonName,
        scientificName,
        imageUrl,
        vegetable,
        ediblePart,
        edible,
        flowerColor,
        foliageTexture,
        foliageColor,
        fruitOrSeedColor,
        fruitOrSeedShape,
        growthForm,
        growthHabit,
        toxicity
      ]
    );
    const plant = result.rows[0];
    return plant;
  }

  // Get a plant
  static async get(scientificName) {
    const plantRes = await db.query(
      `SELECT id,
              common_name AS "commonName",
              scientific_name AS "scientificName",
              image_url AS "imageUrl",
              vegetable,
              edible_part AS "ediblePart",
              edible,
              flower_color AS "flowerColor",
              foliage_texture AS "foliageTexture",
              foliage_color AS "foliageColor",
              fruit_or_seed_color AS "fruitOrSeedColor",
              fruit_or_seed_shape AS "fruitOrSeedShape",
              growth_form AS "growthForm",
              growth_habit AS "growthHabit",
              toxicity
       FROM plants
       WHERE scientific_name = $1`,
      [scientificName]
    );
    const plant = plantRes.rows[0];

    if (!plant) throw new NotFoundError(`No plant: ${scientificName}`);

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
    return {message: `Plant ${scientificName} successfully removed.`};
  }
  static async removePlantFromList(scientificName, listName) {
    const result = await db.query(
      `DELETE
       FROM listPlant
       WHERE plant_scientific_name = $1 AND list_name = $2
       RETURNING plant_scientific_name AS "scientificName", list_name AS "listName"`,
      [scientificName, listName]
    );
    const plant = result.rows[0];
    if (!plant) throw new NotFoundError(`No plant: ${scientificName} in ${listName}`);
    return {message: `Plant ${scientificName} successfully removed from ${listName}.`};
  }
}

module.exports = Plant;