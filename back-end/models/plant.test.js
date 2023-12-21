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
    commonName: 'Impala-lily',
    scientificName: 'Adenium obesum',
    imageUrl: 'https://bs.plantnet.org/image/o/6f5723747152abdfcf163ea41f34c7aae8a2f0b9',
    vegetable: false,
    ediblePart: null,
    edible: false,
    flowerColor: null,
    foliageTexture: null,
    foliageColor: null,
    fruitOrSeedColor: null,
    fruitOrSeedShape: null,
    growthForm: null,
    growthHabit: null,
    toxicity: null
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
    let plant = await Plant.get('Brugmansia candida');
    expect(plant.commonName).toEqual('Angels trumpet');
    expect(plant.edible).toEqual(false);
    expect(plant.flowerColor).toEqual(null);
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
    await Plant.remove('Brugmansia candida');
    const res = await db.query(
      "SELECT * FROM plants WHERE scientific_name='Brugmansia candida'"
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