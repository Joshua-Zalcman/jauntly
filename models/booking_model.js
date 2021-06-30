const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
	{
		bookingItems: [
			{
				price: { type: Number, required: true },
				name: { type: String, required: true },
				image: { type: String, required: true },
				guestNumber: { type: Number, required: true, default: 1 },
				isComplete: { type: Boolean, required: true, default: false },
				date: { type: Date, required: true },
				time: { type: Date, required: true },
				package: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'Package',
				},
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		totalPrice: { type: Number, required: true },
		isPaid: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
