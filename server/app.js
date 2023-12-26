const express = require('express');
const app = express();
const serverPort = 5500;

// import third party
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// use third party
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

// import routes
const hotelRoutes = require('./routes/hotel');

// use routes
app.use(hotelRoutes);

app.get('/', (req, res, next) => {
	res.send('Hello Node JS');
});

mongoose
	.connect(
		'mongodb+srv://hieuphan07:FTFv54Bp0UlyWz5q@cluster0.qzgqeqj.mongodb.net/booking?retryWrites=true&w=majority'
	)
	.then((result) => {
		app.listen(serverPort, () => {
			console.log(`Server listening on port ${serverPort}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
