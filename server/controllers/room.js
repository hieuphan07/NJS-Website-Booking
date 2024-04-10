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
		console.log(otherRoomDetail);
		console.log(hotelId);

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
				// console.log('Hotel process', err);
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
		await Room.findByIdAndDelete(roomId);
		res.status(200).json('Room has been deleted.');
	} catch (err) {
		next(err);
	}
};
