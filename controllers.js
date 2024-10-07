const Contact = require('./Contact');
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
      res.render('index', { contacts, error: {} });
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
      res.json(contact);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching contact' });
    });
};

// Create a new contact

// Delete a contact
exports.deleteContact = (req, res) => {
  const { id } = req.params;

  Contact.findByIdAndDelete(id)
    .then(() => {
      Contact.find().then((contacts) => {
        res.render('index', { contacts, error: {} });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error deleting contact' });
    });
};


// Create a new contact
exports.createContact = (req, res) => {
  const {
    name, phone, email, instagram, facebook, tiktok, threads, twitter, linkedin, youtube
  } = req.body;

  let error = {};

  // Basic validations
  if (!name) error.name = 'Please enter your name';
  if (!phone) error.phone = 'Please enter your phone number';
  if (!email) error.email = 'Please enter your email';

  if (Object.keys(error).length > 0) {
    return Contact.find()
      .then((contacts) => {
        res.render('index', { contacts, error });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error rendering contacts' });
      });
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

  newContact
    .save()
    .then((contact) => {
      Contact.find().then((contacts) => {
        res.render('index', { contacts, error: {} });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error creating contact' });
    });
};

// Update an existing contact
exports.updateContact = (req, res) => {
  const { id } = req.params;
  const {
    name, phone, email, instagram, facebook, tiktok, threads, twitter, linkedin, youtube
  } = req.body;

  Contact.findByIdAndUpdate(
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
  )
    .then((updatedContact) => {
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json(updatedContact);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error updating contact' });
    });
};
