// Load environment variables first
require('dotenv').config();

// Debug logging
console.log('Environment variables loaded:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const instagramRoutes = require('./routes/instagramRoutes');
// Initialize express app
const app = express();

// Middleware
app.use(cors());
// Increase JSON payload limit for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

// API Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the MERN Stack API!' });
});

// Product routes
app.use('/api/products', productRoutes);
app.use('/api/instagram', instagramRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Connect to MongoDB with fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/framesandbows';
console.log('Attempting to connect to MongoDB with URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Determine port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});