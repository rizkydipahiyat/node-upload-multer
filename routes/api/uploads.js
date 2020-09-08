const express = require('express');
const router = express.Router();
const multer = require('multer');

// multer
const multerDiskStorage = multer.diskStorage({
	// destinasi penyimpanan ke dalam folder uploads
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		const originalName = file.originalname;

		// untuk menentukan jenis filenya jpg, png, or svg.
		const nameArr = originalName.split('.');
		var extension = '';
		if (nameArr.length > 1) {
			extension = nameArr[nameArr.length - 1];
		}

		// picture-97879858798797.jpg
		cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
	},
});

const multerUpload = multer({ storage: multerDiskStorage });
router.get('/', (req, res, next) => {
	res.json({
		message: 'app is running',
	});
});

router.post('/upload', multerUpload.single('picture'), (req, res, next) => {
	const picture = req.file;
	if (!picture) {
		res.status(400).json({ message: 'picture cannot be empty' });
		return;
	}
	res.send(picture);
});

module.exports = router;
