"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const plantNewSchema = require("../schemas/plant/plantNew.json");
const {BadRequestError, NotFoundError} = require("../expressError");
const {PLANT_INFO_API_KEY} = require("../my_secret");

const {getScientificNameFromImage, getPlantData, createPlant} = require("../helpers/plantApis");
const multer = require("multer");
const axios = require("axios");
const Plant = require("../models/plant");
const { ensureLoggedIn } = require("../middleware/auth");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Upload a photo and use API to id image
// from myplantnet.org/docs and multer docs
router.post('/upload', upload.single('plantImg'), async (req, res, next) => {
  try {
    // console.log('req from back end in routes plant.js /upload:', req);
    console.log('req.file from back end in routes plant.js /upload:', req.file);
    if (!req.file) {
      return res.status(400).json({error: 'No file uploaded in plant.js route'});
    }
    if (req.file.mimetype !== 'image/jpeg') {
      return res.status(400).json({error: 'Incorrect file type. Please upload a jpeg'});
    }
    const scientificName = await getScientificNameFromImage(req.file);
    console.log('scientificName from back end in routes plant.js /upload:', scientificName);

    const plantData = await getPlantData(scientificName);
    console.log('plantData from back end in routes plant.js /upload:', plantData);
    // return res.status(201).json({plantData});

    // const plant = await createPlant(plantData);
    await createPlant(plantData);

    // if (plant === "Plant not created") {
    //   return 
    // }
    // return res.status(201).json({plant});
    return res.status(201).json({plantData});
  
  } catch (err) {
    console.error('Error', err);
    return next(err);
  }
});

router.get('/:scientificName', async (req, res, next) => {
  try {
    const scientificName = req.params.scientificName;
    const plantDetails = await Plant.get(scientificName);
    return res.status(200).json({plantDetails});
  } catch (err) {
    console.error('Error', err);
    return next(err);
  }
});

router.delete('/:scientificName/:listName', async (req, res, next) => {
  try {
    const scientificName = req.params.scientificName;
    const listName = req.params.listName;
    await Plant.removePlantFromList(scientificName, listName);
    return res.json({deleted: scientificName});
  } catch (err) {
    console.error('Error', err);
    return next(err);
  }
});

module.exports = router;