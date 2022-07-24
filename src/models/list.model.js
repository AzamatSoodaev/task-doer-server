"use strict";
const { Model, Deferrable } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class List extends Model { }

	List.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isDeleted: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				// references: {
				// 	model: User,

				// 	// This is the column name of the referenced model
				// 	key: 'id',

				// 	// With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
				// 	deferrable: Deferrable.INITIALLY_IMMEDIATE
				// 	// Options:
				// 	// - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
				// 	// - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
				// 	// - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
				// }
			}
		},
		{
			sequelize,
			modelName: "List",
			tableName: "lists",
			underscored: true
		}
	);

	return List;
};
