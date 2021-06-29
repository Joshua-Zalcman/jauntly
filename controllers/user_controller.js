const express = require('express');
const userRouter = express.Router();
const User = require('../models/user_model');
const Package = require('../models/package_model');

//index
userRouter.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		res.json({ users });
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = userRouter;
