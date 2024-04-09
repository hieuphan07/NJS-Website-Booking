const express = require('express');
const router = express.Router();

// import controller
const userController = require('../controllers/user');

router.post('/signup', userController.register);

router.post('/login', userController.login);

router.get('/users', userController.getUsers);

module.exports = router;
