"use strict";

const request = require("supertest");
const app = require("../app");

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

// POST auth/token
describe("POST /auth/token", function() {
  test("works", async function() {
    const res = await request(app)
      .post("/auth/token")
      .send({
        username: 'user1',
        password: '1password'
      });
    expect(res.body).toEqual({
      "token": expect.any(String)
    });
  });
  test("unauth with non-existent user", async function() {
    const res = await request(app)
      .post("/auth/token")
      .send({
        username: 'not a user',
        password: '1password'
      });
   expect(res.statusCode).toEqual(401);
  });
  test("unauth with wrong password", async function() {
    const res = await request(app)
      .post("/auth/token")
      .send({
        username: 'user1',
        password: 'wrong pw'
      });
    expect(res.statusCode).toEqual(401);
  });
  test("bad request with missing data", async function() {
    const res = await request(app)
      .post("/auth/token")
      .send({
        username: 'user1'
      });
    expect(res.statusCode).toEqual(400);
  });
  test("bad request with invalid data", async function() {
    const res = await request(app)
      .post("/auth/token")
      .send({
        username: 'user1',
        password: 24
      });
    expect(res.statusCode).toEqual(400);
  });
});

// POST auth/register
describe("POST /auth/register", function() {
  test("works", async function() {
    const res = await request(app)
      .post("/auth/register")
      .send({
        username: 'testUser', 
        firstName: 'testFN',
        lastName: 'testLN',
        password: 'testPWD',
        email: 'test@email.com'
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({
        "token": expect.any(String)
      });
  });
  test("bad request with missing data", async function() {
    const res = await request(app)
      .post("/auth/register")
      .send({
        username: 'testUser'
      });
      expect(res.statusCode).toEqual(400);
  });
  test("bad request with invalid data", async function() {
    const res = await request(app)
    .post("/auth/register")
    .send({
      username: 'testUser', 
      firstName: 'testFN',
      lastName: 254,
      password: 'testPWD',
      email: 'test@email.com'
    });
    expect(res.statusCode).toEqual(400);
  });
});