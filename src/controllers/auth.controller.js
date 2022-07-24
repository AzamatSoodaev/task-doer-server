"use strict";

const { db } = require("../models");
const User = db.User;
const Session = db.Session;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { validationResult } = require('express-validator');


exports.signup = async (req, res) => {

	try {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				data: {},
				errors: errors.array()
			});
		}

		// Step 1. Check if user is not exists
		let userDAO = req.body;

		let user = await User.findOne({
			where: {
				email: userDAO.email,
			},
		});

		if (user) {
			return res.status(400).json({
				data: {},
				errors: [
					{ msg: "Email is already in use!" }
				]
			});
		}

		// Step 2. Create a new user
		let newUser = await User.create({
			email: userDAO.email,
			password: bcrypt.hashSync(userDAO.password, 8),
		});

		let accessToken = jwt.sign({ id: newUser.id }, process.env.SECRET, {
			expiresIn: process.env.TOKEN_EXPIRES, // 24 hours
		});

		// Step 3. Create session
		await Session.create({
			accessToken: accessToken,
			userId: newUser.id
		});

		res.status(201).json({
			data: {
				accessToken: accessToken,
			},
			errors: []
		});

	} catch (err) {
		console.log(err);

		res.status(500).json({
			data: {},
			errors: [
				{ msg: err.message }
			]
		});
	}
};


exports.signin = async (req, res) => {

	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				data: {},
				errors: errors.array()
			});
		}

		let user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(404).send({
				data: {},
				errors: [
					{
						msg: "User Not found."
					}
				]
			});
		}

		const isValidPassword = bcrypt.compareSync(
			req.body.password,
			user.password,
		);

		if (!isValidPassword) {
			return res.status(401).send({
				data: {
					accessToken: null,
				},
				errors: [
					{
						msg: "Invalid Password!",
					}
				],

			});
		}

		const accessToken = jwt.sign({ id: user.id }, process.env.SECRET, {
			expiresIn: 86400, // 24 hours
		});

		await Session.create({
			accessToken: accessToken,
			userId: user.id
		});

		res.status(200).json({
			data: {
				accessToken: accessToken,
			},
			errors: [],
		});

	} catch (err) {
		console.log(err);

		res.status(500).json({
			data: {},
			errors: [
				{ msg: err.message }
			]
		});
	}
};
