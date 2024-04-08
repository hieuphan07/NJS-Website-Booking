const express = require('express');
const app = express();
const serverPort = 5500;

// import third party
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// use third party
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(session({
  secret: 'superSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true for https
}));

// import routes
const userRoutes = require('./routes/user');
const hotelRoutes = require('./routes/hotel');
const roomRoutes = require('./routes/room');
const transactionRoutes = require('./routes/transaction');

// use routes
app.use(userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/rooms', roomRoutes);
app.use('/transactions', transactionRoutes);

// middleware handle error
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong!';
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
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
