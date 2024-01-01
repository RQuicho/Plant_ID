"use strict";

const express = require("express");
const cors = require("cors");
const {NotFoundError} = require("./expressError");
const {authenticateJWT} = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const plantRoutes = require("./routes/plant");
const listRoutes = require("./routes/list");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/plants", plantRoutes);
app.use("/lists", listRoutes);
app.use("/users", userRoutes);


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