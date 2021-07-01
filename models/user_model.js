const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

//middleware
userSchema.set('toJSON', {
	transform: function (doc, ret) {
		// remove the password property when serializing doc to JSON
		delete ret.password;
		return ret;
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
