const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/verifyToken.js');

// import controller
const userController = require('../controllers/user');

router.post('/signup', userController.register);

router.post('/login', userController.login);

router.get('/users', userController.getUsers);

router.get('/checkauthentication', verifyToken, async (req, res, next) => {
	res.send('Logged in.');
});

module.exports = router;
