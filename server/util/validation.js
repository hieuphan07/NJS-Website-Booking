const User = require('../models/user');

async function isExistingText(key, value) {
	const dataValue = await User.find();
	const existingValue = dataValue.find((data) => {
		return data[key].toString() === value.toString();
	});
	return existingValue;
}

async function isExistingPhone(key, value) {
	const dataValue = await User.find();
	const existingValue = dataValue.find((data) => {
		return Number(data[key]) === Number(value);
	});
	return existingValue;
}

function isValidLength(value, minLength = 1) {
	return value && value.trim().length >= minLength;
}

function isValidEmail(value) {
	return value && value.includes('@') && value.includes('.');
}

exports.isExistingText = isExistingText;
exports.isExistingPhone = isExistingPhone;
exports.isValidLength = isValidLength;
exports.isValidEmail = isValidEmail;
