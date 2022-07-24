"use strict";

const authController = require("../controllers/auth.controller");
const { body } = require('express-validator');


module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post(
		"/api/auth/signup",
		body('email').isEmail(),
		body('password').isLength({ min: 5, max: 32 }),
		authController.signup
	);
	// app.post("/api/auth/signin", authController.signin);
};
