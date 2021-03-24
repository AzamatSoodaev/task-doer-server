"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {}

  Todo.init(
    {
      todo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isImportant: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "todo",
    }
  );

  return Todo;
};
