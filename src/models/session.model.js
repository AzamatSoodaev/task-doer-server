"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Session extends Model { }

	Session.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			accessToken: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Session",
			tableName: "sessions",
			underscored: true
		}
	);

	return Session;
};
