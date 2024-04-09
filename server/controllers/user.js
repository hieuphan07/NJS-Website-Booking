const User = require('../models/user');
const {
	isExistingText,
	isExistingPhone,
	isValidEmail,
	isValidLength,
} = require('../util/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// post create a new user
exports.register = async (req, res, next) => {
	try {
		const { fullName, email, phoneNumber, username, password, isAdmin } =
			req.body;

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const user = {
			fullName: fullName,
			email: email,
			phoneNumber: phoneNumber,
			username: username,
			password: hash,
			isAdmin: isAdmin,
		};
		let errors = {};

		const existUsername = await isExistingText('username', user.username);
		const existEmail = await isExistingText('email', user.email);
		const existPhoneNumber = await isExistingPhone(
			'phoneNumber',
			user.phoneNumber
		);

		if (existUsername) {
			errors.username = 'Username already exits.';
		}
		if (existEmail) {
			errors.email = 'Email already exits.';
		}
		if (existPhoneNumber) {
			errors.phone = 'Phone number already exits.';
		}
		if (!isValidEmail(user.email)) {
			errors.emailValid = 'Invalid email.';
		}
		if (!isValidLength(user.password, 8)) {
			errors.passwordValid =
				'Invalid password. Must be at least 8 characters long.';
		}

		if (Object.values(errors).length > 0) {
			return res.status(422).json({
				message: 'User signup failed due to validation errors.',
				errors,
			});
		}
		await User.create(user);
		res.status(200).send('User has been created');
	} catch (err) {
		console.log(err);
	}
};

// post login
exports.login = async (req, res, next) => {
	const errors = {};

	try {
		const emailValid = isValidEmail(req.body.email);
		if (!emailValid) errors.validEmail = 'Email is not valid';

		const user = await User.findOne({ email: req.body.email });
		if (!user) errors.password = 'Wrong password or user.';

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!isPasswordCorrect) errors.password = 'Wrong password or user.';

		const { password, isAdmin, ...otherDetail } = user._doc;
		const token = jwt.sign({ ...otherDetail.email, isAdmin }, 'supersecret', {
			expiresIn: '1h',
		});
		const decode = jwt.decode(token);

		if (Object.values(errors).length > 0) {
			return res.status(422).json({
				message: 'Invalid credentials.',
				errors: errors,
			});
		} else {
			return res.send({
				token: token,
				expiration: decode.exp,
				user: { ...otherDetail },
			});
		}
	} catch (err) {
		next(err);
	}
};

// get users
exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};
