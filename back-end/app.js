"use strict";

const express = require("express");
const {NotFoundError} = require("./expressError");
const {authenticateJWT} = require("./middleware/auth");


const app = express();




// 404 Error
app.use(function(req, res, next) {
  return next(new NotFoundError());
});

// Generic error handler
app.use(function(err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: {message, status}
  });
});

module.exports = app;