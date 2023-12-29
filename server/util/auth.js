const jwt = require('jsonwebtoken');

const KEY = 'supersecret';

function createJSONToken(email) {
	return jwt.sign({ email }, KEY, { expiresIn: '1h' });
}

exports.createJSONToken = createJSONToken;
