const Transaction = require('../models/transaction');

// get transctions
exports.getTransaction = async (req, res, next) => {
	const user = req.params.id;
	try {
		const transaction = await Transaction.find({ user: user })
			.populate({ path: 'hotelId' })
			.exec();
		return res.status(200).json(transaction);
	} catch (err) {
		next(err);
	}
};

exports.getTransactions = async (req, res, next) => {
	try {
		const transactions = await Transaction.find()
			.populate({ path: 'hotelId' })
			.exec();
		return res.status(200).json(transactions);
	} catch (err) {
		next(err);
	}
};
