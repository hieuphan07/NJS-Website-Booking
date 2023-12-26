const express = require('express');
const router = express.Router();

// import controller
const hotelController = require('../controllers/hotel');

router.get('/hotels', hotelController.getHotels);

module.exports = router;
