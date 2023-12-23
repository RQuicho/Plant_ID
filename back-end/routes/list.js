"use strict";

const express = require("express");
const router = new express.Router();
const List = require("../models/list");
const jsonschema = require("jsonschema");
const listNewSchema = require("../schemas/list/listNew.json");
const { BadRequestError } = require("../expressError");

router.post('/', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, listNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const list = await List.create(req.body);
    return res.status(201).json({list});
  } catch (err) {
    // console.error('Error:', err);
    return next(err);
  }
});

router.get('/:name', async (req, res, next) => {
  try {
    const list = await List.get(req.params.name);
    return res.json({list});
  } catch (err) {
    // console.error('Error:', err);
    return next(err);
  }
});

module.exports = router;