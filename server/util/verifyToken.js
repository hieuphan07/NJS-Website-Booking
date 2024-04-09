const jwt = require('jsonwebtoken');
const createError = require('../util/error');

exports.verifyToken = async (req, res, next) => {
	const token = req.body.token;
	console.log(token);
	if (!token) return next(createError(401, 'You are not authenticated!'));

	jwt.verify(token, 'supersecret', (err, user) => {
		if (err) return next(createError(403, 'Token is not valid'));
		req.user = user;
		next();
	});
};
