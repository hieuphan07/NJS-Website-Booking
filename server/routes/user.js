const express = require('express');
const router = express.Router();

// import controller
const userController = require('../controllers/user');

router.post('/signup', userController.createUser);

router.post('/login', userController.login);

router.get('/login', userController.getUser);

module.exports = router;
