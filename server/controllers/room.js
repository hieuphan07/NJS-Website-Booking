const Room = require('../models/room');

exports.getRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		console.log(err);
	}
};

exports.getRoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		return res.status(200).json(room);
	} catch (err) {
		next(err);
	}
};
