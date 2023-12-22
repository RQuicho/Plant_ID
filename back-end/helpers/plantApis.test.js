"use strict";

const request = require("supertest");
const {getScientificNameFromImage, getPlantData, createPlant} = require("./plantApis");
const axios = require('axios');
const PLANT_INFO_API_KEY = require("../my_secret");

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

jest.mock('axios');

describe('getScientificNameFromImage', () => {
  test('should return the scientific name on successful identification', async () => {
    const mockFile = {
      buffer: Buffer.from('fakeImageData'),
      originalname: 'fakeImage.jpg',
      mimetype: 'image/jpeg',
    };
    const mockApiResponse = {
      status: 200,
      data: {
        results: [
          {
            species: {
              scientificNameWithoutAuthor: 'Fake Scientific Name',
            },
          },
        ],
      },
    };
    axios.post.mockResolvedValue(mockApiResponse);
    const result = await getScientificNameFromImage(mockFile);
    expect(result).toBe('Fake Scientific Name');
  });
});

// describe('getPlantData', () => {
//   test('should return plant data from trefle api', async () => {
//     const scientificName = 'Strelitzia reginae';
//     const response = await getPlantData(scientificName);
//     expect(response).toBeDefined();
//     expect(typeof response).toBe('object');
//     expect(response.common_name).toEqual('Bird of paradise');
//     expect(response.image_url).toEqual('https://bs.plantnet.org/image/o/e4f2713e640f0a4d549e9517b5c3f0f12b531188');   
//   });
// });

describe('getPlantData', () => {
  test('should return plant data from trefle api', async() => {
    const data = {    
      id: 150762,
      common_name: "Bird of paradise",
      scientific_name: "Strelitzia reginae",
      image_url: "https://bs.plantnet.org/image/o/e4f2713e640f0a4d549e9517b5c3f0f12b531188",
    };
    // axios.get.mockResolvedValue((response));
    const result = await getPlantData('Strelitzia reginae');
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect(result.common_name).toEqual('Bird of paradise');
    expect(result.image_url).toEqual('https://bs.plantnet.org/image/o/e4f2713e640f0a4d549e9517b5c3f0f12b531188');
  });
});

// describe('getPlantData', () => {
//   test('should return plant data from trefle api', async () => {
//     const scientificName = 'Strelitzia reginae';
//     const mockApiResponse = {
//       data: {
//         common_name: "Bird of paradise",
//         scientific_name: "Strelitzia reginae",
//         image_url: "https://bs.plantnet.org/image/o/e4f2713e640f0a4d549e9517b5c3f0f12b531188",
//       }
//     };
//     axios.post.mockResolvedValue(mockApiResponse);
//     const result = await getPlantData(scientificName);
//     expect(result.common_name).toEqual('Bird of paradise');
//   });
// });


describe('createPlant', () => {
  test('should create a plant in the database', async () => {
    const plantData = {
      id: 150762,
		  common_name: "Bird of paradise",
		  scientific_name: "Strelitzia reginae",
		  vegetable: false,
		  image_url: "https://bs.plantnet.org/image/o/e4f2713e640f0a4d549e9517b5c3f0f12b531188",
		  edible_part: null,
		  edible: false,
      flower: {
        color: null,
      },
      foliage: {
        texture: null,
        color: null,
      },
      fruit_or_seed: {
        color: null,
        shape: null,
      },
      specifications: {
        growth_form: null,
        growth_habit: null,
        toxicity: null,
      }
    };
      const plant = await createPlant(plantData);
      expect(plant).toBeDefined();
      expect(plant.commonName).toEqual('Bird of paradise');
      expect(plant.toxicity).toEqual(null);
    });
  });