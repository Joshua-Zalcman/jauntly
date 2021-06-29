const express = require('express');
const packageRouter = express.Router();
const User = require('../models/user_model');
const Package = require('../models/package_model');

//index
packageRouter.get('/', async (req, res) => {
	try {
		const packages = await Package.find({});
		res.json({ packages });
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = packageRouter;
