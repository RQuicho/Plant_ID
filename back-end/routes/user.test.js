"use strict";

const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testListNames,
  testPlantIds,
  user1Token,
  user2Token,
  user3Token
} = require("./_testCommon");
const { getScientificNameFromImage, getPlantData, createPlant } = require("../helpers/plantApis");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// POST /users/
describe('POST /users', () => {
  test('works', async () => {
    const newUser = {
      username: 'testU1',
      firstName: 'userFN',
      lastName: 'userLN',
      password: 'password',
      email: 'test@email.com'
    };
    const resp = await request(app)
      .post('/users')
      .send(newUser);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      token: expect.any(String),
      user: {
        username: 'testU1',
        firstName: 'userFN',
        lastName: 'userLN',
        email: 'test@email.com'
      }
    });
  });
  test('throws error without required data', async() => {
    const newUser = {
      username: 'testU1',
      firstName: 'userFN',
      password: 'password',
      email: 'test@email.com'
    };
    const resp = await request(app)
      .post('/users')
      .send(newUser);
    expect(resp.statusCode).toEqual(400);
  });
  test('throws error if duplicate user', async() => {
    const dupUser = {
      username: 'user1', 
      firstName: 'userFN',
      lastName: 'userLN',
      password: 'password',
      email: 'test@email.com'
    };
    const resp = await request(app)
      .post('/users')
      .send(dupUser);
    expect(resp.statusCode).toEqual(400);
  });
});

// GET /users/:username
describe('GET /users/:username', () => {
  test('works', async() => {
    const resp = await request(app).get('/users/user1');
    expect(resp.body).toHaveProperty('user.firstName', '1firstname');
    expect(resp.body).toHaveProperty('user.email', '1@email.com');
    expect(resp.body).toHaveProperty('user.userlist', expect.any(Array));
  });
  test('throws error with no existing user', async() => {
    const resp = await request(app).get('/users/nope');
    expect(resp.statusCode).toEqual(404);
  });
});

// UPDATE /users/:username
describe('UPDATE /users/:username', () => {
  test('works', async() => {
    const resp = await request(app)
      .patch('/users/user1')
      .send({
        email: 'newemail@email.com'
      });
    expect(resp.body).toEqual({
      user: {
        username: 'user1', 
        firstName: '1firstname',
        lastName: '1lastname',
        email: 'newemail@email.com'
      }
    });
  });
  test('throws error if trying to change username', async() => {
    const resp = await request(app)
      .patch('/users/user1')
      .send({
        username: 'newUsername'
      });
    expect(resp.statusCode).toEqual(500);
  });
  test('throws error if no existing user', async() => {
    const resp = await request(app)
      .patch('/users/nope')
      .send({
        firstName: 'newFN'
      });
    expect(resp.statusCode).toEqual(404);
  });
});

// DELETE /users/:username
describe('DELETE /users/:username', () => {
  test('works', async() => {
    const resp = await request(app).delete('/users/user1');
    expect(resp.body).toEqual({deleted: 'user1'});
  });
});

// POST /users/:username/lists/name
describe('POST /users/:username/lists/name', () => {
  test('works', async() => {
    const resp = await request(app)
      .post(`/users/user1/lists/${testListNames[0]}`);
    expect(resp.body).toEqual({added: testListNames[0]});
  });
  test('throws error if user does not exist', async() => {
    const resp = await request(app)
      .post(`/users/nope/lists/${testListNames[0]}`);
    expect(resp.statusCode).toEqual(404);
  });
  test('throws error if list does not exist', async() => {
    const resp = await request(app)
      .post(`/users/user1/lists/nope`);
    expect(resp.statusCode).toEqual(404);
  });
});
