// Inside server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const pdfRoutes = require('./routes/pdfRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Static file serving for uploaded PDFs
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use API routes
app.use('/api/auth', authRoutes);  // For authentication (register, login)
app.use('/api/chat', chatRoutes);  // For chat-related functionalities
app.use('/api/pdf', pdfRoutes);    // For PDF upload and processing

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// General error handler for unexpected server errors
app.use((err, req, res, next) => {
  console.error('Unexpected server error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
