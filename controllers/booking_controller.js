const express = require('express');
const bookingRouter = express.Router();
const User = require('../models/user_model');
const Package = require('../models/package_model');
const Booking = require('../models/booking_model');

//index

//create
bookingRouter.post('/', async (req, res) => {
	try {
		const booking = await Booking.create(req.body);
		res.json({ booking, message: 'booking successful!' });
	} catch (err) {
		res.status(400).json(error);
	}
});
//show
bookingRouter.get('/:id', async (req, res) => {
	try {
		const bookings = await Booking.find({ user: req.params.id });
		res.json({ bookings });
	} catch (err) {
		res.status(400).json(error);
	}
});

module.exports = bookingRouter;
