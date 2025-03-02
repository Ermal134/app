// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: { type: String, required: true }, // e.g., "2025-03-01"
    time: { type: String, required: true }, // e.g., "9:00 AM"
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);

