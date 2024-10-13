const Song = require('../models/songs');

// Create a new song
exports.createSong = async (req, res) => {
  try {
    const { title, lyrics, link } = req.body;

    if (!title || !lyrics || !link) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newSong = new Song({
      title,
      lyrics,
      link,
    });

    await newSong.save();
    res.status(201).json({ message: 'Song created successfully', newSong });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    console.error('Error creating song:', error);
    res.status(500).json({ message: 'Error creating song', error });
  }
};

// Get all songs
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    if (songs.length === 0) {
      return res.status(204).json({ message: 'No songs available' }); // No content
    }
    res.status(200).json(songs);
  } catch (error) {
    console.error('Error retrieving songs:', error);
    res.status(500).json({ message: 'Error retrieving songs', error });
  }
};

// Get a single song by ID
exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid song ID format' });
    }
    console.error('Error retrieving song:', error);
    res.status(500).json({ message: 'Error retrieving song', error });
  }
};

// Example middleware for unauthorized access
exports.checkAuthorization = (req, res, next) => {
  // Placeholder for authorization logic
  const isAuthorized = false; // Change based on your auth logic
  if (!isAuthorized) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  next();
};

// Example middleware for payment required
exports.checkPayment = (req, res, next) => {
  // Placeholder for payment logic
  const paymentRequired = false; // Change based on your payment logic
  if (paymentRequired) {
    return res.status(402).json({ message: 'Payment required' });
  }
  next();
};

// Example middleware for forbidden access
exports.checkPermissions = (req, res, next) => {
  // Placeholder for permission logic
  const hasPermission = false; // Change based on your permission logic
  if (!hasPermission) {
    return res.status(403).json({ message: 'Forbidden access' });
  }
  next();
};
