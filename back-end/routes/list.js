"use strict";

const express = require("express");
const router = new express.Router();
const List = require("../models/list");
const jsonschema = require("jsonschema");
const listNewSchema = require("../schemas/list/listNew.json");
const listUpdateSchema = require("../schemas/list/listUpdate.json");
const { BadRequestError } = require("../expressError");

router.post('/', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, listNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const list = await List.create(req.body);
    console.log('list in back end from list route /: ', list); // good
    return res.status(201).json({list});
  } catch (err) {
    console.error('Error in back end from list route:', err);
    return next(err);
  }
});

router.get('/:name', async (req, res, next) => {
  try {
    const list = await List.get(req.params.name);
    console.log('list in back end from list route: ', list);
    return res.json({list});
  } catch (err) {
    // console.error('Error:', err);
    return next(err);
  }
});

router.get('/:name/plants', async (req, res, next) => {
  try {
    const plants = await List.getAllPlants(req.params.name);
    console.log('plants in back end from list route /:name/plants: ', plants);
    return res.json({plants});
  } catch (err) {
    return next(err);
  }
});

router.patch('/:name', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, listUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const list = await List.update(req.params.name, req.body);
    return res.json({list});
  } catch (err) {
    return next(err);
  }
});

router.delete('/:name', async (req, res, next) => {
  try {
    await List.remove(req.params.name);
    return res.json({deleted: req.params.name});
  } catch (err) {
    return next(err);
  }
});


router.post('/:name/plants/:scientificName', async (req, res, next) => {
  try {
    const listName = req.params.name;
    console.log('listName in back end for /:name/plants/:scientificName: ', listName);
    const plantName = req.params.scientificName;
    console.log('plantName in back end for /:name/plants/:scientificName: ', plantName);
    await List.addPlantToList(listName, plantName);
    return res.json({added: plantName});
  } catch (err) {
    console.log('Error in back end for /:name/plants/:id route: ', err);
    return next(err);
  }
});

module.exports = router;