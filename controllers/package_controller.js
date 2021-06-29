const express = require('express');
const packageRouter = express.Router();
const User = require('../models/user_model');
const Package = require('../models/package_model');

//index
packageRouter.get('/', async (req, res) => {
	const package = await Package.find({});
	res.json({ package });
});

module.exports = packageRouter;
