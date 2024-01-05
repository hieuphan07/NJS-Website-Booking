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

exports.countByCity = async (req, res, next) => {
	const cities = req.query.cities.split(',');
	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city });
			})
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};

exports.countByType = async (req, res, next) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
		const apartmentsCount = await Hotel.countDocuments({ type: 'apartments' });
		const resortsCount = await Hotel.countDocuments({ type: 'resorts' });
		const villasCount = await Hotel.countDocuments({ type: 'villas' });
		const cabinsCount = await Hotel.countDocuments({ type: 'cabins' });

		res.status(200).json([
			{ name: 'hotel', count: hotelCount },
			{ name: 'apartments', count: apartmentsCount },
			{ name: 'resorts', count: resortsCount },
			{ name: 'villas', count: villasCount },
			{ name: 'cabins', count: cabinsCount },
		]);
	} catch (err) {
		next(err);
	}
};
