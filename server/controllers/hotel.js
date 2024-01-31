const Hotel = require('../models/hotel');
const Room = require('../models/room');
const Transaction = require('../models/transaction');

// get ALL hotels
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

// get count properties by city
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

// get count properties by type
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

// get hotel
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

//  get search hotels
exports.searchHotels = async (req, res, next) => {
	const { city, startDate, endDate, numberOfPeople, minPrice, maxPrice } =
		req.query;
	console.log(city, startDate, endDate, numberOfPeople, minPrice, maxPrice);

	try {
		const hotels = await Hotel.aggregate([
			// Match hotels in the specified city
			{ $match: { city: new RegExp(`^${city}$`, 'i') } },
			// Match hotels within the price range
			{
				$match: {
					cheapestPrice: {
						$gte: parseInt(minPrice),
						$lte: parseInt(maxPrice),
					},
				},
			},

			// Populate the rooms using $lookup
			{
				$lookup: {
					from: 'rooms',
					let: { rid: '$rooms' },
					pipeline: [
						{
							$match: {
								$expr: {
									$in: [
										'$_id',
										{
											$map: {
												input: '$$rid',
												in: { $toObjectId: '$$this' },
											},
										},
									],
								},
							},
						},
					],
					as: 'populatedRooms',
				},
			},

			// Unwind the rooms array to process each room
			{
				$unwind: '$populatedRooms',
			},

			// Match rooms that can accommodate the requested number of people and within the price range
			{
				$match: {
					'populatedRooms.maxPeople': { $gte: parseInt(numberOfPeople) },
				},
			},

			// Unwind the roomNumbers array to process each room number
			{ $unwind: '$populatedRooms.roomNumbers' },

			// Match room numbers that are available for the given date range
			{
				$match: {
					$or: [
						{ 'populatedRooms.roomNumbers.unavailableDates': { $size: 0 } }, // Room with no unavailable dates
						{
							'populatedRooms.roomNumbers.unavailableDates': {
								$not: {
									$elemMatch: {
										startDate: { $lte: endDate },
										endDate: { $gte: startDate },
									},
								},
							},
						},
					],
				},
			},

			// Group the results back by hotel ID
			{
				$group: {
					_id: '$_id',
					address: { $first: '$address' },
					cheapestPrice: { $first: '$cheapestPrice' },
					city: { $first: '$city' },
					desc: { $first: '$desc' },
					distance: { $first: '$distance' },
					featured: { $first: '$featured' },
					name: { $first: '$name' },
					photos: { $first: '$photos' },
					rooms: { $push: '$populatedRooms' },
					title: { $first: '$title' },
					type: { $first: '$type' },
					rating: { $first: '$rating' },
				},
			},
		]).exec();

		return res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};

// post reserve booking
exports.reserveBooking = async (req, res, next) => {
	const transaction = req.body;
	try {
		// create a new transaction
		Transaction.create(transaction);
		// update unavailable date for booked hotel
		const hotelInDb = await Hotel.findByIdAndUpdate(req.body.hotelId);
		for (let room of transaction.rooms) {
			// find rooms in database matches to transaction
			const roomIdInDb = hotelInDb.rooms.find(
				(item) => item.toString() === room.roomId.toString()
			);
			const roomInDb = await Room.findById(roomIdInDb);
			for (let roomNumber of room.roomNumbers) {
				// find room numbers in database matches to transaction
				const roomNumberInDb = roomInDb.roomNumbers.find(
					(item) => item.number === roomNumber
				);
				// update unavailable date
				roomNumberInDb.unavailableDates.push({
					startDate: transaction.startDate,
					endDate: transaction.endDate,
				});
			}
			roomInDb.save();
		}
		return res.json({ message: 'Transaction created' });
	} catch (err) {
		next(err);
	}
};
