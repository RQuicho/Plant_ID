"use strict";

const express = require("express");
const router = new express.Router();
const {getScientificNameFromImage, getPlantData, createPlant} = require("../helpers/plantApis");
const multer = require("multer");
const Plant = require("../models/plant");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Upload a photo and use API to id image
// from myplantnet.org/docs and multer docs
router.post('/upload', upload.single('plantImg'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: 'No file uploaded in plant.js route'});
    }
    if (req.file.mimetype !== 'image/jpeg') {
      return res.status(400).json({error: 'Incorrect file type. Please upload a jpeg'});
    }
    const scientificName = await getScientificNameFromImage(req.file);
    const plantData = await getPlantData(scientificName);
    await createPlant(plantData);

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