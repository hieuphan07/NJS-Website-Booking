const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	distance: {
		type: Number,
		required: true,
	},
	photos: {
		type: [{ type: String, required: true }],
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	featured: {
		type: Boolean,
		required: true,
	},
	rooms: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Room',
			required: true,
		},
	],
});

module.exports = mongoose.model('Hotel', hotelSchema);
