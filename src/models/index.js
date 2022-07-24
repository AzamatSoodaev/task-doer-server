"use strict";

const { Sequelize, DataTypes } = require("sequelize");

exports.db = null;

exports.init = async () => {
	console.log("Initializing Sequelize module");

	try {
		const sequelize = new Sequelize(process.env.PG_DATABASE_URL);
		await sequelize.authenticate();
		console.log("Connection to postgres db has been established successfully.");
	} catch (err) {
		console.error('Unable to connect to the database:', err);
	}
};