"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const {createToken} = require("../helpers/tokens");
const Plant = require("../models/plant");
const plantNewSchema = require("../schemas/plant/plantNew.json");
const {BadRequestError, NotFoundError} = require("../expressError");
const {PLANT_INFO_API_KEY} = require("../my_secret");

const {getScientificNameFromImage} = require("./plantImg");
const multer = require("multer");
const axios = require("axios");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Upload a photo and use API to id image
// from myplantnet.org/docs and multer docs
router.post('/upload', upload.single('plantImg'), async (req, res, next) => {
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
    console.log('scientificName:', scientificName);
		// return res.status(201).json({scientificName});

    const plantData = await axios.get(`https://trefle.io/api/v1/plants/search?token=${PLANT_INFO_API_KEY}&q=${scientificName}`);
    // console.log('plantData:', plantData);
    const foundPlantId = plantData.data.data[0].id;
    console.log('foundPlantId:', foundPlantId);
    // return res.json({foundPlantId});
    if (!plantData.data.data || plantData.data.data.length === 0) throw new NotFoundError("No plant found");

    const plantDetails = await axios.get(`https://trefle.io/api/v1/plants/${foundPlantId}?token=${PLANT_INFO_API_KEY}`);
    const common_name = plantDetails.data.data.common_name;
    console.log('common_name:', plantDetails.data.data.common_name);
    return res.status(201).json({common_name});

  } catch (err) {
    console.error('Error', err);
    return next(err);
  }
});

// router.get('/details', async (req, res, next) => {
//   // stringify result from json to string

//   try {
    
//   } catch (err) {
//     console.error('Error', err);
//     return next(err);
//   }
// });


module.exports = router;