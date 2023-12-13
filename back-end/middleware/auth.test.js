"use strict";

const jwt = require("jsonwebtoken");
const {UnauthorizedError} = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser
} = require("./auth");

const {SECRET_KEY} = require("../config");
const testJwt = jwt.sign({username: "testUser"}, SECRET_KEY);
const badJwt = jwt.sign({username: "testUser"}, "incorrect secret key");

// Authenticate
describe("authenticateJWT", function() {
  test("works: with header", function() {
    expect.assertions(2);
    const req = {headers: {authorization: `Bearer ${testJwt}`}};
    const res = {locals: {}};
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "testUser"
      }
    });
  });
  test("works: no header", function() {
    expect.assertions(2);
    const req = {};
    const res = {locals: {}};
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
  test("works: invalid token", function() {
    expect.assertions(2);
    const req = {headers: {authorization: `Bearer ${badJwt}`}};
    const res = {locals: {}};
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});

// Ensure Logged In
describe("ensureLoggedIn", function() {
  test("works", function() {
    expect.assertions(1);
    const req = {};
    const res = {locals: {user: {username: "testUser"}}};
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });
  test("unauthorized error if not logged in", function() {
    expect.assertions(1);
    const req = {};
    const res = {locals: {}};
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});

// Ensure Correct User
describe("ensureCorrectUser", function() {
  test("works", function() {
    expect.assertions(1);
    const req = {params: {username: "testUser"}};
    const res = {locals: {user: {username: "testUser"}}};
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureCorrectUser(req, res, next);
  });
  test("unauthorized error if incorrect user", function() {
    expect.assertions(1);
    const req = {params: {username: "wrong user"}};
    const res = {locals: {user: {username: "testUser"}}};
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureCorrectUser(req, res, next);
  });
});