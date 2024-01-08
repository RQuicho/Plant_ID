const bcrypt = require("bcrypt");
const db = require("../db");
const {BCRYPT_WORK_FACTOR} = require("../config");

const testListNames = [];
const testPlantNames = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM lists");
  await db.query("DELETE FROM plants");

  const resultsLists = await db.query(`
    INSERT INTO lists(name, description)
    VALUES ('list1', 'test for list1'),
           ('list2', 'test for list2'),
           ('list3', 'test for list3')
    RETURNING name`);
  testListNames.splice(0, 0, ...resultsLists.rows.map(r => r.name));

  const resultsPlants = await db.query(`
    INSERT INTO plants(common_name,
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
    VALUES ('Angels trumpet',
            'Brugmansia candida',
            'https://bs.plantnet.org/image/o/5ce4a5a2cfe26392e7356b0bc4a87dce4652ecf2',
            'false',
            null,
            false,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null)
    RETURNING scientific_name`);
  testPlantNames.splice(0, 0, ...resultsPlants.rows.map(r => r.scientific_name));

  await db.query(`
    INSERT INTO users(username, first_name, last_name, password, email)
    VALUES ('user1', 'Jane', 'Doe', $1, 'user1@email.com'),
           ('user2', 'John', 'Deer', $2, 'user2@email.com')
    RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]);

  await db.query(`
    INSERT INTO userList(username, list_name)
    VALUES ('user1', $1)`,
    [testListNames[0]]);

  await db.query(`
  INSERT INTO userList(username, list_name)
  VALUES ('user1', $1)`,
  [testListNames[2]]);

  await db.query(`
    INSERT INTO listPlant(list_name, plant_scientific_name)
    VALUES ($1, $2)`,
    [testListNames[0], testPlantNames[0]]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testListNames,
  testPlantNames
};