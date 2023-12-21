"use strict";

const request = require("supertest");
const {getScientificNameFromImage} = require("./plantImg");
const axios = require('axios');

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
