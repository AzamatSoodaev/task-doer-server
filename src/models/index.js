"use strict";

const { Sequelize, DataTypes } = require("sequelize");

exports.db = {};

exports.init = async () => {
	console.log("Initializing Sequelize module");

	try {
		const sequelize = new Sequelize(process.env.PG_DATABASE_URL);
		await sequelize.authenticate();
		console.log("Connection to postgres db has been established successfully.");

		exports.db.Sequelize = Sequelize;
		exports.db.sequelize = sequelize;

		exports.db.User = require("../models/user.model")(sequelize, DataTypes);
		exports.db.Session = require("../models/session.model")(sequelize, DataTypes);
		// exports.db.List = require("../models/list.model")(sequelize, DataTypes);
		// exports.db.Todo = require("../models/todo.model")(sequelize, DataTypes);

		// let user = await exports.db.User.findOne({
		// 	where: {
		// 		email: true,
		// 	},
		// });

		// if (user) {
		// 	console.log(user.toJSON());
		// } else {
		// 	console.log("aaaaa");
		// }

		// let user = await exports.db.User.create({
		// 	email: "azamattaak@gmail.com",
		// 	password: "012345a",
		// });
		// console.log(user.toJSON());

		// let list = await exports.db.List.create({
		// 	name: "hello",
		// 	userId: 1,
		// });

		// console.log(list.toJSON());

		exports.db.sequelize.sync();



		// db.user.hasMany(db.todo, { as: "todos" });
		// db.todo.belongsTo(db.user, { as: "user", foreignKey: "userId" });

	} catch (err) {
		console.error("Unable to connect to the database:", err);
	}
};