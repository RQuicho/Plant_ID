"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError
} = require("../expressError");
const db = require("../db");
const Plant = require("./plant");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testListNames
} = require("./_testCommon");
const User = require("./user");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// Create
describe("create plant", function() {
  let newPlant = {
    commonName: 'succulent',
    scientificName: 'cactaceae',
    type: 'plant',
    flowers: true,
    color: 'green',
    fruits: false,
    edibleFruit: false,
    fruitColor: 'white',
    leaf: false,
    leafColor: '',
    edibleLeaf: false,
    poisonousToHumans: false,
    poisonousToPets: false,
    thorny: true,
    description: 'description',
    defaultImg: 'https://i.pinimg.com/originals/5a/98/44/5a984454dd37f8f2b7d865f2cec95f25.jpg'
  }
  test("works", async function() {
    let plant = await Plant.create(newPlant);
    expect(plant).toEqual({
      ...newPlant,
      id: expect.any(Number)
    });
  });
});

// GET
describe("get a plant", function() {
  test("works", async function() {
    let plant = await Plant.get('Abies alba');
    expect(plant.commonName).toEqual('European Silver Fir');
    expect(plant.type).toEqual('tree');
    expect(plant.description).toEqual('Amazing garden plant that is sure to capture attention...');
  });
  test("not found if no such plant", async function() {
    try {
      await Plant.get('not a scientific name');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// REMOVE
describe("remove a plant", function() {
  test("works", async function() {
    await Plant.remove('Abies alba');
    const res = await db.query(
      "SELECT * FROM plants WHERE scientific_name='Abies alba'"
    );
    expect(res.rows.length).toEqual(0);
  });
  test("not found if no such plant", async function() {
    try {
      await User.remove("non-existing plant");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});