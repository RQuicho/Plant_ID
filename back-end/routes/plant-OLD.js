"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const {createToken} = require("../helpers/tokens");
const Plant = require("../models/plant");
const plantNewSchema = require("../schemas/plant/plantNew.json");
const {BadRequestError} = require("../expressError");

const {getScientificNameFromImages} = require("./plantImg");
const multer = require("multer");
const upload = multer({dest: 'uploads/'});


// Upload a photo and use API to id image
// from myplantnet.org/docs and multer docs
router.post('/upload', upload.array('images', 5), async (req, res, next) => {
  console.log(req.files);
  const images = req.files.map(file => ({
    fieldname: file.fieldname,
    originalname: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    buffer: file.buffer,
  }));
  try {
    const scientificName = await getScientificNameFromImages(images);
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