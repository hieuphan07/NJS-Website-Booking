const User = require('../models/user');
const {
	isExistingText,
	isExistingPhone,
	isValidEmail,
	isValidLength,
} = require('../util/validation');
const { createJSONToken } = require('../util/auth');

exports.createUser = async (req, res, next) => {
	const fullName = req.body.fullName;
	const email = req.body.email;
	const phoneNumber = req.body.phoneNumber;
	const username = req.body.username;
	const password = req.body.password;
	const isAdmin = req.body.isAdmin;

	const user = {
		fullName: fullName,
		email: email,
		phoneNumber: phoneNumber,
		username: username,
		password: password,
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
	try {
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

exports.login = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let errors = {};
	let authToken;

	const emailValid = isValidEmail(email);
	if (emailValid) {
		const [loggingUser] = await User.find({ email: email });
		if (loggingUser) {
			if (password === loggingUser.password) {
				authToken = createJSONToken(loggingUser.email);
			} else {
				errors.password = 'Wrong password! Try again.';
			}
		} else {
			errors.email = 'This email does not exists.';
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
		return res.json({ token: authToken });
	}
};
