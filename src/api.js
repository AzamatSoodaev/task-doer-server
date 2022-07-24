"use strict";

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { getLoggerEnv } = require("./helpers/getLoggerEnv");

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || "development";


exports.init = async () => {

	console.log("Initializing Express app");

	const app = express();

	app.use(cors());
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(logger(getLoggerEnv(ENV)));

	require("./routes/auth.route")(app);
	// require("./routes/user.route")(app);
	// require("./routes/todo.route")(app);

	app.use("*", (req, res) => {
		res.status(404).send({
			data: {},
			errors: [
				{ msg: "Not Found" }
			]
		});
	});

	app.listen(PORT, () => {
		console.log(`App listening at http://localhost:${PORT}`);
	});
};