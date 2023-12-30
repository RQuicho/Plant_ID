"use strict";

const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jsonschema = require("jsonschema");
const userAuthSchema = require("../schemas/user/userAuth.json");
const userRegisterSchema = require("../schemas/user/userRegister.json");
const userUpdateSchema = require("../schemas/user/userUpdate.json");
const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");

router.post('/', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({user, token});
  } catch (err) {
    return next(err);
  }
});

router.get('/:username', async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    return res.json({user});
  } catch (err) {
    return next(err);
  }
});

router.patch('/:username', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.update(req.params.username, req.body);
    return res.json({user});
  } catch (err) {
    return next(err);
  }
});

router.delete('/:username', async (req, res, next) => {
  try {
    await User.remove(req.params.username);
    return res.json({deleted: req.params.username});
  } catch (err) {
    return next(err);
  }
});

// router.get('/:username/lists', async (req, res, next) => {
//   try {
//     const lists = await User.getAllLists(req.params.username);
//     return res.json({lists});
//   } catch (err) {
//     return next(err);
//   }
// });

router.post('/:username/lists/:name', async (req, res, next) => {
  try {
    const listName = req.params.name;
    await User.addListToUser(req.params.username, listName);
    return res.json({added: listName});
  } catch (err) {
    return next(err);
  }
});









module.exports = router;
