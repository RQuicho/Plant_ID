"use strict";

const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// POST plants/upload
describe("POST /plants/upload", function() {
  // test("works", async () => {
  //   // ALREADY TESTED -> SEE plantApis.test.js in helpers
  // });
});

// GET plant details
describe('GET /plants/:scientificName', () => {
  test('works', async () => {
    const resp = await request(app).get('/plants/Pineeeetreee');
    expect(resp.body).toEqual({
      plantDetails: {
        id: expect.any(Number),
        commonName: 'Pine Tree',
        scientificName: 'Pineeeetreee',
        imageUrl: 'https://i.pinimg.com/originals/1c/4e/bd/1c4ebddd9cfe015080fcbd25751bbae9.jpg',
        vegetable: false,
        ediblePart: null,
        edible: false,
        flowerColor: null,
        foliageTexture: 'prickly',
        foliageColor: 'green',
        fruitOrSeedColor: null,
        fruitOrSeedShape: null,
        growthForm: null,
        growthHabit: null,
        toxicity: null
      }
    });
  });
});

// DELETE plant
describe('DELETE /plants/:scientificName/:listName', () => {
  test('works', async () => {
    const resp = await request(app).delete('/plants/Pineeeetreee/List1');
    expect(resp.body).toEqual({deleted: 'Pineeeetreee'});
  });
  test('not found for non existing plant', async () => {
    const resp = await request(app).delete('/plants/nope');
    expect(resp.status).toEqual(404);
  })
});