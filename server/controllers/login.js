const User = require('../models/user');
const { isValidEmail } = require('../util/validation');
const bcrypt = require('bcrypt');
const createError = require('../util/error');

// post login
exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	let errors = {};
	let authToken;

	try {
		const emailValid = isValidEmail(email);

		if (!emailValid) errors.validEmail = 'Email is not valid';

		const user = await User.findOne({ email: req.body.email });
		if (!user) return next(createError(404, 'User not found'));

		const isPasswordCorrect = await bcrypt.compare();

		// if (emailValid) {
		// 	const [loggingUser] = await User.find({ email: email });
		// 	if (loggingUser) {
		// 		const isPasswordCorrect = await bcrypt.compare(
		// 			password,
		// 			loggingUser.password
		// 		);
		// 		if (isPasswordCorrect) {
		// 			authToken = createJSONToken(loggingUser.email, loggedInUser.isAdmin);
		// 		} else {
		// 			errors.password = 'Wrong password or user.';
		// 		}
		// 	} else {
		// 		errors.email = 'Wrong password or user.';
		// 	}
		// } else {
		// 	errors.validEmail = 'Email is not valid.';
		// }
		if (Object.values(errors).length > 0) {
			return res.status(422).json({
				message: 'Invalid credentials.',
				errors: errors,
			});
		} else {
			return res.json({ token: authToken, user: {} });
		}
	} catch (err) {
		next(err);
	}
};
