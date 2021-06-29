const express = require('express');
const userRouter = express.Router();
const User = require('../models/user_model');
const Package = require('../models/package_model');

//index
userRouter.get('/', async (req, res) => {
	const users = await User.find({});
	res.json({ users });
});

module.exports = userRouter;
