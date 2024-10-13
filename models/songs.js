const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  lyrics: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
