"use strict";

const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");
const {UnauthorizedError} = require("../expressError");

const authenticateJWT = (req, res, next) => {
  try {
    const tokenFromBody = req.body._token;
    const payload = jwt.verify(tokenFromBody, SECRET_KEY);
    req.user = payload;
    return next();
  } catch (err) {
    return next();
  }
}

const ensureLoggedIn = (req, res, next) => {
  try {
    if (!req.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

const ensureCorrectUser = (req, res, next) => {
  try {
    if (req.user.username === req.params.username) {
      return next();
    } else {
      throw new UnauthorizedError();
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser
}