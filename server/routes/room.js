const express = require('express');
const router = express.Router();

// import controller
const roomController = require('../controllers/room');

router.get('/', roomController.getRooms);

router.get('/:id', roomController.getRoom);

module.exports = router;
