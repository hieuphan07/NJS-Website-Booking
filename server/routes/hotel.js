const express = require('express');
const router = express.Router();

// import controller
const hotelController = require('../controllers/hotel');
const roomController = require('../controllers/room');

// routes
router.get('/', hotelController.getHotels);

router.get('/rooms', roomController.getRooms);

module.exports = router;
