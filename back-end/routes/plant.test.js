"use strict";

const request = require("supertest");
const app = require("../app");
const PLANT_INFO_API_KEY = require("../my_secret");
const axios = require("axios");
const Plant = require("../models/plant");
const db = require("../db");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  user1Token,
  user2Token,
  user3Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// POST plants/upload
describe("POST /plants/upload", function() {
  const scientificName = 'Strelitzia reginae';
  test("works", async function() {
    const plantData = await axios.get(`https://trefle.io/api/v1/plants/search?token=${PLANT_INFO_API_KEY}&q=${scientificName}`);
    const foundPlantId = plantData.data.data[0].id;
    const plantDetails = await axios.get(`https://trefle.io/api/v1/plants/${foundPlantId}?token=${PLANT_INFO_API_KEY}`);
    const common_name = plantDetails.data.data.common_name;
    const scientific_name = plantDetails.data.data.scientific_name;
    const image_url = plantDetails.data.data.image_url;
    const plant = await Plant.create({common_name,
                                      scientific_name,
                                      image_url});
    const foundPlant = await db.query("SELECT * FROM plants WHERE common_name = 'Bird of paradise'");
          
    expect(foundPlantId).toEqual(150762);
    expect(common_name).toEqual('Bird of paradise');
    expect(plantDetails.data.data.image_url).toEqual('"https://bs.plantnet.org/image/o/e4f2713e640f0a4d549e9517b5c3f0f12b531188');
    expect(foundPlant.rows.length).toEqual(1);
    epxect(foundPlant.rows[0].common_name).toEqual("Bird of Paradise");
  });
});