const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/uploads', require('./routes/api/uploads'));

app.listen(port, () => {
	console.log(`app is running on port: ${port}`);
});
