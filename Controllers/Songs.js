const Song = require('../models/songs');

// Create a new song
exports.createSong = async (req, res) => {
  try {
    const { title, lyrics, link } = req.body;

    const newSong = new Song({
      title,
      lyrics,
      link,
    });

    await newSong.save();
    res.status(201).json({ message: 'Song created successfully', newSong });
  } catch (error) {
    res.status(500).json({ message: 'Error creating song', error });
  }
};

// Get all songs
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
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
    res.status(500).json({ message: 'Error retrieving song', error });
  }
};
