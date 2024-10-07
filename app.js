const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware setup
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/contacts', router);

// Base route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Contact Management App',
    description: 'Use this app to manage and organize your contacts efficiently.',
    instructions: 'Navigate to /contacts to view, add, update, or delete your contacts.'
  });
});

// Database connection and server setup
const PORT = process.env.PORT || 3000;
mongoose
  .connect('mongodb+srv://codewithcodesandbox11:Imranali13@cluster0.ma4owvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,  // Add this for better connection handling
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
