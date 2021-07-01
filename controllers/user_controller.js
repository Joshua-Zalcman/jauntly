const express = require('express');
const userRouter = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user_model');
const Package = require('../models/package_model');
let seedData = require('../seeders/user_seed_data');

//index
userRouter.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		res.json({ users });
	} catch (error) {
		res.status(400).json(error);
	}
});

//login
userRouter.post('/login', async (req, res) => {
	try {
		if (req.body.password) {
			const user = await User.findOne({
				email: req.body.email,
			});
			if (!user) {
				res.json({
					message: 'No user with that email address has been registered',
				});
			} else {
				const passwordMatches = bcrypt.compareSync(
					req.body.password,
					user.password
				);

				if (passwordMatches) {
					jwt.sign(
						{ user },
						process.env.SECRET,
						{ expiresIn: '1h' },
						(err, token) => {
							res.json({ token, message: 'successful login' });
						}
					);
				} else {
					console.log('passwords did not match');
					res.json({ message: 'incorrect password' });
				}
			}
		} else {
			res.json({ message: 'enter password' });
		}
	} catch (err) {
		res.status(400).json(error);
	}
});

//create
userRouter.post('/', async (req, res) => {
	try {
		req.body.password = bcrypt.hashSync(
			req.body.password,
			bcrypt.genSaltSync(10)
		);
		const user = await User.create(req.body);
		res.json({ user });
	} catch (err) {
		res.status(400).json(error);
	}
});

//seeder
userRouter.post('/seeder', async (req, res) => {
	try {
		await User.deleteMany({});
		seedData.forEach((user) => {
			user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
		});
		req.body = seedData;
		const users = await User.create(req.body);
		res.json({ users });
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = userRouter;
