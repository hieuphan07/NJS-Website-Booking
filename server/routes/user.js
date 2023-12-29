const express = require('express');
const router = express.Router();

// import controller
const userController = require('../controllers/user');

router.post('/sign-up', userController.createUser);

module.exports = router;
