const jwt = require('jsonwebtoken');
const { createError } = require('../util/error');

exports.verifyAdmin = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return next(createError(401, 'You are not authenticated!'));
	}

	jwt.verify(token, 'supersecret', (err, user) => {
		if (err) {
			console.log(err);
			return next(createError(403, 'Token is not valid'));
		}

		req.user = user;
		if (req.user.isAdmin) {
			next();
		}
	});
};
