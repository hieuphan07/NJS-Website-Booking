const Hotel = require('../models/hotel');
const Room = require('../models/room');
const Transaction = require('../models/transaction');
const { createError } = require('../util/error');

// create
exports.createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);
	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (err) {
		next(err);
	}
};

// update
exports.updateHotel = async (req, res, next) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedHotel);
	} catch (err) {
		next(err);
	}
};

// delete
exports.deleteHotel = async (req, res, next) => {
	try {
		const updatedHotel = await Hotel.findByIdAndDelete(req.params.id);
		res.status(200).json('Hotel has been deleted');
	} catch (err) {
		next(err);
	}
};

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
	const {
		city,
		startDate,
		endDate,
		numberOfPeople,
		numberOfRoom,
		minPrice,
		maxPrice,
	} = req.query;
	console.log(city, startDate, endDate, numberOfPeople, minPrice, maxPrice);

	try {
		const parsedStartDate = parseInt(startDate);
		const parsedEndDate = parseInt(endDate);
		const parsedMinPrice = parseInt(minPrice, 10);
		const parsedMaxPrice = parseInt(maxPrice, 10);
		const parsedNumberOfPeople = parseInt(numberOfPeople, 10);
		const parsedNumberOfRoom = parseInt(numberOfRoom, 10);

		const hotels = await Hotel.aggregate([
			// Match hotels in the specified city
			{ $match: { city: new RegExp(`^${city}$`, 'i') } }, // regardless of lower or upper case letter
			// Match hotels within the price range
			{
				$match: {
					cheapestPrice: {
						$gte: parsedMinPrice,
						$lte: parsedMaxPrice,
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
			// Unwind populatedRooms
			{
				$unwind: '$populatedRooms',
			},
			// Unwind roomNumbers
			{
				$unwind: '$populatedRooms.roomNumbers',
			},
			// Filter unavailable dates
			{
				$match: {
					$or: [
						{
							'populatedRooms.roomNumbers.unavailableDates': { $size: 0 },
						},
						{
							$nor: [
								{
									'populatedRooms.roomNumbers.unavailableDates.startDate':
										parsedStartDate,
								},
								{
									'populatedRooms.roomNumbers.unavailableDates.endDate':
										parsedEndDate,
								},
							],
						},
					],
				},
			},
			// Group after unwinding
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
					rooms: {
						$push: {
							roomNumber: '$populatedRooms.roomNumbers',
							maxPeople: '$populatedRooms.maxPeople',
						},
					},
					title: { $first: '$title' },
					type: { $first: '$type' },
					rating: { $first: '$rating' },
					totalMaxPeople: { $sum: '$populatedRooms.maxPeople' },
					totalRoom: { $sum: 1 },
				},
			},
			// Match input number of people
			{
				$match: {
					totalMaxPeople: { $gte: parsedNumberOfPeople },
				},
			},
			// Match input number of room
			{
				$match: {
					totalRoom: { $gte: parsedNumberOfRoom },
				},
			},
		]);

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
