const express = require('express');
const userRouter = express.Router();
const User = require('../models/user_model');
const Package = require('../models/package_model');
const seedData = require('../seeders/user_seed_data');

//index
userRouter.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		res.json({ users });
	} catch (error) {
		res.status(400).json(error);
	}
});

//seeder
userRouter.post('/seeder', async (req, res) => {
	try {
		//add deletion here
		req.body = seedData;
		res.json(await User.create(req.body));
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = userRouter;
