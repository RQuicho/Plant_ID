"use strict";

const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testPlantNames,
} = require("./_testCommon");

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
  });
  test('throws error with no existing list', async() => {
    const resp = await request(app).get('/lists/nope');
    expect(resp.statusCode).toEqual(404);
  });
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
  test('throws error if trying to change list name', async() => {
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

// POST /lists/:name/plants/:id
describe('POST /lists/:name/plants/:id', () => {
  test('works', async() => {
    const resp = await request(app)
      .post(`/lists/List1/plants/${testPlantNames[0]}`);
    expect(resp.body).toEqual({added: testPlantNames[0]});
  });
  test('throws error if list does not exist', async() => {
    const resp = await request(app)
      .post(`/lists/nope/plants/${testPlantNames[0]}`);
    expect(resp.statusCode).toEqual(404);
  });
  test('throws error if plant does not exist', async() => {
    const resp = await request(app)
      .post(`/lists/List1/plants/123564798`);
    expect(resp.statusCode).toEqual(404);
  });
});