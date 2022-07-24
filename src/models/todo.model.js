"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {}

  Todo.init(
    {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
      todo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
			isDeleted: {
				type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
			},
			dueDates: {
				type: DataTypes.DATE,
			},
			notes: {
				type: DataTypes.STRING,
			},
			userId: {
				type: DataTypes.INTEGER,
			},
			listId: {
				type: DataTypes.INTEGER,
			},
    },
    {
      sequelize,
      modelName: "todo",
			tableName: "todos",
			underscored: true
    }
  );

  return Todo;
};
