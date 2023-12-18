"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const {createToken} = require("../helpers/tokens");
const Plant = require("../models/plant");
const plantNewSchema = require("../schemas/plant/plantNew.json");
const {BadRequestError} = require("../expressError");

const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams
const {PLANT_IMAGE_API_KEY} = require("../my_secret");
const multer = require("multer");
const storage = multer.memoryStorage(); // stores files in memory
const upload = multer({storage: storage});


// Upload a photo and use API to id image
router.post('/upload', upload.array('photos', 5), async (req, res, next) => {
  try {
    const form = new FormData();

    for (const file of req.files) {
      form.append('photos', file.buffer, {filename: file.originalname});
    }

    const project = 'all';
    const {data} = await axios.post(
      `https://my-api.plantnet.org/v2/identify/${project}?api-key=${PLANT_IMAGE_API_KEY}`,
    form, {
      headers: form.getHeaders()
    });

    const scientificName = data.results[0].species.scientificNameWithoutAuthor;
		console.log('scientificName:', scientificName);
		return res.status(201).json({scientificName});

  } catch (err) {
    console.error('error', err);
    return next(err);
  }
});


// GET
// router.get("/", async function(req, res, next) {

// })