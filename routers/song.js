const express = require('express');
const router = express.Router();
const songController = require('../Controllers/Songs');

// Route for creating a new song
router.post('/songs', songController.createSong);

// Route for retrieving all songs
router.get('/songs', songController.getSongs);

// Route for retrieving a single song by ID
router.get('/songs/:id', songController.getSongById);

module.exports = router;
