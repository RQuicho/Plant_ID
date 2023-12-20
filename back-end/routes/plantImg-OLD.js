// // from myplantnet.org/docs
// 'use strict';

// const fs = require('fs'); // File System | Node.js
// const axios = require('axios'); // HTTP client
// const FormData = require('form-data'); // Readable "multipart/form-data" streams

// const image_1 = '/data/media/image_1.jpeg';
// const image_2 = '/data/media/image_2.jpeg';

// (async () => {
// let form = new FormData();

// form.append('organs', 'flower');
// form.append('images', fs.createReadStream(image_1));

// form.append('organs', 'leaf');
// form.append('images', fs.createReadStream(image_2));

// const project = 'all'; // try specific floras: 'weurope', 'canada'…

// try {
// const { status, data } = await axios.post(
// 'https://my-api.plantnet.org/v2/identify/' + project + '?api-key=YOUR-PRIVATE-API-KEY-HERE',
// form, {
// 	headers: form.getHeaders()
// }
// );

// console.log('status', status); // should be: 200
// console.log('data', require('util').inspect(data, false, null, true)); // should be: read "Step 6" below
// } catch (error) {
// console.error('error', error);
// }
// })();

/////////////////////////////////////////////////////////////////////////////

'use strict';

const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams
const {PLANT_IMAGE_API_KEY} = require("../my_secret");

const image_1 = '/home/raymond/Media/test_image.jpg';

const getScientificNameFromImages = (async (images) => {
	let form = new FormData();

	// console.log('Current working directory:', process.cwd());
	// console.log('Files in the directory:', fs.readdirSync('/home/raymond/Media/'));

	// form.append('images', fs.createReadStream(image_1));
	images.forEach((image, index) => {
		form.append(`images[${index}]`, image.buffer, {
			filename: image.originalname,
			contentType: image.mimetype,
		});
	});

	const project = 'all';

	try {
		const { status, data } = await axios.post(
			`https://my-api.plantnet.org/v2/identify/${project}?api-key=${PLANT_IMAGE_API_KEY}`,
			form, {
				headers: form.getHeaders()
			}
		);
		console.log('status', status); // should be: 200
		console.log('data', require('util').inspect(data, false, null, true));

		// const scientificName = data.results[0].species.scientificNameWithoutAuthor;
		const scientificName = data.results.map(result => result.species.scientificNameWithoutAuthor);
		console.log('scientificName:', scientificName);
		return scientificName;
		} catch (err) {
			console.error('Error:', err.message);
			console.error('Stack trace:', err.stack);
		}
	}
)();

module.exports = {getScientificNameFromImages};