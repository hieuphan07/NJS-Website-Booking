const jwt = require('jsonwebtoken');

const KEY = 'supersecret';

function createJSONToken(email) {
	return jwt.sign({ email }, KEY, { expiresIn: '1h' });
}

function verifyEmail(token) {
	return jwt.verify(token, KEY);
}

exports.createJSONToken = createJSONToken;
exports.verifyEmail = verifyEmail;
