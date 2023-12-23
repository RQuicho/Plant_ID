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
  testListNames,
  user1Token,
  user2Token,
  user3Token
} = require("./_testCommon");
const { getScientificNameFromImage, getPlantData, createPlant } = require("../helpers/plantApis");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// POST /lists/
describe('POST /lists', () => {
  test('works', async () => {
    const newList = {
      name: 'Test List',
      description: 'Description of Test List',
    };
    const resp = await request(app)
      .post('/lists')
      .send(newList);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      list: newList,
    });
  });
  test('throws error without reqired data', async() => {
    const newList = {
      description: 'Description of Test List',
    };
    const resp = await request(app)
      .post('/lists')
      .send(newList);
    expect(resp.statusCode).toEqual(400);
  });
  test('throws error if duplicate list', async() => {
    const dupList = {
      name: 'List1',
      description: 'Description for test list 1',
    };
    const resp = await request(app)
      .post('/lists')
      .send(dupList);
    expect(resp.statusCode).toEqual(400);
  });
});

// GET /lists/:name
describe('GET /lists/:name', () => {
  test('works', async () => {
    const resp = await request(app).get(`/lists/List1`);
    expect(resp.body).toHaveProperty('list.name', 'List1');
    expect(resp.body.list).toHaveProperty('description');
    expect(resp.body.list).toHaveProperty('listplant');
  });
  test('throws error with no existing list', async() => {
    const resp = await request(app).get('/lists/nope');
    expect(resp.statusCode).toEqual(404);
  })
});

// UPDATE /lists/:name
describe('UPDATE /lists/:name', () => {
  test('works', async() => {
    const resp = await request(app)
      .patch('/lists/List1')
      .send({
        description: 'updated description for list 1',
      });
    expect(resp.body).toEqual({
      list: {
        name: 'List1',
        description: 'updated description for list 1',
      }
    });
  });
  test('thows error if trying to change list name', async() => {
    const resp = await request(app)
    .patch('/lists/List1')
    .send({
      name: 'NewList1',
    });
  expect(resp.statusCode).toEqual(500);
  });
});

// DELETE /lists/:name
describe('DELETE /lists/:name', () => {
  test('works', async() => {
    const resp = await request(app)
      .delete('/lists/List1');
    expect(resp.body).toEqual({deleted: 'List1'});
  });
});