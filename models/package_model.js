const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
	name: String,
});

const packageSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		country: { type: String, required: true },
		city: { type: String, required: true },
		address: { type: String, required: true },
		guestNumber: { type: Number, required: true },
		price: { type: Number, required: true },
		tags: [TagSchema],
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
