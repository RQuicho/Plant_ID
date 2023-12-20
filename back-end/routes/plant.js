"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const {createToken} = require("../helpers/tokens");
const Plant = require("../models/plant");
const plantNewSchema = require("../schemas/plant/plantNew.json");
const {BadRequestError} = require("../expressError");

const {getScientificNameFromImage} = require("./plantImg");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
// const upload = multer({dest: 'uploads/'});


// Upload a photo and use API to id image
// from myplantnet.org/docs and multer docs
router.post('/upload', upload.single('plantImg'), async (req, res, next) => {
  try {
    console.log('req.file:', req.file);
    if (!req.file) {
      return res.status(400).json({error: 'No file uploaded'});
    }
    const scientificName = await getScientificNameFromImage(req.file);
		return res.status(201).json({scientificName});
  } catch (err) {
    console.error('Error', err);
    return next(err);
  }
});


// // GET id and name of plant from api list
// router.get("/", async (req, res, next) => {
//   const scientificName = req.query.scientificName;
//   try {
//     const plantData = await axios.get(`https://perenual.com/api/species-list?key=${PLANT_INFO_API_KEY}&q=${scientificName}`);
//     return res.json({plantData});
//   } catch (err) {
//     console.error('error', err);
//     return next(err);
//   }
// });

module.exports = router;