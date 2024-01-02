const express = require('express');
const router = express.Router();

// import controller
const userController = require('../controllers/user');

router.post('/login', userController.login);

router.post('/signup', userController.createUser);

module.exports = router;
