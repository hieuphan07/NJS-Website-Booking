const Transaction = require('../models/transaction');
const loggedInUser = require('../util/userData');

// get transctions
exports.getTransactions = async (req, res, next) => {
	const user = loggedInUser.user.email;
	try {
		const transaction = await Transaction.find({ user: user })
			.populate({ path: 'hotelId' })
			.exec();
		return res.status(200).json(transaction);
	} catch (err) {
		console.log(err);
	}
};
