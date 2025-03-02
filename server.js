// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookings');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(require('cors')())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/bookings', bookingRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});