"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const {createToken} = require("../helpers/tokens");
const Plant = require("../models/plant");
const plantNewSchema = require("../schemas/plant/plantNew.json");
const {BadRequestError} = require("../expressError");



// GET
// router.get("/", async function(req, res, next) {

// })