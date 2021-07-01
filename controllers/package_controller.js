const express = require('express');
const packageRouter = express.Router();
const User = require('../models/user_model');
const Package = require('../models/package_model');
let seedData = require('../seeders/package_seed_data');

//index
packageRouter.get('/', async (req, res) => {
	try {
		const packages = await Package.find({});
		res.json({ packages });
	} catch (error) {
		res.status(400).json(error);
	}
});

//seeder
packageRouter.post('/seeder', async (req, res) => {
	try {
		await Package.deleteMany({});
		//find admin to set createdby
		const admin = await User.findOne({ isAdmin: true });
		seedData.forEach((data) => {
			data.createdBy = admin._id;
		});
		req.body = seedData;
		res.json(await Package.create(req.body));
	} catch (error) {
		res.status(400).json(error);
	}
});

//show
packageRouter.get('/:id', async (req, res) => {
	try {
		const package = await Package.findById(req.params.id);
		res.json({ package });
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = packageRouter;
