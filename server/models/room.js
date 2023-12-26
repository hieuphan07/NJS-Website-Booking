const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	maxPeople: {
		type: Number,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	roomNumbers: {
		type: [{ type: Number, required: true }],
		required: true,
	},
});

module.exports = mongoose.model('Room', roomSchema);
