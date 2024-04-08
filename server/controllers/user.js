const User = require('../models/user');
const {
	isExistingText,
	isExistingPhone,
	isValidEmail,
	isValidLength,
} = require('../util/validation');
const { createJSONToken, verifyEmail } = require('../util/auth');
const bcrypt = require('bcrypt');
const loggedInUser = require('../util/userData');

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
		const newUser = await User.create(user);
		if (newUser) {
			const authToken = createJSONToken(newUser.email);
			res
				.status(201)
				.json({ message: 'User created', user: newUser, token: authToken });
		}
	} catch (err) {
		console.log(err);
	}
};

// post login
exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	let errors = {};
	let authToken;

	try {
		const emailValid = isValidEmail(email);
		if (emailValid) {
			const [loggingUser] = await User.find({ email: email });
			if (loggingUser) {
				const isPasswordCorrect = await bcrypt.compare(
					password,
					loggingUser.password
				);
				if (isPasswordCorrect) {
					authToken = createJSONToken(loggingUser.email);
				} else {
					errors.password = 'Wrong password or user.';
				}
			} else {
				errors.email = 'Wrong password or user.';
			}
		} else {
			errors.validEmail = 'Email is not valid.';
		}

		if (Object.values(errors).length > 0) {
			return res.status(422).json({
				message: 'Invalid credentials.',
				errors: errors,
			});
		} else {
			const verifiedUser = verifyEmail(authToken);
			loggedInUser.user = verifiedUser;
			return res.json({ token: authToken, user: verifiedUser });
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
