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
router.post('/upload', ensureLoggedIn, upload.single('plantImg'), async (req, res, next) => {
  // check that image is jpeg image.. return some error message
  // check that first call returns proper result before calling next api
  try {
    console.log('req.file:', req.file);
    if (!req.file) {
      return res.status(400).json({error: 'No file uploaded'});
    }
    if (req.file.mimetype !== 'image/jpeg') {
      return res.status(400).json({error: 'Incorrect file type. Please upload a jpeg'});
    }
    const scientificName = await getScientificNameFromImage(req.file);
    // console.log('scientificName:', scientificName);

    const plantData = await getPlantData(scientificName);
    // console.log('plantData:', plantData);
    // return res.status(201).json({plantData});

    const plant = await createPlant(plantData);
    return res.status(201).json({plant});
  
  } catch (err) {
    console.error('Error', err);
    return next(err);
  }
});

router.get('/details/:scientificName', async (req, res, next) => {
  try {
    const scientificName = req.params.scientificName;
    const plantDetails = await Plant.get(scientificName);
    return res.status(200).json({plantDetails});
  } catch (err) {
    console.error('Error', err);
    return next(err);
  }
});

router.delete('/delete/:scientificName', async (req, res, next) => {
  try {
    const scientificName = req.params.scientificName;
    await Plant.remove(scientificName);
    return res.json({deleted: scientificName});
  } catch (err) {
    console.error('Error', err);
    return next(err);
  }
});

module.exports = router;