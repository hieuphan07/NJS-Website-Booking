const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../util/verifyToken')

// import controller
const roomController = require('../controllers/room');

router.get('/', roomController.getRooms);

router.get('/:id', roomController.getRoom);

router.post('/',verifyAdmin, roomController.createRoom);

router.delete('/:id',verifyAdmin, roomController.deleteRoom);

module.exports = router;
