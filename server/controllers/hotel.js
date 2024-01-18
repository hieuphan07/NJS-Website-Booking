const Hotel = require('../models/hotel');
const Transaction = require('../models/transaction');

exports.getHotels = async (req, res, next) => {
	try {
		const hotels = await Hotel.find()
			.populate({ path: 'rooms', populate: { path: 'roomNumbers._id' } })
			.exec();
		return res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};

exports.getHotelById = async (req, res, next) => {
	const hotelId = req.params.id;

	try {
		const hotel = await Hotel.findById(hotelId)
			.populate({ path: 'rooms', populate: { path: 'roomNumbers._id' } })
			.exec();
		return res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
};

exports.searchHotels = async (req, res, next) => {
	const seachingCity = req.query.city;

	try {
		const cityHotels = await Hotel.find({ city: seachingCity });
		return res.status(200).json(cityHotels);
	} catch (err) {
		next(err);
	}
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

exports.reserveBooking = async (req, res, next) => {
	const transaction = req.body;
	try {
		// Transaction.create(transaction);
		const hotel = await Hotel.findById(req.body.hotel);
		return res.json(hotel);
	} catch (err) {
		next(err);
	}
};
