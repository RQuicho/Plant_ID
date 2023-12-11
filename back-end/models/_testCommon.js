const bcrypt = require("bcrypt");
const db = require("../db");
const {BCRYPT_WORK_FACTOR} = require("../config");

const testListNames = [];
const testPlantIds = [];

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

  const resultsIds = await db.query(`
    INSERT INTO plants(common_name,
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
    VALUES ('European Silver Fir',
            'Abies alba',
            'tree',
            'true',
            'green',
            'false',
            'false',
            'red',
            'true',
            'yellow',
            'false',
            'false',
            'false',
            'false',
            'Amazing garden plant that is sure to capture attention...',
            'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg')
    RETURNING id`);
  testPlantIds.splice(0, 0, ...resultsIds.rows.map(r => r.id));

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
    INSERT INTO listPlant(list_name, plant_id)
    VALUES ($1, $2)`,
    [testListNames[0], testPlantIds[0]]);
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
  testListNames
};