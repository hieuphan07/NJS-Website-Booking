const Hotel = require('../models/hotel');

exports.getHotels = (req, res, next) => {
	Hotel.find()
		.then((hotels) => {
			res.json(hotels);
		})
		.catch((err) => {
			console.log(err);
		});
};
