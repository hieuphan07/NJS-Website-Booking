const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../util/verifyToken');

// import controller
const userController = require('../controllers/user');

router.post('/signup', userController.register);

router.post('/login', userController.login);

router.get('/users', verifyAdmin, userController.getUsers);

module.exports = router;
