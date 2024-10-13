const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes');
const cors = require('cors');
const app = express();
const songRoutes = require('./routers/song');

// Set EJS as the view engine
const path = require('path');

// Use the CORS middleware to allow all origins and methods

// Use the CORS middleware to allow all origins and methods
app.use(cors({
  origin: 'https://chic-frangollo-057e8b.netlify.app',  // Allow requests from your Netlify frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'],    // Allow specific headers
  credentials: true                                     // Allow credentials if needed (cookies)
}));

// Handle pre-flight requests
app.use(cors());


// Middleware setup
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/contacts', router);
app.use('/api', songRoutes);
// Base route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Contact Management App',
    description: 'Use this app to manage and organize your contacts efficiently.',
    instructions: 'Navigate to /contacts to view, add, update, or delete your contacts.'
  });
});

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://vercel.live");
  next();
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
