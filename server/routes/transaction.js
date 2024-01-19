const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transaction');

router.get('/', transactionController.getTransactions);

module.exports = router;
