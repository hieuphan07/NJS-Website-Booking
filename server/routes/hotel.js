const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../util/verifyToken');

// import controller
const hotelController = require('../controllers/hotel');

// routes
router.post('/', verifyAdmin, hotelController.createHotel);

router.put('/:id', verifyAdmin, hotelController.updateHotel);

router.delete('/:id', verifyAdmin, hotelController.deleteHotel);

router.get('/', hotelController.getHotels);

router.get('/countByCity', hotelController.countByCity);

router.get('/countByType', hotelController.countByType);

router.get('/find/:id', hotelController.getHotelById);

router.get('/search', hotelController.searchHotels);

router.post('/reserve', hotelController.reserveBooking);

module.exports = router;
