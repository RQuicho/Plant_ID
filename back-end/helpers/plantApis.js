'use strict';

const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams
const {PLANT_IMAGE_API_KEY, PLANT_INFO_API_KEY} = require("../my_secret");
const { NotFoundError } = require('../expressError');
const Plant = require("../models/plant");


// Function that fetches scientific name from plantnet api
const getScientificNameFromImage = (async (uploadedFile) => {
	let form = new FormData();
	form.append('images', uploadedFile.buffer, {
		filename: uploadedFile.originalname,
		contentType: uploadedFile.mimetype,
	});

	const project = 'all';
	try {
		const { status, data } = await axios.post(
			`https://my-api.plantnet.org/v2/identify/${project}?api-key=${PLANT_IMAGE_API_KEY}`,
			form, {
				headers: form.getHeaders()
			}
		);
		const scientificName = data.results[0].species.scientificNameWithoutAuthor;
		return scientificName;
		} catch (err) {
			console.error('Error:', err.message);
			console.error('Stack trace:', err.stack);
			throw err;
		}
	}
);

// Function that fetches data from trefle api
const getPlantData = async (scientificName) => {
	const trefleBaseUrl = "https://trefle.io/api/v1/plants";
	try {
		const response = await axios.get(`${trefleBaseUrl}/search?token=${PLANT_INFO_API_KEY}&q=${scientificName}`);
		if (!response.data.data || response.data.data.length === 0) throw new NotFoundError("No plant found");

		const foundPlantId = response.data.data[0].id;
		const rawData = await axios.get(`${trefleBaseUrl}/${foundPlantId}?token=${PLANT_INFO_API_KEY}`);
		const plantData = rawData.data.data.main_species;
		return plantData;
	} catch (err) {
		console.error('Error:', err.message);
	}
};

// Function that creates a plant in database
const createPlant = async (plantData) => {
	console.log('plantData:', plantData);
	const common_name = plantData.common_name;
	const scientific_name = plantData.scientific_name;
	const image_url = plantData.image_url;
	const vegetable = plantData.vegetable;
	const edible_part = plantData.edible_part;
	const edible = plantData.edible;
	const flower_color = plantData.flower.color;
	const foliage_texture = plantData.foliage.texture;
	const foliage_color = plantData.foliage.color;
	const fruit_or_seed_color = plantData.fruit_or_seed.color;
	const fruit_or_seed_shape = plantData.fruit_or_seed.shape;
	const growth_form = plantData.specifications.growth_form;
	const growth_habit = plantData.specifications.growth_habit;
	const toxicity = plantData.specifications.toxicity;

	try {
		const plant = await Plant.create({
			commonName: common_name,
			scientificName: scientific_name,
			imageUrl: image_url,
			vegetable: vegetable,
			ediblePart: edible_part,
			edible: edible,
			flowerColor: flower_color,
			foliageTexture: foliage_texture,
			foliageColor: foliage_color,
			fruitOrSeedColor: fruit_or_seed_color,
			fruitOrSeedShape: fruit_or_seed_shape,
			growthForm: growth_form,
			growthHabit: growth_habit,
			toxicity: toxicity
		});
		console.log('Created plant:', plant);
		return plant;
	} catch (err) {
		console.error('Error:', err);
		return ('Plant not created');
	}
};

module.exports = {
	getScientificNameFromImage,
	getPlantData,
	createPlant
};