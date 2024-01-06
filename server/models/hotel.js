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
		type: [String],
	},
	title: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
	rooms: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Room',
			required: true,
		},
	],
	cheapestPrice: {
		type: Number,
		required: true,
	},
	featured: {
		type: Boolean,
		required: false,
	},
});

module.exports = mongoose.model('Hotel', hotelSchema);
