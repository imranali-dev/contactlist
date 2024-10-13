const mongoose = require('mongoose');

// Define the reminder schema
const reminderSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: 100, // Limit the short description to 100 characters
  },
  points: {
    type: String,
  },
  dueDate: {
    type: Date,  // Optional due date for the reminder
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],  // Can be either 'pending' or 'completed'
    default: 'pending',  // Default status is 'pending'
  },
  tags: [{
    type: String,  // Tags for categorizing reminders
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '3d',  // Automatically delete reminder after 3 days
  },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// Export the Reminder model
module.exports = Reminder;
