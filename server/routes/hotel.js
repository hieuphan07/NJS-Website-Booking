const express = require('express');
const router = express.Router();

// import controller
const hotelController = require('../controllers/hotel');
const roomController = require('../controllers/room');

// routes
router.get('/', hotelController.getHotels);

router.get('/countByCity', hotelController.countByCity);

router.get('/countByType', hotelController.countByType);

router.get('/search', hotelController.searchHotels);

module.exports = router;
