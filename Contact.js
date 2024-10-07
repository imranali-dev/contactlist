const { Schema, model } = require('mongoose');

// Define the contact schema with social media links
const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 9,
    maxlength: 15,
  },
  instagram: {
    type: String,
    trim: true,
  },
  facebook: {
    type: String,
    trim: true,
  },
  tiktok: {
    type: String,
    trim: true,

  },
  threads: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  youtube: {
    type: String,
    trim: true,
  }
});

const Contact = model('Contact', contactSchema);
module.exports = Contact;
