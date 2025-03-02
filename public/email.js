app.post('/api/bookings', (req, res) => {
    const { date, time, fullName, phone, email, address } = req.body;
    // Send user email
    transporter.sendMail({
        to: email,
        subject: 'Your Home Inspection Booking Confirmation',
        text: `Dear ${fullName}, ...` // Use the template above
    });
    // Send company email
    transporter.sendMail({
        to: 'team@homeinspectioncompany.com',
        subject: `New Booking - ${date} at ${time}`,
        text: `Hello Team, ...` // Use the template above
    });
    res.json({ success: true });
});