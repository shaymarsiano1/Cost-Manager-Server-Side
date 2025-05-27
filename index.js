/**
 * Main server entry point for the Cost Manager API.
 * Initializes Express, connects to MongoDB, and sets up API routes.
 */

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Connect to MongoDB Atlas using URI from .env file
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Set up API routes
app.use('/api/add', require('./routes/add'));
app.use('/api/report', require('./routes/report'));
app.use('/api/users', require('./routes/users'));
app.use('/api/about', require('./routes/about'));

// Start the server on specified port (default 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
