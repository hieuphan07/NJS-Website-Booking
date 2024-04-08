const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
	user: {
		type: Object,
		required: true,
	},
	contact: {
		type: Object,
		required: true,
	},
	hotelId: {
		type: Schema.Types.ObjectId,
		ref: 'Hotel',
		required: true,
	},
	rooms: [
		{
			roomId: {
				type: Schema.Types.ObjectId,
				ref: 'Room',
			},
			roomNumbers: [String],
		},
	],
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	payment: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Transaction', transactionSchema);
