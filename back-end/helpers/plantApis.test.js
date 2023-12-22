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

describe('getPlantData', () => {
  test('should return plant data from trefle api', async () => {
    const scientificName = 'Strelitzia reginae';
    const response = await getPlantData(scientificName);
    expect(response).toBeDefined();
    expect(typeof response).toBe('object');
    expect(response.common_name).toEqual('Bird of paradise');
    expect(response.image_url).toEqual('https://bs.plantnet.org/image/o/e4f2713e640f0a4d549e9517b5c3f0f12b531188');   
  });
});

// describe('getPlantData', () => {
//   test('should return plant data from trefle api', async() => {
//     const apiKey = PLANT_INFO_API_KEY;
//     const response = {
//       data: {
//         data: {
//           id: 150827,
// 		      common_name: "Bird of paradise",
// 		      scientific_name: "Strelitzia reginae"
//         }
//       }
//     };
//     axios.get.mockImplementationOnce(() => Promise.resolve(response));
//     const result = await getPlantData('Strelitzia reginae', apiKey);
//     expect(result).toEqual(response.data.data);
//   });
// });


// describe('createPlant', () => {
//   test('should create a plant in the database', async () => {
//     const plantData = {
//       common_name: 'Test Plant',
// 			scientific_name: 'Test Plant in Latin',
// 			image_url: 'https://thumbs.dreamstime.com/b/test-plant-samples-microscope-slide-close-up-laboratory-80350262.jpg',
//       vegetable: null,
// 			edible_part: null,
// 			edible: false,
// 			flower_color: 'green',
// 			foliage_texture: 'smooth',
// 			foliage_color: 'green',
// 			fruit_or_seed_color: null,
// 			fruit_or_seed_shape: null,
// 			growth_form: null,
// 			growth_habit: null,
// 			toxicity: null
//     };
//     const plant = await createPlant(plantData);
//     expect(plant.common_name).toEqual('Test Plant');
//   });
// });