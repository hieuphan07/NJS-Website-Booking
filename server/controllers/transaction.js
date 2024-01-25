const Transaction = require('../models/transaction');

// get transctions
exports.getTransactions = async (req, res, next) => {
	try {
		const transaction = await Transaction.find()
			.populate({ path: 'hotelId' })
			.exec();
		return res.status(200).json(transaction);
	} catch (err) {
		console.log(err);
	}
};
