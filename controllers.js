const Contact = require('./Contact');
const { ValidationError } = require('mongoose').Error;
const validator = require('validator'); // Validator package to validate phone numbers

// Function to generate full social media URLs
const generateSocialMediaLinks = (platform, username) => {
  if (!username) return null;
  switch (platform) {
    case 'instagram':
      return `https://www.instagram.com/${username}`;
    case 'facebook':
      return `https://www.facebook.com/${username}`;
    case 'tiktok':
      return `https://www.tiktok.com/@${username}`;
    case 'threads':
      return `https://www.threads.net/@${username}`;
    case 'twitter':
      return `https://www.twitter.com/${username}`;
    case 'linkedin':
      return `https://www.linkedin.com/in/${username}`;
    case 'youtube':
      return `https://www.youtube.com/${username}`;
    default:
      return username; // In case the platform doesn't match, store the username as is.
  }
};

// Get all contacts
exports.getAllContact = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.json(contacts); // Return contacts as JSON
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching contacts' });
    });
};

// Get a single contact by ID
exports.getSingleContact = (req, res) => {
  const { id } = req.params;
  Contact.findById(id)
    .then((contact) => {
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json(contact); // Return the single contact as JSON
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching contact' });
    });
};
// Create a new contact
exports.createContact = async (req, res) => {
  const {
    name, phone, email, instagram, facebook, tiktok, threads, twitter, linkedin, youtube
  } = req.body;

  // Basic validations
  const errors = {};
  if (!name) errors.name = 'Please enter your name';
  if (!phone) errors.phone = 'Please enter your phone number';
  if (!email) errors.email = 'Please enter your email';

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Create a new contact with the full social media links
  const newContact = new Contact({
    name,
    phone,
    email,
    instagram: generateSocialMediaLinks('instagram', instagram),
    facebook: generateSocialMediaLinks('facebook', facebook),
    tiktok: generateSocialMediaLinks('tiktok', tiktok),
    threads: generateSocialMediaLinks('threads', threads),
    twitter: generateSocialMediaLinks('twitter', twitter),
    linkedin: generateSocialMediaLinks('linkedin', linkedin),
    youtube: generateSocialMediaLinks('youtube', youtube),
  });

  try {
    // Save the new contact
    const contact = await newContact.save();
    return res.status(201).json(contact); // Return the created contact as JSON
  } catch (error) {
    // Handle Mongoose validation errors
    if (error instanceof ValidationError) {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: 'Validation error', messages });
    }
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
// Update an existing contact
exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send(); // No content after deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const {
    name, phone, email, instagram, facebook, tiktok, threads, twitter, linkedin, youtube
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        email,
        instagram: generateSocialMediaLinks('instagram', instagram),
        facebook: generateSocialMediaLinks('facebook', facebook),
        tiktok: generateSocialMediaLinks('tiktok', tiktok),
        threads: generateSocialMediaLinks('threads', threads),
        twitter: generateSocialMediaLinks('twitter', twitter),
        linkedin: generateSocialMediaLinks('linkedin', linkedin),
        youtube: generateSocialMediaLinks('youtube', youtube),
      },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact); // Return the updated contact as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating contact' });
  }
};

