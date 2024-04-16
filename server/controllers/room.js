const Room = require('../models/room');
const Hotel = require('../models/hotel');

// get rooms
exports.getRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		console.log(err);
	}
};

// get room
exports.getRoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		return res.status(200).json(room);
	} catch (err) {
		next(err);
	}
};

// create room
exports.createRoom = async (req, res, next) => {
	try {
		const { hotelId, ...otherRoomDetail } = req.body;

		const newRoom = new Room({ ...otherRoomDetail });
		const savedRoom = await newRoom.save();

		if (hotelId === 'Select hotel') {
			res.status(200).send('Room has been created');
		} else {
			try {
				await Hotel.findByIdAndUpdate(hotelId, {
					$push: { rooms: savedRoom },
				});
				res.status(200).send('Room has been created and added to hotel');
			} catch (err) {
				next(err);
			}
		}
	} catch (err) {
		next(err);
	}
};

// delete room
exports.deleteRoom = async (req, res, next) => {
	const roomId = req.params.id;

	try {
		const hotels = await Hotel.find();
		// Find hotel contains the deleting room
		const hotelIndex = hotels.findIndex((hotel) => {
			const existedIndexRoom = hotel.rooms.findIndex(
				(room) => room._id.toString() === roomId.toString()
			);
			if (existedIndexRoom >= 0) {
				return true;
			} else {
				return false;
			}
		});

		// Remove the deleting room from hotel
		if (hotelIndex >= 0) {
			try {
				const hotelId = hotels[hotelIndex]._id;
				await Hotel.findByIdAndUpdate(hotelId, {
					$pull: { rooms: roomId },
				});
			} catch (err) {
				next(err);
			}
		}

		// Delete room
		await Room.findByIdAndDelete(roomId);
		res.status(200).json('Room has been deleted.');
	} catch (err) {
		next(err);
	}
};

// update room
exports.updateRoom = async (req, res, next) => {
	const { hotelId, ...otherRoomDetail } = req.body;

	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{ $set: otherRoomDetail },
			{ new: true }
		);

		// Check inputed hotel
		if (!hotelId || hotelId === 'Select hotel') {
			res.status(200).send('Room has been updated');
		} else {
			try {
				await Hotel.findByIdAndUpdate(hotelId, {
					$push: { rooms: updatedRoom },
				});
				res.status(200).send('Room has been updated and added to hotel');
			} catch (err) {
				next(err);
			}
		}
	} catch (err) {
		next(err);
	}
};
