const jwt = require('jsonwebtoken');

const KEY = 'supersecret';

function createJSONToken(email, isAdmin) {
	return jwt.sign({ email, isAdmin }, KEY, { expiresIn: '1h' });
}

function verifyEmail(token) {
	return jwt.verify(token, KEY);
}

exports.createJSONToken = createJSONToken;
exports.verifyEmail = verifyEmail;
