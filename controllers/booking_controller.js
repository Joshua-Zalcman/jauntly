const express = require('express');
const bookingRouter = express.Router();
const User = require('../models/user_model');
const Package = require('../models/package_model');
const Booking = require('../models/booking_model');

//index

//create
bookingRouter.post('/bookings', async (req, res) => {
	try {
		const booking = await Booking.create(req.body);
		res.json({ booking, message: 'booking successful!' });
	} catch (err) {
		res.status(400).json(error);
	}
});
//show

module.exports = bookingRouter;
