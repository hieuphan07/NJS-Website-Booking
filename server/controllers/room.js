const Room = require('../models/room');

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
	console.log(req.body);
	res.status(200).send('Room has been created.');
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
