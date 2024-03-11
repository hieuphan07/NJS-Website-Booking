const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: Number,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamp: true }
);

module.exports = mongoose.model('User', userSchema);
