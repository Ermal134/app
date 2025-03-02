const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

// Configure Nodemailer (replace with your email service details)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// GET booked slots for a specific date
router.get('/booked-slots', async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ error: 'Date is required' });

        const bookings = await Booking.find({ date });
        const bookedSlots = bookings.map(booking => booking.time);
        res.json(bookedSlots);
    } catch (error) {
        console.error('Error fetching booked slots:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new booking
router.post('/', async (req, res) => {
    try {
        const { date, time, fullName, phone, email, address } = req.body;
        if (!date || !time || !fullName || !phone || !email || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the slot is already booked
        const existingBooking = await Booking.findOne({ date, time });
        if (existingBooking) {
            return res.status(400).json({ error: 'This time slot is already booked' });
        }

        // Create new booking
        const booking = new Booking({ date, time, fullName, phone, email, address });
        await booking.save();

        // Email to the User
        const userEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Home Inspection Booking Confirmation',
            text: `
Dear ${fullName},

Thank you for scheduling a home inspection with us! Below are the details of your appointment:

**Date:** ${date}  
**Time:** ${time}  
**Address:** ${address}  
**Contact Phone:** ${phone}  
**Email:** ${email}  

We look forward to assisting you. If you need to reschedule or cancel, please contact us at support@homeinspectioncompany.com or call (555) 123-4567.

Best regards,  
The Home Inspection Team  
Home Inspection Company  
(555) 123-4567 | inspector@proberightinspections.com
            `
        };

        // Email to the Company
        const companyEmail = {
            from: process.env.EMAIL_USER,
            to: 'zinaeduart@gmail.com', // Replace with actual company email
            subject: `New Booking - ${date} at ${time}`,
            text: `
Hello Team,

A new home inspection booking has been scheduled. Please find the details below:

**Customer Name:** ${fullName}  
**Date:** ${date}  
**Time:** ${time}  
**Address:** ${address}  
**Phone:** ${phone}  
**Email:** ${email}  

Please assign an inspector and ensure availability for this appointment. Contact the customer if any clarification is needed.

Regards,  
Booking System  
Home Inspection Company
            `
        };

        // Send emails
        await transporter.sendMail(userEmail);
        await transporter.sendMail(companyEmail);

        res.status(201).json({ message: 'Booking confirmed', booking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;