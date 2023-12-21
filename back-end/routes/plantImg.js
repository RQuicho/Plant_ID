'use strict';

const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams
const {PLANT_IMAGE_API_KEY} = require("../my_secret");

const getScientificNameFromImage = (async (uploadedFile) => {
	let form = new FormData();
	// console.log('Current working directory:', process.cwd());
	// console.log('Files in the directory:', fs.readdirSync('/home/raymond/Media/'));
	// console.log('uploadedFile.buffer', uploadedFile.buffer);

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
		// console.log('status', status); // should be: 200
		// console.log('data', require('util').inspect(data, false, null, true));

		const scientificName = data.results[0].species.scientificNameWithoutAuthor;
		console.log('scientificName:', scientificName);
		return scientificName;
		} catch (err) {
			console.error('Error:', err.message);
			console.error('Stack trace:', err.stack);
			throw err;
		}
	}
);

module.exports = {getScientificNameFromImage};