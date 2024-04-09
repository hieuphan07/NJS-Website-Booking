const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../util/verifyToken');

const transactionController = require('../controllers/transaction');

router.get('/:id', transactionController.getTransaction);

router.get('/', verifyAdmin, transactionController.getTransactions);

module.exports = router;
