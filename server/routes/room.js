const express = require('express');
const router = express.Router();

// import controller
const roomController = require('../controllers/room');

router.get('/', roomController.getRooms);

router.get('/:id', roomController.getRoom);

router.delete('/:id', roomController.deleteRoom);

module.exports = router;
