"use strict";

const {getScientificNameFromImage, getPlantData, createPlant} = require("./plantApis");
const axios = require('axios');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");
const { BadRequestError } = require("../expressError");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

jest.mock('axios');

describe('getScientificNameFromImage', () => {
  test('returns scientific from plantnet api', async () => {
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
  test('returns plant data from trefle api', async() => {
    const result = await getPlantData("Strelitzia reginae");
    expect(result).toBeDefined();
    expect(result.common_name).toEqual('Bird of paradise');
    expect(result.image_url).toEqual('https://bs.plantnet.org/image/o/e4f2713e640f0a4d549e9517b5c3f0f12b531188');
  });
});

describe('createPlant', () => {
  test('creates a plant in the database', async () => {
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
    test('throws error if missing required data', async () => {
      const plantData = {
        id: 150762,
        common_name: null,
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
      try {
        await createPlant(plantData);
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });